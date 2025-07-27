import React, { useState } from 'react';

const About = () => {
    // Example paragraphs (replace with your actual long text if needed)
    const educationText = `I am currently student in Information Technology at Rwanda Polytechnic Karongi College, where I am honing my skills in Information Technology. My coursework includes a variety of subjects such as programming, database management, web development, and system analysis. I am passionate about learning new technologies and applying them to real-world problems.`;
    const skillsText = `React.js, JavaScript, Tailwind CSS, GitHub, Responsive Design, and more. I have experience working on frontend projects, collaborating with teams, and deploying applications to production environments.`;

    // Utility to trim text and show Read More
    function useReadMore(text, limit = 100) {
        const [expanded, setExpanded] = useState(false);
        const isLong = text.length > limit;
        const displayText = expanded || !isLong ? text : text.slice(0, limit) + '...';
        return [displayText, isLong, expanded, () => setExpanded((e) => !e)];
    }

    const [eduText, eduLong, eduExpanded, toggleEdu] = useReadMore(educationText, 120);
    const [skillText, skillLong, skillExpanded, toggleSkill] = useReadMore(skillsText, 120);

    return (
        <section
            id="about"
            className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-12"
        >
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                    About Me
                </h2>

                {/* Cards Grid */}
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                    {/* Education Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            🎓 Education
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {eduText}
                        </p>
                        {eduLong && (
                            <button
                                onClick={toggleEdu}
                                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                            >
                                {eduExpanded ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>

                    {/* Skills Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            🛠️ Skills
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            {skillText}
                        </p>
                        {skillLong && (
                            <button
                                onClick={toggleSkill}
                                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-xs"
                            >
                                {skillExpanded ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>

                    {/* CV Download Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                            📄 CV
                        </h3>
                        <a
                          href="/cv.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                       View CV
                        </a>

                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
