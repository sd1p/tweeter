
import { NextResponse,NextRequest } from "next/server";
import prisma from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth";

// 

export async function POST(req:Request){

    try {
        const {currentUser}=await serverAuth(req);
        const {body}=await req.json()

        const post= await prisma.post.create({
            data:{
                body,
                userId:currentUser.id
            }
        })
        return NextResponse.json(post,{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}

export async function GET(req: NextRequest){

        try {
            
            const searchParams=req.nextUrl.searchParams;
            const userId=searchParams.get('userId') 
            let posts;

            if(userId && typeof userId==='string'){
                    posts= await prisma.post.findMany({
                    where:{
                        userId
                    },
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }else{
                posts= await prisma.post.findMany({
                    include:{
                        user:true,
                        comments:true
                    },
                    orderBy:{
                        createdAt:'desc'
                    }
                })
            }
    
    
            return  NextResponse.json(posts,{status:200})
    
        } catch (error:any) {
            console.log(error);
            return NextResponse.json({"message":error?.message},{status:400})
        }
    
}


// controller for getting post of current user

// export async function GET(req:NextRequest){

//     try {
//         const {currentUser}=await serverAuth(req);
//         console.log(req.body);
        

//         const post= await prisma.post.findMany({
//             where:{
//                 userId:currentUser.id
//             }
//         })
//         return NextResponse.json(post,{status:200})

//     } catch (error:any) {
//         console.log(error);
//         return NextResponse.json({"message":error?.message},{status:400})
//     }

// }
