import {NextResponse,NextRequest} from 'next/server'
import prisma from '@/libs/prismadb'
export async function GET(req: NextRequest){

    try {
    
        const   postId = req.nextUrl.pathname.split('/')[3];
        
           const post= await prisma.post.findUnique({
                where:{
                    id:postId
                },
                include:{
                    user:true,
                    comments:{
                        include:{
                            user:true
                        },
                    }
                }
            })
            
            if(!post){
                 throw new Error("Post not found")
            }


        return  NextResponse.json({post},{status:200})

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }
}