// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import CodeTypingIDE from './CodeTypingIDE';
import { playClick } from '../utils/sound';

// Animated Number Counter component
const AnimatedCounter = ({ value, suffix = '', duration = 1.8 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10px' });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      }
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const rotatingPhrases = [
  "Building scalable web apps.",
  "Engineering modern AI interfaces.",
  "Architecting high-velocity systems.",
  "Crafting fluid full-stack platforms."
];

const bioText = "Crafting high-velocity digital products with React 19, TypeScript, and modern system architectures.";
const bioWords = bioText.split(" ");

const Home = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Cycle rotating phrases every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (id) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-[#07090f] dark:via-[#0c0f18] dark:to-[#07090f]"
    >
      {/* Background Interactive Particle Network */}
      <ParticleBackground />

      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Animated High-Impact Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.08] font-display">
                <span>Hi, I&apos;m </span>
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-cyan-300 to-emerald-400 bg-[length:200%_auto] animate-shimmer">
                  Yves Olivier
                </span>
                <span>.</span>
              </h1>

              {/* Dynamic Animated Rotating Subtitle */}
              <div className="h-10 sm:h-12 mt-2 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="flex items-center"
                  >
                    <span className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-extrabold tracking-tight">
                      {rotatingPhrases[phraseIndex]}
                    </span>
                    <span className="inline-block w-2 sm:w-2.5 h-6 sm:h-8 ml-1.5 bg-primary-500 animate-pulse rounded-sm" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Animated Staggered Bio Text */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.035, delayChildren: 0.15 }
                }
              }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mb-8 font-normal"
            >
              {bioWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10, filter: 'blur(2px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-block mr-1.5"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            {/* Action Buttons with Interactive Springs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('projects')}
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 shadow-lg shadow-primary-500/25 transition-all duration-300"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleScroll('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-all duration-200"
              >
                <span>Talk to Me</span>
              </motion.button>
            </motion.div>

            {/* Quick Metrics Bar with Live Animated Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-white/10 max-w-lg"
            >
              <div className="group p-2 -m-2 rounded-xl transition-colors hover:bg-gray-100/50 dark:hover:bg-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white font-mono flex items-center">
                  <AnimatedCounter value={5} suffix="+" duration={1.6} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Years Experience</div>
              </div>

              <div className="group p-2 -m-2 rounded-xl transition-colors hover:bg-gray-100/50 dark:hover:bg-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary-500 font-mono flex items-center">
                  <AnimatedCounter value={100} suffix="%" duration={2.0} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Lighthouse Targets</div>
              </div>

              <div className="group p-2 -m-2 rounded-xl transition-colors hover:bg-gray-100/50 dark:hover:bg-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-mono flex items-center">
                  <AnimatedCounter value={25} suffix="+" duration={1.8} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Shipped Solutions</div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Code Typing IDE Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <CodeTypingIDE />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Home;
