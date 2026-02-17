// src/components/AIChatbot.jsx
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react'
import { getChatResponse } from '../services/openai'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI portfolio assistant. I have access to all your projects, blog posts, and portfolio information. Ask me anything about your work!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState([
    "Tell me about your projects",
    "What blog posts have you written?",
    "What technologies do you use?",
    "How can I contact you?",
    "Show me your recent work"
  ])
  const [portfolioLoaded, setPortfolioLoaded] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  // Load dynamic suggestions when chat opens
  useEffect(() => {
    if (isOpen && !portfolioLoaded) {
      loadDynamicSuggestions()
      setPortfolioLoaded(true)
    }
  }, [isOpen])

  const loadDynamicSuggestions = async () => {
    try {
      // Import and call the portfolio data function
      const { getPortfolioData } = await import('../services/openai')
      const portfolioData = await getPortfolioData()
      
      const dynamicSuggestions = []
      
      // Add project-specific suggestions
      if (portfolioData.projects.length > 0) {
        const randomProject = portfolioData.projects[Math.floor(Math.random() * portfolioData.projects.length)]
        dynamicSuggestions.push(`Tell me about ${randomProject.title}`)
      }
      
      // Add blog-specific suggestions
      if (portfolioData.blogPosts.length > 0) {
        const randomPost = portfolioData.blogPosts[Math.floor(Math.random() * portfolioData.blogPosts.length)]
        dynamicSuggestions.push(`What's "${randomPost.title}" about?`)
      }
      
      // Add technology suggestions
      if (portfolioData.projects.length > 0) {
        const allTechs = [...new Set(portfolioData.projects.flatMap(p => Array.isArray(p.technologies) ? p.technologies : []))]
        if (allTechs.length > 0) {
          const randomTech = allTechs[Math.floor(Math.random() * Math.min(5, allTechs.length))]
          dynamicSuggestions.push(`How do you use ${randomTech}?`)
        }
      }
      
      // Add general suggestions
      dynamicSuggestions.push("Who is Yves?")
      dynamicSuggestions.push("What's your background?")
      dynamicSuggestions.push("What services do you offer?")
      
      // Update suggestions with dynamic ones
      setSuggestions(dynamicSuggestions.slice(0, 5))
      
      // Update welcome message
      setMessages(prev => [
        {
          ...prev[0],
          text: `Hi! I'm your AI portfolio assistant. I can tell you about your ${portfolioData.projects.length} projects, ${portfolioData.blogPosts.length} blog posts, and answer questions about your work. What would you like to know?`
        }
      ])
      
    } catch (error) {
      console.error('Error loading dynamic suggestions:', error)
      // Keep default suggestions if there's an error
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    try {
      const response = await getChatResponse(inputMessage.trim(), messages)
      
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000) // Simulate thinking time
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please try again or contact me directly via email.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50 group ${
          window.innerWidth < 640 ? 'bottom-6 right-6 p-3' : 'bottom-6 right-6 p-4'
        }`}
        aria-label="Open AI Chat"
      >
        <MessageCircle className={`${window.innerWidth < 640 ? 'w-5 h-5' : 'w-6 h-6'}`} />
        {window.innerWidth >= 640 && (
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Chat with AI Assistant
          </span>
        )}
      </button>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 
      window.innerWidth < 640 ? 'fixed inset-4 w-auto h-auto flex flex-col' :
      window.innerWidth < 768 ? 'fixed bottom-6 right-6 w-[calc(100vw-4rem)] h-[600px] max-h-[80vh]' :
      'fixed bottom-6 right-6 w-96 h-[600px] max-h-[80vh]'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bot className="w-5 h-5" />
            <Sparkles className="w-3 h-3 absolute -bottom-1 -right-1 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs opacity-90">Portfolio Expert</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className={`overflow-y-auto p-4 space-y-4 flex-1 ${
            window.innerWidth < 640 ? 'min-h-0' : 'h-[440px]'
          }`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`${
                    message.sender === 'user' ? 'max-w-[85%]' : 'max-w-[90%]'
                  } px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className={`px-4 pb-2 flex-shrink-0 ${
              window.innerWidth < 640 ? 'px-3 py-2' : 'px-4 pb-2'
            }`}>
              <div className={`flex flex-wrap gap-2 ${
                window.innerWidth < 640 ? 'gap-1.5' : 'gap-2'
              }`}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`${
                      window.innerWidth < 640 ? 'text-xs px-2 py-1 text-xs' : 'text-xs px-3 py-1'
                    } bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`border-t border-gray-200 dark:border-gray-700 flex-shrink-0 ${
            window.innerWidth < 640 ? 'p-3' : 'p-4'
          }`}>
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about projects, skills, or blog posts..."
                className={`flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  window.innerWidth < 640 ? 'text-sm px-3 py-2' : 'text-sm px-4 py-2'
                }`}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 ${
                  window.innerWidth < 640 ? 'p-2' : 'p-2'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
