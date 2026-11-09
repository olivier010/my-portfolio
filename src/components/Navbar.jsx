// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Linkedin, Moon, Sun, 
  Volume2, VolumeX
} from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { isSoundEnabled, setSoundEnabled, playClick, playPop } from '../utils/sound';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [soundOn, setSoundOn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If near bottom of the page, activate contact directly
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Exact DOM order of sections to avoid skipping
      const sections = ['home', 'capabilities', 'about', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 160;

      // Scan from bottom to top to find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashScroll = (hash) => {
    const sectionId = hash.replace('#', '');
    setActiveSection(sectionId);
    setMenuOpen(false);
    playClick();

    if (location.pathname !== '/') {
      navigate('/', { replace: true });
      setTimeout(() => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 300);
    } else {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (!next) {
      playClick();
    }
  };

  // Nav items in the EXACT sequence they appear on the page:
  // 1. Home -> 2. Capabilities (Services) -> 3. About -> 4. Projects -> 5. Blog -> 6. Contact
  const navItems = [
    { name: 'Home', to: '#home' },
    { name: 'Capabilities', to: '#capabilities' },
    { name: 'About', to: '#about' },
    { name: 'Projects', to: '#projects' },
    { name: 'Blog', to: '#blog' },
    { name: 'Contact', to: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-[#07090f]/80 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10 shadow-lg shadow-black/5' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand */}
          <Link
            to="/"
            onClick={() => { setActiveSection('home'); playPop(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-cyan-500 text-white font-mono text-sm font-bold shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
              &lt;/&gt;
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-base sm:text-lg text-gray-900 dark:text-white font-display">
                Yves<span className="text-primary-500">.dev</span>
              </span>
              <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 -mt-1 hidden sm:block">
                Full-Stack Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Ordered sequentially) */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-gray-100/70 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.to.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.name}
                  href={item.to}
                  onClick={(e) => {
                    e.preventDefault();
                    handleHashScroll(item.to);
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary-600 dark:bg-primary-500 rounded-full shadow-sm"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons: Sound, Theme, GitHub, LinkedIn */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition-all ${
                soundOn
                  ? 'bg-primary-500/10 border-primary-500/30 text-primary-600 dark:text-primary-400'
                  : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              title={soundOn ? 'Interface Sounds Active (Click to Mute)' : 'Interface Sounds Muted (Click to Enable)'}
              aria-label="Toggle Sound Effects"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => { toggleTheme(); playClick(); }}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* GitHub Quick Link */}
            <a
              href="https://github.com/olivier010"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="hidden sm:inline-flex p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn Quick Link */}
            <a
              href="https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="hidden sm:inline-flex p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => { setMenuOpen(!menuOpen); playClick(); }}
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Ordered sequentially) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white/95 dark:bg-[#07090f]/95 backdrop-blur-2xl border-b border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const sectionId = item.to.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.name}
                    href={item.to}
                    onClick={(e) => {
                      e.preventDefault();
                      handleHashScroll(item.to);
                    }}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              
              <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
                <span>Yves Olivier • Kigali, Rwanda</span>
                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/olivier010" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-white/5"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-white/5"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
