import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X'; // You can replace with another icon if unavailable

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <a href="#home" className="text-2xl font-bold text-blue-600 dark:text-white hover:text-blue-800 transition">
                    &lt;/&gt; MyPortfolio
                </a>

                {/* Right side (Desktop & Mobile) */}
                <div className="flex items-center space-x-4">
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

                    {/* GitHub Icon - Always visible */}
                    <a
                        href="https://github.com/olivier010"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-gray-800 dark:text-white hover:text-blue-500 transition"
                    >
                        <GitHubIcon style={{ fontSize: 32 }} />
                    </a>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-medium shadow-md px-4 py-4 space-y-4">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <a href="#home" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 flex items-center gap-2">
                                <HomeIcon fontSize="small" /> Home
                            </a>
                        </li>
                        <li>
                            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 flex items-center gap-2">
                                <InfoIcon fontSize="small" /> About
                            </a>
                        </li>
                        <li>
                            <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 flex items-center gap-2">
                                <WorkIcon fontSize="small" /> Projects
                            </a>
                        </li>
                        <li>
                            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-500 flex items-center gap-2">
                                <ContactMailIcon fontSize="small" /> Contact
                            </a>
                        </li>
                    </ul>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                        <a href="https://github.com/olivier010" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <GitHubIcon style={{ fontSize: 28 }} />
                        </a>
                        <a href="https://www.instagram.com/yvesfoex/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                            <InstagramIcon style={{ fontSize: 28 }} />
                        </a>
                        <a href="https://x.com/yves_olly_foex" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white">
                            <XIcon style={{ fontSize: 28 }} />
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
