import React, { useEffect, useState } from 'react'
import { FaHome, FaBell } from "react-icons/fa";
import { PiChatsFill } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";

import './Home.css'
import Conversation from '../ui/Conversation';
import MessageContainer from '../ui/MessageContainer';
import useLogout from '../hooks/useLogout';
import useGetConversations from '../hooks/useGetConversations';

export default function Home() {
  const [hideSideBar, setHideSideBar] = useState<Boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      // Set hideSideBar to true for widths below 700px
      setHideSideBar(window.innerWidth < 700);
    };

    // Call handleResize initially to set hideSideBar based on initial width
    handleResize();

    // Add event listener for window resize to update hideSideBar
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once after initial render


  return (
    <div className='w-screen h-screen p-0 md:p-20'>
      <div className='flex justify-between shadow-custom-md h-full w-full rounded-lg overflow-hidden'>
        <div className='h-full w-[5%]'>
            <SideNav setHideSideBar={setHideSideBar} hideSideBar={hideSideBar} />
        </div>
        <div className={`h-full ${hideSideBar ? 'w-full' : 'w-[62%]'} overflow-y-scroll`}>
          <MessageContainer />
        </div>
      </div>
       <div className={`h-[78%] z-30 w-[30vw] absolute top-[11vh] left-[10.5%] sideBar ${hideSideBar && "hidden"}`}>
          <ChatList search={search} setSearch={setSearch} />
        </div>
    </div>
  )
}

function ChatList({search, setSearch} : {search: string, setSearch: any}){

  return(
    <div className='w-full h-full p-4 flex flex-col items-center border-r-2 border-slate-400 bg-gray-200'>
      <div className='searchField w-full flex gap-4 items-center justify-center border-b-2 border-slate-400 p-2'>
          <input type="text" placeholder="Search Users.." className="input input-bordered input-success w-full max-w-xs" onChange={(e) => setSearch(e.target.value)} />
          <IoPersonAdd size={'1.7rem'} />
      </div>
      <Conversations search={search} setSearch={setSearch} />
    </div>
  )
}

function Conversations({search, setSearch} : {search: string, setSearch: any}){
  const {loading, conversations} = useGetConversations();
  console.log(conversations)
  let filteredConversations;
  if(search !== "") filteredConversations = conversations?.filter((convo : any) => convo?.username.toLowerCase().includes(search.toLowerCase()))
  else filteredConversations = conversations;
  console.log("filtered: ", filteredConversations)
  if(loading) return <span className="loading loading-dots loading-lg"></span>
  return(
    <div className='w-full p-4'>
      {filteredConversations?.map((convo: any, index: number )=> <Conversation key={index} username={convo.username} image={convo.profilePic} conversation={convo} />)}
    </div>
  )
}

function SideNav({setHideSideBar, hideSideBar}: {setHideSideBar: Function, hideSideBar: Boolean}){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {logout} = useLogout();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return(
    <div className='h-full flex flex-col gap-6 items-center justify-evenly bg-slate-800 text-[#7AFAAD]'>
      <FaHome size={'2rem'} className='cursor-pointer' />
      {windowWidth <= 700 && (
        <PiChatsFill
          size={'2rem'}
          className='cursor-pointer'
          onClick={() => setHideSideBar(!hideSideBar)}
        />
      )}
      <MdGroups size={'2rem'} className='cursor-pointer' />
      <FaBell size={'2rem'} className='cursor-pointer' />
      <RiLogoutBoxRFill size={'2rem'} className='cursor-pointer' onClick={logout} />
    </div>
  )
}
