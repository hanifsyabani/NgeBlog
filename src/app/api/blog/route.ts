import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // const { title, description, category, image } = await req.json();
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    
    const data = await req.formData();
    const file = data.get("file") as File | null;
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const category = data.get("category") as string;

    if (!file) {
      return NextResponse.json({ message: "File not found" }, { status: 404 });
    }

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Decode base64 image data to binary buffer
    const imageBuffer = Buffer.from(base64, "base64");

    // Define file path and name for the PNG image
    const fileName = `${Date.now()}.png`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    // Create the uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write the binary buffer to a PNG image file
    fs.writeFileSync(filePath, imageBuffer);

    if (description.length < 50 || description.length > 1000) {
      return NextResponse.json(
        { message: "Description must be between 50 and 1000 characters" },
        { status: 400 }
      );
    }

    const imageUrl = `/uploads/${fileName}`;

    const blog = await prisma.post.create({
      data: {
        title,
        description,
        category,
        image: imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Blog created successfully", imageUrl },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}

export async function GET() {
  try {
    const blog = await prisma.post.findMany();
    if (!blog)
      return NextResponse.json({ message: "No blog found" }, { status: 404 });
    // const randomBlog = blog[Math.floor(Math.random() * blog.length)];
    // console.log(randomBlog);

    return NextResponse.json(blog);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
} 