// src/components/messages/ChatBox.tsx
import React, { useState, useEffect, useRef } from 'react';
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
  const [isRefetching, setIsRefetching] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { data: messagesData, isLoading, error, refetch } = useGetChatMessagesQuery(chatId, {
    skip: isNewChat
  });

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messagesData?.messages) {
      setMessages(messagesData.messages);
      setTimeout(scrollToBottom, 100);
    }
  }, [messagesData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!isNewChat && chatId) {
        setIsRefetching(true);
        try {
          await refetch();
        } finally {
          setIsRefetching(false);
        }
      }
    };
    fetchMessages();
  }, [chatId, isNewChat, refetch]);

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
      
      // Emit mark-as-read event
      if (sender?._id && chatId) {
        newSocket.emit('mark-as-read', {
          chatId,
          userId: sender._id
        });
      }
    }

    // Listen for join confirmation
    newSocket.on('on-join', (message: string) => {
      console.log('Join confirmation:', message);
    });

    // Listen for new messages
    newSocket.on('new-message', (message: Message) => {
      console.log('Received new message:', message);
      setMessages(prev => {
        // Check if message already exists (for messages we just sent)
        const messageExists = prev.some(msg => 
          msg._id === message._id || 
          (msg.from === message.from && 
           msg.message === message.message && 
           Math.abs(new Date(msg.createdAt).getTime() - new Date(message.createdAt).getTime()) < 1000)
        );
        if (messageExists) return prev;
        return [...prev, message];
      });
    });

    // Listen for messages-read event
    newSocket.on('messages-read', (data: { chatId: string; unreadCount: number }) => {
      console.log('Messages marked as read:', data);
      // Emit a global event that SideNav can listen to
      newSocket.emit('messages-read-global', data);
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
  }, [chatId, isNewChat, sender]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
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

    // Create temporary message to show immediately
    const tempMessage = {
      _id: Date.now().toString(),
      chat: chatId,
      from: sender._id,
      userType: sender.userType,
      message: message.trim(),
      status: 'sent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      to: recipientId
    };

    // Add message to chat immediately
    setMessages(prev => [...prev, tempMessage]);
    setMessage('');

    // Send through socket if connected
    if (socket?.connected) {
      console.log('Sending message with payload:', payload);
      socket.emit('send-message', payload);
    } else {
      console.error('Socket is not connected');
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
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative">
        {(isLoading || isRefetching) ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF00A2]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            Error loading messages
          </div>
        ) : (
          <>
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
                  <p className="font-['Space_Grotesk'] whitespace-pre-wrap">{msg.message}</p>
                  <span className="text-xs opacity-70 mt-1 block">{formatTime(msg.createdAt)}</span>
                </div>
              </div>
            ))}
            {isNewChat && messages.length === 0 && (
              <div className="text-center text-white/70 py-8">
                Start a new conversation
              </div>
            )}
          </>
        )}
      </div>

      {/* Message input */}
      <div className="p-4 bg-[#0D0D0D] border-t border-[#383838]">
        <div className="flex items-center space-x-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Shift + Enter for new line)"
            className="flex-1 bg-[#1D1D1D] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF00A2] font-['Space_Grotesk'] resize-none min-h-[40px] max-h-[120px]"
            rows={1}
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