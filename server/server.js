import express from "express";
import cors from "cors";
import htmlToPDF from "html-to-pdf";

const app = express();
const port = 3000;

app.use(cors())


app.get("/", async(req, res) =>{
    const data = req.query.email;
    console.log(data)
    res.json({"email": data});
    
})

app.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
    }
})