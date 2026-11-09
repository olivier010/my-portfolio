// src/components/AboutMe.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Layout, Paintbrush, Cpu, Database, Server, 
  Smartphone, Mail, MapPin, Calendar, Award, Target, 
  Github, Linkedin, Terminal, Sparkles, Check, Send, 
  BookOpen, Briefcase, Zap, CornerDownLeft 
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { playClick, playPop, playSuccess } from '../utils/sound';

const skillsData = [
  { name: 'React 19 & Next.js', level: 95, category: 'Frontend', icon: Layout },
  { name: 'TypeScript & JavaScript', level: 92, category: 'Frontend', icon: Code },
  { name: 'Tailwind CSS & Framer Motion', level: 96, category: 'Frontend', icon: Paintbrush },
  { name: 'Node.js & Express', level: 86, category: 'Backend', icon: Server },
  { name: 'PostgreSQL & MongoDB', level: 84, category: 'Backend', icon: Database },
  { name: 'AI Integration (OpenAI/RAG)', level: 82, category: 'AI & Data', icon: Cpu },
  { name: 'REST & GraphQL APIs', level: 88, category: 'Backend', icon: Zap },
  { name: 'Git & CI/CD DevOps', level: 85, category: 'Tools', icon: Terminal },
];

const experiences = [
  {
    role: 'Full-Stack Software Developer',
    company: 'Independent & High-Impact Client Projects',
    period: '2023 - Present',
    description: 'Architecting scalable web applications, real-time dashboards, and custom client solutions utilizing React 19, TypeScript, and Node.js with rigorous performance benchmarks.'
  },
  {
    role: 'Frontend & UI/UX Engineer',
    company: 'Digital Solutions Lab',
    period: '2022 - 2023',
    description: 'Designed and built modern component systems, responsive landing pages, and interactive web tools with zero-layout-shift accessibility standards.'
  },
  {
    role: 'Information Technology Scholar',
    company: 'RP Karongi College',
    period: '2024 - Present',
    description: 'Pursuing an Advanced Diploma in Information Technology, focusing on software engineering, distributed computing, and data structures.'
  }
];

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState('skills'); // 'skills', 'terminal', 'experience'
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');
  
  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: "Welcome to Yves's Interactive CLI v2.4 (React 19 Environment)" },
    { type: 'system', text: "Type 'help' or click any quick command below to begin." },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  const handleCommand = (cmdText) => {
    const cmd = (cmdText || terminalInput).trim().toLowerCase();
    if (!cmd) return;

    playClick();
    const newHistory = [...terminalHistory, { type: 'user', text: `$ ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: "Available commands:\n  • about        - Summary of Yves's mission & background\n  • skills       - List technical proficiencies\n  • contact      - Reach out directly\n  • github       - View GitHub repository portfolio\n  • sudo hire    - Trigger VIP hiring sequence\n  • clear        - Clear the terminal screen"
        });
        break;
      case 'about':
      case 'cat bio.txt':
        newHistory.push({
          type: 'output',
          text: "Yves Olivier NSENGIYUMVA (Yves Foex)\nFull-Stack Developer based in Kigali, Rwanda.\nPassionate about building ultra-fast React interfaces, scalable APIs, and intelligent AI-enhanced tools."
        });
        break;
      case 'skills':
      case 'skills --all':
        newHistory.push({
          type: 'output',
          text: "Core Stack:\n[Frontend]: React 19, TypeScript, Tailwind CSS, Framer Motion, Next.js\n[Backend]:  Node.js, Express, PostgreSQL, MongoDB, Java\n[AI/Cloud]: OpenAI API, RAG, Docker, Vercel, Netlify"
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'output',
          text: "Email: oliviernsengiyumva010@gmail.com\nGitHub: https://github.com/olivier010\nLinkedIn: https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/"
        });
        break;
      case 'github':
        window.open('https://github.com/olivier010', '_blank');
        newHistory.push({ type: 'output', text: "Opening github.com/olivier010 in a new tab..." });
        break;
      case 'sudo hire':
        playSuccess();
        newHistory.push({
          type: 'output',
          text: "ACCESS GRANTED: Excellent decision! Let's build something extraordinary together.\nRedirecting to contact form..."
        });
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: '${cmd}'. Type 'help' for available commands.`
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const categories = ['All', 'Frontend', 'Backend', 'AI & Data', 'Tools'];
  const filteredSkills = skillsData.filter(s => 
    activeSkillCategory === 'All' ? true : s.category === activeSkillCategory
  );

  return (
    <section 
      id="about" 
      className="py-24 bg-white dark:bg-[#07090f] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="Developer Journey"
            title={<>Engineering with <span className="text-primary-500">Purpose</span> &amp; Precision</>}
            subtitle="The bridge between clean code architecture, intuitive product design, and continuous technical evolution."
          />
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (5 cols): Profile & Story */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Profile Highlight Card */}
            <div className="p-7 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-5 mb-6">
                <div className="relative group w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary-500/30 shrink-0">
                  <img
                    src="/yvs.png"
                    alt="Yves Olivier NSENGIYUMVA"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Yves Olivier NSENGIYUMVA
                  </h3>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-mono">
                    Full-Stack &amp; Frontend Engineer
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Kigali, Rwanda (CAT / UTC+2)
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I specialize in building responsive, accessible, and high-velocity web platforms. With a strong foundation in modern JavaScript/TypeScript, React 19, and scalable server architectures, I turn complex business requirements into elegant, tactile digital experiences.
              </p>

              {/* Quick links & socials */}
              <div className="flex items-center gap-3 pt-5 border-t border-gray-200 dark:border-white/10">
                <a
                  href="https://github.com/olivier010"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-primary-500" />
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    playClick();
                  }}
                  className="inline-flex items-center gap-1.5 ml-auto text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact</span>
                </button>
              </div>
            </div>

            {/* Education & Core Values */}
            <div className="p-7 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-primary-500" />
                <h4 className="text-base font-bold text-gray-900 dark:text-white">Education &amp; Training</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Advanced Diploma in Information Technology
                  </div>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                    RP Karongi College
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    2024 - Present • Software Engineering, Computer Networks &amp; Databases
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Interactive CLI & Technical Skills Radar */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white dark:bg-[#0c0f18] border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-xl">
              
              {/* Window Header & Tabs */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-gray-100/80 dark:bg-white/[0.04] border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="hidden sm:inline-block ml-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                    yves@workstation:~
                  </span>
                </div>

                {/* Sub tabs */}
                <div className="flex items-center gap-1 bg-gray-200/60 dark:bg-black/30 p-1 rounded-xl">
                  <button
                    onClick={() => { setActiveTab('skills'); playClick(); }}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                      activeTab === 'skills' 
                        ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm font-semibold' 
                        : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                    }`}
                  >
                    Skills Radar
                  </button>
                  <button
                    onClick={() => { setActiveTab('terminal'); playClick(); }}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
                      activeTab === 'terminal' 
                        ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm font-semibold' 
                        : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5 text-primary-500" />
                    <span>Live CLI</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('experience'); playClick(); }}
                    className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                      activeTab === 'experience' 
                        ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm font-semibold' 
                        : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'
                    }`}
                  >
                    Milestones
                  </button>
                </div>
              </div>

              {/* Tab 1: Skills Radar */}
              {activeTab === 'skills' && (
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Category Filter Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setActiveSkillCategory(c); playPop(); }}
                        className={`text-xs font-mono px-3 py-1 rounded-lg transition-all ${
                          activeSkillCategory === c
                            ? 'bg-primary-500 text-white font-semibold shadow-sm'
                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {/* Skills Grid with Animated Bars */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredSkills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5 hover:border-primary-500/30 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-primary-500" />
                              <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.05 }}
                              className="h-full bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tab 2: Live Interactive CLI Terminal */}
              {activeTab === 'terminal' && (
                <div className="p-5 font-mono text-xs sm:text-sm bg-gray-950 text-gray-200 min-h-[360px] flex flex-col justify-between">
                  <div className="space-y-2 overflow-y-auto max-h-[300px] pr-2">
                    {terminalHistory.map((line, idx) => (
                      <div key={idx} className="leading-relaxed">
                        {line.type === 'user' && (
                          <span className="text-cyan-400 font-semibold">{line.text}</span>
                        )}
                        {line.type === 'system' && (
                          <span className="text-gray-500">{line.text}</span>
                        )}
                        {line.type === 'output' && (
                          <pre className="text-gray-300 font-mono whitespace-pre-wrap pl-2 border-l-2 border-primary-500/40 my-1">
                            {line.text}
                          </pre>
                        )}
                        {line.type === 'error' && (
                          <span className="text-rose-400">{line.text}</span>
                        )}
                      </div>
                    ))}
                    <div ref={terminalEndRef} />
                  </div>

                  {/* Terminal Input Bar */}
                  <div className="pt-3 border-t border-white/10 mt-3">
                    {/* Quick Command Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      <span className="text-[11px] text-gray-500 self-center">Try:</span>
                      {['about', 'skills', 'contact', 'sudo hire', 'clear'].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => handleCommand(cmd)}
                          className="px-2 py-0.5 rounded text-[11px] bg-white/10 hover:bg-primary-500/20 text-gray-300 hover:text-primary-300 transition-colors"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleCommand();
                      }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-emerald-400 font-bold">$</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        placeholder="type 'help' and press Enter..."
                        className="w-full bg-transparent text-gray-100 placeholder-gray-600 outline-none font-mono text-xs sm:text-sm"
                      />
                      <button
                        type="submit"
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
                      >
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Tab 3: Career Milestones */}
              {activeTab === 'experience' && (
                <div className="p-6 sm:p-7 space-y-6">
                  {experiences.map((exp, idx) => (
                    <div 
                      key={idx}
                      className="relative pl-6 pb-6 border-l-2 border-primary-500/30 last:border-0 last:pb-0"
                    >
                      <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-[#0c0f18]" />
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <span className="text-xs font-mono text-primary-600 dark:text-primary-400">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                        {exp.company}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMe;
