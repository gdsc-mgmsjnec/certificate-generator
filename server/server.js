import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv"

const app = express();
const port = 3000;
const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});
db.connect();
app.use(cors())
env.config();

const apiKey = process.env.API_KEY;


app.get("/", async (req, res) =>{
    const auth = req.headers['x-access-token'];
    if(auth === apiKey){
        const data = req.query.email;
        console.log(data)
        try{
            const result = await db.query("SELECT name FROM enrollements WHERE email = $1", [data]);
            if(result.rows.length > 0){
                const dbData = result.rows[0];
                res.json(dbData);
            }else{
                res.json(null);
            }
        }catch(err){
            res.json({"Error" : err})
        }
    }else{
        res.status(401).json({"Error":"Unauthorised, Access not Allowed"})
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
    }
})