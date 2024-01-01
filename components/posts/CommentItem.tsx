import React, { useCallback, useMemo } from 'react'
import {useRouter} from 'next/navigation'
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';

interface CommentFeedProps{
    data: Record<string,any>
}

const CommentItem: React.FC<CommentFeedProps> = ({data}) => {

    const router = useRouter();
    const goToUser = useCallback((event:any)=>{
        event.stopPropogation();
        router.push(`/users/${data.user.id}`);

    },[router,data.user.id]);

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt])
    
  return (
    <div 
        className=' 
            border-b-[1px]
            border-neutral-800
            p-5
            cursor-pointer
            hover:bg-neutral-900
            transition
    '>
        <div className='flex flex-row items-start gap-3'>
            <Avatar userId={data?.userId}/>
            <div>
                <div className='flex flex-row items-center gap-2'>
                    <p className='font-semibold text-white cursor-pointer hover:underline'
                        onClick={goToUser}
                    >
                        {data.user.name}
                    </p>
                    <span className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>
                        @{data.user.username}
                    </span>
                    <span className='text-neutral-500 text-sm'>
                        {createdAt}
                    </span>
                </div>
                <div className='text-white mt-0.5'>
                    {data.body}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentItem