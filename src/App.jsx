import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";

// This component handles scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Home />
            <AboutMe />
            <Projects />
            <BlogSection />
            <ContactSection />
          </motion.main>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
