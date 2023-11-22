'use client'
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

// swr is next implementation of redux

const useCurrentUser = () =>{
    let {data, error, isLoading, mutate} =useSWR('/api/auth/current',fetcher);
        data=data?.currentUser;
    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;