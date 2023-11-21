
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"

export async function GET(
    req:Request,
    { params }: { params: { userId: string } }
    ){
    try {
        const {userId}=params
        if(!userId|| typeof(userId)!=='string'){
            throw new Error('Invalid ID');
        }

        const user= await prisma.user.findUnique({
            where:{
                id:userId
            },
        })
        const followersCount=await prisma.user.count({
            where:{
                followingIds:{
                    has:userId
                }
            }
        })
        return NextResponse.json({...user,followersCount},{status:200})
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}