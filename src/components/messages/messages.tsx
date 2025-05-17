import React, { useState, useEffect } from 'react';
import ChatBox from './ChatBox';
import MessageCard from './MessageCard';
import { useGetAllChatsQuery } from '../../apis/messages';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetPerformerProfileQuery } from '../../apis/profile';

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
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isRefetching, setIsRefetching] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch: refetchChats } = useGetAllChatsQuery({});
  const { data: profileData, isLoading: isLoadingProfile, refetch: refetchProfile } = useGetPerformerProfileQuery({});

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
    if (!eventId) {
      setSelectedChat(null);
      return;
    }
    
    if (eventId) {
      const existingChat = data?.chats?.find((chat: Chat) => chat.event === eventId);
      if (existingChat) {
        setSelectedChat(existingChat._id);
      } else {
        // Handle new chat case
        setSelectedChat('new');
      }
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
    

    return (
      <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
        <ChatBox
          chatId="new"
          recipientName={recipientName || "New Chat"}
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
            onClick={() => setSelectedChat(chat._id)}
            isSelected={selectedChat === chat._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;