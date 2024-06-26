import React, { useState } from "react";
import "./Hero.css"
import axios from 'axios';

const API_key = "Pj_$jammy_techTeam_GDSC2024";


function Hero(props){
    const [inutEmail, getEmail] = useState("");
    const [disp, setloader]=useState({
        loader: "none",
        button: "block"
    });

    function handleChange(event){
        getEmail(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault();
        setloader({
            loader: "block",
            button: "none"
        });
        try{
            const result = await axios.get("https://gdsc-cert.onrender.com/",{
                params:{
                    "email":inutEmail
                },
                headers:{
                    "x-access-token": import.meta.env.VITE_API_KEY
                }
            });
            console.log(result.data);
            if(result.data){
                let name=result.data.name;
                setloader({
                    loader: "none",
                    button: "block"
                });
                props.getname(name);
                props.download();
            }else{
                alert("Please Enter Registered Email Address Only");
            }
        }catch(err){
            alert("Error: Unauthorized Access")
        }finally{
            setloader({
                loader: "none",
                button: "block"
            });
        }
    }

    return <main>
        <div>
            <h1>Google Developers Student Club</h1>
            <h2>MGM's Jawaharlal Nehru Engineering College, Aurangabad</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="email" name="email" id="email" value={inutEmail} placeholder="Enter your Email..." />
            <button type='submit' style={{display: (disp.button)}}>Submit</button>
            <div className="loader" style={{display:disp.loader}}></div>
        </form>
    </main>
}

export default Hero;