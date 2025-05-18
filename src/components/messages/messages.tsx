import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import MessageCard from './MessageCard';
import { useGetAllChatsQuery } from '../../apis/messages';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetPerformerProfileQuery } from '../../apis/profile';
import io from 'socket.io-client';

interface Participant {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  userType: string;
  logo?: string;
}

interface Chat {
  _id: string;
  event: string;
  latestMessage: string;
  latestMessageSentAt: string;
  createdAt: string;
  updatedAt: string;
  participant: Participant;
  eventName?: string;
  performerUnreadCount?: number;
  venueUnreadCount?: number;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch: refetchChats } = useGetAllChatsQuery({});
  const { data: profileData, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetPerformerProfileQuery({});

  useEffect(() => {
    if (!profileData?.user?._id) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log('Socket connected in Messages component');
      // Join room based on receiverId
      socket.emit('join', profileData.user._id);
    });

    socket.on('all-chats', () => {
      // Refetch chats without showing loader
      refetchChats();
    });

    return () => {
      socket.off('connect');
      socket.off('all-chats');
      socket.disconnect();
    };
  }, [refetchChats, profileData?.user?._id]);

  const handleBack = async () => {
    setIsRefetching(true);
    try {
      await Promise.all([refetchChats(), refetchProfile()]);
      setSelectedChat(null);
      navigate('/messages', { replace: true });
    } finally {
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    const eventId = searchParams.get('eventId');
    const recipientId = searchParams.get('recipientId');
    
    if (!eventId || !recipientId) {
      setSelectedChat(null);
      return;
    }
    
    const existingChat = data?.chats?.find((chat: Chat) => {
      return chat.event === eventId && chat.participant._id === recipientId;
    });
    
    
    if (existingChat) {
      setSelectedChat(existingChat._id);
    } else {
      setSelectedChat('new');
    }
  }, [searchParams, data?.chats]);

  if (isLoading || isRefetching) return (
    <div className="flex flex-col justify-center items-center h-64 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF00A2]"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-white py-8">
      Failed to load messages
    </div>
  );

  if (selectedChat === 'new') {
    const eventId = searchParams.get('eventId');
    const recipientId = searchParams.get('recipientId');
    const recipientName = searchParams.get('recipientName');
    const recipientImage = searchParams.get('recipientImage');
    const eventName = searchParams.get('eventName');

    return (
      <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
        <ChatBox
          chatId="new"
          recipientName={recipientName || "New Chat"}
          eventName={eventName || ""}
          recipientImage={recipientImage || ""}
          onBack={handleBack}
          isNewChat={true}
          eventId={eventId || undefined}
          recipientId={recipientId || undefined}
          sender={profileData?.user || undefined}
        />
      </div>
    );
  }

  if (selectedChat) {
    const chat = data?.chats?.find((c: Chat) => c._id === selectedChat);
    if (!chat) return null;
    
    return (
      <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
        <ChatBox
          chatId={chat._id}
          recipientName={chat.participant.name}
          recipientImage={chat.participant.logo}
          eventName={chat?.eventName}
          onBack={handleBack}
          isNewChat={false}
          eventId={chat.event}
          recipientId={chat.participant._id}
          sender={profileData?.user || undefined}
        />
      </div>
    );
  }

  if (!data?.chats?.length) return (
    <div className="text-center text-white py-8">
      No messages found
    </div>
  );

  return (
    <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
      <div className="space-y-4">
        {data.chats.map((chat: Chat) => (
          <MessageCard
            key={chat._id}
            senderName={chat.participant.name}
            lastMessage={chat.latestMessage}
            image={chat.participant.logo}
            eventName={chat?.eventName}
            onClick={() => setSelectedChat(chat._id)}
            isSelected={selectedChat === chat._id}
            unreadCount={chat?.performerUnreadCount}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;