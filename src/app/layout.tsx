// import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { uploadThingsFileRouter } from "../app/api/uploadthing/core";
import QueryProviders from "../components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/themeProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChatPdf",
    description: "ask questions to your pdf",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <QueryProviders>
                <html lang="en">
                    <body className={inter.className}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <NextSSRPlugin
                                routerConfig={extractRouterConfig(
                                    uploadThingsFileRouter
                                )}
                            />
                            {children}
                            <Toaster />
                        </ThemeProvider>
                    </body>
                </html>
            </QueryProviders>
        </ClerkProvider>
    );
}
