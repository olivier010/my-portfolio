import React, { useState } from 'react';
// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GitHubIcon from '@mui/icons-material/GitHub';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <a href="#home" className="text-2xl font-bold text-blue-600 dark:text-white hover:text-blue-800 transition">
                    &lt;/&gt; MyPortfolio
                </a>
                {/* Hamburger Icon for mobile */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-6 text-gray-800 dark:text-white font-medium">
                    <li>
                        <a href="#home" className="hover:text-blue-500 transition flex items-center gap-1">
                            <HomeIcon fontSize="small" /> Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-blue-500 transition flex items-center gap-1">
                            <InfoIcon fontSize="small" /> About
                        </a>
                    </li>
                    <li>
                        <a href="#projects" className="hover:text-blue-500 transition flex items-center gap-1">
                            <WorkIcon fontSize="small" /> Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-500 transition flex items-center gap-1">
                            <ContactMailIcon fontSize="small" /> Contact
                        </a>
                    </li>
                </ul>
            </div>
            {/* Mobile Nav */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col space-y-4 px-4 py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-medium shadow-md">
                    <li>
                        <a href="#home" className="hover:text-blue-500 transition flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                            <HomeIcon fontSize="small" /> Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="hover:text-blue-500 transition flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                            <InfoIcon fontSize="small" /> About
                        </a>
                    </li>
                    <li>
                        <a href="#projects" className="hover:text-blue-500 transition flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                            <WorkIcon fontSize="small" /> Projects
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:text-blue-500 transition flex items-center gap-2" onClick={() => setMenuOpen(false)}>
                            <ContactMailIcon fontSize="small" /> Contact
                        </a>
                    </li>
                    <li className="flex gap-4 justify-center items-center mt-4">
                        <a href="https://github.com/olivier010" target="_blank" rel="noopener noreferrer" aria-label="Github" className="hover:text-blue-500 flex items-center">
                            <span style={{ display: 'inline-flex', alignItems: 'center', width: 20, height: 20 }}>
                                <GitHubIcon style={{ fontSize: 20 }} />
                            </span>
                        </a>
                        <a href="https://x.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-blue-500 flex items-center">
                            <span style={{ display: 'inline-flex', alignItems: 'center', width: 20, height: 20 }}>
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.53 3H21l-7.19 7.72L22 21h-6.09l-4.84-5.44L5.47 21H2l7.66-8.23L2 3h6.18l4.37 4.91L17.53 3zm-2.13 16h2.13l-5.98-6.72-1.41 1.51L15.4 19zM6.6 5H4.47l6.01 6.75 1.41-1.51L6.6 5z" />
                                </svg>
                            </span>
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
