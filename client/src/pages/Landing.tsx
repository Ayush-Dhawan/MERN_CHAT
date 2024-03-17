import React, { useEffect, useState } from 'react'
// import Typed from 'react-typed';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { ReactTyped, Typed } from 'react-typed';

function Landing() {
  return (
    <div className='w-screen h-screen '>
      <Nav />
      <Hero />
    </div>
  )
}

export default Landing


function Nav(){
  const [nav, setNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleNav = () => {
    setNav(!nav);
  };
  return(
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-gray-900'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>CHAT.</h1>
      <ul className={!isMobile ? 'md:flex text-gray-900' : 'hidden'}>
      <NavLink to={'/login'}><li className='p-4 text-gray-900'>Login</li></NavLink>
        <NavLink to={'/signup'}><li className='p-4 text-gray-900 rounded-md bg-gray-300'>SignUp</li></NavLink>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>CHAT.</h1>
          <NavLink to={'/login'}><li className='p-4 border-b border-gray-600  text-white'>Login</li></NavLink>
          <NavLink to={'/signup'}><li className='p-4 border-b border-gray-600 text-white'>SignUp</li></NavLink>
          
      </ul>
    </div>
  )
}


const Hero = () => {
  return (
    <div className='text-gray-900'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          GROWING WITH THE WORLD
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Chat App.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Connectivity - 
          </p>
          <ReactTyped
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Fast', 'Reliable']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>ChatApp is a user-friendly messaging platform that enables seamless communication through text, fostering real-time interactions among individuals or groups across various devices and platforms.</p>
        <NavLink to={'/home'}><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button></NavLink>
      </div>
    </div>
  );
};
