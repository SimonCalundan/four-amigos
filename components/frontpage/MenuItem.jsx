import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
      whileHover={{ scale: 1.01 }}
      onClick={() => onClick({ status, src, title, amount, price, onClick })}
      className={`flex bg-white shadow-xl rounded-lg w-11/12 md:w-2/5 cursor-pointer object-cover overflow-hidden h-60 ${
        status === "sold_out" && "opacity-50 pointer-events-none"
      }`}
    >
      <div className="w-1/2">
        <Image
          src={
            type === "food"
              ? "/food_1.jpg"
              : type === "beverage" && value === "coca_cola"
              ? "/cocaCola.jpg"
              : type === "beverage" && value === "coca_cola_zero"
              ? "/cocaColaZero.jpg"
              : type === "beverage" && value === "faxe_kondi"
              ? "/faxeKondi.jpg"
              : "/food_1.jpg"
          }
          height={200}
          width={200}
          alt="Billede af Birriatacos"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h3 className="font-bold text-xl pb-2">{title}</h3>
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
