import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import ThemeToggler from "@/components/ThemeToggler";
import { User } from "lucide-react";
import { Features } from "@/components/Features";
import { Badge } from "@/components/ui/badge";
import { ArrowRightToLine } from "lucide-react";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { ChevronsRight } from "lucide-react";

export default async function Home() {
    const { userId } = await auth();
    const isAuth = !!userId;

    let firstChat;
    if (userId) {
        firstChat = await db
            .select()
            .from(chats)
            .where(eq(chats.userId, userId));
    }
    if (firstChat) firstChat = firstChat[0];
    return (
        <main className="flex flex-col min-h-screen dark:bg-black bg-white dark:text-white overflow-hidden">
            <div className="fixed top-0 flex justify-end gap-x-8 items-center py-1 w-full bg-opacity-80 bg-slate-50 dark:bg-gray-900 z-30  px-10">
                <Link href="/pricing">
                    <p className=" text-base hover:text-violet-600">Pricing</p>
                </Link>
                <ThemeToggler />
                {isAuth ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <Link href="/sign-in">
                        <div className="border-gray-500 border-2 w-8 h-8 rounded-full items-center justify-center flex">
                            <User className="text-gray-400" />
                        </div>
                    </Link>
                )}
            </div>

            <div className="w-screen h-fit px-8 flex lg:flex-row flex-col gap-x-8">
                <div className="flex items-center ">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-4">
                            <Badge className="w-fit flex gap-x-2 bg-black text-white border-2 border-gray-400 py-2 px-4 hover:bg-black shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                                Join - Early access
                                <ArrowRightToLine className="w-4 h-4 " />
                            </Badge>
                            <h1 className="mr-3 text-5xl font-semibold">
                                Chat with PDF
                            </h1>
                        </div>

                        <p className="max-w-xl mt-1 text-lg text-slate-600">
                            Join millions of students, researchers and
                            professionals to instantly answer questions and
                            understand research with AI
                        </p>

                        <div className="w-full mt-4">
                            {isAuth ? (
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-row gap-x-4">
                                        <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                                            {" "}
                                            View Demo
                                        </Button>
                                        <Link href={`/chat/${firstChat?.id}`}>
                                            <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                                                Go to Chats
                                                <ChevronsRight className="ml-2 w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                    <FileUpload />
                                </div>
                            ) : (
                                <div className="flex flex-row gap-x-2">
                                    <Link href="/sign-in">
                                        <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl">
                                            Login to get Started{" "}
                                            <LogIn className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                    <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl">
                                        {" "}
                                        View Demo
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center lg:w-1/2 w-full h-screen px-12 py-2">
                    <div className="w-[620px] h-[350px] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
                        <Image
                            src="/chatpdfDemo.png"
                            alt="demo_image"
                            height={500}
                            width={620}
                            priority={true}
                        />
                    </div>
                </div>
            </div>
            <div className="w-screen h-fit items-center flex justify-center py-20">
                <div className=" w-1/2 h-auto">
                    <Features />
                </div>
            </div>
            <div className="w-screen h-fit flex flex-col items-center lg:mt-20 gap-y-10 mb-20">
                <Badge className="w-fit flex gap-x-2 dark:bg-black bg-gray-50 hover:bg-gray-50 hover:dark:bg-black text-slate-800 dark:text-white border-2 border-gray-400 py-2 px-4 text-base dark:shadow-[inset_-12px_-8px_40px_#46464620] shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                    ChatPdf is built with these tools..
                </Badge>

                <div className="flex flex-row w-[80%] justify-evenly items-center  ">
                    <div className="w-44 h-32 rounded-3xl ">
                        <img
                            src="/nextjs_logo.jpg"
                            className="h-full w-full object-contain dark:invert"
                        />
                    </div>
                    <div className="w-44 h-12 rounded-3xl">
                        <img
                            src="/vercel_logo.jpg"
                            className="h-full w-full  object-fit dark:invert"
                        />
                    </div>
                    <div className="w-24 h-12 rounded-3xl">
                        <img
                            src="/clerk_img.jpg"
                            className="h-full w-full  object-fit "
                        />
                    </div>
                    <div className="w-32 h-16 rounded-3xl">
                        <img
                            src="/stripe_logo.png"
                            className="h-full w-full object-fit dark:invert"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
