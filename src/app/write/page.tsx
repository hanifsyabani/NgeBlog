"use client";

import Header from "@/components/Header/Header";
import { CategoryItem } from "@/components/Write/Category";
import { useToast } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export default function Write() {
  const [bodyBlog, setBodyBlog] = useState({});
  const [description, setDescription] = useState("");
  const toast = useToast();

  

  const handleInput = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | string
  ) => {
    if (typeof e === 'string') {
      // Jika 'e' adalah string, ini berarti perubahan pada 'description'
      setDescription(e);
      // Masukkan 'description' ke dalam 'stateBodyBlog'
      setBodyBlog((old) => ({ ...old, description: e }));
    } else {
      // Jika 'e' adalah event dari input atau textarea
      const { name, value, type } = e.target;
      const inputValue =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
      setBodyBlog((old) => ({ ...old, [name]: inputValue }));
    }
  };


  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      
      const res = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(bodyBlog),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Blog created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
  //   const selectedFile = e.target.files?.[0]; // Handle ketika e.target.files adalah null
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   }
  // }

  return (
    <div className="pt-20 px-[4%]">
      <Header headertitle="New Blog" />
      <form className="flex justify-center mt-6  gap-7" onSubmit={handleSubmit}>
        <div className="w-[70%]">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            placeholder="Add a title..."
            name="title"
            id="title"
            onChange={handleInput}
            className="border border-gray-400 w-full px-2 py-3"
          />
          <div className="mt-4">
            <ReactQuill
              theme="snow"
              className="h-80"
              value={description}
              onChange={(value) => handleInput(value)}
            />
          </div>
        </div>
        <div className="w-[30%]">
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
                onChange={handleInput}
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
                    onChange={handleInput}
                  />
                  <label htmlFor={item.valueID}>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="border border-primary px-1 py-2 rounded-lg w-1/2">
              Save as draft
            </button>
            <button type="submit" className="bg-gradient-to-r from-primary to-secondary px-4 rounded-lg py-2 text-white cursor-pointer">
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
