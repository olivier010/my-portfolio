// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import CodeTypingIDE from './CodeTypingIDE';
import { playClick, playPop } from '../utils/sound';

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

const taglines = [
  "Building scalable web apps.",
  "Engineering modern AI interfaces.",
  "Architecting high-velocity systems.",
  "Crafting fluid full-stack platforms."
];

const metricsData = [
  {
    id: 'experience',
    value: 5,
    suffix: '+',
    duration: 1.6,
    label: 'Years Experience',
    colorClass: 'text-gray-900 dark:text-white',
    ringClass: 'border-primary-500/60 bg-primary-50/70 dark:bg-primary-500/10',
    detail: '5+ years building React, TypeScript & full-stack Node.js systems.',
    ctaText: 'View Journey',
    targetId: 'about'
  },
  {
    id: 'lighthouse',
    value: 100,
    suffix: '%',
    duration: 2.0,
    label: 'Lighthouse Targets',
    colorClass: 'text-primary-600 dark:text-primary-400',
    ringClass: 'border-cyan-500/60 bg-cyan-50/70 dark:bg-cyan-500/10',
    detail: 'Engineered for sub-second speed, SEO & Core Web Vitals.',
    ctaText: 'See Capabilities',
    targetId: 'capabilities'
  },
  {
    id: 'solutions',
    value: 25,
    suffix: '+',
    duration: 1.8,
    label: 'Shipped Solutions',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    ringClass: 'border-emerald-500/60 bg-emerald-50/70 dark:bg-emerald-500/10',
    detail: 'Production SaaS tools, AI screeners & interactive web apps.',
    ctaText: 'Browse Projects',
    targetId: 'projects'
  }
];

const Home = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [activeMetric, setActiveMetric] = useState(null);
  const spotlightRef = useRef(null);
  const sectionRef = useRef(null);

  const handleTaglineTap = () => {
    playPop();
    setTaglineIndex((prev) => (prev + 1) % taglines.length);
  };

  const handleMetricTap = (metricId) => {
    playPop();
    setActiveMetric((prev) => (prev === metricId ? null : metricId));
  };

  // Interactive zero-rerender spotlight that reacts to mobile touch & desktop pointer
  const updateSpotlight = (e) => {
    if (!spotlightRef.current || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(360px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.14), transparent 70%)`;
  };

  const handleScroll = (id) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedMetricObj = metricsData.find((m) => m.id === activeMetric);

  return (
    <section 
      ref={sectionRef}
      id="home"
      onPointerDown={updateSpotlight}
      onPointerMove={updateSpotlight}
      className="relative flex items-center justify-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white via-gray-50/60 to-white dark:from-[#07090f] dark:via-[#0c0f18] dark:to-[#07090f]"
    >
      {/* Desktop Interactive Canvas Particle Network */}
      <ParticleBackground />

      {/* Mobile-Friendly Zero-CPU Dot Matrix & Touch Spotlight */}
      <div className="absolute inset-0 bg-grid-dots opacity-50 md:opacity-20 pointer-events-none" />
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Decorative ambient glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-primary-500/12 dark:bg-primary-500/8 rounded-full blur-[110px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-6 right-4 sm:right-10 w-[220px] sm:w-[320px] h-[220px] sm:h-[320px] bg-cyan-500/10 dark:bg-violet-500/8 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Clean, Calm Entrance Headline, Bio & Interactive CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="text-[2.15rem] xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] font-display mb-2"
            >
              Hi, I&apos;m{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-cyan-500 to-emerald-500 dark:from-primary-400 dark:via-cyan-300 dark:to-emerald-400">
                Yves Olivier
              </span>
              .
            </motion.h1>

            {/* Clean Subtitle (Optional gentle tap-to-switch, zero distracting auto-loop or blur) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
              onClick={handleTaglineTap}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleTaglineTap(); } }}
              className="mb-4 cursor-pointer select-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22 }}
                  className="text-xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 font-extrabold tracking-tight leading-snug"
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14, ease: 'easeOut' }}
              className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mb-6 sm:mb-8 font-normal"
            >
              Crafting high-velocity digital products with React 19, TypeScript, and modern system architectures.
            </motion.p>

            {/* Responsive Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-lg"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScroll('projects')}
                className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-primary-600 to-cyan-500 hover:from-primary-500 hover:to-cyan-400 shadow-lg shadow-primary-500/25 transition-all duration-300"
              >
                <span>Explore Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScroll('contact')}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 bg-white/90 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 shadow-xs transition-all duration-200"
              >
                <span>Talk to Me</span>
              </motion.button>
            </motion.div>

            {/* Interactive Tappable Metrics Bar with Live Animated Counters */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26, ease: 'easeOut' }}
              className="max-w-lg"
            >
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
                {metricsData.map((metric) => {
                  const isActive = activeMetric === metric.id;
                  return (
                    <motion.button
                      key={metric.id}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMetricTap(metric.id)}
                      className={`text-left p-2.5 sm:p-3.5 rounded-2xl border backdrop-blur-md transition-all duration-200 shadow-xs ${
                        isActive
                          ? `${metric.ringClass} shadow-md`
                          : 'bg-white/80 dark:bg-white/[0.03] border-gray-200/80 dark:border-white/10 hover:border-primary-500/40'
                      }`}
                    >
                      <div className={`text-xl sm:text-3xl font-extrabold font-mono flex items-center ${metric.colorClass}`}>
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} duration={metric.duration} />
                      </div>
                      <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium mt-0.5 leading-tight">
                        {metric.label}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Interactive Insight Strip Revealed on Card Tap */}
              <AnimatePresence mode="wait">
                {selectedMetricObj && (
                  <motion.div
                    key={selectedMetricObj.id}
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2.5 px-3.5 py-2.5 rounded-xl bg-white/90 dark:bg-white/[0.04] border border-primary-500/25 flex items-center justify-between gap-3 text-xs shadow-sm">
                      <span className="text-gray-700 dark:text-gray-300 leading-snug">
                        {selectedMetricObj.detail}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleScroll(selectedMetricObj.targetId)}
                        className="inline-flex items-center gap-0.5 font-semibold text-primary-600 dark:text-primary-400 whitespace-nowrap shrink-0 hover:underline"
                      >
                        <span>{selectedMetricObj.ctaText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>

          {/* Right Column: Interactive Code Typing IDE Animation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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
