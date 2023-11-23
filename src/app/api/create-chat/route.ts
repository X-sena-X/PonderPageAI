// /api/create-chat
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { chats } from "@/lib/db/schema";
import axios from "axios";
import fs from "fs";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { getPinconeClient } from "../../../lib/PineconeDB";
import * as crypto from "crypto";

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: { pageNumber: number };
        index: string;
    };
};

async function loadPdfToPinecone(file_url: string) {
    // 1. obtain the pdf -> download and read from pdf
    console.log("Downloading pdf into file system..");
    const file_path = await downloadFromUploadThings(file_url);
    if (!file_path) {
        throw new Error("Could not download");
    }
    const loader = new PDFLoader(file_path);
    const pages = (await loader.load()) as PDFPage[];
    const file_id = crypto.randomBytes(20).toString("hex");
    pages.map((page) => (page.metadata.index = file_id));
    console.log(pages[0].metadata.index);

    // 2. split and segment the pdf into pages
    //const documents = await Promise.all(pages.map(prepareDocument));

    // 3. vectorize and embed individual documents
    //const vectors = await Promise.all(documents.flat().map(embedDocument));
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
    });
    // 4. upload to pinecone
    const client = await getPinconeClient();
    const pineconeIndex = await client.Index("chatpdf")!;
    console.log("inserting vectors into pinecone");
    //const namespace = pineconeIndex.namespace(convertToAscii(file_url));
    //await namespace.upsert(vectors);
    await PineconeStore.fromDocuments(pages, embeddings, {
        pineconeIndex,
    });

    console.log("uploaded vectors into pinecone");

    return file_id;
}

async function downloadFromUploadThings(file_url: string) {
    try {
        const file_path = `/tmp/pdf-${Date.now()}.pdf`;
        const response = await axios.get(file_url, { responseType: "stream" });
        const writer = fs.createWriteStream(file_path);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
        console.log("PDF downloaded successfully.");
        return file_path;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function POST(req: Request, res: Response) {
    const { userId } = await auth();
    if (!userId)
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    try {
        const body = await req.json();
        const { file_name, file_url } = body;
        console.log(`fileName: ${file_name}\nfileURL:  ${file_url}`);
        const pincone_id = await loadPdfToPinecone(file_url);
        const chat_id = await db
            .insert(chats)
            .values({
                userId: userId,
                pdfname: file_name,
                pdf_url: file_url,
                pinconeId: pincone_id,
            })
            .returning({
                insertedId: chats.id,
            });
        return NextResponse.json(
            { chat_id: chat_id[0].insertedId },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "internal server error" },
            { status: 403 }
        );
    }
}
