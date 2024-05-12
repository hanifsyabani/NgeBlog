import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export default function Card({ blogs }: { blogs: Blog[] }) {
  const getText = (html: any) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id}>
          <div className="lg:w-72 w-36 lg:h-[25rem] h-[13rem] bg-white rounded-tr-lg rounded-bl-3xl shadow-xl lg:hover:scale-105 transition-all cursor-pointer">
            <Image
              src={blog.image}
              alt="blog"
              width={300}
              height={200}
              className="w-full h-1/2 object-cover rounded-tr-2xl"
            />
            <div className="lg:mt-3 p-4">
              <small className="text-gray-500 hidden lg:block">{blog.createdAt}</small>
              <h1 className="lg:text-xl text-sm font-bold text-gray-900 hover:underline">{blog.title}</h1>
              <p className="text-gray-500 hidden lg:block">
                {blog.description
                  ? blog.description.length > 80
                    ? getText(blog.description.slice(0, 80)) + "..."
                    : getText(blog.description)
                  : ""}
              </p>
              {blog.category && (
                <div className="bg-gradient-to-tr from-primary via-secondary to-tersier px-4 rounded-full w-28  text-white font-semibold lg:mt-4 text-sm">
                  {blog.category}
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
