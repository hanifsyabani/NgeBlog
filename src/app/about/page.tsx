'use client'

import { featured } from "@/components/About/AboutItem";
import Aos from "aos";
import 'aos/dist/aos.css';
import Image from "next/image";
import { useEffect } from "react";

export default function About() {

  useEffect(() =>{
    Aos.init();
  })
  
  return (
    <div className="lg:flex justify-center gap-4 pt-20 lg:mt-20 lg:p-10 ">
      <div className="lg:w-1/2 border border-gray-300 p-4 rounded-xl" data-aos = 'fade-right' data-aos-delay = '300'>
        <h1 className="text-xl font-semibold text-primary">How it started</h1>
        <h1 className="lg:text-5xl font-bold lg:max-w-lg text-4xl py-6 tracking-wide bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">
          Write, Share, Inspire: Building Community Through Words
        </h1>
        <p>
          In our blog creation journey, we believe in the transformative power
          of words. Every article written, every story shared, and every idea
          expressed has the potential to ignite inspiration and foster
          connection within our community. Through our platform, we aim to
          empower individuals to unleash their creativity, share their unique
          perspectives, and spark meaningful conversations that resonate far
          beyond the digital realm. Together, we cultivate a space where voices
          are heard, ideas flourish, and bonds are formed, enriching lives one
          word at a time
        </p>
      </div>
      <div className="lg:w-1/2" data-aos='fade-left' data-aos-delay = '300'>
        <Image
          src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="logo"
          width={300}
          height={300}
          className="w-full h-1/2 rounded-xl object-cover"
        />
        <div className="flex justify-evenly items-center">
          <div className="grid grid-cols-2 gap-10 mt-4">
            {featured.map((item) => (
              <div key={item.stats}>
                <h1 className="font-semibold text-3xl">{item.stats}</h1>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
