import React, { useEffect } from 'react'
import { useSocketContext } from '../contexts/SocketContext'
import useConversation from '../zustand/useConversation';

export default function useListenMessages() {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(()=>{
    socket?.on("newMessage", (newMessage: any) =>{

        setMessages([...messages, newMessage]);
    })

    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])
}
