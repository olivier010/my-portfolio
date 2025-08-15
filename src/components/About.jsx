import React from "react";
import { Link } from "react-scroll";

const About = () => {
  return (
    <section id="about" className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            Hi, I’m <span className="font-semibold text-blue-600 dark:text-blue-400">NSENGIYUMVA YVES Olivier</span> — a passionate, goal-driven learner
            Bachelor’s in Information Technology.
            I thrive in <span className="font-medium">Frontend & backend, </span><span className="font-medium">Graphic Design</span> and
            <span className="font-medium"> Artificial Intelligence</span>, with a strong desire to create solutions that make a real impact.
            Every project I take on is an opportunity to learn, innovate, and grow.
          </p>
          <Link
            to="more"
            smooth={true}
            duration={200}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md shadow-md cursor-pointer hover:bg-blue-700 transition"
          >
            More About Me
          </Link>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            src="/yvs.jpg"
            alt="Profile"
            className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl shadow-lg"
          />
        </div>

      </div>
    </section>
  );
};

export default About;
