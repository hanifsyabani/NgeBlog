"use client";

import rated from "@/assets/rated.png";
import Image from "next/image";
import imgbloglong from "@/assets/bloglong.png";
import Card from "@/components/Card/Card";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import Recent from "@/components/HomePage/Recent";
import bg from "@/assets/bg.png";
import Footer from "@/components/Footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";

interface Blog {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getBlog() {
      setLoading(true);
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.slice(0, 6));
      } else {
        console.log("error");
      }
      setLoading(false);
    }
    getBlog();
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <>
      <section className="text-center lg:pt-36 py-24">
        <h1
          className="text-7xl font-extrabold tracking-normal max-w-xl mx-auto bg-gradient-to-r from-primary via-tersier to-secondary bg-clip-text text-transparent pb-4"
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          Starting Your Blogging Journey
        </h1>
        <p className="pt-4 text-xl font-semibold">
          Get everyone working In a single platform
        </p>
        <p className="text-lg">designed to managed any type of work</p>
        <div
          className="bg-gradient-to-tr from-primary via-secondary to-tersier py-4 px-6 w-72 text-white font-bold rounded-xl text-center cursor-pointer mx-auto mt-10 text-xl hover:from-tersier hover:via-primary hover:to-secondary duration-500 transition-all "
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="500"
        >
          <button>Get Started. It's FREE</button>
        </div>
        <div className="flex items-center gap-2 justify-center lg:pt-2 pt-4 lg:text-base text-sm">
          <Image src={rated} alt="rated" className="w-4 lg:w-8" />
          <p className="mt-2">
            Rated #1
            <span className="font-bold">Collaboration and Productivity </span>
            product 2024
          </p>
        </div>
      </section>

      <section className="mt-10 px-[5%]">
        <Header headertitle="Recent Blog Post" />
        <div
          className="lg:flex mt-5 gap-7"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="lg:w-[90%] mb-7 lg:mb-0">
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
            <Recent />
            <Recent />
          </div>
        </div>
        <div
          className="lg:flex gap-14 mt-20"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Image src={imgbloglong} alt="bloglong" className="lg:w-1/2" />
          <div className="lg:w-1/2">
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

      <section className="mt-20 px-[5%]">
        <div className="bg-gradient-to-tr px-[5%] from-primary via-secondary to-tersier text-white py-10 rounded-xl ">
          <h1 className="text-xl font-bold">All Blog Posts</h1>
          <div className="flex justify-center items-center mt-4">
            {loading ? (
              <Spinner size={"xl"} />
            ) : (
              <div
                className="grid lg:grid-cols-3 grid-cols-2 lg:gap-16 gap-7"
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="200"
              >
                <Card blogs={blogs} />
              </div>
            )}
          </div>
          <Link
            href={"/category"}
            className="flex justify-center items-center mt-4"
          >
            <button className="bg-white hover:bg-white/65 px-4 py-2 mx-auto rounded-full w-32 text-center text-black  font-semibold">
              View More
            </button>
          </Link>
        </div>
      </section>

      <section
        className="relative mt-20 lg:mt-0"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <Image
          src={bg}
          alt="bloglong"
          className="lg:w-full -z-10 object-cover"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-center ">
          <h1 className="text-white lg:text-5xl font-extrabold lg:max-w-lg max-w-sm text-xl ">
            Ready to unleash your teams full potential ?
          </h1>
          <div className="flex lg:flex-row flex-col  justify-center items-center gap-6 my-6">
            <button className="bg-white lg:w-52 py-4 font-bold text-secondary text-center rounded-full w-44">
              YES, lets do this
            </button>
            <button className="bg-transparent   lg:w-44 text-center border py-4 rounded-full border-gray-400 text-gray-400 hidden lg:block">
              Show me more
            </button>
          </div>
          <p className="text-gray-400 hidden lg:block">
            Free forever. No credit card required
          </p>
          <small className="text-gray-400 hidden lg:block">
            Join 2+ million temas today!
          </small>
        </div>
      </section>

      <Footer />
    </>
  );
}
