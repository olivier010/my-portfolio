// src/components/CodeTypingIDE.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, FileCode2, RotateCcw } from 'lucide-react';
import { playClick, playPop } from '../utils/sound';

const SNIPPETS = {
  'developer.ts': [
    { text: "import", type: "keyword" },
    { text: " { " },
    { text: "Developer", type: "type" },
    { text: " } " },
    { text: "from", type: "keyword" },
    { text: " '@yves/core';", type: "string" },
    { text: "\n\n" },
    { text: "export const ", type: "keyword" },
    { text: "engineer: ", type: "variable" },
    { text: "Developer", type: "type" },
    { text: " = {\n" },
    { text: "  name: ", type: "property" },
    { text: "'Yves Olivier NSENGIYUMVA'", type: "string" },
    { text: ",\n" },
    { text: "  role: ", type: "property" },
    { text: "'Full-Stack Software Engineer'", type: "string" },
    { text: ",\n" },
    { text: "  location: ", type: "property" },
    { text: "'Kigali, Rwanda (UTC+2)'", type: "string" },
    { text: ",\n" },
    { text: "  stack: ", type: "property" },
    { text: "['React 19', 'TypeScript', 'Node.js']", type: "string" },
    { text: ",\n" },
    { text: "  cleanArchitecture: ", type: "property" },
    { text: "true", type: "boolean" },
    { text: ",\n" },
    { text: "  status: ", type: "property" },
    { text: "'Shipping high-velocity apps'", type: "string" },
    { text: "\n};\n\n" },
    { text: "// Ready to build something great\n", type: "comment" },
    { text: "engineer.", type: "variable" },
    { text: "deployExcellence", type: "function" },
    { text: "();", type: "plain" }
  ],
  'stack.json': [
    { text: "{\n", type: "plain" },
    { text: '  "frontend"', type: "property" },
    { text: ": [\n    ", type: "plain" },
    { text: '"React 19"', type: "string" },
    { text: ", ", type: "plain" },
    { text: '"TypeScript"', type: "string" },
    { text: ", ", type: "plain" },
    { text: '"Tailwind"', type: "string" },
    { text: "\n  ],\n", type: "plain" },
    { text: '  "backend"', type: "property" },
    { text: ": [\n    ", type: "plain" },
    { text: '"Node.js"', type: "string" },
    { text: ", ", type: "plain" },
    { text: '"PostgreSQL"', type: "string" },
    { text: ", ", type: "plain" },
    { text: '"REST/GraphQL"', type: "string" },
    { text: "\n  ],\n", type: "plain" },
    { text: '  "ai"', type: "property" },
    { text: ": ", type: "plain" },
    { text: '["Gemini API", "OpenAI", "RAG"]', type: "string" },
    { text: ",\n", type: "plain" },
    { text: '  "lighthouseTarget"', type: "property" },
    { text: ": ", type: "plain" },
    { text: "100", type: "boolean" },
    { text: "\n}", type: "plain" }
  ],
  'motion.tsx': [
    { text: "import", type: "keyword" },
    { text: " { ", type: "plain" },
    { text: "motion", type: "variable" },
    { text: " } ", type: "plain" },
    { text: "from", type: "keyword" },
    { text: " 'framer-motion';\n\n", type: "string" },
    { text: "export const ", type: "keyword" },
    { text: "InteractiveUI", type: "function" },
    { text: " = () => (\n", type: "plain" },
    { text: "  <", type: "plain" },
    { text: "motion.div\n", type: "type" },
    { text: "    whileTap", type: "property" },
    { text: "={{ ", type: "plain" },
    { text: "scale", type: "property" },
    { text: ": 0.97 }}\n", type: "boolean" },
    { text: "    transition", type: "property" },
    { text: "={{ ", type: "plain" },
    { text: "type", type: "property" },
    { text: ": ", type: "plain" },
    { text: "'spring'", type: "string" },
    { text: " }}\n", type: "plain" },
    { text: "  >\n", type: "plain" },
    { text: "    {/* Tactile 60fps UX */}\n", type: "comment" },
    { text: "  </", type: "plain" },
    { text: "motion.div", type: "type" },
    { text: ">\n);", type: "plain" }
  ]
};

const FILE_NAMES = Object.keys(SNIPPETS);

const CodeTypingIDE = () => {
  const [activeFile, setActiveFile] = useState('developer.ts');
  const [charIndex, setCharIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const tokens = SNIPPETS[activeFile];
  const fullCodeText = useMemo(() => tokens.map(t => t.text).join(''), [tokens]);
  const totalChars = fullCodeText.length;

  // Wait until initial page load settles before starting typing animation
  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 350);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    let timer;

    if (charIndex < totalChars) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const step = isMobile ? 2 : 1;
      const nextChar = fullCodeText[charIndex];
      let delay = isMobile ? 32 : 22;
      if (nextChar === '\n') delay = isMobile ? 55 : 48;
      else if (nextChar === ' ') delay = isMobile ? 18 : 14;
      else if (nextChar === ',' || nextChar === ';') delay = isMobile ? 45 : 42;

      timer = setTimeout(() => {
        setCharIndex((prev) => Math.min(totalChars, prev + step));
      }, delay);
    } else {
      // Pause at full code before restarting
      timer = setTimeout(() => {
        setCharIndex(0);
      }, 7000);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isReady, fullCodeText, totalChars]);

  const handleFileSwitch = (fileName) => {
    if (fileName === activeFile) return;
    playPop();
    setActiveFile(fileName);
    setCharIndex(0);
  };

  const handleReplay = () => {
    playClick();
    setCharIndex(0);
  };

  // Render tokens up to current charIndex
  const renderedContent = useMemo(() => {
    let count = 0;
    const elements = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const tokenLength = token.text.length;

      if (count + tokenLength <= charIndex) {
        elements.push({ text: token.text, type: token.type, key: i });
        count += tokenLength;
      } else if (count < charIndex) {
        const remaining = charIndex - count;
        elements.push({ text: token.text.slice(0, remaining), type: token.type, key: i });
        count += remaining;
        break;
      } else {
        break;
      }
    }

    return elements;
  }, [charIndex, tokens]);

  // Determine line count for line numbers
  const currentText = fullCodeText.slice(0, charIndex);
  const totalRenderedLines = Math.max(1, currentText.split('\n').length);
  const maxLines = Math.max(12, fullCodeText.split('\n').length);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCodeText);
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const getTokenClass = (type) => {
    switch (type) {
      case 'keyword':
        return 'text-violet-600 dark:text-violet-400 font-semibold';
      case 'type':
        return 'text-amber-600 dark:text-amber-400 font-medium';
      case 'variable':
        return 'text-primary-600 dark:text-primary-400 font-medium';
      case 'property':
        return 'text-cyan-700 dark:text-cyan-400';
      case 'string':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'boolean':
        return 'text-rose-600 dark:text-rose-400 font-bold';
      case 'comment':
        return 'text-gray-400 dark:text-gray-500 italic';
      case 'function':
        return 'text-amber-600 dark:text-yellow-400 font-medium';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      whileTap={{ scale: 0.995 }}
      className="relative rounded-2xl bg-white/95 dark:bg-[#0c0f18]/95 border border-gray-200 dark:border-white/10 shadow-2xl shadow-primary-500/10 overflow-hidden backdrop-blur-xl transition-all"
    >
      {/* macOS IDE Window Header with Interactive File Tabs */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-gray-100/90 dark:bg-white/[0.04] border-b border-gray-200 dark:border-white/10">
        <div className="hidden xs:flex sm:flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* Interactive File Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {FILE_NAMES.map((fileName) => {
            const isActive = fileName === activeFile;
            return (
              <button
                key={fileName}
                type="button"
                onClick={() => handleFileSwitch(fileName)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 shadow-xs'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-white/5'
                }`}
              >
                <FileCode2 className={`w-3 h-3 ${isActive ? 'text-primary-500' : 'text-gray-400'}`} />
                <span>{fileName}</span>
              </button>
            );
          })}
        </div>

        {/* Replay & Copy Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 rounded-md text-gray-500 hover:text-primary-500 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
            title="Replay typing animation"
            aria-label="Replay typing animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 p-1.5 rounded-md text-xs font-mono text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/80 dark:hover:bg-white/10 transition-colors"
            title="Copy code snippet"
            aria-label="Copy code snippet"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers & Typing Animation */}
      <div className="flex p-3.5 sm:p-5 font-mono text-[11px] sm:text-[13px] leading-relaxed overflow-x-auto min-h-[265px] sm:min-h-[350px]">
        {/* Line Numbers */}
        <div className="select-none pr-3 sm:pr-4 text-right text-gray-400 dark:text-gray-600 font-mono border-r border-gray-200 dark:border-white/10 shrink-0">
          {Array.from({ length: maxLines }).map((_, idx) => (
            <div 
              key={idx + 1}
              className={idx + 1 <= totalRenderedLines ? 'text-gray-500 dark:text-gray-500 font-medium' : 'opacity-30'}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Animated Code Typing Container */}
        <div className="pl-3 sm:pl-4 flex-1 whitespace-pre overflow-x-auto">
          {renderedContent.map((item) => (
            <span key={item.key} className={getTokenClass(item.type)}>
              {item.text}
            </span>
          ))}
          {/* Animated Blinking Cursor */}
          <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-primary-500 dark:bg-cyan-400 ml-0.5 align-middle animate-pulse" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3.5 sm:px-4 py-2 bg-gray-100/90 dark:bg-black/40 border-t border-gray-200 dark:border-white/5 text-[10px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeFile.endsWith('.json') ? 'JSON' : 'TypeScript'} • Tap tabs to switch</span>
        </div>
        <span>Ln {totalRenderedLines}, Col {currentText.split('\n').pop()?.length || 1}</span>
      </div>
    </motion.div>
  );
};

export default CodeTypingIDE;
