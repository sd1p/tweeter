
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";

export async function PUT(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {name,username,bio,profileImage,coverImage}=await req.json()

        const updatedUser= await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        })
        return NextResponse.json(updatedUser,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}