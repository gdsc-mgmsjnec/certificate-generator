import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv"

const app = express();
const port = 3000;
env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();
app.use(cors())


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
                res.json(null)
            }
        }catch(err){
            res.json(null);
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