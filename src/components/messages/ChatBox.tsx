// src/components/messages/ChatBox.tsx
import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface ChatBoxProps {
  recipientName: string;
  recipientImage?: string;
  onBack: () => void;
}

const ChatBox = ({ recipientName, recipientImage, onBack }: ChatBoxProps) => {
  const [message, setMessage] = useState('');

  // Dummy messages for UI demonstration
  const [messages] = useState([
    { id: 1, text: "Hello, I'm interested in booking you for an event", sender: 'them', time: '10:00 AM' },
    { id: 2, text: "Hi! Thanks for reaching out. I'd love to hear more about the event.", sender: 'me', time: '10:05 AM' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[75vh] bg-[#0D0D0D] rounded-xl overflow-hidden">
      {/* Chat header */}
      <div className="bg-gradient-to-l from-[#0D0D0D] via-[#0D0D0D]/80 to-[#FF00A2] p-4">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-4 text-white hover:text-[#FF00A2] transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
              {recipientImage ? (
                <img src={recipientImage} alt={recipientName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#383838]" />
              )}
            </div>
            <span className="ml-3 text-white font-['Space_Grotesk'] text-lg">{recipientName}</span>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-3 ${
                msg.sender === 'me'
                  ? 'bg-[#FF00A2] text-white'
                  : 'bg-[#383838] text-white'
              }`}
            >
              <p className="font-['Space_Grotesk']">{msg.text}</p>
              <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <div className="p-4 bg-[#0D0D0D] border-t border-[#383838]">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-[#1D1D1D] text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] font-['Space_Grotesk']"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-[#FF00A2] text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;