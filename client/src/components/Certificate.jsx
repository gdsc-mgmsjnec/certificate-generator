import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import "./Certificate.css"


function Certificate(props){
    const pdfRef = useRef();

    async function downloadPdf(){
        const input = pdfRef.current;
        await html2canvas(input).then((canvas)=>{
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

        alert("Certificate Downloaded, Thank You! 😊")

        props.goBack();
    }


    return(<>
        <div className="download-btn">
            <button onClick={downloadPdf}>Download</button>
        </div>
        <div ref={pdfRef}>
            <img style={{width: "100%"}} src="/PawanKumar.png" alt="" />
            <h1 style={props.certName.length>20 ? { fontSize: "150px" } : {fontSize: "190px"}} className="name">{props.certName}</h1>
        </div>
        </>
    )
    
}

export default Certificate;