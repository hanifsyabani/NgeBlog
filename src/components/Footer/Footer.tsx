import Image from "next/image";
import logo from "@/assets/logo.png";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { quicklinks, term } from "./FooterItem";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="lg:flex justify-evenly px-4 shadow-3xl py-20">
      <div>
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={50} height={50} />
          <h1 className="text-3xl font-bold">NGEBLOG</h1>
        </div>
        <p className="py-4">
          Ngblog has a lot of features for everyone to use{" "}
        </p>
        <div className="my-4 lg:my-0">
          <h1 className="font-semibold text-lg">Follow us social media</h1>
          <div className="flex items-center gap-4 ">
            <FaFacebook
              size={35}
              className="cursor-pointer bg-blue-600 p-2 text-white rounded-full"
            />
            <FaInstagram
              size={35}
              className="cursor-pointer bg-pink-600 p-2 text-white rounded-full"
            />
          </div>
        </div>
      </div>
      <FooterLink item={quicklinks} title="Quick Links" />
      <FooterLink item={term} title="Terms and Conditions" />
    </footer>
  );
}
