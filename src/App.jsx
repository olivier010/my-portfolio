// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import BlogSection from "./components/BlogSection";
import BlogPost from "./pages/BlogPost";
import ContactSection from "./components/ContactSection";

// This component handles scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
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
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <ScrollToTop />
      <Navbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <AboutMe />
                <Projects />
                <BlogSection />
                <ContactSection />
              </>
            } />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;