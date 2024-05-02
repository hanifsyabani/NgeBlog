"use client";

import Card from "@/components/Card/Card";
import { CategoryItem } from "@/components/Write/Category";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export default function Category() {
  const [allBlog, setAllBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  useEffect(() => {
    async function getBlog() {
      try {
        const url = selectedCat === "All" ? "/api/blog" : `/api/blog/${selectedCat}`;
        setLoading(true);
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setAllBlogs(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getBlog();
  }, [selectedCat]);

  const filterCat = (category:string)=> {
    setSelectedCat(category);
  }

  return (
    <div className="pt-20">
      <div className="bg-gradient-to-r from-primary via-tersier to-secondary shadow-xl w-[60%] rounded-full mx-auto py-2 px-4">
        <ul className="flex justify-center items-center gap-10 text-white">
          {CategoryItem.map((item) => (
            <li
              key={item.id}
              className="hover:bg-white hover:text-gray-900 rounded-full px-2 transition-all cursor-pointer"
              onClick={() => filterCat(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center items-center pt-20">
        {loading ? <Spinner /> : <Card blogs={allBlog} />}
      </div>
    </div>
  );
}
