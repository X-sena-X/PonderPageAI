import { Pinecone } from "@pinecone-database/pinecone";
import { getPinconeClient } from "./PineconeDB";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export async function getMatchesFromEmbeddings(
    embeddings: number[],
    fileId: string
) {
    const client = await getPinconeClient();
    const index = await client.Index("chatpdf");

    try {
        const queryResult = await index.query({
            topK: 5,
            vector: embeddings,
            includeMetadata: true,
            filter: {
                index: { $eq: fileId },
            },
        });
        return queryResult.matches || [];
    } catch (error) {
        console.log("error querying embeddings: ", error);
    }
}

export async function getContext(query: string, fileId: string) {
    //const querEmbeddings = await getEmbeddings(query)
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const queryEmbeddings = await embeddings.embedQuery(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileId);

    const qualifyingDocs = matches?.filter(
        (match) => match.score && match.score > 0.7
    );

    type MetaData = {
        text: string;
        pagenumber: number;
    };
    //console.log(qualifyingDocs);
    if (!qualifyingDocs) console.log("found qualifying documents");
    else console.log("no matching qualifying documents");

    let docs = qualifyingDocs?.map(
        (match) => (match.metadata as MetaData).text
    );
    return docs?.join("\n").substring(0, 1000);
}
