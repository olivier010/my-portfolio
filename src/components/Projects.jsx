import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Github } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with user authentication, product catalog, and payment integration.",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            image: "/project1.jpg",
            github: "#",
            demo: "#"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates and team collaboration features.",
            tags: ["React", "Firebase", "Tailwind CSS", "Context API"],
            image: "/project2.jpg",
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "A personal portfolio website built with React and Framer Motion for smooth animations.",
            tags: ["React", "Framer Motion", "Tailwind CSS", "Vite"],
            image: "/project3.jpg",
            github: "#",
            demo: "#"
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
                    </p>
                </motion.div>

                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div 
                            key={project.id}
                            variants={item}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Project+Image';
                                    }}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tags.map((tag, index) => (
                                        <span 
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <a 
                                        href={project.github} 
                                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        Code
                                    </a>
                                    <a 
                                        href={project.demo} 
                                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Globe className="w-5 h-5 mr-2" />
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a 
                        href="#" 
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <Code className="w-5 h-5 mr-2" />
                        View All Projects
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
