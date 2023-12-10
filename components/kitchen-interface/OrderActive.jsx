import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

function handleNotification() {
  // play sound
  const audio = new Audio("/notification.mp3");
  audio.play();
}

const OrderActive = ({
  type = "Afhentning",
  food = [{ name: "Birria Taco Menu (4 stk)", count: 1 }],
  beverages = [{ name: "Coca-Cola 0,33 l", count: 2 }],
  extras = [{ name: "Guacamole", count: 2 }],
  time = "15:00",
  username = "John Doe",
  timestamp,
  usermail,
  handleAccept = () => {},
  handleDeny = () => {},
}) => {
  const [backgroundColor, setBackgroundColor] = useState("bg-green-600");

  useEffect(() => {
    const timestampMilliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6;

    const currentTime = new Date().getTime();
    const timeDifference = timestampMilliseconds - currentTime;

    if (timeDifference <= 0) {
      setBackgroundColor("bg-red-500");
    } else if (timeDifference <= 600000) {
      setBackgroundColor("bg-red-500");
    } else if (timeDifference <= 1200000) {
      setBackgroundColor("bg-yellow-500");
    } else {
      setBackgroundColor("bg-green-600");
    }
  }, [timestamp]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-lg min-h-[23rem] h-80 border border-gray-300 rounded-2xl flex flex-col"
    >
      {/* Top part */}
      <div className="w-full h-1/6 rounded-t-2xl border-b border-gray-300 flex items-center py-2 px-2 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 h-7 w-auto"
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
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
        <p className=" text-lg font-medium  text-gray-900">{username}</p>
      </div>
      <div className="flex h-4/6">
        {/* Order type */}
        <div className="h-full border-r border-gray-300 w-48 flex flex-col gap-4 items-center justify-center">
          {type.toLocaleLowerCase() === "afhentning"
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
            <p className="font-semibold text-lg">Madvare</p>
            {food.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name} {item.variant}
              </p>
            ))}
          </div>
          {/* Drikkevare */}
          <div className="flex flex-col w-1/2 h-auto">
            <p className="font-semibold text-lg">Drikkevare</p>
            {beverages.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name}
              </p>
            ))}
          </div>
          {/* Ekstra */}
          <div className="flex flex-col w-1/2 h-auto">
            <p className="font-semibold text-lg">Extra</p>
            {extras.map((item, i) => (
              <p key={i} className="text-gray-900 text">
                <span>{item.count}x </span>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* bottom part */}
      <div
        className={`flex justify-between px-6 w-full h-1/6 border-t border-gray-300  rounded-b-2xl items-center ${backgroundColor}`}
      >
        <p className=" text-xl text-white">
          <span className="font-bold">Tidspunkt:</span> {time}
        </p>
        <button
          onClick={handleAccept}
          className="text-gray-700 text-xl font-semibold bg-white rounded-lg py-2 px-4"
        >
          Marker klar
        </button>
      </div>
    </motion.div>
  );
};

export default OrderActive;
