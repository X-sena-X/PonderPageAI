import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {
    messages: Message[];
    isLoading: boolean;
};

const MessageList = ({ messages, isLoading }: Props) => {
    if (isLoading)
        return (
            <div className=" flex flex-col h-sfull w-full gap-3 px-4 ">
                <div className="flex justify-end pl-10">
                    <Skeleton className="w-44 h-8 rounded-md" />
                </div>
                <div className="flex justify-start pr-10 ">
                    <Skeleton className="w-44 h-8 rounded-md  " />
                </div>
                <div className="flex justify-end pl-10 ">
                    <Skeleton className="w-44 h-8 rounded-md  " />
                </div>
                <div className="flex justify-start pr-10 ">
                    <Skeleton className="w-44 h-8 rounded-md  " />
                </div>
            </div>
        );
    if (!messages) return <></>;
    return (
        <div className="flex flex-col gap-3 px-4">
            {messages.map((message) => {
                return (
                    <div
                        key={message.id}
                        className={cn("flex", {
                            "justify-end pl-10": message.role === "user",
                            "justify-start pr-10": message.role === "assistant",
                        })}
                    >
                        <div
                            className={cn(
                                "rounded-lg px-3 test-xs py-1 shadow-md ring-1 ring-gray-900/10 mb-2",
                                {
                                    "bg-blue-600 text-white":
                                        message.role === "user",
                                    "bg-slate-100 ":
                                        message.role === "assistant",
                                }
                            )}
                        >
                            <p>{message.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageList;
