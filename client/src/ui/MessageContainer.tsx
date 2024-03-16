import React, { useState } from 'react'
import { BsSend } from 'react-icons/bs'
import Spline from '@splinetool/react-spline';


export default function MessageContainer() {
    const [noChat, setNoChat] = useState<Boolean>(false);
    
    return (
        <>
            {!noChat ? (

                    <div className='flex flex-col h-full'>
                            <div className='reduce-this h-[50%]'>
                                <div className='bg-slate-200 px-4 py-2 mb-2 flex items-center justify-end'>
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ">
                                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
                                        </div>
                                    </div>
                                    <span className='text-gray-900 font-bold ml-5'>UserName</span>
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
    return(
        <div className='px-4 flex-1 w-full '>
            <MessageEnd />
            <MessageStart />
            <MessageEnd />
            <MessageEnd />
            <MessageStart />
            <MessageEnd />
            <MessageEnd />
            <MessageStart />
            <MessageEnd />
            <MessageEnd />
        </div>
    )
}

function MessageEnd(){
    return(
        <div className='chat chat-end '>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Chat bubble' src='https://avatar.iran.liara.run/public/15' />
                </div>
            </div>

            <div className='chat-bubble text-gray-600 bg-[#7AFAAD]'>Hey! whats up?</div>
            <time className="text-xs opacity-50">2 hours ago</time>
            <div className="chat-footer opacity-50"> Delivered </div>
        </div>
    )
}

function MessageStart(){
    return(
        <div className='chat chat-start '>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Chat bubble' src='https://avatar.iran.liara.run/public/15' />
                </div>
            </div>

            <div className='chat-bubble text-gray-500 bg-gray-200'>Hey! whats up?</div>
            <div className="chat-footer opacity-50"> Delivered </div>
            <time className="text-xs opacity-50">2 hours ago</time>
        </div>
    )
}

function MessageInput(){
    return(
        <form className={`px-4 my-3 w-[54.5%] bottom-6 fixed`}>
            <div className='w-full flex '>
                <input type='text' placeholder='Send a message..' className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white' />
                <button type='submit' className='absolute right-6 bottom-2 text-white'>
                    <BsSend size={'1.5rem'}/>
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
