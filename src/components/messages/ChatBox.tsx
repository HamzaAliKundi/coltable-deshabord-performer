// src/components/messages/ChatBox.tsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useGetChatMessagesQuery } from '../../apis/messages';
import io from 'socket.io-client';

interface Message {
  _id: string;
  chat: string;
  from: string;
  userType: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  to: string;
}

interface ChatBoxProps {
  recipientName: string;
  recipientImage?: string;
  chatId: string;
  onBack: () => void;
  isNewChat?: boolean;
  eventId?: string;
  recipientId?: string;
  sender?: any;
}

const ChatBox = ({ 
  recipientName, 
  recipientImage, 
  chatId, 
  onBack, 
  isNewChat = false,
  eventId,
  recipientId,
  sender
}: ChatBoxProps) => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { data: messagesData, isLoading, error } = useGetChatMessagesQuery(chatId, {
    skip: isNewChat
  });

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
    }
  }, [messagesData]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      timeout: 10000
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
      setSocket(newSocket);
    });

    newSocket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });

    newSocket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected:', reason);
    });

    // Join chat room
    if (!isNewChat && chatId) {
      console.log('Joining chat room:', chatId);
      newSocket.emit('join', chatId);
    }

    // Listen for join confirmation
    newSocket.on('on-join', (message: string) => {
      console.log('Join confirmation:', message);
    });

    // Listen for new messages
    newSocket.on('new-message', (message: Message) => {
      console.log('Received new message:', message);
      setMessages(prev => [...prev, message]);
    });

    // Listen for errors
    newSocket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error.message);
    });

    return () => {
      newSocket.off('connect');
      newSocket.off('connect_error');
      newSocket.off('disconnect');
      newSocket.off('on-join');
      newSocket.off('new-message');
      newSocket.off('error');
      newSocket.disconnect();
    };
  }, [chatId, isNewChat]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleSend = () => {
    if (!socket?.connected) {
      console.error('Socket is not connected');
      return;
    }

    if (!message.trim()) {
      console.log('Message is empty');
      return;
    }

    if (!sender || !recipientId || !eventId) {
      console.error('Missing required data:', { sender, recipientId, eventId });
      return;
    }

    const payload = {
      sender: {
        _id: sender._id,
        userType: sender.userType
      },
      receiverId: recipientId,
      eventId: eventId,
      message: { message: message.trim() }
    };

    console.log('Sending message with payload:', payload);
    
    // Send message and clear input immediately
    socket.emit('send-message', payload);
    setMessage(''); // Clear the input field
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
        {messages.map((msg: Message) => (
          <div
            key={msg._id}
            className={`flex ${msg.userType === 'performer' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-xl p-3 ${
                msg.userType === 'performer'
                  ? 'bg-[#FF00A2] text-white'
                  : 'bg-[#383838] text-white'
              }`}
            >
              <p className="font-['Space_Grotesk']">{msg.message}</p>
              <span className="text-xs opacity-70 mt-1 block">{formatTime(msg.createdAt)}</span>
            </div>
          </div>
        ))}
        {isNewChat && messages.length === 0 && (
          <div className="text-center text-white/70 py-8">
            Start a new conversation
          </div>
        )}
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