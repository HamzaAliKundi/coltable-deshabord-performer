import React, { useState } from 'react';
import ChatBox from './ChatBox';
import MessageCard from './MessageCard';
import { useGetAllChatsQuery } from '../../apis/messages';

interface Participant {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  userType: string;
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
  const { data, isLoading, error } = useGetAllChatsQuery();

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF00A2]"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-white py-8">
      Failed to load messages
    </div>
  );

  if (!data?.chats?.length) return (
    <div className="text-center text-white py-8">
      No messages found
    </div>
  );

  if (selectedChat) {
    const chat = data.chats.find(c => c._id === selectedChat);
    return (
      <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
        <ChatBox
          recipientName={chat?.participant.name || ''}
          recipientImage={chat?.participant.profilePhoto}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
      <div className="space-y-4">
        {data.chats.map(chat => (
          <MessageCard
            key={chat._id}
            senderName={chat.participant.name}
            lastMessage={chat.latestMessage}
            image={chat.participant.profilePhoto}
            onClick={() => setSelectedChat(chat._id)}
            isSelected={selectedChat === chat._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;