// src/components/CommandPalette.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Terminal, Code2, FolderGit2, BookOpen, Mail, 
  Moon, Sun, Volume2, VolumeX, Bot, ArrowRight, CornerDownLeft, 
  ExternalLink, Copy, Check 
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { isSoundEnabled, setSoundEnabled, playClick, playSuccess } from '../utils/sound';

export const openCommandPalette = () => {
  window.dispatchEvent(new CustomEvent('toggle-command-palette', { detail: { open: true } }));
};

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomToggle = (e) => {
      if (e.detail?.open !== undefined) {
        setIsOpen(e.detail.open);
      } else {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-command-palette', handleCustomToggle);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-command-palette', handleCustomToggle);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      playSuccess();
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    setIsOpen(false);
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('oliviernsengiyumva010@gmail.com');
    setCopied(true);
    playSuccess();
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const handleToggleSound = () => {
    const nextState = !soundOn;
    setSoundEnabled(nextState);
    setSoundOn(nextState);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    playClick();
  };

  const handleOpenAI = () => {
    setIsOpen(false);
    playClick();
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
  };

  const allActions = [
    {
      id: 'home',
      name: 'Go to Home / Overview',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollTo('home'),
      badge: '#home'
    },
    {
      id: 'capabilities',
      name: 'Explore Engineering Capabilities',
      category: 'Navigation',
      icon: Code2,
      action: () => scrollTo('services'),
      badge: '#capabilities'
    },
    {
      id: 'projects',
      name: 'View Featured Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => scrollTo('projects'),
      badge: '#projects'
    },
    {
      id: 'about',
      name: 'About Me & Interactive Terminal',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollTo('about'),
      badge: '#about'
    },
    {
      id: 'blog',
      name: 'Read Tech Articles & Blog',
      category: 'Navigation',
      icon: BookOpen,
      action: () => scrollTo('blog'),
      badge: '#blog'
    },
    {
      id: 'contact',
      name: 'Get in Touch / Contact Form',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('contact'),
      badge: '#contact'
    },
    {
      id: 'ai-copilot',
      name: 'Open AI Developer Copilot',
      category: 'Interactive Tools',
      icon: Bot,
      action: handleOpenAI,
      badge: 'AI'
    },
    {
      id: 'theme',
      name: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      action: handleToggleTheme,
      badge: theme === 'dark' ? 'Light' : 'Dark'
    },
    {
      id: 'sound',
      name: soundOn ? 'Mute Interface Sounds' : 'Enable Mechanical Interface Sounds',
      category: 'Preferences',
      icon: soundOn ? VolumeX : Volume2,
      action: handleToggleSound,
      badge: soundOn ? 'ON' : 'OFF'
    },
    {
      id: 'copy-email',
      name: copied ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      category: 'Actions',
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
      badge: 'oliviernsengiyumva010@gmail.com'
    },
    {
      id: 'github',
      name: 'Open GitHub Profile (@olivier010)',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        setIsOpen(false);
        window.open('https://github.com/olivier010', '_blank', 'noopener,noreferrer');
      },
      badge: 'github.com'
    },
    {
      id: 'linkedin',
      name: 'Open LinkedIn Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        setIsOpen(false);
        window.open('https://www.linkedin.com/in/olivier-nsengiyumva-252a46290/', '_blank', 'noopener,noreferrer');
      },
      badge: 'linkedin.com'
    }
  ];

  const filteredActions = allActions.filter(action => 
    action.name.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase()) ||
    (action.badge && action.badge.toLowerCase().includes(query.toLowerCase()))
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0c0f19]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-2xl shadow-cyan-500/10 z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-white/10 gap-3">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none font-sans"
              />
              <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono rounded bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">
                ESC
              </span>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No commands matching &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredActions.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all duration-150 ${
                        isSelected
                          ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-lg shrink-0 ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="truncate font-medium">{item.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {item.badge && (
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                            isSelected 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {isSelected && <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50/80 dark:bg-white/[0.02] border-t border-gray-200 dark:border-white/5 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary-600 dark:text-primary-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>Command Menu</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
