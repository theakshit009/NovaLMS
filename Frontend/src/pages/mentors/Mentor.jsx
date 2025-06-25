import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/mentor/Navbar'
import Sidebar from '../../components/mentor/Sidebar'
import MFooter from '../../components/mentor/MFooter'

function Mentor() {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
      <MFooter />
    </div>
  )
}

export default Mentor