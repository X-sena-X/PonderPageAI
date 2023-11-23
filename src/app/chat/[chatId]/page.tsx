import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PdfViewer from "@/components/PdfViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    params: {
        chatId: string;
    };
};

export default async function ({ params: { chatId } }: Props) {
    const { userId } = await auth();
    if (!userId) return redirect("/sign-in");

    const _chats = await db
        .select()
        .from(chats)
        .where(eq(chats.userId, userId));
    if (!_chats) return redirect("/");

    if (!_chats.find((chat) => chat.id === parseInt(chatId)))
        return redirect("/");

    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
    return (
        <div className="flex max-h-screen bg-white text-black">
            <div className="flex w-full max-h-screen ">
                {/** chat sidebar */}
                <div className=" w-52">
                    <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
                </div>
                <div className="max-h-screen px-1 overflow-scroll flex-[4]">
                    <PdfViewer pdfUrl={currentChat?.pdf_url || ""} />
                </div>
                {/** pdf viewer */}

                <div className="flex-[3] border-l-4 border-l-slate-200">
                    <ChatComponent chatId={parseInt(chatId)} />
                </div>
                {/** chat component */}
            </div>
        </div>
    );
}
