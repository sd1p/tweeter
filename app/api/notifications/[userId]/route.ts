import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.pathname.split('/')[3];
    
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const notification = await prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        cereatedAt: "desc",
      },
    });

    await prisma.user.update({
      where: {
        id:userId,
      },
      data: {
        hasNotification: false,
      },
    });
    
    return NextResponse.json(notification,{status:200})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
