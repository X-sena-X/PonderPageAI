"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Home, Settings, Sparkles, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

import { useRouter } from "next/router";

type Props = {
    chats: DrizzleChat[];
    chatId: number;
};

type ChatType = {
    id: number;
    user_id: string;
    file_key: string;
    pinecone_id: string;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
    const handleClickDelete = async ({
        id,
        user_id,
        file_key,
        pinecone_id,
    }: {
        id: number;
        user_id: string;
        file_key: string;
        pinecone_id: string;
    }) => {
        console.log("here");
        try {
            const uploadthing_response = await axios.delete(
                "/api/uploadthing",
                {
                    data: {
                        fileKey: file_key,
                    },
                }
            );
            const neon_response = await axios.post("/api/delete-chat", {
                id,
                user_id,
                file_key,
                pinecone_id,
            });
            console.log("success: Deleted the chat");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full h-screen py-4 px-2 text-grey-200 bg-gray-900">
            <Link href="/">
                <Button className=" w-full border-dashed border-white border">
                    <PlusIcon className="mr-2 w-4 h-4" />
                    New chat
                </Button>
            </Link>
            <div className="flex flex-col mt-5 gap-y-1">
                {chats.map((chat) => (
                    <Link key={chat.id} href={`/chat/${chat.id}`}>
                        <div
                            className={cn(
                                "rounded-md text-slate-300 h-10  items-center py-2 px-2  flex justify-between",
                                {
                                    "bg-violet-600 text-white cursor-default":
                                        chat.id === chatId,
                                    "hover:text-white ": chat.id !== chatId,
                                }
                            )}
                        >
                            <p className="text-sm overflow-hidden truncate whitespace-nowrap text-ellipsis">
                                {chat.pdfname}
                            </p>

                            {chat.id === chatId && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <button className="flex hover:">
                                            <Trash2
                                                className={cn(
                                                    "w-5 h-5 hover:text-black"
                                                )}
                                            />
                                        </button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Are you absolutely sure?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete all
                                                your mesaages and pdf in current
                                                chat.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() =>
                                                    handleClickDelete({
                                                        id: chat.id,
                                                        user_id: chat.userId,
                                                        file_key: chat.fileKey,
                                                        pinecone_id:
                                                            chat.pinconeId,
                                                    })
                                                }
                                            >
                                                Continue
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="absolute w-48 bottom-16 h-10 items-center flex rounded-lg gap-x-4 hover:bg-gray-700 px-2">
                <span className="w-6 h-6 rounded-full bg-slate-700 items-center flex flex-row justify-center">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                </span>
                <div className="flex flex-col">
                    <p className="text-sm text-white">Upgrade</p>
                    <p className=" text-xs text-slate-300">Get more tokens</p>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
                <div className="flex flex-row w-full gap-x-5 justify-evenly flex-wrap">
                    <Link href="/">
                        <Home />
                    </Link>
                    <Link href="/">
                        <Settings />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChatSideBar;
