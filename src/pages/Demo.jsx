import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('');
const username="Renuka"
const id=
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://13.233.160.187:8000/api/SpecificDocumentDisplay/${username}/${id}`, {
          responseType: 'blob',
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [pdfId]);

  return (
    <div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          width="100%"
          height="500px"
        />
      )}
    </div>
  );
};

export default PdfViewer;