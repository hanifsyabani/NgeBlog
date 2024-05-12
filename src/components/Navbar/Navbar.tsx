"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { useEffect, useState } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { FiMenu } from "react-icons/fi";

export default function Navbar({ userId }: any) {
  const [visible, setvisible] = useState(true);
  const [nav, setNav] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    let prevScroll = window.pageYOffset;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setvisible(currentScroll === 0 || prevScroll > currentScroll);
      prevScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="py-4 px-5 lg:hidden shadow-lg bg-white w-full fixed">
        <div className="flex items-center justify-between z-[20rem] gap-3">
          <Link href={"/"}>
            <div className="flex items-center gap-3 ">
              <Image src={logo} alt="logo" />
              <h1 className="font-semibold">NGEBLOG</h1>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {userId && <UserButton afterSignOutUrl="/" />}
            <FiMenu
              size={25}
              className="cursor-pointer z-50"
              onClick={() => setNav(!nav)}
            />
          </div>
        </div>
        <div
          className={`${
            nav ? "right-0" : "-right-full"
          } fixed top-16 right-0 h-screen bg-secondary w-[60%] p-6 transition-all z-50`}
        >
          <ul className="flex flex-col gap-8">
            {NavItem.map((nav) => (
              <Link href={`${nav.path}`} onClick={() => setNav(!nav)}>
                <li className="hover:underline transition-all text-white text-xl ">
                  {nav.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex items-center mt-10 gap-5">
            <Link href={"/write"} onClick={() => setNav(!nav)}>
              <div className="bg-white py-2 px-5 rounded-md text-center cursor-pointer hover:bg-gradient-to-br transition-all hover:scale-105 text-sm">
                <button>Write</button>
              </div>
            </Link>

            <div className="border border-white px-2 py-2 rounded-xl hover:bg-gray-300 text-white transition-all cursor-pointer">
              {userId ? (
                <SignOutButton />
              ) : (
                <Link href={"/sign-in"} onClick={() => setNav(!nav)}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav
        className={`${
          visible ? "top-0" : "-top-[100%]"
        } items-center transition-all justify-between py-3 px-10 gap-20 shadow-lg fixed w-full bg-white z-20 hidden lg:flex`}
      >
        <Link href={"/"}>
          <div className="flex items-center gap-3 ">
            <Image src={logo} alt="logo" />
            <h1 className="font-semibold">NGEBLOG</h1>
          </div>
        </Link>
        <ul className="flex items-center justify-center gap-8">
          {NavItem.map((nav) => (
            <Link href={`${nav.path}`}>
              <li className="hover:text-secondary transition-all">
                {nav.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-6">
          <Link href={"/write"}>
            <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-2 px-5 w-24 text-white font-bold rounded-md text-center cursor-pointer hover:bg-gradient-to-br transition-all hover:scale-105 text-sm">
              <button>Write</button>
            </div>
          </Link>

          {userId ? (
            <div className="flex items-center gap-3">
              <UserButton afterSignOutUrl="/" />
              <h1>{user?.fullName}</h1>
            </div>
          ) : (
            <div className="border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-300 transition-all cursor-pointer hover:text-white">
              <Link href={"/sign-in"}>Sign In</Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
