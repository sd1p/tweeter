import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" },{status:400,});
}

// Handles POST requests to /api
export async function POST(req: Request) {


  // ...
  return NextResponse.json({ message: "Hello World" });
}