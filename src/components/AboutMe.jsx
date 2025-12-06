import React from "react";
import { motion } from "framer-motion";
import { Code, Layout, Paintbrush, Cpu, Database, Server, Smartphone } from 'lucide-react';

const AboutMe = () => {
  const skills = [
    { name: 'Frontend', level: 90, icon: <Layout className="w-5 h-5" /> },
    { name: 'Backend', level: 85, icon: <Server className="w-5 h-5" /> },
    { name: 'UI/UX Design', level: 80, icon: <Paintbrush className="w-5 h-5" /> },
    { name: 'Mobile Dev', level: 75, icon: <Smartphone className="w-5 h-5" /> },
    { name: 'AI/ML', level: 70, icon: <Cpu className="w-5 h-5" /> },
    { name: 'Database', level: 85, icon: <Database className="w-5 h-5" /> },
  ];

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Developing and maintaining web applications using modern technologies.'
    },
    {
      role: 'UI/UX Designer',
      company: 'Creative Agency',
      period: '2020 - 2022',
      description: 'Designed user interfaces and experiences for various clients.'
    },
    {
      role: 'Software Engineer Intern',
      company: 'Innovate Tech',
      period: '2019 - 2020',
      description: 'Assisted in developing and testing software applications.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-400 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Bio */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="relative group w-32 h-32 mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <div className="relative bg-white dark:bg-gray-800 p-0.5 rounded-full">
                <img
                  src="/yvs.jpg"
                  alt="NSENGIYUMVA YVES Olivier"
                  className="w-full h-full rounded-full object-cover shadow-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/128x128?text=Profile+Image';
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who am I?</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm <span className="font-semibold text-blue-600 dark:text-blue-400">NSENGIYUMVA YVES Olivier</span>, a passionate and versatile software engineer with a Bachelor's degree in Information Technology. 
                I specialize in creating beautiful, functional, and user-centered digital experiences.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Name:</p>
                  <p className="font-medium text-gray-900 dark:text-white">NSENGIYUMVA YVES Olivier</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email:</p>
                  <p className="font-medium text-blue-600 dark:text-blue-400">your.email@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">From:</p>
                  <p className="font-medium text-gray-900 dark:text-white">Kigali, Rwanda</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Availability:</p>
                  <p className="font-medium text-green-600 dark:text-green-400">Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Skills and Experience */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Skills</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 dark:text-blue-400">{skill.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2.5 rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-blue-500/20">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1"></div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
