import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const middleware = async () => {
    const userId = await auth();
    if (!userId) throw new Error("Not Authorized");
    if (!process.env.OPENAI_API_KEY)
        throw new Error("OpenAI API Key is required");
    return { userId: 1 };
};

export const uploadThingsFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
        .middleware(middleware)

        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url, fileKey: file.key };
        }),
} satisfies FileRouter;

export type uploadThingsFileRouter = typeof uploadThingsFileRouter;
