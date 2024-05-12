import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "./Certificate.css"


function Certificate(){
    const pdfRef = useRef();

    function downloadPdf(){
        const input = pdfRef.current;
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPdf('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth/imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth*ratio) / 2;
            const imgY = 0;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('certificate.pdf');
        });
    }

    return(
        <div ref={pdfRef}>
        <img style={{width: "100%"}} onClick={downloadPdf} src="/PawanKumar.png" alt="" />
        <h1 className="name">Parth Jamkhedkar</h1>
        </div>
    )
    
}

export default Certificate;