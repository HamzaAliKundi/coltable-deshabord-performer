import React, { useState } from 'react';
import ChatBox from './ChatBox';
import MessageCard from './MessageCard';
import { useGetAllChatsQuery } from '../../apis/messages';

interface Chat {
  id: string;
  senderName: string;
  lastMessage: string;
  image?: string;
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const { data: performerChats, isLoading, error } = useGetAllChatsQuery();
  console.log("performerChats", performerChats);

  // Dummy data for demonstration
  const chats: Chat[] = [
    {
      id: '1',
      senderName: 'Rich\'s Club',
      lastMessage: 'Hi, we would like to book you for our upcoming event...',
      image: '/messages/messages.svg'
    },
    {
      id: '2',
      senderName: 'Eagle Bar',
      lastMessage: 'Thanks for your quick response! About the performance time...',
      image: '/messages/messages.svg'
    },
    // Add more dummy chats as needed
  ];

  if (selectedChat) {
    const chat = chats.find(c => c.id === selectedChat);
    return (
      <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
        <ChatBox
          recipientName={chat?.senderName || ''}
          recipientImage={chat?.image}
          onBack={() => setSelectedChat(null)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:px-8 py-8 md:py-16 bg-black">
      <div className="space-y-4">
        {chats.map(chat => (
          <MessageCard
            key={chat.id}
            senderName={chat.senderName}
            lastMessage={chat.lastMessage}
            image={chat.image}
            onClick={() => setSelectedChat(chat.id)}
            isSelected={selectedChat === chat.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Messages;