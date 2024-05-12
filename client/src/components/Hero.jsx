import React from "react";
import "./Hero.css"

function Hero(){
    return <main>
        <div>
            <h1>Google Developers Student Club</h1>
            <h2>MGM's Jawaharlal Nehru Engineering College, Aurangabad</h2>
        </div>
        <form>
            <input type="email" name="email" id="email" placeholder="Enter your Email..." />
            <button>Submit</button>
        </form>
    </main>
}

export default Hero;