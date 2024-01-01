'use client'
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';


// we can get post and comments for a certain post
const usePost = (postId?:string) =>{
    const url=postId?`/api/posts/${postId}`:null;
    const {data, error, isLoading, mutate} =useSWR(url,fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePost;