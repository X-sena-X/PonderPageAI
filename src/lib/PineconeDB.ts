import { Pinecone } from "@pinecone-database/pinecone";

export const getPinconeClient = () => {
    return new Pinecone({
        environment: process.env.PINECONE_DB_ENVIRONMENT!,
        apiKey: process.env.PINECONE_DB_API_KEY!,
    });
};
