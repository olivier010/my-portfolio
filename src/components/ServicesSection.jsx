// src/components/ServicesSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Server, Gauge, Bot, Cloud, CheckCircle, 
  Layers, ArrowUpRight, Cpu, Sparkles, Terminal, Activity 
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { playClick, playPop } from '../utils/sound';

const capabilities = [
  {
    id: 'frontend',
    category: 'Architecture',
    title: 'High-Performance Frontend Systems',
    description: 'Crafting responsive, accessible, and ultra-fluid user interfaces using React 19, TypeScript, and Framer Motion. Engineered for sub-second interactions and zero layout shift.',
    icon: Code2,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    accent: 'text-cyan-500 dark:text-cyan-400',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Next.js', 'State Machines'],
    highlight: '60fps spring physics'
  },
  {
    id: 'backend',
    category: 'Full-Stack',
    title: 'Scalable Backends & Resilient APIs',
    description: 'Designing resilient microservices, RESTful and GraphQL APIs, and robust data pipelines using Node.js, Express, PostgreSQL, and MongoDB with secure JWT auth.',
    icon: Server,
    gradient: 'from-violet-500/20 via-indigo-500/10 to-transparent',
    accent: 'text-violet-500 dark:text-violet-400',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST & GraphQL', 'OAuth/JWT'],
    highlight: 'Sub-50ms latency'
  },
  {
    id: 'performance',
    category: 'Optimization',
    title: '100% Core Web Vitals & Speed',
    description: 'Relentless focus on bundle splitting, asset optimization, caching strategies, and semantic SEO. Built to score 100s across Google Lighthouse audits.',
    icon: Gauge,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accent: 'text-emerald-500 dark:text-emerald-400',
    tags: ['Tree Shaking', 'Lighthouse 100', 'SSR / SSG', 'Image Optimization', 'SEO Microdata'],
    highlight: 'Lighthouse 100 targets'
  },
  {
    id: 'ai',
    category: 'Innovation',
    title: 'AI Engineering & LLM Workflows',
    description: 'Seamless integration of LLM providers (OpenAI, Gemini), streaming completions, embedding search, intelligent chatbots, and automated AI workflow pipelines.',
    icon: Bot,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    accent: 'text-amber-500 dark:text-amber-400',
    tags: ['OpenAI API', 'RAG Systems', 'Streaming SSE', 'Prompt Engineering', 'LangChain'],
    highlight: 'Real-time streaming'
  },
  {
    id: 'devops',
    category: 'Infrastructure',
    title: 'Cloud DevOps & CI/CD Pipelines',
    description: 'Automated deployment pipelines, Docker containerization, edge functions, and cloud infrastructure on Vercel, Netlify, and AWS for 99.9% uptime.',
    icon: Cloud,
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    accent: 'text-rose-500 dark:text-rose-400',
    tags: ['CI/CD Actions', 'Docker', 'Vercel / Netlify', 'Edge Networks', 'GitOps'],
    highlight: 'Automated CI/CD'
  },
  {
    id: 'craft',
    category: 'Design Systems',
    title: 'UI/UX Polish & Micro-Interactions',
    description: 'Bridging technical engineering and design craft. Translating complex business logic into intuitive, tactile interfaces that users genuinely enjoy using.',
    icon: Sparkles,
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent',
    accent: 'text-purple-500 dark:text-purple-400',
    tags: ['Figma to Code', 'Design Tokens', 'Accessibility (a11y)', 'Sound Design', 'Dark Mode'],
    highlight: 'Pixel-perfect precision'
  }
];

const ServicesSection = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section 
      id="capabilities" 
      className="py-20 md:py-24 bg-white dark:bg-[#07090f] text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      {/* Anchor for legacy or alternate #services links */}
      <span id="services" className="absolute -top-24" />
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="Engineering Capabilities"
            title={<>Architected for <span className="text-primary-500">Speed</span> &amp; Precision</>}
            subtitle="Modern software engineering is more than just code. It is the synthesis of performant architectures, clean design systems, and measurable business impact."
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const isHovered = activeCard === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onMouseEnter={() => { setActiveCard(item.id); playPop(); }}
                onMouseLeave={() => setActiveCard(null)}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-gray-50/70 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-primary-500/40 dark:hover:border-primary-500/40 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 backdrop-blur-xl overflow-hidden"
              >
                {/* Subtle gradient highlight */}
                <div className={`absolute -right-20 -top-20 w-48 h-48 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Category Pill & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-sm group-hover:scale-110 group-hover:border-primary-500/30 transition-all duration-300">
                      <Icon className={`w-6 h-6 ${item.accent}`} />
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-200/60 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-white/5">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-200/80 dark:border-white/5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => playClick()}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-primary-500/50 hover:text-primary-500 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlight pill */}
                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Activity className={`w-3.5 h-3.5 ${item.accent}`} />
                      <span>{item.highlight}</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 text-primary-500" />
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
