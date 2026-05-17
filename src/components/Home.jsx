import React, { useState, useEffect } from 'react';

const Home = () => {
    const [displayedChars, setDisplayedChars] = useState(0);
    const fullText = "Hi, I'm Yves Digital Innovator";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedChars(index + 1);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 60);
        return () => clearInterval(interval);
    }, []);

    const renderHeading = () => {
        const text = fullText.substring(0, displayedChars);
        const parts = [];
        let currentIndex = 0;

        // Hi, I'm 
        if (text.includes("Hi, I'm")) {
            parts.push(
                <span key="greeting" className="text-gray-800 dark:text-white">
                    Hi, I'm 
                </span>
            );
            currentIndex = 8;
        }

        // Yves
        if (displayedChars > 8) {
            const yves = text.substring(8, Math.min(13, displayedChars));
            if (yves) {
                parts.push(
                    <span key="yves" className="text-blue-600 dark:text-blue-400">
                        {yves}
                    </span>
                );
            }
            currentIndex = 13;
        }

        // Digital 
        if (displayedChars > 13) {
            const digital = text.substring(13, Math.min(20, displayedChars));
            if (digital) {
                parts.push(
                    <span key="digital" className="text-gray-800 dark:text-white">
                        {digital}
                    </span>
                );
            }
            currentIndex = 20;
        }

        // Innovator
        if (displayedChars > 20) {
            const innovator = text.substring(20, displayedChars);
            if (innovator) {
                parts.push(
                    <span key="innovator" className="text-blue-600 dark:text-blue-400">
                        {innovator}
                    </span>
                );
            }
        }

        return parts.length > 0 ? parts : null;
    };

    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:items-center">
                {/* Left Column - Text Content */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6 leading-tight min-h-[120px]">
                        {renderHeading()}
                        <span className="inline-block w-1 h-12 md:h-16 ml-2 bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        I craft transformative, timely, and innovative technology solutions that empower businesses and communities. Excellence delivered through clean code, creative problem-solving, and continuous learning.
                    </p>
                    
                    <div className="flex flex-nowrap gap-3 sm:gap-4">
                        <button
                            onClick={() => handleScroll('contact')}
                            className="flex-1 min-w-0 px-4 sm:px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base text-center"
                        >
                            Talk to me
                        </button>
                        <button
                            onClick={() => handleScroll('projects')}
                            className="flex-1 min-w-0 px-4 sm:px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300 font-semibold text-sm sm:text-base text-center"
                        >
                            View My Work
                        </button>
                    </div>
                </div>
                
                {/* Right Column - Visual */}
                <div className="flex justify-center md:justify-end items-center">
                    <div className="relative w-full max-w-2xl lg:max-w-3xl md:translate-y-2">
                        {/* Decorative circles */}
                        <div className="absolute -top-8 -right-8 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full opacity-20 blur-3xl"></div>
                        
                        {/* Profile Image */}
                        <div className="relative z-10 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition duration-300">
                            <img 
                                src="/hero.png" 
                                alt="Yves - Full Stack Developer"
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
