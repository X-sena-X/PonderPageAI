import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

//const auth = (req: Request) => ({ id: process.env.UPLOADTHING_APP_ID }); // Fake auth function

export const uploadThingsFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      req;
      return { userId: 1 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      //console.log("Upload complete for userId:", metadata.userId);

      //console.log("file url", file.url);

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type uploadThingsFileRouter = typeof uploadThingsFileRouter;
