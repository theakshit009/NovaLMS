import React from 'react'
import {assets} from '../../assets/assets'
import {UserButton, useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

function Navbar() {

  //nst educatorData = dummyEducatorData;
  const {user} = useUser();

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to='/'>
        <div className='cursor-pointer flex items-center gap-2'>
        <img src="/favicon.png" alt="logo" className='h-14 lg:h-15 cursor-pointer' />
        <div className='hidden sm:block'>
          <h1 className= 'text-[3rem] text-green-700 font-bold'>NovaLMS</h1>
        </div>
      </div>
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : 'Developers'} </p>
        {user ? <UserButton /> : <img src={assets.profile_img} className='max-w-8' /> }
      </div>
    </div>
  )
}

export default Navbar