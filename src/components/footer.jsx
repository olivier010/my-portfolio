// src/components/footer.jsx
import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { playClick } from '../utils/sound';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#07090f] border-t border-gray-200 dark:border-white/10 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-100 dark:border-white/5">
          
          {/* Brand & Mission */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-mono text-primary-500 font-bold">&lt;/&gt;</span>
              <span className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                Yves<span className="text-primary-500">.dev</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
              Engineering high-velocity web platforms, resilient architectures, and tactile user experiences.
            </p>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/olivier010"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick()}
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:oliviernsengiyumva010@gmail.com"
              onClick={() => playClick()}
              className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 transition-all ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
          <div>
            © {currentYear} Yves Olivier NSENGIYUMVA. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with React 19, Tailwind &amp; Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
