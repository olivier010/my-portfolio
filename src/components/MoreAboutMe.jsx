import React, { useState } from "react";

const MoreAboutMe = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section id="more" className="bg-white dark:bg-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-12">
          More About Me
        </h2>

        {/* Education */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("education")}
            className="w-full text-left text-2xl font-bold text-blue-600 dark:text-blue-400 flex justify-between items-center"
          >
            🎓 Education
            <span>{activeSection === "education" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "education" && (
            <ul className="space-y-4 mt-4">
              <li className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Advanced Depoloma in Informatio Technology
                </p>
                <p className="text-gray-600 dark:text-gray-300">Rwanda Polytechnic Karongi College — 2024 - Present</p>
              </li>
              <li className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-900 dark:text-white">
                  High School Diploma
                </p>
                <p className="text-gray-600 dark:text-gray-300">Kirehe Advantniste TVET and Secondary School — Graduated 2023</p>
              </li>
            </ul>
          )}
        </div>

        {/* Skills */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("skills")}
            className="w-full text-left text-2xl font-bold text-blue-600 dark:text-blue-400 flex justify-between items-center"
          >
            🛠 Skills
            <span>{activeSection === "skills" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "skills" && (
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                "HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS",
                "Node.js", "Python", "Java", "Git & GitHub", "AI & Machine Learning"
              ].map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Experience */}
        <div>
          <button
            onClick={() => toggleSection("experience")}
            className="w-full text-left text-2xl font-bold text-blue-600 dark:text-blue-400 flex justify-between items-center"
          >
            💼 Experience
            <span>{activeSection === "experience" ? "▲" : "▼"}</span>
          </button>
          {activeSection === "experience" && (
            <ul className="space-y-4 mt-4">
              <li className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Freelance Full Stack Developer
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Developed responsive websites, e-commerce platforms, and personal portfolios for clients.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">202X - Present</p>
              </li>
              <li className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Internship — Software Development
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Worked on backend APIs, front-end UI enhancements, and database management.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">[Company Name] — 202X</p>
              </li>
            </ul>
          )}
        </div>

      </div>
    </section>
  );
};

export default MoreAboutMe;
