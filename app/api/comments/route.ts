import {NextRequest, NextResponse} from "next/server";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";


export async function POST(req:NextRequest){

    try {
        const {currentUser}=await serverAuth(req);
        const {body}=await req.json();
        const postId:string= req.nextUrl.searchParams.get('postId') as string;        
        
        if(!postId || typeof postId !=="string"){
            throw new Error('Invalid Post Id');
        }

        const comment= await prisma.comment.create({
            data:{
                body:body as string,
                userId:currentUser.id,
                postId
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
                  body: 'Someone commented on your tweet!',
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
        return NextResponse.json(comment,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}

// export async function DELETE(req:Request){

//     try {
//         const {currentUser}=await serverAuth(req);
//         const {userId}=await req.json()

//         const user= await prisma.user.findUnique({
//             where:{
//                 id:userId
//             }
//         })

//         if(!user){
//             throw new Error("Invalid ID Can't Unfollow ")
//         }


//         const currUserDetails= await prisma.user.findUnique({
//             where:{
//                 id:currentUser.id
//             },
//         })
        
//         let updatedFollowingList=currUserDetails?.followingIds
        
//         const updatedUser= await prisma.user.update({
//             where:{
//                 id:currentUser.id
//             },
//             data:{
//                 followingIds:{
//                     set:updatedFollowingList?.filter(followingId=>followingId!==userId)
//                 }
//             }
//         })

//         const {profileImage,coverImage,...userDetails}=updatedUser
        
//         return NextResponse.json(userDetails,{status:200})

//     } catch (error:any) {
//         console.log(error);
//         return NextResponse.json({"message":error?.message},{status:400})
//     }

// }
