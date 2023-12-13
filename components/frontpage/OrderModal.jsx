/* Nicolai  */

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Jost } from "next/font/google";
import { useOrderInfo, useStripeInfo } from "@/pages/_app";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

/* Ovenfor ses de importerede bibloteker, som er benyttet på OrderModal.  */

const jost = Jost({ subsets: ["latin"] });

/* Ordermodal komponenten som bruger flere forskellige props. */

const OrderModal = ({
  title,
  price,
  src,
  amount,
  closeModal,
  type,
  value,
  submitToast,
}) => {
  /* State variabler "totalPrice" som bruger useState hooket. Den bruger "useEffect" hooket til at opdatere prisen i modalen */

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(price);
  }, [price]);

  const handleCheckboxChange = (price, isChecked) => {
    setTotalPrice((prevTotalPrice) =>
      isChecked ? prevTotalPrice + price : prevTotalPrice - price
    );
  };

  const [counter, setCounter] = useState(1);

  /* Counter som håndtere hvor mange ordrer brugeren vil have i modalen. Handleclick 1 og 2 er knapper som enten forøger eller sænker antallet. Handlecounter 
  funktionen opdatere prisen alt efter hvilken knap som bliver trykket. useEffect bliver brugt til at sørge for at prisen bliver opdateret når counter bliver ændret */

  const handleClick1 = () => {
    setCounter((prevCounter) => prevCounter + 1);
    handleCounter();
  };

  const handleClick2 = () => {
    if (counter > 1) setCounter((prevCounter) => prevCounter - 1);
    handleCounter();
  };

  const handleCounter = () => {
    setTotalPrice(price * counter);
  };

  useEffect(() => {
    handleCounter();
  }, [counter]);

  /* Funktioner som håndtere ændringer alt efter hvilke radio og checkboxe som bliver valgt. Det er for at holde 
  styr på det udvalgte, alt efter hvad brugeren brugeren vælger.  */

  const [variant, setVariant] = useState();
  /* Bruger useState hook til at gemme den valgte mulighed  */
  const handleVariant = (variantString, isChecked) => {
    if (isChecked) {
      setVariant(variantString);
    } else {
      setVariant("");
    }
  };

  /* Definerer funktionen "handleVariant" der lytter til to parametre "variant String", som er varianten  og "isChecked" (en boolean der angiver om checkboxen er markeret). 
  Hvis "isChecked" er true sættes "variant" til at være "varintString". Hvis den er false sættes den til en tom string */
  const [extrasState, setExtrasState] = useState();

  const handleExtrasState = (extrasString, isChecked) => {
    if (isChecked) {
      setExtrasState(extrasString);
    } else {
      setExtrasState("");
    }
  };

  const [beveragesState, setBeveragesState] = useState();

  const handleBeveragesState = (beveragesString, isChecked) => {
    if (isChecked) {
      setBeveragesState(beveragesString);
    } else {
      setBeveragesState("");
    }
  };

  const { setFoods, orderInfo, setExtras, setBeverages } = useOrderInfo();

  // Håndter tilføjelse af mad til stripe checkout
  const { stripeInfo, addItem, removeItem } = useStripeInfo();

  const addFoods = () => {
    const newFoods = {
      count: counter,
      name: title,
      variant: variant,
    };
    const newExtras = {
      count: 1,
      name: extrasState,
    };
    const newBeverages = {
      count: counter,
      name: beveragesState,
    };

    setFoods(newFoods);
    setExtras(newExtras);
    setBeverages(newBeverages);
  };

  const addBeverages = () => {
    const newBeverages = {
      count: counter,
      name: title,
    };
    setBeverages(newBeverages);
  };

  /* useEffecten lytter til ædnringer i de forskellige angivet værdier i arrayen.  */
  useEffect(() => {
    console.log("Foods:", orderInfo.foods);
    console.log("Extras:", orderInfo.extras);
    console.log("Beverages:", orderInfo.beverages);
  }, [orderInfo.foods, orderInfo.extras, orderInfo.beverages]);

  /* "handleSubmit" evaluere forskellige betingelser for de valgte værdier og ordretyper */

  const handleSubmit = () => {
    const isVariantSelected = variant !== undefined;
    const isBeveragesSelected = beveragesState !== undefined;

    /* Den kigger efter om en variant eller en drikekvare er valgt ved at tjekke om "varaint" og "beverageState" er forskellig fra "undefined" */

    if (isVariantSelected && isBeveragesSelected) {
      closeModal();
      addFoods();
      addItem(value, counter);
      submitToast();
    } else if (type === "beverage") {
      console.log(type);
      closeModal();
      addItem(value, counter);
      addBeverages();
      submitToast();
    } else {
      toast.error("Vælg venligst variant og sodavand", {
        style: {
          border: "2px solid #BF5B22",
          padding: "16px",
          color: "#BF5B22",
        },
        iconTheme: {
          primary: "#BF5B22",
          secondary: "#FFFAEE",
        },
      });
    }

    /* Hvis varianten eller sodavanden er valgt, så lukkermodalen, tingene bliver tilføjet. Hvis betingelserne ikke er opfyldt 
    kommer en fejlmeddelse via en toast. */
  };

  const [selectedExtra, setselectedExtra] = useState(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className={`flex absolute z-[9999] bg-white shadow-lg w-screen h-auto overflow-scroll top-24 md:rounded-xl md:top-24 md:h-auto md:w-1/2 md:inset-x-0 mx-auto lg:w-[36rem] ${jost.className} justify-center`}
    >
      <Toaster />
      <div className=" flex flex-col relative gap-5 gap-x-2 z-51 py-4">
        <button
          onClick={() => {
            closeModal();
          }}
          className="absolute top-2 right-2 z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={type === "food" ? "text-black" : "text-black"}
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
        {type === "beverage" && (
          <div className="self-center relative inline-block md:rounded-s-lg">
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
              height={500}
              width={500}
              alt="Billede af Birriatacos"
              className="block lg:pt-2 md:rounded-s-sm w-auto max-h-[200px]   "
            />
          </div>
        )}

        <div className="flex flex-col gap-3 pl-1 lg:pl-3">
          <h3 className=" text-3xl font-bold md:text-2xl lg:text-4xl lg:pt-1">
            {title}
          </h3>
          {/* <p className="text-xl">kr. {price},-</p> */}
        </div>
        {type === "food" && (
          <div className="">
            <p className="text-md line-clamp-3 lg:pb-5 px-2">
              {amount} velsmagende tacos med hjemmelavet langtids braiseret
              oksekød. Serveret med ost, løg, koriander eller persille og lime.
            </p>
            <div className="flex flex-col pl-2">
              <div className="flex flex-col items-start text-xl gap-2 font-bold pb-6">
                <h2>Variant</h2>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="radio"
                    name="variant"
                    id="koriander"
                    onChange={(e) =>
                      handleVariant("Koriander", e.target.checked)
                    }
                    className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
                  />
                  <label
                    htmlFor="koriander"
                    className="text-[16px] font-normal text-start"
                  >
                    {" "}
                    Koriander
                  </label>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="radio"
                    name="variant"
                    id="persille"
                    onChange={(e) =>
                      handleVariant("Persille", e.target.checked)
                    }
                    className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
                  />
                  <label
                    htmlFor="persille"
                    className="text-[16px] font-normal text-start"
                  >
                    {" "}
                    Persille
                  </label>
                </div>
              </div>

              <h2 className="text-xl font-bold">Tilbehør</h2>
              <p>Vælg op til en 1 yderlige vare</p>
              <div className="flex flex-row justify-between pr-3">
                <div className="flex flex-row gap-2 py-2">
                  <input
                    type="checkbox"
                    name="tilbehør1"
                    id="picodegallo"
                    checked={selectedExtra === "picodegallo"}
                    onChange={(e) => {
                      if (selectedExtra === "picodegallo") {
                        setselectedExtra(null);
                        return;
                      }
                      if (selectedExtra) {
                        toast.error("Du kan kun vælge én ting, amigo");
                        return;
                      }
                      setselectedExtra("picodegallo");
                      handleCheckboxChange(12, e.target.checked);
                      handleExtrasState("Pico de gallo", e.target.checked);
                    }}
                    className="w-6 h-6 appearance-none focus:ring-blue-500  border-2 border-light-orange checked:bg-light-orange checked:border-orange"
                  />
                  <label htmlFor="picodegallo" id="">
                    Pico de gallo
                  </label>
                </div>
                <p className="text-sm">+12,00 kr.</p>
              </div>
              <div className="flex flex-row justify-between pr-3 pb-6">
                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    name="tilbehør2"
                    id="guacamole"
                    checked={selectedExtra === "guacamole"}
                    onChange={(e) => {
                      if (selectedExtra === "guacamole") {
                        setselectedExtra(null);
                        return;
                      }
                      if (selectedExtra) {
                        toast.error("Du kan kun vælge én ting, amigo");
                        return;
                      }
                      setselectedExtra("guacamole");
                      handleCheckboxChange(15, e.target.checked);
                      handleExtrasState("Guacamole", e.target.checked);
                    }}
                    className="w-6 h-6 appearance-none focus:ring-blue-500  border-2 border-light-orange checked:bg-light-orange checked:border-orange"
                  />
                  <label htmlFor="guacamole">Guacamole</label>
                </div>
                <p className="text-sm">+15,00 kr.</p>
              </div>

              <div className="flex flex-col items-start text-xl gap-2 font-bold">
                <h2>Sodavand</h2>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="radio"
                    name="sodavand"
                    id="cocacola"
                    onChange={(e) => {
                      handleBeveragesState(
                        "Coca Cola 0,33 cl",
                        e.target.checked
                      );
                    }}
                    className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
                  />
                  <label
                    htmlFor="cocacola"
                    className="text-[16px] font-normal text-start"
                  >
                    {" "}
                    Coca Cola 0,33 cl
                  </label>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="radio"
                    name="sodavand"
                    id="colazero"
                    onChange={(e) => {
                      handleBeveragesState(
                        "Coca Cola Zero 0,33 cl",
                        e.target.checked
                      );
                    }}
                    className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
                  />
                  <label
                    htmlFor="colazero"
                    className="text-[16px] font-normal text-start"
                  >
                    {" "}
                    Coca Cola Zero 0,33 cl
                  </label>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="radio"
                    name="sodavand"
                    id="faxekondi"
                    onChange={(e) => {
                      handleBeveragesState(
                        "Faxe Kondi 0,33 cl",
                        e.target.checked
                      );
                    }}
                    className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
                  />
                  <label
                    htmlFor="faxekondi"
                    className="text-[16px] font-normal text-start"
                  >
                    {" "}
                    Faxe Kondi 0,33 cl
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <div className="flex flex-row justify-around gap-4">
            <div className="flex flex-row justify-center pt-1 h-10 w-32 bg-gray-300 rounded-xl mb-8">
              <button onClick={handleClick2} className="bg-gray-300 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-minus"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
              <p className="h-8 w-8 text-center text-2xl bg-gray-300">
                {counter}
              </p>
              <button onClick={handleClick1} className="bg-gray-300 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-plus"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            </div>
            <div className=" ">
              <button
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
                className=" flex flex-row bg-light-orange rounded-xl h-10 w-64 gap-16 p-2"
              >
                <p>Tilføj til bestilling</p>
                <p>{totalPrice} kr.</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OrderModal;
