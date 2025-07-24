import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const projects = [
    // ...your project data
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with React and Tailwind CSS.",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/yourusername/portfolio",
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with React and Tailwind CSS.",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/yourusername/portfolio",
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with React and Tailwind CSS.",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/yourusername/portfolio",
    },
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with React and Tailwind CSS.",
        image: "https://via.placeholder.com/150",
        github: "https://github.com/yourusername/portfolio",
    },
];

const Project = () => {
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3); // Default

    const total = projects.length;

    const updateVisibleCount = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setVisibleCount(1); // small screen
        } else if (width < 1024) {
            setVisibleCount(2); // medium
        } else {
            setVisibleCount(3); // large
        }
    };

    useEffect(() => {
        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) =>
            prev + 1 < total - visibleCount + 1 ? prev + 1 : 0
        );
    };

    const prevSlide = () => {
        setCurrent((prev) =>
            prev - 1 >= 0 ? prev - 1 : total - visibleCount
        );
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [current, visibleCount]);

    return (
        <section id="projects" className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-8 text-center">
                    Projects
                </h2>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700"
                            style={{
                                transform: `translateX(-${current * (100 / visibleCount)}%)`,
                            }}
                        >
                            {projects.map((project, idx) => (
                                <div
                                    key={idx}
                                    className="px-2"
                                    style={{ flex: `0 0 ${100 / visibleCount}%` }}
                                >
                                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-32 h-32 object-cover rounded mb-4"
                                        />
                                        <h3 className="text-xl font-semibold text-blue-600 dark:text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-700 dark:text-gray-300 text-center mb-4">
                                            {project.description}
                                        </p>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-blue-600 transition"
                                        >
                                            <GitHubIcon fontSize="medium" />
                                            <span className="hidden md:inline">Code</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    {total > visibleCount && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 z-10 hover:bg-blue-800 transition"
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 z-10 hover:bg-blue-800 transition"
                            >
                                &#8594;
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Project;
