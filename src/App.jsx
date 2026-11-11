// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ServicesSection from './components/ServicesSection';
import ScrollReveal from './components/ScrollReveal';
import { setPageSEO } from './utils/seo';

// Lazy load below-the-fold components and secondary pages for peak mobile performance
const AboutMe = React.lazy(() => import('./components/AboutMe'));
const HomeProjects = React.lazy(() => import('./components/HomeProjects'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Blog = React.lazy(() => import('./pages/Blog'));
const ContactSection = React.lazy(() => import('./components/ContactSection'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const ProjectsPage = React.lazy(() => import('./pages/Projects'));
const Footer = React.lazy(() => import('./components/footer'));

// Lazy load non-critical floating accessories
const AIChatbot = React.lazy(() => import('./components/AIChatbot'));
const ScrollControls = React.lazy(() => import('./components/ScrollControls'));

// Lightweight non-blocking fallback for below-the-fold sections
const SectionSkeleton = () => (
  <div className="w-full py-12 flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
  </div>
);

// Full page loader only for standalone subpage routes
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#07090f]">
    <div className="h-10 w-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
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

    if (pathname === '/') {
      setPageSEO({
        title: 'Yves Olivier NSENGIYUMVA | Software Developer Portfolio',
        description: 'Portfolio of Yves Olivier NSENGIYUMVA (Yves Foex), a software developer specializing in React, frontend engineering, and modern web applications.',
        canonicalPath: '/'
      });
    }
  }, [pathname]);

  return null;
};

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#07090f] text-gray-900 dark:text-white transition-colors duration-300">
      <ScrollToTop />
      
      {/* Navbar is critical above-the-fold */}
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
              <>
                {/* Hero is above-the-fold: renders instantly without delay or spinner */}
                <Home />

                {/* Capabilities immediately follows hero */}
                <ServicesSection />

                {/* Below-the-fold content loads progressively with independent boundaries */}
                <Suspense fallback={<SectionSkeleton />}>
                  <ScrollReveal delay={0.05}>
                    <AboutMe />
                  </ScrollReveal>
                </Suspense>
                <Suspense fallback={<SectionSkeleton />}>
                  <ScrollReveal delay={0.05}>
                    <HomeProjects />
                  </ScrollReveal>
                </Suspense>
                <Suspense fallback={<SectionSkeleton />}>
                  <ScrollReveal delay={0.05}>
                    <BlogSection />
                  </ScrollReveal>
                </Suspense>
                <Suspense fallback={<SectionSkeleton />}>
                  <ScrollReveal delay={0.05}>
                    <ContactSection />
                  </ScrollReveal>
                </Suspense>
                <Suspense fallback={null}>
                  <Footer />
                </Suspense>
              </>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<LoadingFallback />}>
                <Blog />
                <Footer />
              </Suspense>
            } />
            <Route path="/blog/:slug" element={
              <Suspense fallback={<LoadingFallback />}>
                <BlogPost />
                <Footer />
              </Suspense>
            } />
            <Route path="/projects/:slug" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectDetail />
                <Footer />
              </Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProjectsPage />
                <Footer />
              </Suspense>
            } />
          </Routes>
        </motion.main>
      </AnimatePresence>

      {/* Non-critical floating tools loaded asynchronously */}
      <Suspense fallback={null}>
        <ScrollControls />
        <AIChatbot />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;