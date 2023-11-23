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
            <div className="fixed top-0 hidden lg:flex justify-between items-center py-2 w-full bg-opacity-50 bg-slate-50 dark:bg-slate-800 z-30  px-10">
                <p className="text-lg font-semibold text-violet-600">
                    PonderPageAI
                </p>
                <div className="flex flex-row gap-x-8 items-center">
                    <Link href="/pricing">
                        <p className=" text-base hover:text-violet-600">
                            Pricing
                        </p>
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
            </div>

            <div className="w-screen h-fit px-8 py-10 flex lg:flex-row flex-col lg:gap-x-8 gap-y-14">
                <div className="flex items-center ">
                    <div className="flex flex-col gap-y-2 lg:gap-y-4">
                        <div className="flex flex-col gap-4 ">
                            <Badge className="w-fit flex gap-x-1 lg:gap-x-2 text-xs bg-black text-white border-2 border-gray-400 lg:py-2 px-1 lg:px-4 hover:bg-black shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                                Join Early access
                                <ArrowRightToLine className="w-4 h-4 hidden lg:visible" />
                            </Badge>
                            <p className="mr-3 text-3xl lg:text-5xl font-semibold">
                                Chat with PDF
                            </p>
                        </div>

                        <p className="max-w-xl mt-1 text-sm lg:text-lg text-slate-600">
                            Join millions of students, researchers and
                            professionals to instantly answer questions and
                            understand research with AI
                        </p>

                        <div className="w-full mt-4">
                            {isAuth ? (
                                <div className="flex flex-col gap-y-2 lg:gap-y-4">
                                    <div className="flex flex-row gap-x-2 lg:gap-x-4 ">
                                        <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                                            {" "}
                                            View Demo
                                        </Button>
                                        <Link href={`/chat/${firstChat?.id}`}>
                                            <Button className=" hover:bg-gray-700 dark:hover:bg-sky-600 hover:text-white  rounded-2xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
                                                Go to Chats
                                                <ChevronsRight className="lg:ml-2 w-4 h-4" />
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
                <div className="flex lg:items-center lg:w-1/2 w-full  lg:h-screen h-fit lg:px-12 py-2 mt-10 lg:mt-0">
                    <div className="w-[620px] lg:w-[90%] lg:h-[300px] h-[24%] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
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
            <div className="w-screen h-fit items-center flex flex-col  justify-center py-20 gap-y-10">
                <Badge className="w-fit flex gap-x-2 dark:bg-black  bg-gray-50 hover:bg-gray-50 hover:dark:bg-black text-slate-800 dark:text-white border-2 border-gray-400 py-2 px-4  text-xs lg:text-base shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                    PonderPageAI's Magic
                </Badge>
                <div className="w-2/3 lg:w-3/4 h-auto">
                    <Features />
                </div>
            </div>
            <div className="w-screen h-fit flex justify-center">
                <Badge className="w-fit flex gap-x-2 dark:bg-black  bg-gray-50 hover:bg-gray-50 hover:dark:bg-black text-slate-800 dark:text-white border-2 border-gray-400 py-2 px-4  text-xs lg:text-base shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                    PonderPageAI Versatility
                </Badge>
            </div>
            <div className="w-screen h-fit flex flex-col items-center lg:mt-20 gap-y-10 mb-20 py-10">
                <Badge className="w-fit flex gap-x-2 dark:bg-black  bg-gray-50 hover:bg-gray-50 hover:dark:bg-black text-slate-800 dark:text-white border-2 border-gray-400 py-2 px-4  text-xs lg:text-base dark:shadow-[inset_-12px_-8px_40px_#46464620] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
                    PonderPageAI is built with these tools..
                </Badge>

                <div className="flex flex-row w-[80%] justify-evenly items-center  ">
                    <div className="w-[18%] lg:w-44 h-32 rounded-3xl ">
                        <Link href="https://nextjs.org">
                            <img
                                src="/nextjs_logo.jpg"
                                className="h-full w-full object-contain dark:invert"
                            />
                        </Link>
                    </div>
                    <div className="w-[18%] lg:w-44 h-[10%] lg:h-12 rounded-3xl">
                        <Link href="https://vercel.com">
                            <img
                                src="/vercel_logo.jpg"
                                className="h-full w-full  object-fit dark:invert"
                            />
                        </Link>
                    </div>
                    <div className="w-[18%] lg:w-24 h-[5%] lg:h-12 rounded-3xl">
                        <Link href="https://clerk.com">
                            <img
                                src="/clerk_img.jpg"
                                className="h-full w-full  object-fit "
                            />
                        </Link>
                    </div>
                    <div className="w-[18%] lg:w-32 h-[10%] lg:h-16 rounded-3xl">
                        <Link href="https://www.stripe.com">
                            <img
                                src="/stripe_logo.png"
                                className="h-full w-full object-fit dark:invert"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
