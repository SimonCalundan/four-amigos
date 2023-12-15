/* Lavet af Simon og Karl */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Jost } from "next/font/google";
import { Badge } from "@mui/joy";
import { DeleteForever, ArrowForwardIos } from "@mui/icons-material";
import { useStripeInfo } from "@/pages/_app";
import { createSession } from "@/stripe/create_checkoutsession";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrderInfo } from "@/pages/_app";
import ConfirmOrder from "../ConfirmOrder";

const jost = Jost({ subsets: ["latin"] });

/* En array der styrer menupunkterne, som senere bliver vist ved .map */
const menuItems = [
  {
    name: "Kontakt",
    href: "/kontakt",
    current: false,
    styling: "hidden md:block",
  },
  {
    name: "Bestil",
    href: "/bestil",
    current: false,
    styling: "",
  },
];

export default function NavBar() {
  /* State til at styre tallet ved indkøbskurven, der bliver sat efter orderInfo zustand-objektets keys-length */
  const [badgeCount, setBadgeCount] = useState(0);
  /* Importering af orderInfo og clearOrderInfo fra zustand */
  const { orderInfo, clearOrderInfo } = useOrderInfo();
  /* En konstant emptyBasket der beskriver en tom kurv, ved at tjekke for arrays længder. Brugt til conditional rendering i kurven */
  const emptyBasket =
    orderInfo.foods.length === 0 && orderInfo.beverages.length === 0;
  const [showBasket, setShowBasket] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  /* En useEffect der sætter badgeCount som set ovenfor, der opdaterer hver gang orderInfo opdateres */
  useEffect(() => {
    setBadgeCount(
      orderInfo.foods.reduce((acc, food) => acc + food.count, 0) +
        orderInfo.beverages.reduce((acc, beverage) => acc + beverage.count, 0)
    );
  }, [orderInfo]);
  return (
    <header
      className={`flex w-screen justify-center h-20 bg-light-orange fixed z-[999] ${jost.className}`}
    >
      <div className="flex items-center justify-between w-screen h-full  jost max-w-6xl">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Four Amigos Logo"
              height={200}
              width={200}
              className="pl-2 cursor-pointer"
            />
          </Link>
        </motion.div>
        <div className="flex text-2xl lg:text-xl mr-4 gap-6 px-4 items-center">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} className={`${item.styling}`}>
              {item.name}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowBasket(!showBasket)}
              className="relative"
            >
              <Badge variant="filled" badgeContent={badgeCount} size="sm">
                <motion.svg
                  whileHover={{ scale: 1.1 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z" />
                  <path d="M17 10l-2 -6" />
                  <path d="M7 10l2 -6" />
                </motion.svg>
              </Badge>
            </button>
            <AnimatePresence>
              {/* En af mange conditional renderings, der renderer content baseret på nogle parametre. Her bliver der vist en kurv, hvis staten "showBasket" er true. */}
              {showBasket && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute top-5 -right-8 md:right-0 border-2 border-gray-300 w-screen md:w-[70vw] lg:min-w-[40vw] lg:w-auto min-h-40 h-auto bg-white flex flex-col items-center md:items-start rounded-lg p-6 z-50"
                >
                  {/* Top */}
                  <div className="flex w-full justify-between pb-4">
                    <h2 className="font-medium text-2xl">Din kurv</h2>
                    <button onClick={() => setShowBasket(false)}>
                      <motion.svg
                        whileHover={{ scale: 1.1 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className=" h-8 w-8"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </motion.svg>
                    </button>
                  </div>
                  {/* content */}
                  {/* Endnu mere conditional rendering i de næste mange linjer, der viser forskellige informationer og tekster i kurven, baseret på om kurven er tom, fyldt, ikke har tilbehør valgt. den vigtigste rendering værende knapperne til at tømme kurven og gå videre til betaling, som selvføgelig kun vises, hvis !emptyBasket */}
                  {emptyBasket && (
                    <div>
                      <h3>Din kurv er tom</h3>
                      <h4 className="text-lg font-light">
                        Gå til bestil siden for at tilføje til din bestilling
                      </h4>
                    </div>
                  )}
                  {orderInfo.foods.length > 0 && (
                    <div className="w-full pb-4">
                      <h3 className="font-medium text-xl">Mad:</h3>
                      {orderInfo.foods.map((food, index) => (
                        <div key={index} className="flex gap-4 text-lg">
                          <p>{food.count}x </p>
                          <p> {food.name}</p>
                          <p>m. {food.variant}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {orderInfo.beverages.length > 0 && (
                    <div className="w-full pb-4">
                      <h3 className="font-medium text-xl">Drikke:</h3>
                      {orderInfo.beverages.map((beverage, index) => (
                        <div key={index} className="flex gap-4 text-lg">
                          <p>{beverage.count}x </p>
                          <p> {beverage.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {orderInfo.extras.length > 0 && (
                    <div className="w-full">
                      <h3 className="font-medium text-xl">Tilbehør:</h3>
                      {orderInfo.extras.map(
                        (extra, index) =>
                          extra.count > 0 &&
                          extra.name &&
                          extra.name.length > 0 && (
                            <div key={index} className="flex gap-4 text-lg">
                              <p>{extra.count}x </p>
                              <p> {extra.name}</p>
                            </div>
                          )
                      )}
                      {orderInfo.extras.every(
                        (extra) => extra.count === 0 || !extra.name
                      ) && (
                        <p className="text-lg">Du har intet tilbehør valgt</p>
                      )}
                    </div>
                  )}
                  {emptyBasket != true && (
                    <div className="flex justify-between w-full pt-4">
                      <div
                        className="bg-red-500 text-white rounded p-2 text-base cursor-pointer flex items-center"
                        onClick={() => clearOrderInfo()}
                      >
                        <DeleteForever className="text-lg" />
                        Tøm hele kurven
                      </div>
                      <button
                        onClick={() => {
                          setShowConfirmOrder(true);
                          setShowBasket(false);
                        }}
                        className="bg-light-orange rounded p-2 text-base cursor-pointer flex items-center"
                      >
                        Til betaling
                        <ArrowForwardIos className="text-lg" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {showConfirmOrder && (
        <div className=" top-0 left-0 fixed h-[190vh] overflow-hidden w-screen bg-black bg-opacity-40">
          <ConfirmOrder closeModal={() => setShowConfirmOrder(false)} />
        </div>
      )}
    </header>
  );
}
