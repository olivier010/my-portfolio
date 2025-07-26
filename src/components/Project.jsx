import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const projects = [
    {
        title: "Portfolio Website",
        description: "An Online Ticket Reservation System is a web-based or mobile application that allows users to book and purchase tickets for various events or services over the internet.",
        image: "/online.jpeg",
        github: "https://github.com/olivier010/online-ticket-reservation-sy",
        live: "#",
    },
    {
        title: "Portfolio Website",
        description: "An Online Portfolio that showcases an individual’s skills, projects, achievements, and professional background",
        image: "/portfolio.jpeg",
        github: "https://github.com/olivier010/my-portfolio",
        live: "yvesonlineportfolio.netlify.app",
    },git 
];

const MAX_LENGTH = 100;

const Project = () => {
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const [expanded, setExpanded] = useState({});
    const [isHovered, setIsHovered] = useState(false);


    const total = projects.length;

    const updateVisibleCount = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setVisibleCount(1);
        } else if (width < 1024) {
            setVisibleCount(2);
        } else {
            setVisibleCount(3);
        }
    };

    useEffect(() => {
        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    useEffect(() => {
        if (current > total - visibleCount) {
            setCurrent(0);
        }
    }, [visibleCount, total]);

    useEffect(() => {
    if (isHovered) return; // Do not slide if hovering

    const interval = setInterval(() => {
        setCurrent((prev) =>
            prev + 1 < total - visibleCount + 1 ? prev + 1 : 0
        );
    }, 5000);

    return () => clearInterval(interval);
}, [visibleCount, total, isHovered]);


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

    const toggleReadMore = (idx) => {
        setExpanded((prev) => ({
            ...prev,
            [idx]: !prev[idx],
        }));
    };

    return (
        <section id="projects" className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-8 text-center">
                    Projects
                </h2>
                <div
                   className="relative"
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                >

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${current * (100 / visibleCount)}%)`,
                            }}
                        >
                            {projects.map((project, idx) => {
                                const isLong = project.description.length > MAX_LENGTH;
                                const isExpanded = expanded[idx];
                                const displayedText = isExpanded || !isLong
                                    ? project.description
                                    : project.description.slice(0, MAX_LENGTH) + "...";

                                return (
                                    <div
                                        key={idx}
                                        className="px-2"
                                        style={{ flex: `0 0 ${100 / visibleCount}%` }}
                                    >
                                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-center h-full">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-40 object-cover rounded mb-4"
                                            />
                                            <h3 className="text-xl font-semibold text-blue-600 dark:text-white mb-2 text-center">
                                                {project.title}
                                            </h3>
                                            <div className="text-center mb-4 min-h-[100px] flex flex-col justify-between">
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {displayedText}
                                                </p>
                                                {isLong && (
                                                    <button
                                                        onClick={() => toggleReadMore(idx)}
                                                        className="text-sm text-blue-600 hover:underline mt-2"
                                                    >
                                                        {isExpanded ? "Show less" : "Read more"}
                                                    </button>
                                                )}
                                            </div>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition"
                                                >
                                                    View Project
                                                </a>
                                            )}
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
                                );
                            })}
                        </div>
                    </div>

                    {total > visibleCount && (
                        <>
                            <button
                                onClick={prevSlide}
                                aria-label="Previous project"
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 z-10 hover:bg-blue-800 transition"
                            >
                                &#8592;
                            </button>
                            <button
                                onClick={nextSlide}
                                aria-label="Next project"
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
