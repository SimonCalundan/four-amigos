/* Lavet af karl */
/* Et komponent til visningen af de varer der er til salg - tacos og drikkevarer */

import Image from "next/image";
import { motion } from "framer-motion";

export default function MenuItem({
  status,
  src,
  title,
  amount,
  price,
  onClick,
  type,
  value,
}) {
  return (
    <motion.div
      onClick={() => onClick({ status, src, title, amount, price, onClick })}
      className={`flex bg-white hover:shadow-2xl transition-all duration-300 shadow-xl rounded-lg w-full md:w-2/5 cursor-pointer object-cover overflow-hidden h-60 ${
        status === "sold_out" && "opacity-50 pointer-events-none"
      } `}
    >
      <div className="w-1/2">
        {/* Image fra next der viser billedet af varen, alt efter hvilken value den enkelte vare har. */}
        <Image
          src={
            type === "food"
              ? "/food_1.jpg"
              : type === "beverage" && value === "coca_cola"
              ? "/cocacola.jpg"
              : type === "beverage" && value === "coca_cola_zero"
              ? "/cocaColaZero.jpg"
              : type === "beverage" && value === "faxe_kondi"
              ? "/faxeKondi.jpg"
              : "/food_1.jpg"
          }
          height={500}
          width={500}
          /* Alt tag der skifter efter om typen af vare er food eller beverage */
          alt={
            type === "food"
              ? "Billede af Birriatacos"
              : "billede af drikkevarer"
          }
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h3 className="font-bold text-xl pb-2">{title}</h3>
        {/* Beskrivelse af varen der med conditional rendering enten viser en beskrivelse af tacos, samt mængden, ellers viser beskrivelse for beverage */}
        <p className="line-clamp-3">
          {amount}
          {type === "food"
            ? " velsmagende tacos med hjemmelavet langtids braiseret oksekød. Serveret med ost, løg, koriander eller persille og lime."
            : "En iskold sodavand på dåse"}
        </p>
        <div className="flex pt-2 items-center justify-between mt-auto">
          <p className="text-lg">kr. {price},-</p>
          <button className="bg-light-orange p-2 pl-4 pr-4 rounded-lg">
            Tilføj
          </button>
        </div>
      </div>
    </motion.div>
  );
}
