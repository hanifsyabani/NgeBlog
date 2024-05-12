"use client";

import Header from "@/components/Header/Header";
import { CategoryItem } from "@/components/Write/Category";
import { Spinner, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function Write() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    if (!file) return;
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("title", title);
      data.append("category", category);
      data.append("description", description);

      const resFile = await fetch("/api/blog", {
        method: "POST",
        body: data,
      });

      if (resFile.ok) {
        toast({
          title: "Success",
          description: "Blog created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } else {
        const data = await resFile.json();
        toast({
          title: "Error",
          description: data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-20 px-[4%]">
      <Header headertitle="New Blog" />
      <form className="lg:flex justify-center mt-6  gap-7" onSubmit={handleSubmit}>
        <div className="lg:w-[70%]">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            placeholder="Add a title..."
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 w-full px-2 py-3"
          />
          <div className="mt-4">
            <ReactQuill
              theme="snow"
              className="h-80"
              value={description}
              onChange={(e) => setDescription(e)}
            />
          </div>
        </div>
        <div className="lg:w-[30%] mt-24 lg:mt-0">
          <div className="border border-gray-400 p-2 rounded-md">
            <h1 className="font-bold text-xl">Publish</h1>
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-bold">Status</span>: Draft
              </p>
              <p className="text-sm my-2">
                <span className="font-bold">Visibility</span>: Public
              </p>
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <label htmlFor="file" className="cursor-pointer underline">
                Upload Image
              </label>
            </div>
          </div>
          <div className="border border-gray-400 p-2 rounded-md mt-5">
            <h1 className="font-bold text-xl">Category</h1>
            <div className="mt-3">
              {CategoryItem.map((item) => (
                <div key={item.id} className="mb-2 flex gap-2">
                  <input
                    type="radio"
                    name="category"
                    id={item.valueID}
                    value={item.valueID}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <label htmlFor={item.valueID}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="border border-primary px-1 py-2 rounded-lg w-1/2"
            >
              Save as draft
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary px-4 rounded-lg py-2 text-white cursor-pointer w-32 hover:from-secondary hover:to-primary"
            >
              {loading ? <Spinner /> : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
