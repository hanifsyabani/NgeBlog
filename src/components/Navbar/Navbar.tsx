import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-evenly py-3 gap-20 shadow-lg fixed w-full bg-white">
      <Link href={"/"}>
        <div className="flex items-center gap-3">
          <Image src={logo} alt="logo" />
          <h1 className="font-semibold">NGEBLOG</h1>
        </div>
      </Link>
      <ul className="flex items-center justify-center gap-8">
        <li>Home</li>
        <li>About</li>
        <li>Category</li>
        <li>Contact</li>
      </ul>
      <Link href={"/write"}>
        <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-2 px-5 w-32 text-white font-bold rounded-md text-center cursor-pointer">
          <button>Write</button>
        </div>
      </Link>
    </nav>
  );
}
