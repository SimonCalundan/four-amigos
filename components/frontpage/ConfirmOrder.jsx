/* Lavet af Karl */
/* Et modal-component til sidste step i checkud processen - navn, mail og afhentningstidspunkt indtastes */

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { useOrderInfo } from "@/pages/_app";
import { Jost } from "next/font/google";
import { useStripeInfo } from "@/pages/_app";
import { createSession } from "@/stripe/create_checkoutsession";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Link from "next/link";
const jost = Jost({ subsets: ["latin"] });

export default function ConfirmOrder({ closeModal }) {
  // Ordre info fra zustand
  const { orderInfo, setOrderInfo } = useOrderInfo();

  /* Funktion til at sende orderInfo zustandobjektet til databasen, så det kan blive gemt, og vist på admin siden. */
  async function sendOrderToFirestore() {
    if (!orderInfo) return null;
    try {
      const docRef = await addDoc(collection(db, "orders"), orderInfo);
      const orderId = docRef.id;
      sessionStorage.setItem("order_id", orderId);
    } catch (error) {
      console.log(error);
    }
  }

  const [deliverTime, setDeliverTime] = useState("00:00");
  const { stripeInfo } = useStripeInfo();

  /* En funktion til at sætte tidspunkt for afhentning af ordren. Benytter sig af timestamp fra firestore, og bliver omformateret til en tid man kan læse og forstå. til sidst sættes orderInfo.due_time til den formaterede timestamp tid. */
  function handleTimeChange(time) {
    const timeString = time;
    setDeliverTime(timeString);
    const [hours, minutes] = timeString.split(":").map(Number);

    const now = new Date();
    const timestamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0,
      0
    );

    if (isNaN(timestamp.getTime())) {
      console.error("Invalid time value");
    } else {
      const seconds = Math.floor(timestamp.getTime() / 1000);
      const nanoseconds = (timestamp.getTime() % 1000) * 1000000;

      const formattedTimestamp = new Timestamp(seconds, nanoseconds);

      setOrderInfo("due_time", formattedTimestamp);
    }
  }
  // State der holder styr på URL til checkout session
  const [sessionUrl, setSessionUrl] = useState(null);

  /* Funktion til at styre hvad der sker, når form'en bliver submitted */
  const handleSubmit = async () => {
    sendOrderToFirestore();
    window.open(await createSession(stripeInfo));
    setSessionUrl(await createSession(stripeInfo));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={`absolute z-[9999] mx-auto inset-x-0 w-11/12 bg-white shadow-lg h-[32rem] overflow-scroll top-24 rounded-xl md:top-20 md:w-1/2 lg:w-[36rem] p-4 ${jost.className} flex flex-col justify-start gap-8 `}
    >
      <button
        onClick={() => {
          closeModal();
        }}
        className="absolute top-2 right-2 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
      <h3 className="mr-6 mt-4 text-lg max-w-md">
        Inden du sendes videre til betaling, bedes du udfylde de resterende
        informationer:
      </h3>
      <form
        method="post"
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="navn">
          <h3 className="text-lg font-medium mb-2">Navn</h3>
          <input
            type="text"
            id="navn"
            name="customer_name"
            placeholder="Fornavn og efternavn"
            className="w-full  border rounded-md py-2 px-4"
            required
            /* On change sætter orderInfo.customer_name til værdien i inputfeltet */
            onChange={(e) => {
              setOrderInfo("customer_name", e.target.value);
            }}
          />
        </label>
        <label htmlFor="mail">
          <h3 className="text-lg font-medium mb-2">Mail</h3>
          <input
            type="email"
            id="mail"
            name="customer_mail"
            placeholder="E-mail"
            className="w-full  border rounded-md py-2 px-4"
            required
            /* On change sætter orderInfo.customer_mail til værdien i inputfeltet */
            onChange={(e) => {
              setOrderInfo("customer_mail", e.target.value);
            }}
          />
        </label>
        <div className="">
          <label
            htmlFor="timeInput"
            className="text-lg text-gray-900 font-medium mb-2"
          >
            Angiv tidspunkt for afhentning
          </label>
          <input
            id="timeInput"
            name="due_time"
            required
            min="09:00"
            max="22:00"
            step=""
            className="bg-gray-100 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-54 ps-10 p-1 text-2xl mt-2 w-full "
            type="time"
            /* On change kører handleTimeChange funktionen med værdien i time-feltet passeret */
            onChange={(e) => {
              handleTimeChange(e.target.value);
            }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          type="submit"
          className="rounded-lg bg-light-orange text-black p-2 w-full mt-6"
        >
          Til betaling
        </motion.button>
        {sessionUrl && (
          <div className="flex flex-col">
            <p>Åbnede betalingsvindue ikke?</p>
            <Link
              target="_blank"
              href={sessionUrl}
              alt="Betalingslink"
              className="rounded-lg bg-black text-white p-2 w-full"
            >
              Tryk her
            </Link>
          </div>
        )}
      </form>
    </motion.section>
  );
}
