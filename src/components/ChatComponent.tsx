"use client";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = {
    chatId: number;
};

const ChatComponent = ({ chatId }: Props) => {
    const { data, isLoading } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: async () => {
            const response = await axios.post<Message[]>("/api/get-messages", {
                chatId,
            });
            return response.data;
        },
    });
    const { input, handleInputChange, handleSubmit, messages } = useChat({
        api: "/api/chats",
        body: {
            chatId,
        },
        initialMessages: data || [],
    });

    useEffect(() => {
        const messageContainer = document.getElementById("messageContainer");
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);
    return (
        <div
            className="relative flex flex-col h-screen "
            id="messageContainer "
        >
            <div className="sticky top-0 inset-x-0 p-3 h-fit shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
                <h3 className="text-2xl font-semibold ">Chat</h3>
            </div>
            <div className="w-full px-4 mt-10">
                <MessageList messages={messages} isLoading={isLoading} />
            </div>
            <div className="flex absolute bottom-4 w-full px-4">
                <form onSubmit={handleSubmit} className="w-full flex flex-row">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        className="w-11/12 bg-white"
                        placeholder="Ask me anything..."
                    />
                    {isLoading ? (
                        <Button
                            className="bg-black text-white ml-2 "
                            variant="outline"
                            disabled
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            className="bg-black text-white ml-2 "
                            variant="outline"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;
