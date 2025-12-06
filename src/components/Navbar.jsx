import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Instagram, Twitter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Navbar scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
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
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    whileHover={{ y: -2 }}
                                >
                                    {item.name}
                                    {location.hash === item.href && (
                                        <motion.span 
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                                            layoutId="nav-underline"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ y: -2, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
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
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    whileHover={{ x: 5 }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </motion.a>
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
