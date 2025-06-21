import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the workerSrc to a working CDN version
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {
  return (
    <>
 {/*   <Document file={fileUrl} onLoadError={console.error}>
      <Page pageNumber={1} />
    </Document> */}
   <iframe
  src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
  style={{ width: '100%', height: '600px' }}
  frameBorder="0"
></iframe>
    </>
  );
};

export default PDFViewer;
