// src/components/CodeTypingIDE.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Copy, Check, FileCode2 } from 'lucide-react';
import { playClick } from '../utils/sound';

const TOKENS = [
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
  { text: "  title: ", type: "property" },
  { text: "'Full-Stack Software Engineer'", type: "string" },
  { text: ",\n" },
  { text: "  location: ", type: "property" },
  { text: "'Kigali, Rwanda (CAT / UTC+2)'", type: "string" },
  { text: ",\n" },
  { text: "  stack: ", type: "property" },
  { text: "['React 19', 'TypeScript', 'Node.js', 'Tailwind']", type: "string" },
  { text: ",\n" },
  { text: "  passion: ", type: "property" },
  { text: "'Building resilient & high-velocity web apps'", type: "string" },
  { text: ",\n" },
  { text: "  cleanArchitecture: ", type: "property" },
  { text: "true", type: "boolean" },
  { text: ",\n" },
  { text: "  status: ", type: "property" },
  { text: "'Crafting future-ready digital platforms'", type: "string" },
  { text: "\n};\n\n" },
  { text: "// Delivering excellence through clean code\n", type: "comment" },
  { text: "engineer.", type: "variable" },
  { text: "deployExcellence", type: "function" },
  { text: "();", type: "plain" }
];

const FULL_CODE_TEXT = TOKENS.map(t => t.text).join('');
const TOTAL_CHARS = FULL_CODE_TEXT.length;

const CodeTypingIDE = () => {
  const [charIndex, setCharIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Wait until initial page load settles before starting typing animation
  useEffect(() => {
    const readyTimer = setTimeout(() => setIsReady(true), 350);
    return () => clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    let timer;

    if (charIndex < TOTAL_CHARS) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const step = isMobile ? 2 : 1;
      const nextChar = FULL_CODE_TEXT[charIndex];
      let delay = isMobile ? 35 : 22;
      if (nextChar === '\n') delay = isMobile ? 60 : 50;
      else if (nextChar === ' ') delay = isMobile ? 20 : 15;
      else if (nextChar === ',' || nextChar === ';') delay = isMobile ? 50 : 45;

      timer = setTimeout(() => {
        setCharIndex((prev) => Math.min(TOTAL_CHARS, prev + step));
      }, delay);
    } else {
      // Pause at full code before restarting
      timer = setTimeout(() => {
        setCharIndex(0);
      }, 7000);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isReady]);

  // Render tokens up to current charIndex
  const renderedContent = useMemo(() => {
    let count = 0;
    const elements = [];

    for (let i = 0; i < TOKENS.length; i++) {
      const token = TOKENS[i];
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
  }, [charIndex]);

  // Determine line count for line numbers
  const currentText = FULL_CODE_TEXT.slice(0, charIndex);
  const totalRenderedLines = Math.max(1, currentText.split('\n').length);
  const maxLines = 14;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_CODE_TEXT);
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const getTokenClass = (type) => {
    switch (type) {
      case 'keyword':
        return 'text-violet-500 dark:text-violet-400 font-semibold';
      case 'type':
        return 'text-amber-500 dark:text-amber-400 font-medium';
      case 'variable':
        return 'text-primary-600 dark:text-primary-400 font-medium';
      case 'property':
        return 'text-cyan-600 dark:text-cyan-400';
      case 'string':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'boolean':
        return 'text-rose-500 dark:text-rose-400 font-bold';
      case 'comment':
        return 'text-gray-400 dark:text-gray-500 italic';
      case 'function':
        return 'text-yellow-600 dark:text-yellow-400 font-medium';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="relative rounded-2xl bg-white dark:bg-[#0c0f18] border border-gray-200 dark:border-white/10 shadow-2xl shadow-primary-500/10 overflow-hidden backdrop-blur-xl transition-all">
      
      {/* macOS IDE Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-100/80 dark:bg-white/[0.04] border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>

        {/* File Tab */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-white/5 shadow-xs">
          <FileCode2 className="w-3.5 h-3.5 text-primary-500" />
          <span className="text-xs font-mono font-medium text-gray-800 dark:text-gray-200">
            developer.ts
          </span>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-mono text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          title="Copy code snippet"
        >
          {copied ? (
            <span className="flex items-center gap-1 text-emerald-500">
              <Check className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copied</span>
            </span>
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Editor Body with Line Numbers & Typing Animation */}
      <div className="flex p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[360px] sm:min-h-[380px]">
        {/* Line Numbers */}
        <div className="select-none pr-4 text-right text-gray-400 dark:text-gray-600 font-mono border-r border-gray-200 dark:border-white/10 shrink-0">
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
        <div className="pl-4 flex-1 whitespace-pre overflow-x-auto">
          {renderedContent.map((item) => (
            <span key={item.key} className={getTokenClass(item.type)}>
              {item.text}
            </span>
          ))}
          {/* Animated Blinking Cursor */}
          <span className="inline-block w-2 h-4 bg-primary-500 dark:bg-cyan-400 ml-0.5 align-middle animate-pulse" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100/90 dark:bg-black/40 border-t border-gray-200 dark:border-white/5 text-[11px] font-mono text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>TypeScript • UTF-8</span>
        </div>
        <span>Ln {totalRenderedLines}, Col {currentText.split('\n').pop()?.length || 1}</span>
      </div>

    </div>
  );
};

export default CodeTypingIDE;
