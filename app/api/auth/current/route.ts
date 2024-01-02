import { NextApiRequest,NextApiResponse } from "next";
// import serverAuth from "@/libs/serverAuth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { authOptions } from "@/libs/nextAuth";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ status: "fail", message: "You are not logged in" }),
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user?.email as string,
      }
    });
  
    return NextResponse.json({
      authenticated: !!session,
      currentUser,
    });
  }