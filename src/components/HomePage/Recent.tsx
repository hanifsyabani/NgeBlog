import Image from "next/image";
import imgblogshort from "@/assets/blogshort.png";


export default function Recent() {
  return (
    <div className="lg:flex gap-6 mb-8">
      <Image src={imgblogshort} alt="blogshort" className="w-full" />
      <div>
        <small>Sunday, 1 Jan 2023</small>
        <h1 className="text-xl font-bold text-gray-900">UX review presentations</h1>
        <p>
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
        <div className="flex items-center gap-5 mt-4">
          <button className="bg-teal-100 p-2 rounded-full">Design</button>
          <button className="bg-purple-100 p-2 rounded-full">
            Presentation
          </button>
          <button className="bg-blue-100 p-2 rounded-full">Technology</button>
        </div>
      </div>
    </div>
  );
}
