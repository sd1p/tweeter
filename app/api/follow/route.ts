import {NextResponse} from "next/server";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";


export async function POST(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {userId}=await req.json()
        console.log(userId);
        
        const user= await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            throw new Error('Invalid ID Cant Follow')
        }

        const updatedUser= await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                followingIds:{
                    push:userId
                }
            }
        })
        const {profileImage,coverImage,...userDetails}=updatedUser
        return NextResponse.json(userDetails,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}

export async function DELETE(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {userId}=await req.json()

        const user= await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            throw new Error("Invalid ID Can't Unfollow ")
        }


        const currUserDetails= await prisma.user.findUnique({
            where:{
                id:currentUser.id
            },
        })
        
        let updatedFollowingList=currUserDetails?.followingIds
        
        const updatedUser= await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                followingIds:{
                    set:updatedFollowingList?.filter(followingId=>followingId!==userId)
                }
            }
        })

        const {profileImage,coverImage,...userDetails}=updatedUser
        
        return NextResponse.json(userDetails,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}
