import { createNextRouteHandler } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { uploadThingsFileRouter } from "./core";
import { NextResponse } from "next/server";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
    router: uploadThingsFileRouter,
    config: {
        uploadthingId: process.env.UPLOADTHING_APP_ID,
        uploadthingSecret: process.env.UPLOADTHING_SECRET,
    },
});

export async function DELETE(req: Request) {
    const { fileKey } = await req.json();
    console.log(fileKey);
    const utapi = new UTApi({
        apiKey: process.env.UPLOADTHING_SECRET,
    });
    try {
        await utapi.deleteFiles(fileKey);
        return NextResponse.json({ message: "ok" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, { status: 401 });
    }
}
