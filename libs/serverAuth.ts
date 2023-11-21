import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const serverAuth = async (req: Request)=>{
    const session = await getServerSession(authOptions);
    
    if(!session?.user?.email){
        throw new Error ('Not signed in');
    }
    
    const currentUser= await prisma.user.findUnique({
        where:{
            email:session.user.email,
        }
    })

    if(!currentUser){
        throw new Error('Not signed in');
    }

    return {currentUser};
       
};

export default serverAuth;