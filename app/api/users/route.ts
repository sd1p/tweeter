
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
export async function GET(req:Request){

    try {
        const users= await prisma.user.findMany({
            orderBy:{
                createdAt:"desc"
            },
            take:3
        })
        return NextResponse.json(users,{status:200})
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({"message":error?.message},{status:400})
    }

}