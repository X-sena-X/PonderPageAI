import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Metadata } from "next";
import { Author } from "next/dist/lib/metadata/types/metadata-types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function convertToAscii(inputString: string) {
    return inputString.replace(/[^\x00-\x7F]+/g, "");
}

export function constructMetadata({
    title = "PonderPageAI",
    description = "Transforming document into an elixir of understanding.",
    applicationName = "PonderPageAI",
    keywords = [
        "AI Reading Comprehension",
        "Document Understanding",
        "PDF Question Answering",
        "Smart Document Analysis",
        "Text Interpretation AI",
        "Educational AI Tool",
        "Content Understanding",
        "Book Summarization AI",
        "Student Assistance AI",
        "PDF Study Aid",
    ],
    authors = [{ name: "senaAbhishek", url: "https://www.senaabhishek.com" }],
    image = "/thumbnail.png",
    icons = ["/favicon.ico"],
    noIndex = false,
}: {
    title?: string;
    description?: string;
    applicationName?: string;
    keywords?: Array<string>;
    authors?: Array<Author>;
    image?: string;
    icons?: Array<string>;
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
            creator: "@sena_Abhishek",
        },
        icons,
        metadataBase: new URL("https://ponder-page-ai.vercel.app/"),
        themeColor: "#FFF",
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
