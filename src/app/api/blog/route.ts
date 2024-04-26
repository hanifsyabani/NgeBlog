import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function POST(req :Request){
  try {
    const { title, description, category, image } = await req.json();



    const blog = await prisma.post.create({
      data:{
        title,
        description,
        category,
        image
      }
    })

    return NextResponse.json(blog);
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({message:error.message}, {status: 500});
    }
  }
}