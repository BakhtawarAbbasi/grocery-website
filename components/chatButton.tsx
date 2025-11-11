'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotButton = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://ecommerce-website-agent.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = {
        sender: 'bot' as const,
        text: data.reply || '⚠️ Gemini assistant returned no reply.',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '⚠️ Server error. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed z-50 p-4 text-white transition-all bg-blue-600 rounded-full shadow-lg cursor-pointer bottom-6 right-6 hover:bg-blue-700"
      >
        <MessageCircle className="w-6 h-6" />
      </div>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-36 right-6 w-80 h-[455px] bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="p-3 text-sm font-bold text-white bg-blue-600 rounded-t-xl">
            🤖 Grocery Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 self-end text-right'
                    : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-xs text-gray-400">Typing...</div>}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-2 p-2 border-t">
            <input
              type="text"
              className="flex-1 px-3 py-1 text-sm border rounded-md focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-3 py-1 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotButton;
