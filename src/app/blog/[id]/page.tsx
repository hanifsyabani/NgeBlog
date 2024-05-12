'use client'

import Card from "@/components/Card/Card";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export default function BlogId() {
  const [blogById, setBlogById] = useState({} as Blog);
  const [blog, setBlog] = useState<Blog[]>([]);

  const params = useParams();

  useEffect(() => {
    async function getBlogId() {
      try {
        const id = params.id;
        const res = await fetch(`/api/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBlogById(data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function getBlog() {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
        }else{
          console.log("error fecthing blog");
        }
      } catch (error) {
        console.log(error);
      }
    }

    getBlogId();
    getBlog();
  }, []);

  
  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="lg:flex lg:pt-32 pt-20 w-full px-3 gap-20">
      <div className="w-[20%] hidden lg:grid grid-cols-1 gap-8">
        <Card blogs={blog} />
      </div>
      <div className="lg:w-[80%] w-full px-[3%]">
        <h1 className="text-6xl font-bold max-w-5xl">{blogById.title}</h1>
        <p className="pt-5">{blogById.createdAt}</p>
        <Image src={blogById.image} alt="blog" width={300} height={200} className="w-full my-10 rounded-2xl" />
        <p>{getText(blogById.description)}</p>
      </div>
    </div>
  );
}
