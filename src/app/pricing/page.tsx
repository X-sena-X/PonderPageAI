"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

type TypeQuotes = Array<Array<string>>;

const qoutes: TypeQuotes = [
    [
        "maximum pdf size 8Mb",
        "GPT3.5 Turbo",
        "5 query per chat",
        "free 10 chats creation",
    ],

    [
        "benefits included in started pack",
        "maximum pdf size of 24Mb",
        "GPT4 Turbo",
        "unlimiited queries per chat",
        "unlimited chat creation",
    ],
];

type Props = {};

const page = (props: Props) => {
    const router = useRouter();
    const handlePayment = async () => {
        try {
            const response = await axios.get("/api/stripe");
            const url: string = response.data.url;
            console.log(url);
            router.push(url);
        } catch (error) {
            console.log("error loading stripecheckout", error);
        }
    };

    return (
        <div className="w-screen h-screen items-center flex flex-col justify-center gap-y-20 bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
            <div className="flex flex-col w-[35%] items-center gap-y-4">
                <p className="flex text-4xl font-medium text-white">Pricing</p>
                <p className="flex text-gray-400">
                    whether you're just getting started with chatpdf or scaling
                    across multiple large documents to get answers . we've got
                    you covered.
                </p>
            </div>
            <div className="flex w-[55%] h-[50%] gap-x-3">
                <Card className="w-1/2 rounded-2xl shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
                    <CardHeader>
                        <CardTitle>Starter</CardTitle>
                        <CardDescription>
                            Built for individuals looking to try out
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4 mt-2">
                        <span className="flex flex-row items-end">
                            <p className="text-3xl font-semibold">$0</p>
                            <p className="">/month</p>
                        </span>
                        <Button disabled>Current Plan</Button>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-items-start gap-y-1">
                        {qoutes[0].map((qoute, i) => (
                            <span key={i} className="flex items-center gap-x-2">
                                <Check className="w-4 h-4" />
                                {qoute}
                            </span>
                        ))}
                    </CardFooter>
                </Card>
                <Card className="w-1/2 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
                    <CardHeader>
                        <CardTitle>Pro</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4 mt-2">
                        <span className="flex flex-row items-end">
                            <p className="text-3xl font-semibold">$99</p>
                            <p className="">/month</p>
                        </span>

                        <Button className="w-full" onClick={handlePayment}>
                            Subscribe
                        </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-start justify-items-start gap-y-1">
                        {qoutes[1].map((qoute, i) => (
                            <span key={i} className="flex items-center gap-x-2">
                                <Check className="w-4 h-4" />
                                {qoute}
                            </span>
                        ))}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default page;
