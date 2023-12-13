import React from "react";
import { motion, Reorder } from "framer-motion";

// Objekt der gør det muligt at vælge ikon ud fra ordretype
const icons = {
  "pickup": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className=" h-32 w-32 text-gray-400"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
    </svg>
  ),
  "delivery": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className=" h-32 w-32 text-gray-400"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="1"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
      <path d="M3 9l4 0" />
    </svg>
  ),
};

const OrderPending = ({
  type = "Afhentning",
  foods = [{ name: "Birria Taco Menu (4 stk)", count: 1 }],
  beverages = [{ name: "Coca-Cola 0,33 l", count: 2 }],
  extras = [{ name: "Guacamole", count: 2 }],
  time = "15:00",
  usermail,
  handleAccept = () => {},
  handleDeny = () => {},
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-lg min-h-[20rem] h-80 border border-gray-300 rounded-2xl flex flex-col"
    >
      {/* Top part */}
      <div className="flex h-3/4">
        {/* Order type */}
        <div className="h-full border-r border-gray-300 w-48 flex flex-col gap-4 items-center justify-center">
          {type?.toLocaleLowerCase() === "afhentning"
            ? icons.pickup
            : icons.delivery}
          <p className="text-gray-900 text-lg font-medium capitalize ">
            {type}
          </p>
        </div>
        {/* Ordre information */}
        <div className="h-full flex flex-grow flex-wrap p-4">
          {/* Madvare */}
          <div className="flex flex-col w-1/2 h-auto">
            <p className="font-semibold text-lg">Madvarer</p>
            {foods?.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name} {item.variant}
              </p>
            ))}
          </div>
          {/* Drikkevare */}
          <div className="flex flex-col w-1/2 h-auto">
            <p className="font-semibold text-lg">Drikkevarer</p>
            {beverages?.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name}
              </p>
            ))}
          </div>
          {/* Ekstra */}
          <div className="flex flex-col w-1/2 h-auto">
            <p className="font-semibold text-lg">Extra</p>
            {extras?.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* bottom part */}
      <div className="flex justify-around w-full h-1/4 border-t border-gray-300 bg-green-600 rounded-b-2xl items-center">
        <button
          onClick={handleDeny}
          className="text-white text-xl font-semibold bg-white bg-opacity-20 rounded-lg py-2 px-4"
        >
          Afvis
        </button>
        <p className=" text-xl text-white">
          <span className="font-bold">Tidspunkt:</span> {time}
        </p>
        <button
          onClick={handleAccept}
          className="text-green-600 text-xl font-semibold bg-white rounded-lg py-2 px-4"
        >
          Accepter
        </button>
      </div>
    </motion.div>
  );
};

export default OrderPending;
