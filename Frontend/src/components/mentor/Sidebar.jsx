import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

function Sidebar() {

    const {isMentor} = useContext(AppContext)

    const menuItems = [
        {
            name: 'Dashboard',
            path: 'mentor-dash',
            icon: assets.home_icon
        },
        {
            name: 'Add Course',
            path: 'add-course',
            icon: assets.add_icon
        },
        {
            name: 'My Course',
            path: 'my-course',
            icon: assets.my_course_icon
        },
        {
            name: 'Student Enrolled',
            path: 'students-enrolled',
            icon: assets.person_tick_icon
        }
    ];


  return isMentor && (
    <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
        {menuItems.map((item)=>(
            <NavLink
            to={item.path}
            key={item.name}
            end={item.path === '/mentor'}
            className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-green-100 border-r-[6px] border-green-700/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90 '}`}>
                <img src={item.icon} alt='' className='w-6 h-6' />
                <p className='md:block hidden text-center'>{item.name}</p>
            </NavLink>
        ))}
    </div>
  )
}

export default Sidebar