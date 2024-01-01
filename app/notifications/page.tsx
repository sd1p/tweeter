'use client'
import Header from '@/components/Header'
import NotificationsFeed from '@/components/NotificationsFeed';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const Notifications = () => {
    const router=useRouter();
    const {data: session} = useSession();

    useEffect(() => {
      if(!session?.user){
        return  router.push('/');
      }
        
    }, [router,session])
    

    
  return (
    <>
    <Header label='Notifications' showBackArrow/>
    <NotificationsFeed/>
    </>
  )
}

export default Notifications