import React from "react";
import HeaderLogo from "./HeaderLogo";
import Footer from "./Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import Hero from "./Hero";
import Certificate from "./Certificate";


function App(){
  const display = false

  return <div>
    { display ? <><HeaderLogo />
    <Hero />
    <Footer />
   <Certificate.jsx /></> : <Certificate /> }

   </div>
}

export default App;