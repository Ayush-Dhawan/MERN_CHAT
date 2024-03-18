import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

export default function useDeliverMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  async function deliverMessages(message: any) {
    try {
      setLoading(true);
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error.message);
      } else {
        const newMessages = [...messages, data]; // Append new message to the messages array
        setMessages(newMessages); // Set the updated messages array
      }
    } catch (error: any) {
      console.log("error in deliverMessages Hook: ", error.message);
    } finally {
      setLoading(false);
    }
  }

  return { deliverMessages, loading };
}
