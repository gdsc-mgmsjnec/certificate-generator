import React, { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import Footer from "./Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import Hero from "./Hero";
import Certificate from "./Certificate"

function App(){
  const [displayForm, setDisplayFrom] = useState(false);

  function handleDisplay(){
    setDisplayFrom(!displayForm);
  }

  return displayForm ? <>
    <HeaderLogo />
    <Hero />
    <Footer />
  </> : <Certificate />
}

export default App;