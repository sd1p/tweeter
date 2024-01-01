import useCurrentUser from '@/hooks/useCurrentUser'
import useNotifications from '@/hooks/useNotification';
import React from 'react'
import { BsTwitter } from 'react-icons/bs';

const NotificationsFeed = () => {
    const {data:currentUser,mutate:mutateCurrentUser}=useCurrentUser();
    
    let {data:fetchedNotification=[]} = useNotifications(currentUser?.id)
    console.log(fetchedNotification[0]);
    
    if(fetchedNotification.length===0){
        return (
            <div className='
                text-neutral-600
                text-center
                p-6
                text-xl
            '>
                No notifications
            </div>
        )
    }
  
    return (
    <div>
        {fetchedNotification.map((notification:Record<string,any>)=>{            
            return (<div key={notification.id}
             className='
                flex
                flex-row
                items-center
                p-6
                gap-4
                border-b-[1px]
                border-neutral-800
             '
            >
                <BsTwitter color='white' size={32}/>
                <p className='text-white'>
                    {/* {console.log(notification.body)} */}
                    {notification.body}
                </p>
            </div>)
        })}
    </div>
  )
}

export default NotificationsFeed