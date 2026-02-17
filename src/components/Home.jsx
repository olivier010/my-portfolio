import React from 'react';

const Home = () => {
    const handleScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto text-center px-4 py-16">
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-100 dark:border-gray-700">
                        <img 
                            src="/yvs.png" 
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                        Hi, I'm <span className="text-blue-600 dark:text-blue-400">Yves</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                        Software Developer & Problem Solver
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => handleScroll('contact')}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                        >
                            Get In Touch
                        </button>
                        <button
                            onClick={() => handleScroll('projects')}
                            className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition duration-300"
                        >
                            View My Work
                        </button>
                    </div>
                </div>
                
                <div className="mt-16">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Scroll down to explore more</p>
                    <div className="animate-bounce">
                        <svg 
                            className="w-6 h-6 mx-auto text-blue-500 dark:text-blue-400" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
