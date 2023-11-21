'use client'
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import useUser from '@/hooks/useUser';
import { ClipLoader } from 'react-spinners';
import UserHero from '@/components/users/UserHero';
import UserBio from '@/components/users/UserBio';

const UserView = () => {
  const params = useParams();
  const { userId } = params;

  const { data: user, isLoading,error } = useUser(userId as string);

  if(isLoading|| !user){
    return(
      <div className='flex justify-center items-center h-full'>
          <ClipLoader color='lightblue' size={80}/>
      </div>
    )
  }

  return (
    <>
      <Header label={user?.name} showBackArrow />
      <UserHero userId={userId as string}/>
      <UserBio userId={userId as string}/>
    </>
  );
};

export default UserView;