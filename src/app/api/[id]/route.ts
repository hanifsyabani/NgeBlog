import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const {id} = params;
    if(!id) return NextResponse.json({message: "Something went wrong"}, {status: 500});

    const blog = await prisma.post.findFirst({
      where: {
        id :Number(id)
      }
    });

    return NextResponse.json(blog);

  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({message: error.message}, {status: 500})
    }
      
  }

}