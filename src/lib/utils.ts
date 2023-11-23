import { auth } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import { userSubscriptions } from "./db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
    return inputString.replace(/[^\x00-\x7F]+/g, "");
}

export function constructMetadata({
    title = "",
    description = "",
    applicationName = "",
    keywords = ["Next.js", "React", "JavaScript"],
    authors = { name: "senaAbhishek", url: "www.senaabhishek.com" },

    image = "/thumbnail.png",
    icons = "/favicon.ico",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    applicationName?: string;
    keywords?: Array<string>;
    authors?: Author;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        applicationName,
        keywords,
        authors,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@sena_abhishek",
        },
        icons,
        metadataBase: new URL(""),
        themeColor: "#FFF",
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
