'use client'
import {useState,useCallback} from 'react'
import useLoginModal from "@/hooks/userLoginModal"
import useRegisterModal from '@/hooks/userRegisterModel';
import Modal from '../Modal';
import Input from '../Input';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {signIn, useSession} from 'next-auth/react'
const RegisterModal = () => {
    const registerModal= useRegisterModal();
    const loginModal= useLoginModal();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [username,setUsername]=useState('');
    const [isLoading,setisLoading]=useState(false);

    const onToggle = useCallback(
      () => {
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
      },
      [isLoading,registerModal,loginModal],
    )
    


    const onSubmit= useCallback(
      async() => {
        try {
            setisLoading(true);
            
            await axios.post('/api/auth/register',{
                email,
                password,
                username,
                name
            })
            
            toast.success("Account created");

            await signIn('credentials',{
                email,
                password
            })

            registerModal.onClose();
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
      },
      [registerModal,email,password,username,name],
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
                type='text'
                placeholder='Name'
                onChange={(e)=>setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input 
                type='text'
                placeholder='Username'
                onChange={(e)=>setUsername(e.target.value)}
                value={username}
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
            <p>Already have an account?
            <span
                onClick={onToggle}
                className='text-white
                    cursor-pointer
                    hover:underline
                    '
                    > Sign In </span>
            </p>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Create an account'
            actionLabel='Sign Up'
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal