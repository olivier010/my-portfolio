import React from "react";
import { motion } from "framer-motion";
import { Code, Layout, Paintbrush, Cpu, Database, Server, Smartphone, Mail, MapPin, Calendar, Award, Target } from 'lucide-react';

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
    <section id="about" className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 - Profile & Personal Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  NSENGIYUMVA YVES Olivier
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4">Software Engineer</p>
              </div>
              
              <div className="relative group w-24 h-24 mx-auto mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-white dark:bg-gray-800 p-0.5 rounded-full">
                  <img
                    src="/yvs.png"
                    alt="NSENGIYUMVA YVES Olivier"
                    className="w-full h-full rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/96x96?text=Profile';
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">your.email@example.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Kigali, Rwanda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Available for work</span>
                </div>
              </div>
            </div>

            {/* Bio Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">About Me</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                I'm a passionate software engineer with a Bachelor's degree in Information Technology. 
                I specialize in creating beautiful, functional, and user-centered digital experiences 
                that solve real-world problems.
              </p>
            </div>
          </motion.div>

          {/* Column 2 - Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 dark:text-blue-400">{skill.icon}</span>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Bachelor of Information Technology</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">University Name</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2018 - 2022</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 3 - Experience */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience</h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-blue-500/30">
                    <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-gray-900 dark:text-white text-sm">{exp.role}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-xs">{exp.company}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{exp.period}</p>
                      <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">3+</div>
                  <div className="text-xs opacity-90">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-xs opacity-90">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-xs opacity-90">Tech Stack</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">∞</div>
                  <div className="text-xs opacity-90">Coffee Cups</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
