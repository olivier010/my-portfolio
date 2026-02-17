import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Instagram, Twitter, Moon, Sun } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            
            // Determine which section is currently in view
            const sections = ['home', 'about', 'projects', 'blog', 'contact'];
            const scrollPosition = window.scrollY + 100; // Offset for navbar height
            
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Call once on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle hash scrolling
    const handleHashScroll = (hash) => {
        const sectionId = hash.substring(1); // Remove the # symbol
        setActiveSection(sectionId); // Update active section immediately
        
        if (location.pathname !== '/') {
            // If not on home page, navigate to home first, then scroll
            navigate('/', { replace: true });
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // If on home page, just scroll
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navItems = [
        { name: 'Home', to: '/', isHash: false },
        { name: 'About', to: '#about', isHash: true },
        { name: 'Projects', to: '#projects', isHash: true },
        { name: 'Blog', to: '#blog', isHash: true },
        { name: 'Contact', to: '#contact', isHash: true },
    ];

    const socialLinks = [
        { icon: <Github size={20} />, href: 'https://github.com/olivier010' },
        { icon: <Instagram size={20} />, href: 'https://instagram.com' },
        { icon: <Twitter size={20} />, href: 'https://twitter.com' },
    ];

    return (
        <motion.nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a 
                            href="#home" 
                            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                        >
                            &lt;/&gt; MyPortfolio
                        </a>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                item.isHash ? (
                                    <motion.a
                                        key={item.name}
                                        href={item.to}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleHashScroll(item.to);
                                        }}
                                        className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        whileHover={{ y: -2 }}
                                    >
                                        {item.name}
                                        {activeSection === item.to.substring(1) && (
                                            <motion.span 
                                                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                                                layoutId="nav-underline"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={item.name}
                                        className="relative"
                                        whileHover={{ y: -2 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            onClick={() => {
                                                setActiveSection('home');
                                            }}
                                        >
                                            {item.name}
                                            {(activeSection === 'home' && item.name === 'Home') && (
                                                <motion.span 
                                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                                                    layoutId="nav-underline"
                                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Theme Toggle and Social Icons */}
                    <div className="hidden md:flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </motion.button>
                        
                        {/* Social Icons */}
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ y: -2, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="inline-flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle menu"
                        >
                            <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white dark:bg-gray-900 overflow-hidden shadow-xl"
                    >
                        <div className="px-4 py-3 space-y-3">
                            {navItems.map((item) => (
                                item.isHash ? (
                                    <motion.a
                                        key={item.name}
                                        href={item.to}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleHashScroll(item.to);
                                            setMenuOpen(false);
                                        }}
                                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                            activeSection === item.to.substring(1)
                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                        whileHover={{ x: 5 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={item.name}
                                        whileHover={{ x: 5 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                                (activeSection === 'home' && item.name === 'Home')
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                    : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                            onClick={() => {
                                                setActiveSection('home');
                                                setMenuOpen(false);
                                            }}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                )
                            ))}
                            <div className="flex justify-center space-x-6 pt-4 pb-2">
                                {socialLinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                        whileHover={{ y: -2, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
