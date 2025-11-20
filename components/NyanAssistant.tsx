import React, { useState, useEffect, useRef } from 'react';
import { chatWithNyan } from '../services/geminiService';
import { MessageCircle, X, Send } from 'lucide-react';

interface Props {
  currentScore: number;
}

const NyanAssistant: React.FC<Props> = ({ currentScore }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'nyan'; text: string }[]>([
    { sender: 'nyan', text: 'Meow! Welcome to the party! 🌈🥳' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    const reply = await chatWithNyan(userText, currentScore);

    setMessages(prev => [...prev, { sender: 'nyan', text: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg border-2 border-white animate-bounce flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[500px] max-h-[90vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded-full">
                    <span className="text-xl">🐱</span>
                </div>
                <h3 className="text-white font-bold font-pixel text-sm">Party Nyan AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`
                    max-w-[80%] px-4 py-2 rounded-2xl text-sm
                    ${msg.sender === 'user' 
                      ? 'bg-blue-500 text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none border border-gray-300'}
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-4 py-2 rounded-2xl rounded-tl-none">
                    <span className="animate-pulse">...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-white flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Say meow..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NyanAssistant;
