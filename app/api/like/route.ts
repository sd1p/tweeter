import {NextResponse} from "next/server";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";


export async function POST(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {postId}=await req.json()

        if(!postId || typeof postId!=='string'){
            throw new Error('Invalid ID Cant Like')
        }
        const post= await prisma.post.findUnique({
            where:{
                id:postId
            }
        })

        if(!post){
            throw new Error('Invalid ID Cant Like')
        }

        const updatedLikedIds= await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                likedIds:{
                    push:currentUser.id
                }
            }
        })

        try {
            const post = await prisma.post.findUnique({
              where: {
                id: postId,
              }
            });
        
            if (post?.userId) {
              await prisma.notification.create({
                data: {
                  body: 'Someone liked your tweet!',
                  userId: post.userId
                }
              });
        
              await prisma.user.update({
                where: {
                  id: post.userId
                },
                data: {
                  hasNotification: true
                }
              });
            }
          } catch(error) {
            console.log(error);
          }
          
        return NextResponse.json(updatedLikedIds,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}

export async function DELETE(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {postId}=await req.json()

        const post= await prisma.post.findUnique({
            where:{
                id:postId
            }
        })

        if(!post){
            throw new Error("Invalid ID Can't Unlike ")
        }

        let updatedLikedList=[...(post.likedIds||[])]
        updatedLikedList=updatedLikedList.filter(id=>id!==currentUser.id)
        
        const updatedUnlikePost= await prisma.post.update({
            where:{
                id:postId
            },
            data:{
                likedIds:updatedLikedList
            }
        })

        
        return NextResponse.json(updatedUnlikePost,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }
}
