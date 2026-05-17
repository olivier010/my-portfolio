import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, Layout, Paintbrush, Cpu, Database, Server, Smartphone, Mail, MapPin, Calendar, Award, Target, Github, Linkedin } from 'lucide-react';
import SectionHeading from './SectionHeading';

const AboutMe = () => {
  const skills = [
    { name: 'Frontend', level: 90, icon: <Layout className="w-5 h-5" /> },
    { name: 'Backend', level: 50, icon: <Server className="w-5 h-5" /> },
    { name: 'UI/UX Design', level: 95, icon: <Paintbrush className="w-5 h-5" /> },
    { name: 'Mobile Dev', level: 40, icon: <Smartphone className="w-5 h-5" /> },
    { name: 'AI/ML', level: 70, icon: <Cpu className="w-5 h-5" /> },
    { name: 'Database', level: 85, icon: <Database className="w-5 h-5" /> },
  ];

  // Simple count-up component that starts when in view
  const CountUp = ({ end, suffix = '', duration = 1200 }) => {
    const ref = useRef();
    const [value, setValue] = useState(0);
    const started = useRef(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const from = 0;
            const to = Number(end) || 0;

            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              setValue(Math.floor(t * (to - from) + from));
              if (t < 1) requestAnimationFrame(tick);
              else setValue(to);
            };

            requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      }, { threshold: 0.3 });

      io.observe(el);
      return () => io.disconnect();
    }, [end, duration]);

    return <div ref={ref} className="text-2xl font-bold">{value}{suffix}</div>;
  };

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
          <SectionHeading title="About Me" />
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 min-h-[380px]"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-0">Software Developer</h3>
              </div>
              
              <div className="relative group w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
                <div className="relative bg-white dark:bg-gray-800 p-1 rounded-full">
                  <img
                    src="/yvs.png"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover shadow-lg block"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/160?text=Profile';
                    }}
                  />
                </div>
              </div>
              
              
            </motion.div>

            {/* Bio Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 dark:hover:border-violet-400/30 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">About Me</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
               I am NSENGIYUMVA Yves Olivier, an Information Technology student passionate about software development and digital innovation.
               I specialize in building responsive web applications using React.js and Tailwind CSS, with backend experience in Java and PHP.
               I enjoy transforming ideas into practical solutions that solve real-world problems.
               As a fast learner and problem-solver, I am continuously improving my technical skills and exploring modern technologies to build scalable and user-friendly applications.
               My goal is to grow into a professional software engineer who creates impactful and efficient digital solutions.
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 dark:hover:border-violet-400/30 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Technical Skills</h3>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <motion.span whileHover={{ scale: 1.05 }} className="text-blue-600 dark:text-blue-400">{skill.icon}</motion.span>
                        <span className="font-medium text-gray-900 dark:text-white text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.08 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 dark:hover:border-violet-400/30 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Deploma in Information Technology</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">RP KARONGI COLLEGE</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2024 - Present</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Deploma in Information Technology</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">RP KARONGI COLLEGE</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2024 - Present</p>
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
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-lg text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <CountUp end={3} suffix="+" />
                  <div className="text-xs opacity-90">Years Experience</div>
                </div>
                <div className="text-center">
                  <CountUp end={50} suffix="+" />
                  <div className="text-xs opacity-90">Projects Completed</div>
                </div>
                <div className="text-center">
                  <CountUp end={6} />
                  <div className="text-xs opacity-90">Tech Stack</div>
                </div>
                <div className="text-center">
                  <CountUp end={999} suffix="+" />
                  <div className="text-xs opacity-90">Coffee Cups</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Centered Download CV CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3">
            <a href="/resume.pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg" target="_blank" rel="noreferrer">
              Download CV
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 bg-white/90 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl shadow border border-gray-200 dark:border-gray-700">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
