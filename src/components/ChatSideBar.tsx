"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Home, Settings, Sparkles } from "lucide-react";

type Props = {
    chats: DrizzleChat[];
    chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
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
                                "rounded-md text-slate-300 h-10  items-center py-2 pl-2 flex",
                                {
                                    "bg-violet-600 text-white":
                                        chat.id === chatId,
                                    "hover:text-white  ": chat.id !== chatId,
                                }
                            )}
                        >
                            <p className="text-sm overflow-hidden truncate whitespace-nowrap text-ellipsis">
                                {chat.pdfname}
                            </p>
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
