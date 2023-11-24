import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await auth();

    if (!userId)
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    try {
        const body = await req.json();
        const { id, user_id, file_key, pinecone_id } = body;

        if (!user_id)
            return NextResponse.json(
                { error: "Missing user details" },
                { status: 401 }
            );
        const chat_id = await db
            .delete(chats)
            .where(eq(chats.id, id))
            .returning({
                deletedId: chats.id,
            });
        return NextResponse.json("Deleted chat", { status: 200 });
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
