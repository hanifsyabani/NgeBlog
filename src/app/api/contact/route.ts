import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
  try {
    const  {name, email, phone, subject, message} = await req.json();

    const contact = await prisma.contact.create({
      data:{
        name,
        email,
        phone,
        subject,
        message
      }
    });

    if(!contact) return NextResponse.json({message: "Something went wrong"}, {status: 500});

    return NextResponse.json({message: "Message sent successfully"}, {status: 200})
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({message: error.message}, {status: 500})
    }

  }
}