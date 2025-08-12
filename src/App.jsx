import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Send, Plus, Menu, User, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw, Share, Mic, Image, Paperclip, Settings, Moon, Sun } from 'lucide-react';

const GeminiClone = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Memoized conversations to prevent unnecessary re-renders
  const conversations = useMemo(() => [
    { id: 1, title: 'React Best Practices', preview: 'How to optimize React performance...', timestamp: '2 hours ago', messages: 12 },
    { id: 2, title: 'AI Ethics & Future', preview: 'Discussing ethical implications of AI...', timestamp: '1 day ago', messages: 8 },
    { id: 3, title: 'Japan Travel Guide', preview: 'Planning a 2-week trip to Tokyo...', timestamp: '3 days ago', messages: 15 },
    { id: 4, title: 'Machine Learning Basics', preview: 'Introduction to neural networks...', timestamp: '1 week ago', messages: 6 }
  ], []);

  // Optimized scroll to bottom with requestAnimationFrame
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Enhanced AI response system with more context awareness
  const simulateAIResponse = useCallback((userMessage) => {
    const responses = {
      greetings: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
        response: "Hello! I'm Gemini, your AI assistant. I'm here to help you with anything from coding and analysis to creative writing and problem-solving. What would you like to explore today?"
      },
      react: {
        patterns: ['react', 'jsx', 'component', 'hook'],
        response: "React is a powerful JavaScript library for building user interfaces. It features a component-based architecture, virtual DOM for performance, and hooks for state management. Key concepts include JSX syntax, props, state, and the component lifecycle. Would you like me to explain any specific React concept in detail?"
      },
      ai: {
        patterns: ['artificial intelligence', 'ai', 'machine learning', 'neural network'],
        response: "Artificial Intelligence encompasses various technologies that enable machines to simulate human intelligence. This includes machine learning (algorithms that learn from data), natural language processing (understanding human language), computer vision (interpreting visual information), and deep learning (neural networks with multiple layers). AI is transforming industries from healthcare to finance."
      },
      coding: {
        patterns: ['code', 'programming', 'javascript', 'python', 'algorithm'],
        response: "I'd be happy to help with coding! I can assist with various programming languages, debugging, code optimization, algorithm design, and best practices. What specific programming challenge are you working on?"
      },
      creative: {
        patterns: ['write', 'story', 'creative', 'poem', 'article'],
        response: "I love helping with creative projects! I can assist with storytelling, poetry, articles, scripts, and various forms of creative writing. I can help with brainstorming, structure, style, and refinement. What kind of creative project are you working on?"
      }
    };

    const lowerMessage = userMessage.toLowerCase();

    for (const [category, data] of Object.entries(responses)) {
      if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
        return data.response;
      }
    }

    return "That's a fascinating question! I'm designed to help with a wide range of topics including programming, analysis, creative writing, math, science, and general problem-solving. I can break down complex topics, help with research, assist with coding, or engage in creative projects. What specific area would you like to dive into?";
  }, []);

  // Optimized message sending with better state management
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate realistic AI response time based on message length
    const responseDelay = Math.min(Math.max(currentInput.length * 20, 800), 3000);

    setTimeout(() => {
      const aiResponse = {
        id: `ai-${Date.now()}`,
        text: simulateAIResponse(currentInput),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'received'
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, responseDelay);
  }, [inputValue, simulateAIResponse]);

  // Enhanced keyboard handling
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Auto-resize textarea
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);

    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([]);
    setCurrentConversation(null);
    setSidebarOpen(false);
  }, []);

  const copyMessage = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text');
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  // Enhanced typing indicator with staggered animation
  const TypingIndicator = React.memo(() => (
    <div className={`flex items-center space-x-3 p-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <Sparkles className="w-5 h-5 text-white animate-pulse" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full animate-bounce ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1s' }}
            />
          ))}
        </div>
        <span className="text-sm font-medium">Gemini is thinking...</span>
      </div>
    </div>
  ));

  // Enhanced message actions with better UX
  const MessageActions = React.memo(({ message }) => (
    <div className="flex items-center space-x-1 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
      {[
        { icon: Copy, action: () => copyMessage(message.text), label: 'Copy' },
        { icon: ThumbsUp, action: () => { }, label: 'Good response' },
        { icon: ThumbsDown, action: () => { }, label: 'Bad response' },
        { icon: RotateCcw, action: () => { }, label: 'Regenerate' },
        { icon: Share, action: () => { }, label: 'Share' }
      ].map(({ icon: Icon, action, label }, index) => (
        <button
          key={index}
          onClick={action}
          className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${darkMode
            ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200'
            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  ));

  // Enhanced suggestions with categories
  const suggestions = useMemo(() => [
    {
      category: "Creative",
      title: "Write a creative story",
      subtitle: "about space exploration and discovery",
      icon: "✨",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      category: "Learning",
      title: "Explain quantum computing",
      subtitle: "in simple, easy-to-understand terms",
      icon: "🧠",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      category: "Coding",
      title: "Help debug my code",
      subtitle: "optimize performance and fix errors",
      icon: "💻",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      category: "Planning",
      title: "Create a meal plan",
      subtitle: "healthy and balanced for the week",
      icon: "🍎",
      gradient: "from-orange-500 to-amber-500"
    }
  ], []);

  const themeClasses = darkMode
    ? 'bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  const sidebarClasses = darkMode
    ? 'bg-gray-800 border-gray-700'
    : 'bg-gray-50 border-gray-200';

  return (
    <div className={`flex h-screen transition-colors duration-300 ${themeClasses}`}>
      {/* Enhanced Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50
        w-64 sm:w-64 md:w-60 lg:w-1/6
        ${sidebarClasses} border-r
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={startNewChat}
              className={`w-full flex items-center justify-center space-x-3 border rounded-xl py-3 px-4 transition-all duration-200 hover:scale-[1.02] ${darkMode
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600 text-white'
                : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-900'
                }`}
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">New Chat</span>
            </button>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Recent Conversations
              </h3>
              <button className={`p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                <Settings className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`group flex items-center justify-between w-full p-3 rounded-lg cursor-pointer transition-colors duration-200 ${currentConversation === conv.id
                    ? darkMode
                      ? 'bg-gray-700'
                      : 'bg-blue-50'
                    : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                    }`}
                  onClick={() => setCurrentConversation(conv.id)}
                >
                  {/* Conversation Name */}
                  <span
                    className={`flex-1 truncate ${darkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}
                  >
                    {conv.title}
                  </span>

                  {/* 3-dot menu button (hidden until hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent opening the conversation
                      console.log(`Menu for ${conv.id}`);
                    }}
                    className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="5" cy="12" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Header */}
        <header className={`flex items-center justify-between p-4 backdrop-blur-sm ${darkMode ? 'border-gray-700 bg-gray-900/80' : 'border-gray-200 bg-white/80'
          }`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gemini
                </h1>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  AI Assistant
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <Share className="w-5 h-5" />
            </button>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Enhanced Messages Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-full p-8">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white animate-pulse"></div>
              </div>

              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Hello, I'm Gemini
              </h2>
              <p className={`text-center max-w-2xl mb-12 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your intelligent AI assistant ready to help with anything from complex analysis and coding to creative writing and problem-solving. What would you like to explore today?
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(suggestion.title)}
                    className={`group p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${darkMode
                      ? 'border-gray-700 bg-gray-800 hover:bg-gray-750'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${suggestion.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-xl">{suggestion.icon}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {suggestion.category}
                        </div>
                        <div className={`font-semibold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {suggestion.title}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {suggestion.subtitle}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 p-6 min-h-full">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`group max-w-4xl w-full ${message.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                    <div className="flex items-start space-x-4">
                      {message.sender === 'ai' && (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      )}

                      <div className={`flex-1 ${message.sender === 'user' ? 'order-first' : ''}`}>
                        <div className={`p-4 rounded-2xl transition-all duration-200 ${message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto max-w-2xl shadow-lg'
                          : darkMode
                            ? 'bg-gray-800 text-gray-100 border border-gray-700'
                            : 'bg-gray-100 text-gray-900 border border-gray-200'
                          }`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                        </div>

                        <div className={`flex items-center ${message.sender === "user" ? 'justify-end' : "justify-between"} mt-3`}>
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {message.timestamp}
                          </span>
                          {message.sender === 'ai' && <MessageActions message={message} />}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Enhanced Input Area */}
        <div className={`p-4 sm:p-6 ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex flex-wrap items-end gap-3">
              {/* Textarea + Icons */}
              <div className="flex-1 relative min-w-[200px]">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Message Gemini..."
                  className={`w-full resize-none rounded-2xl px-4 sm:px-6 py-3 sm:py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${darkMode
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-750'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white'
                    } border`}
                  rows="1"
                  style={{ minHeight: '48px', maxHeight: '160px' }}
                />

                {/* Action icons */}
                <div className="absolute right-3 sm:right-4 bottom-3 flex items-center gap-2">
                  {[
                    { icon: Paperclip, label: 'Attach file' },
                    { icon: Image, label: 'Add image' },
                    { icon: Mic, label: 'Voice input' }
                  ].map(({ icon: Icon, label }, index) => (
                    <button
                      key={index}
                      className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 hover:scale-110 ${darkMode
                        ? 'hover:bg-gray-700 text-gray-400'
                        : 'hover:bg-gray-200 text-gray-500'
                        }`}
                      title={label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Send button */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg disabled:shadow-none"
                style={{ marginBottom: "7px" }}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer text */}
            <p className={`text-xs mt-3 text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Gemini may display inaccurate info, including about people, so double-check its responses.
              <button className="underline ml-1 hover:no-underline">Your privacy & Gemini Apps</button>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default GeminiClone;
