/*Emil, Karl, Simon, Nicolai*/
import Image from "next/image";
import NavBar from "@/components/frontpage/navigation/NavBar";
import Footer from "@/components/frontpage/footer/Footer";

import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={` w-screen flex flex-col ${jost.className} bg-light-brown`}>
      <NavBar />
      <div className="flex  w-full md:h-[42rem] h-[15rem] overflow-hidden relative mt-20">
        <Image
          src={"/four_4.jpeg"}
          alt="hero"
          layout="fill"
          objectFit="cover"
          objectPosition="center center"
          priority={true}
          className=" brightness-75"
        />
      </div>
      <div className="flex flex-col md:flex-row md:justify-around mt-6 md:items-start items-center px-4">
        <div className="flex flex-col text-dark-orange md:gap-3 md:w-2/4 text-center mt-4 mb-4 w-[20rem] px-4">
          <h1 className="text-center md:text-left text-2xl md:text-3xl font-bold text-dark-orange">
            Velkommen
          </h1>
          <h2 className="text-center md:text-left text-xl md:text-2xl">
            Til Four Amigos
          </h2>
          <p className="md:text-xl text-center md:text-left">
            Oplev autentisk mexicansk smag hos Four Amigos, hvor friske
            ingredienser og krydrede smagsvarianter forenes i en livlig
            atmosfære. Udforsk vores mangfoldige menu, der fortæller historien
            om Mexico på hver tallerken. Velbekomme til en unik fusion af
            tradition og modernitet!
          </p>
        </div>
        <figure className="w-[20rem] flex self-center md:w-[30rem] md:h-100%">
          <Image
            src={"/four_3.JPG"}
            alt="billede af væggen nede i restauranten"
            height={400}
            width={600}
          />
        </figure>
      </div>
      <Footer />
    </div>
  );
}
