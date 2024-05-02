import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Providers } from "./provider";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const inter = Gabarito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ngeblog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <link rel="icon" href="/logo.png" />
        <body className={inter.className}>
          {userId && (
            <Providers>
              <NextTopLoader color="#f97316" />
              <Navbar userId={userId}  />
              {children}
            </Providers>
          )}
        </body>
      </html>
    </ClerkProvider>
  );
}
