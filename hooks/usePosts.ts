'use client'
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

//#TODO: 2:54:45
// we can get latest posts and posts for a certain user
const usePosts = (userId?:string) =>{
    const url=userId?`/api/posts?userId=${userId}`:'/api/posts';
    const {data, error, isLoading, mutate} =useSWR(url,fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePosts;