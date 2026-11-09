// src/components/AIChatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Maximize2, RefreshCw } from 'lucide-react';
import { getChatResponse } from '../services/openai';
import { playClick } from '../utils/sound';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Yves's AI Assistant. I have direct access to his verified projects, technical stack, experience, and contact details. Ask me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState([
    "Tell me about your projects",
    "Who is Yves?",
    "What is your tech stack?",
    "What services do you offer?",
    "How can I contact or hire you?",
    "What blog posts have you written?"
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    return () => window.removeEventListener('open-ai-chat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);


  const handleSendMessage = async (textToSend) => {
    const messageContent = (typeof textToSend === 'string' ? textToSend : inputMessage).trim();
    if (!messageContent || isTyping) return;

    playClick();

    const userMessage = {
      id: Date.now(),
      text: messageContent,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(messageContent, messages);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having a momentary connection glitch. Feel free to contact Yves directly at [oliviernsengiyumva010@gmail.com](mailto:oliviernsengiyumva010@gmail.com)!",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleClearHistory = () => {
    playClick();
    setMessages([
      {
        id: Date.now(),
        text: "Chat cleared! What else would you like to know about Yves's work?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          playClick();
          setIsOpen(true);
        }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-500 text-white shadow-xl hover:shadow-primary-500/30 hover:scale-105 active:scale-95 transition-all duration-200 z-50 group flex items-center justify-center border border-white/20"
        aria-label="Open AI Portfolio Chat"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
        </div>
        <span className="hidden sm:inline-block ml-2.5 text-xs font-mono font-semibold tracking-wide pr-1">
          Chat with AI
        </span>
      </button>
    );
  }

  // Minimized state
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-72 sm:w-80 h-14 bg-white/95 dark:bg-[#0c101c]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-4 z-50 transition-all">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-7 h-7 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
            <Bot className="w-4 h-4" />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">Yves AI Assistant</p>
            <p className="text-[10px] text-emerald-500 font-mono">● Active</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              playClick();
              setIsMinimized(false);
            }}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
            title="Maximize"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Expanded Responsive Window
  return (
    <div className="fixed inset-x-2 bottom-2 top-16 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-[620px] sm:max-h-[85vh] bg-white/95 dark:bg-[#0c101c]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-primary-600 via-primary-500 to-cyan-500 text-white flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-tight leading-none">Yves AI Assistant</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
            </div>
            <p className="text-[11px] text-white/80 font-mono mt-0.5">Portfolio Intelligence • Gemini Powered</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearHistory}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            title="Clear Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              playClick();
              setIsMinimized(true);
            }}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              playClick();
              setIsOpen(false);
            }}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10">
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 border border-primary-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-primary-600 to-cyan-600 text-white rounded-tr-none shadow-md'
                    : 'bg-gray-100 dark:bg-white/[0.04] text-gray-800 dark:text-gray-200 border border-gray-200/80 dark:border-white/10 rounded-tl-none'
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-a:text-primary-500 dark:prose-a:text-primary-400 prose-a:underline break-words text-xs sm:text-sm">
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  </div>
                )}

                <div
                  className={`text-[10px] font-mono mt-1 ${
                    isUser ? 'text-white/70 text-right' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-primary-500/10 text-primary-500 border border-primary-500/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-gray-100 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      <div className="px-3 sm:px-4 py-2 border-t border-gray-100 dark:border-white/5 bg-gray-50/60 dark:bg-white/[0.01] flex-shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={isTyping}
              className="text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 transition-colors whitespace-nowrap flex-shrink-0 disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c101c] flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about Yves's projects, tech stack, or hiring..."
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
            className="p-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-cyan-600 text-white hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-md"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
