import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from "next/server";

interface reqBody{
    email:string,
    username:string,
    name:string,
    password:string
}
export async function POST(req:Request){
    try {
        
        const {email,username,name,password}= (await req.json()) as {
            name: string;
            username:string,
            email: string;
            password: string;
          };
        const hashedPassword= await bcrypt.hash(password,12)
        const user =await prisma?.user.create({
            data:{
                email,
                username,
                name,
                hashedPassword
            }
        });
        return NextResponse.json(user,{status:200})
    } catch (error:any) {
        console.log(error);

        return NextResponse.json({message:error.message},{status:400})

    }
}
