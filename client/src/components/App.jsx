import React, { useState } from "react";
import HeaderLogo from "./HeaderLogo";
import Footer from "./Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import Hero from "./Hero";
import Certificate from "./Certificate"

function App(){
  const [displayForm, setDisplayFrom] = useState(true);

  function handleDisplay(){
    setDisplayFrom(!displayForm);
  }

  const [name, getName]=useState("");

  return displayForm ? <>
    <HeaderLogo />
    <Hero download={handleDisplay} getname={getName} />
    <Footer />
  </> : <Certificate certName={name} goBack={handleDisplay} />
}

export default App;