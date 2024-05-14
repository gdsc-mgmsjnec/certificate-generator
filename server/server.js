import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv"

const app = express();
const port = 3000;
env.config();
app.use(express.urlencoded({extended: true}));
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
            const result = await db.query("SELECT name FROM enrollements WHERE email = $1", [data.toLowerCase()]);
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
});

app.post("/add", async (req, res) => {
    const auth = req.headers['x-access-token'];
    if(auth === apiKey){
        const email = req.body.email;
        const name = req.body.name;
        try{
            const result = await db.query("SELECT email FROM enrollements WHERE email = $1", [email]);
            if(result.rows.length > 0){
                res.json({
                    "Error":"Email already exists"
                });
            }else{
                const data = await db.query("INSERT INTO enrollements (name, email) VALUES ($1, $2) RETURNING *", [name, email]);
                res.json({
                    "Success":"Enrollement Successful",
                    "Data":data.rows[0],
                });
            }
        }catch(err){
            res.json({"Error":"Something went wrong"});
        }
    }else{
        res.json({"Error":"Unauthorized, Access Dined"});
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log("Error: "+err);
    }else{
        console.log(`Server is running on http://localhost:${port}`);
    }
})