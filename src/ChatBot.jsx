import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

const OPENING_MESSAGE = "我是王鹏，7年产品+3年AI产品落地经验。您是想了解我的工作经历吗，欢迎提问～～～";

// API 代理地址
const API_URL = '/api/chat';

// 简历上下文
const RESUME_CONTEXT = `你是王鹏的AI简历助手。请根据以下简历信息回答用户问题，回答简洁有条理，不要显示思考过程，直接给出回答。

王鹏简历信息：
- 姓名：王鹏
- 职位：AI产品经理
- 经验：7年产品经验，3年AI落地经验
- 电话：131 6176 2911
- 邮箱：13161762911@163.com
- 教育：北京信息科技大学，新能源科学与工程专业，2015.09-2019.06

工作经历：
1. 北京卡车之家信息技术股份有限公司（2025.06-2026.03），AI产品经理
   - 负责AI Agent产品矩阵，主导AI选车、用户舆情、KOL短视频脚本等智能体产品
   - 智能体单月生成5000+条内容，创作周期缩短40%

2. 北京无忧创想信息技术有限公司/51CTO（2023.10-2025.04），AI产品经理
   - 主导一体化人才云AI测评产品，签约宁波银行等百万级客户
   - AI学习小助手日访问2000+，平台PV提升60%
   - 单题成本从10元降至1元

3. 北京玻色量子科技有限公司（2022.07-2023.08），AI产品经理
   - 探索AI与量子计算产品化，设计量子直接通信云平台交付北京量子院
   - 机场噪声监测数据平台落地浦东、长沙机场

4. 北大公学教育集团（2018.06-2022.07），产品经理
   - SaaS平台从30家扩至700家，续约率提升25%
   - 在线订货商城年GMV从1600万提升至2200万+

技能特长：
- AI产品：Dify、Coze、FastGPT、Prompt工程、AI Agent、RAG
- AI工具：Claude Code、Cursor、OpenClaw
- 商业化：SaaS、B端商业化、用户增长、项目交付`;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: OPENING_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, streamingText, isOpen]);

  // 逐字显示动画
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef('');

  useEffect(() => {
    if (!isStreaming || !streamingText) {
      if (!isStreaming) setDisplayedText('');
      return;
    }

    textRef.current = streamingText;
    setDisplayedText('');

    let index = 0;
    const timer = setInterval(() => {
      if (index < textRef.current.length) {
        setDisplayedText(textRef.current.slice(0, index + 1));
        index++;
        scrollToBottom();
      } else {
        clearInterval(timer);
        // 完成后保存到消息列表
        setMessages(prev => [...prev, { role: 'assistant', content: textRef.current }]);
        setStreamingText('');
        setIsStreaming(false);
      }
    }, 30); // 每30ms显示一个字

    return () => clearInterval(timer);
  }, [streamingText, isStreaming]);

  // 调用流式 API
  const callMinimaxAPI = async (userMessage) => {
    const conversationHistory = [
      { role: 'system', content: RESUME_CONTEXT },
      ...messages.filter(m => !m.isLoading),
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: conversationHistory, stream: true }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // 处理流式响应
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        // 解析 SSE 格式数据
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data && data !== '[DONE]') {
              try {
                const parsed = JSON.parse(data);
                if (parsed.response) {
                  fullText += parsed.response;
                  setStreamingText(fullText);
                }
              } catch (e) {
                // 忽略解析错误
              }
            }
          }
        }
      }

      if (!fullText) {
        return '抱歉，我现在无法回答您的问题，请稍后再试。';
      }

      return fullText;
    } catch (error) {
      console.error('API Error:', error);
      return '抱歉，AI服务暂时不可用。请检查网络连接或稍后再试。';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const response = await callMinimaxAPI(input.trim());

    // 如果不是流式响应，直接显示
    if (!response && isStreaming) {
      // 流式响应会通过 useEffect 处理
    } else if (!isStreaming) {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-blue-500/40 transition-all z-50"
        style={{ boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)' }}
      >
        <Bot className="text-white" size={28} />
      </motion.button>

      {/* Chat Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={22} />
                </div>
                <div>
                  <h3 className="text-white font-bold">王鹏 AI 助手</h3>
                  <p className="text-white/70 text-xs">{isStreaming ? '输入中...' : '在线'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors"
              >
                <X className="text-white" size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-800/50">
              {messages.filter(m => !m.isLoading).map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* 流式输出显示 */}
              {isStreaming && displayedText && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-md shadow-sm">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {displayedText}
                      <span className="inline-block w-2 h-4 bg-blue-500 ml-1 animate-pulse"></span>
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入您的问题..."
                  disabled={isStreaming}
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 dark:text-slate-200 placeholder:text-slate-400 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="text-white" size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
