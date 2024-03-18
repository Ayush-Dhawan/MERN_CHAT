import React, { useEffect, useRef, useState } from 'react'
import { BsSend } from 'react-icons/bs'
import Spline from '@splinetool/react-spline';
import useConversation from '../zustand/useConversation';
import useDeliverMessage from '../hooks/useDeliverMessage'
import useGetMessages from '../hooks/useGetMessages';
import MessageSkeleton from './MessageSkeleton';
import { useAuthContext } from '../contexts/AuthContext';


export default function MessageContainer() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    
    return (
        <>
            {selectedConversation ? (

                    <div className='flex flex-col h-full'>
                            <div className='reduce-this h-[50%]'>
                                <div className='bg-slate-200 px-4 py-2 mb-2 flex items-center justify-end'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ">
                                            <img src={selectedConversation.profilePic} alt="Avatar" />
                                        </div>
                                    </div>
                                    <span className='text-gray-900 font-bold ml-5'>{selectedConversation.username}</span>
                                </div>

                            {/* messages */}
                            <Messages />

                            </div>
                    <MessageInput />
                    </div>

            ) : (
                <div className='px-4 py-2 mb-2 flex items-center justify-end'>
                    <NoChatSelected />
                </div>
            )}
        </>
    );
}


function Messages(){
    const {loading, messages} = useGetMessages();
    // const {messages} = useConversation();
    console.log("messages", messages)

    const lastMessageRef = useRef<any>();
    useEffect(() =>{
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({behaviour: "smooth"})
        }, 100);
    }, [messages])
    

    return(
        <div className='px-4 flex-1 w-full '>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}

            {!loading &&
				messages.length > 0 &&
				messages?.map((message: any) => (
					<div key={message._id} ref={lastMessageRef} >
						<Message message={message} />
					</div>
				))}
        </div>
    )
}

function Message({ message }: { message: any }) {
    const [authUser, setAuthUser] = useState<any>(null);
    const { selectedConversation } = useConversation();

    useEffect(() => {
        let storedAuthUser = localStorage.getItem("chat-user");
        if (storedAuthUser) JSON.parse(storedAuthUser)
        setAuthUser(storedAuthUser);
    }, []); // Empty dependency array, runs once on mount

    const fromMe = message?.senderID === selectedConversation?._id;
    // console.log(message, selectedConversation._id, "from home");

    return (
       <>
        {fromMe ? <MessageStart message={message}  /> : <MessageEnd message={message} />}
       </>
         )
}

            
function MessageEnd({message}: {message: any}){
    const formattedTime = extractTime(message?.createdAt)
    const {authUser} = useAuthContext();
    console.log(authUser, "fom msgend")
    return(
        <div className={`chat chat-end`}>
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img alt='Chat bubble' src={authUser.profilePic} />
                    </div>
                </div>
                <div className={`chat-bubble text-gray-600`} style={{ backgroundColor: '#7AFAAD' }}>{message?.message}</div>
                <time className="text-xs opacity-50">{formattedTime}</time>
                <div className="chat-footer opacity-50"> Delivered </div>
            </div>
    )
}

function MessageStart({message}: {message: any}){
    const { selectedConversation } = useConversation();
    const formattedTime = extractTime(message?.createdAt)
    return(
        <div className='chat chat-start '>
                <div className='chat-image avatar'>
                    <div className='w-10 rounded-full'>
                        <img alt='Chat bubble' src={selectedConversation.profilePic  } />
                    </div>
                </div>
                <div className='chat-bubble text-gray-500 bg-gray-200'>{message?.message}</div>
                <div className="chat-footer opacity-50"> Delivered </div>
                <time className="text-xs opacity-50">{formattedTime}</time>
            </div>
    )
}

function MessageInput() {
    const [message, setMessage] = useState<string>("")
    const { loading, deliverMessages } = useDeliverMessage();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message) return;
        await deliverMessages(message);
        setMessage("");
    }

    return (
        <form className={`px-4 my-3 w-[54.5%] bottom-6 fixed`} onSubmit={handleSubmit}>
            <div className='w-full flex '>
                <input
                    type='text'
                    placeholder='Send a message..'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='absolute right-6 bottom-2 text-white'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend size={'1.5rem'} />}
                </button>
            </div>
        </form>
    )
}


function NoChatSelected(){
    return (
        <div className='w-[100%] h-full'>
            <Spline style={{ width: '100%', height: '100%' }} scene="https://prod.spline.design/6UbM8ztsZ6PvZOkv/scene.splinecode" />
        </div>
      );
}

export function extractTime(dateString: any) {
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: any) {
	return number.toString().padStart(2, "0");
}
