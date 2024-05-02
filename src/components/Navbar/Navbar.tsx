"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { NavItem } from "./NavItem";
import { useEffect, useState } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const [visible, setvisible] = useState(true);
  const {user}= useUser();

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
    <nav
      className={`${
        visible ? "top-0" : "-top-[100%]"
      }  flex items-center transition-all justify-between py-3 px-10 gap-20 shadow-lg fixed w-full bg-white z-20`}
    >
      <Link href={"/"}>
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" />
          <h1 className="font-semibold">NGEBLOG</h1>
        </div>
      </Link>
      <ul className="flex items-center justify-center gap-8">
        {NavItem.map((nav) => (
          <Link href={`${nav.path}`}>
            <li className="hover:text-secondary transition-all">{nav.name}</li>
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <Link href={"/write"}>
          <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-2 px-5 w-24 text-white font-bold rounded-md text-center cursor-pointer hover:bg-gradient-to-br transition-all hover:scale-105 text-sm">
            <button>Write</button>
          </div>
        </Link>

        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton />
            <h1>{user?.fullName}</h1>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
