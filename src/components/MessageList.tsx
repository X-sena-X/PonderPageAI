import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Feather } from "lucide-react";
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
        <div className="flex flex-col">
            {messages.map((message) => {
                if (message.role === "user")
                    return (
                        <div key={message.id} className={cn("chat chat-end")}>
                            <div className="chat-image avatar">
                                <div className="w-8 rounded-full bg-black text-white items-center justify-center flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-user-round w-6 h-6"
                                    >
                                        <circle cx="12" cy="8" r="5" />
                                        <path d="M20 21a8 8 0 0 0-16 0" />
                                    </svg>
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "chat-bubble chat-bubble-accent text-sm"
                                )}
                            >
                                {message.content}
                            </div>
                        </div>
                    );
                else {
                    return (
                        <div key={message.id} className={cn("chat chat-start")}>
                            <div className="chat-image avatar">
                                <div className=" w-8 rounded-full bg-black text-white ">
                                    <Feather className="w-8 h-8" />
                                </div>
                            </div>
                            <div
                                className={cn(
                                    "chat-bubble  chat-bubble-primary text-sm"
                                )}
                            >
                                {message.content}
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default MessageList;
/**
 * <div
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
 */
