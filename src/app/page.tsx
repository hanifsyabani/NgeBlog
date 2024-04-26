import rated from "@/assets/rated.png";
import Image from "next/image";
import imgbloglong from "@/assets/bloglong.png";
import Card from "@/components/HomePage/Card";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
      <section className="text-center pt-36 pb-20">
        <h1 className="text-7xl font-extrabold tracking-normal max-w-xl mx-auto bg-gradient-to-r from-primary via-tersier to-secondary bg-clip-text text-transparent pb-4">
          Starting Your Blogging Journey
        </h1>
        <p className="pt-4 text-xl font-semibold">
          Get everyone working In a single platform
        </p>
        <p className="text-lg">designed to managed any type of work</p>
        <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-4 px-6 w-72 text-white font-bold rounded-xl text-center cursor-pointer mx-auto mt-10 text-xl">
          <button>Get Started. It's FREE</button>
        </div>
        <div className="flex items-center gap-2 justify-center pt-2">
          <Image src={rated} alt="rated" />
          <p className="mt-2">
            Rated #1{" "}
            <span className="font-bold">Collaboration and Productivity</span>{" "}
            product 2024
          </p>
        </div>
      </section>

      <section className="mt-10 px-[5%]">
        <Header headertitle="Recent Blog Post"/>
        <div className="flex mt-5 gap-7">
          <div className="w-[90%]">
            <Image src={imgbloglong} alt="bloglong" className="w-full" />
            <div>
              <small>Sunday, 1 Jan 2023</small>
              <h1 className="text-xl font-bold py-3">
                UX review presentations
              </h1>
              <p>
                How do you create compelling presentations that wow your
                colleagues and impress your managers?
              </p>
              <div className="flex items-center gap-5 mt-4">
                <button className="bg-teal-100 p-2 rounded-full">Design</button>
                <button className="bg-purple-100 p-2 rounded-full">
                  Presentation
                </button>
                <button className="bg-blue-100 p-2 rounded-full">
                  Technology
                </button>
              </div>
            </div>
          </div>
          <div>
            <Card />
            <Card />
          </div>
        </div>
        <div className="flex gap-14 mt-20">
          <Image src={imgbloglong} alt="bloglong" className="w-1/2" />
          <div className="w-1/2">
            <small>Sunday, 1 Jan 2023</small>
            <h1 className="text-xl font-bold py-3">UX review presentations</h1>
            <p>
              A grid system is a design tool used to arrange content on a
              webpage. It is a series of vertical and horizontal lines that
              create a matrix of intersecting points, which can be used to align
              and organize page elements. Grid systems are used to create a
              consistent look and feel across a website, and can help to make
              the layout more visually appealing and easier to navigate.
            </p>
            <div className="flex items-center gap-5 mt-4 ">
              <button className="bg-teal-100 p-2 rounded-full">Design</button>
              <button className="bg-purple-100 p-2 rounded-full">
                Presentation
              </button>
              <button className="bg-blue-100 p-2 rounded-full">
                Technology
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-20  pb-20">
        <div className="bg-gradient-to-tr px-[5%] from-primary via-secondary to-tersier text-white">
          <h1>All Blog Posts</h1>
        </div>
      </section>
    </>
  );
}
