import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {

  try {
    const {category} = params;
    
    const blog = await prisma.post.findMany({
      where:{
        category: category,
      }
    });

    return NextResponse.json(blog);

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
