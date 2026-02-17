// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import AIChatbot from './components/AIChatbot';

// Lazy load components for better performance
const Navbar = React.lazy(() => import('./components/Navbar'));
const Home = React.lazy(() => import('./components/Home'));
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const HomeProjects = React.lazy(() => import('./components/HomeProjects'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const ProjectsPage = React.lazy(() => import('./pages/Projects'));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            className="min-h-[calc(100vh-4rem)]"
          >
            <Routes>
              <Route path="/" element={
                <Suspense fallback={<LoadingFallback />}>
                  <Home />
                  <AboutMe />
                  <HomeProjects />
                  <BlogSection />
                  <ContactSection />
                </Suspense>
              } />
              <Route path="/blog/:slug" element={
                <Suspense fallback={<LoadingFallback />}>
                  <BlogPost />
                </Suspense>
              } />
              <Route path="/projects/:slug" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ProjectDetail />
                </Suspense>
              } />
              <Route path="/projects" element={
                <Suspense fallback={<LoadingFallback />}>
                  <ProjectsPage />
                </Suspense>
              } />
            </Routes>
          </motion.main>
        </AnimatePresence>
      </Suspense>
      <AIChatbot />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Router>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;