import React from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Project from "./components/Project";
import Footer from "./components/footer";
import MoreAboutMe from "./components/MoreAboutMe";





function App() {


  return (
    <div className="bg-white text-gray-900 min-h-screen font-sans scroll-smooth">
      <Navbar />
      <Home />
      <About />
      <MoreAboutMe />
      <Project />
      <Contact />
      <Footer />
      
    </div>
  )
}

export default App;
