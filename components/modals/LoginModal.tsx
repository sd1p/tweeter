'use client'
import {useState,useCallback} from 'react'
import useLoginModal from "@/hooks/userLoginModal"
import useRegisterModal from '@/hooks/userRegisterModel';
import Modal from '../Modal';
import Input from '../Input';
import { signIn } from 'next-auth/react';

const LoginModal = () => {
    const logInModal= useLoginModal();
    const registerModal=useRegisterModal();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setisLoading]=useState(false);

    const onToggle= useCallback(
      () => {
        if(isLoading){
            return
        }
        logInModal.onClose();
        registerModal.onOpen();
      },
      [isLoading,logInModal,registerModal],
    )
    
    const onSubmit= useCallback(
      async() => {
        try {
            setisLoading(true);
            
            await signIn('credentials',{
                email,
                password
            })

            logInModal.onClose();

        } catch (error) {
            console.log(error)
        }
      },
      [logInModal,email,password],
    )

    const bodyContent=(
        <div className='flex flex-col gap-4'>
            <Input 
                type='text'
                placeholder='Email'
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                type='password'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent=(
        <div className=' text-neutral-400 text-center mt-4'>
            <p> Don&apos;t have an account?
            <span
                onClick={onToggle}
                className='text-white
                    cursor-pointer
                    hover:underline
                    '
                    > Sign Up </span>
            </p>
        </div>
    )
    
    return (
        <Modal
            disabled={isLoading}
            isOpen={logInModal.isOpen}
            title='Login'
            actionLabel='Sign In'
            onClose={logInModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal