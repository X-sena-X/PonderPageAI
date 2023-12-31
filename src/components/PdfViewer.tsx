"use client";
import React, { useState } from "react";
type Props = { pdfUrl: string };

const PdfViewer = ({ pdfUrl }: Props) => {
    return (
        <>
            <iframe
                src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
                className="w-full h-full bg-white"
            />
        </>
    );
};

export default PdfViewer;
/**
 *
 */
