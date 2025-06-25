import React from 'react'
import { assets } from '../../assets/assets'


function MFooter() {
  return (
    <div className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
      <div className='flex items-center gap-20 justify-between'> 
        <div className='hidden md:block w-20'>
          <div className='flex gap-3 items-center mt-0'>
            <img className='w-[2rem] h-[2rem] ' src="/favicon.png" alt="logo" />
            <h1 className= 'text-[2rem] text-green-700 font-bold'>NovaLMS</h1>
          </div>  
        </div> 
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <div><p className='py-4 text-center text-xs md:text-sm text-gray-500'>Copyright 2025  © ATAP. All Right Reserved.</p></div>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#"> <img src={assets.facebook_icon} alt="facebook" /> </a><a href="#"></a> <img src={assets.twitter_icon} alt="twitter" /> <a href="#"> <img src={assets.instagram_icon} alt="insta" /> </a>
      </div>
    </div>
  )
}

export default MFooter