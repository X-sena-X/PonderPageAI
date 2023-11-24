"use client";
import axios from "axios";
import React from "react";
import { UploadDropzone } from "../components/uploadThing";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const FileUpload = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();
    const { mutate } = useMutation({
        mutationFn: async ({
            file_url,
            file_name,
            file_key,
        }: {
            file_url: string;
            file_name: string;
            file_key: string;
        }) => {
            const response = await axios.post("/api/create-chat", {
                file_url,
                file_name,
                file_key,
            });

            return response.data;
        },
    });

    return (
        <div
            className={cn(
                "w-[74%] lg:w-[100%] rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            )}
        >
            <UploadDropzone
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                    const file_name = res[0].name;
                    const file_url = res[0].serverData.fileUrl;
                    const file_key = res[0].serverData.fileKey;
                    if (!file_name || !file_url)
                        return toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description:
                                "There was a problem with uploading the file.",
                            action: (
                                <ToastAction altText="Try again">
                                    Try again
                                </ToastAction>
                            ),
                        });

                    toast({
                        title: "File uploaded",
                        description:
                            "File uploaded successfully redirecting...",
                    });

                    console.log({
                        fileName: file_name,
                        fileUrl: file_url,
                        file_key: file_key,
                    });
                    mutate(
                        { file_url, file_name, file_key },
                        {
                            onSuccess: ({ chat_id }) => {
                                setIsLoading(false);
                                toast({
                                    title: "sucess",
                                    description: "Now you can ask questions.",
                                    action: (
                                        <ToastAction
                                            altText="Goto back"
                                            onClick={() => router.push("/")}
                                        >
                                            Go back
                                        </ToastAction>
                                    ),
                                });
                                router.push(`/chat/${chat_id}`);
                            },
                            onError: (error) => {
                                setIsLoading(false);
                                return toast({
                                    variant: "destructive",
                                    title: "Uh oh! Something went wrong.",
                                    description:
                                        "There was a problem with uploading the file.",
                                    action: (
                                        <ToastAction altText="Try again">
                                            Try again
                                        </ToastAction>
                                    ),
                                });
                            },
                        }
                    );
                }}
                onUploadError={(error: Error) => {
                    console.log(error);
                    if (error.message === "Failed to run middleware.") {
                        return toast({
                            variant: "destructive",
                            title: "Contact the Administrator",
                            description: "Missing OpenAI API Key",
                            action: (
                                <ToastAction altText="Try again">
                                    Try again
                                </ToastAction>
                            ),
                        });
                    }

                    return toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message,
                        action: (
                            <ToastAction altText="Try again">
                                Try again
                            </ToastAction>
                        ),
                    });
                }}
                onUploadBegin={() => {
                    setIsLoading(true);
                    toast({
                        title: "sucess",
                        description: "Your Pdf is getting uploaded.",
                    });
                }}
                appearance={{
                    container:
                        " border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
                    button: "ut-uploading:bg-black",
                }}
                className={cn(
                    {
                        "cursor-progress": isLoading,
                    } +
                        "ut-uploading:cursor-not-allowed ut-uploading:ut-button:disabled ut-uploading:disabled ut-button:w-[100%]  ut-label:text-base ut-label:lg:text-lg ut-label:text-black ut-upload-icon:text-blue-500  ut-allowed-content:text-black ut-allowed-content:text-sm ut-allowed-content:lg:text-base"
                )}
            />
        </div>
    );
};

export default FileUpload;

// https://utfs.io/f/43fa2887-7d3e-4685-9b44-1bf659769908-f5jjac.pdf
