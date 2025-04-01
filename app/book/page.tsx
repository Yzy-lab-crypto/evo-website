"use client";

import { Document, Page as PDFPage } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
export default function Page() {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center p-4 w-full">
      <div className="w-[80%]  flex justify-center">
        <Document file="/pdf/testpdf.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <PDFPage
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={1000}
              className="mb-4"
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
