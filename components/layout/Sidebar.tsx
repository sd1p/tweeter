'use client'
import React from 'react'
import {BsHouseFill,BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa'
import {BiLogOut} from "react-icons/bi"
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTweetButton from './SidebarTweetButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'


const Sidebar = () => {

    const {data: auth}=useCurrentUser();
    
    const items= [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill,
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill,
            auth:true
        },
        {
            label:'Profile',
            href:`/users/${auth?.currentUser?.id}`,
            icon:FaUser,
            auth:true

        }
    
    ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
            <div className='spcae-y-2 lg:w-{230px}'>
                <SidebarLogo/>
                {items.map((item)=>(
                    <SidebarItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    auth={item.auth}
                    />
                ))}
                {auth&& (
                    <SidebarItem label="Logout" icon={BiLogOut} onClick={()=>signOut()}/>
                )}
                <SidebarTweetButton/>
            </div>
        </div>
    </div>
  )
}

export default Sidebar