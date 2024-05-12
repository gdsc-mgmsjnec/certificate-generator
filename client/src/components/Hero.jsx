import React, { useState } from "react";
import "./Hero.css"
import axios from 'axios';

const API_key = "Pj_$jammy_techTeam_GDSC2024";


function Hero(props){
    const [inutEmail, getEmail] = useState("")

    function handleChange(event){
        getEmail(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault();

        const result = await axios.get("http://localhost:3000/",{
            params:{
                "email":inutEmail
            },
            headers:{
                "x-access-token": API_key
            }
        });
        let name=result.data.name;
        props.getname(name);
        props.download()
    }

    return <main>
        <div>
            <h1>Google Developers Student Club</h1>
            <h2>MGM's Jawaharlal Nehru Engineering College, Aurangabad</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="email" name="email" id="email" value={inutEmail} placeholder="Enter your Email..." />
            <button type='submit'>Submit</button>
        </form>
    </main>
}

export default Hero;