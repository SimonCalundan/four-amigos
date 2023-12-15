import React from "react";
import { Jost } from "next/font/google";
import Image from "next/image";
import { useOrderInfo } from "./_app";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useEffect } from "react";
import Link from "next/link";

const jost = Jost({ subsets: ["latin"] });

function SuccessComponent() {
  const { orderInfo, clearOrderInfo } = useOrderInfo();
  /* Firebase function that updates an document by id */
  async function updateStatus(id) {
    try {
      const docRef = doc(db, "orders", id);
      const newState = {
        state: "pending",
      };
      const response = await updateDoc(docRef, newState);

      console.log("State updated");
    } catch (error) {
      console.log(error);
      console.log("State not updated");
    }
  }

  useEffect(() => {
    const id = localStorage.getItem("order_id");
    if (id) {
      updateStatus(id);
    } else if (!id) {
      console.log("id not found");
    }
  }, []);
  return (
    <main
      className={`w-screen h-screen flex flex-col justify-center items-center ${jost.className}`}
    >
      <Image
        src={"/logo_stor.png"}
        width={300}
        height={300}
        alt="Four amigos logo"
        draggable={false}
      />
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-medium">Tak for din bestilling!</h1>
        <p className="text-lg">
          Du modtager en mail når køkkenet har bekræftet din ordre
        </p>
        <Link
          className="bg-dark-orange text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-80 transition-all duration-300 ease-in-out mt-4"
          href={"/"}
        >
          Gå tilbage til forsiden
        </Link>
      </div>
    </main>
  );
}

const success = () => {
  return <SuccessComponent />;
};

export default success;
