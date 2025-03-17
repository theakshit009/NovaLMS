import React, { useContext } from 'react'
import { assets } from "../../assets/assets"
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

function Navbar() {
  const {navigate, isMentor,} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();

  const { user } = useUser();
  

  return (
    <div className={`flex items-center justify-between px-4 sm:px- md:px-14 lg:px-20 border-b border-gray-500 py-2 ${isCourseListPage ? 'bg-white' : 'bg-emerald-100/70' }`}>
      <div onClick={() => navigate('/')} className='cursor-pointer flex items-center gap-2'>
        <img src="/favicon.png" alt="logo" className='h-14 lg:h-15 cursor-pointer' />
        <div className='hidden sm:block'>
          <h1 className= 'text-[3rem] text-green-700 font-bold'>NovaLMS</h1>
        </div>
      </div>
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>
          {user && <> <button className='cursor-pointer' onClick={() => navigate('/mentor')}>{ isMentor ? "Mentor Dashboard" : "Become Mentor"}</button>
          | <Link to='/my-enrollments '>My Enrollments</Link> </>} 
        </div>
        {user ? <UserButton /> : <button onClick={() => openSignIn()} className='bg-green-700 text-white px-5 py-2 rounded-full'>Create Account</button>}
      </div>
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center justify-between gap-3 sm:gap-2 max-sm:text-xs' >
          {user && <><button className='cursor-pointer' onClick={() => navigate('/mentor')}>{ isMentor ? "Mentor Dashboard" : "Become Mentor"}</button> 
          <Link className='underline' to='/my-enrollments '>My Enrollments</Link> </>}
          {user ? <UserButton />  : <button onClick={() => openSignIn()}><img src={assets.user_icon} /></button>}
        </div>
      </div>
    </div>
  )
}

export default Navbar