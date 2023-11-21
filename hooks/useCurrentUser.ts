'use client'
import useSWR from 'swr';
import fetcher from '@/libs/fetcher';

// swr is next implementation of redux

const useCurrentUser = () =>{
    const {data, error, isLoading, mutate} =useSWR('/api/auth/current',fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useCurrentUser;