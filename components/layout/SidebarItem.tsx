import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/userLoginModal';
import { useRouter } from 'next/navigation';
import React, { useCallback, useReducer } from 'react'
import {IconType} from "react-icons"

interface SidebarItemProps{
  label:string;
  href?:string;
  icon:IconType;
  onClick?: ()=>void;
  auth?: boolean;

}
const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth
}) => {
  const loginModal=useLoginModal();
  const{data:currentUser}=useCurrentUser();
  
  const router= useRouter()
  const handleClick=useCallback(() => {
      if(onClick){
        return onClick();
      }
      if(auth && !currentUser){
        loginModal.onOpen();
      }else if(href){
        router.push(href)
      }
    },
    [router,onClick,href,currentUser,auth,loginModal],
  )
  

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className='
      relative
      rounded-full
      h-14
      w-14
      flex
      items-center
      justify-center
      p-4
      hover:bg-blue-300
      hover:bg-opacity-10
      cursor-pointer
      transition
      lg:hidden
      '>
        <Icon size={20} color='white'/>
      </div>
      <div className='
       relative
       hidden
       lg:flex
       item-center
       justify-center
       gap-4
       p-4
       rounded-full
       hover:bg-slate-300
       hover:bg-opacity-10
       cursor-pointer
       '>
        <Icon size={24} color='white'/>
        <p className='hidden lg:block text-white text-xl'>
          {label}
        </p>
      </div>
    </div>
  )
}

export default SidebarItem