import React from 'react'
import './Conversation.css'
import useConversation from '../zustand/useConversation'
import { useSocketContext } from '../contexts/SocketContext';

export default function Conversation({username, image, conversation} : {username: String, image: any, conversation: any}) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {onlineUsers} = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

	const isSelected = selectedConversation?._id === conversation._id;
  // console.log(selectedConversation, conversation, isSelected)
  return (
    <div onClick={() => setSelectedConversation(conversation)} className={`w-full h-16 flex items-center justify-start p-2 m-2 rounded-lg convo border-l-4 ${isSelected && 'bg-gray-800 border-l-green-400 border-l-4 text-gray-100'}`}>
        <div className={`avatar ${isOnline && "online"}`}>
            <div className="w-12 rounded-full">
                <img src={image} alt='pfp' />
            </div>
        </div>

        <div className='ml-4'>
            <span>{username}</span>
        </div>
    </div>
  )
}
