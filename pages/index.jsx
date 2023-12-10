import Image from "next/image";
import NavBar from "@/components/frontpage/navigation/NavBar";
import Footer from "@/components/frontpage/footer/Footer";

import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={` w-screen flex flex-col ${jost.className}`}>
      <NavBar />
      <div className="flex w-full h-[42rem] overflow-hidden relative">
        <Image
          src={"/four_4.jpeg"}
          alt="hero"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          priority={true}
        />
      </div>
      <h1 className="text-center text-3xl mt-6 font-bold">Velkommen</h1>
      <h2 className="text-center text-xl ">Til Four Amigos</h2>
      {/* Hero image */}
      <Footer />
    </div>
  );
}
