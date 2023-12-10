import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Jost } from "next/font/google";
import { useOrderInfo } from "@/pages/_app";
import toast, { Toaster } from "react-hot-toast";

const jost = Jost({ subsets: ["latin"] });

const OrderModal = ({ title, price, src, amount, closeModal }) => {
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

  /* Counter */

  const handleClick1 = () => {
    setCounter((prevCounter) => prevCounter + 1);
    handleCounter();
  };

  /* Modal overflow  */

  const handleClick2 = () => {
    if (counter > 1) setCounter((prevCounter) => prevCounter - 1);
    handleCounter();
  };

  /* HJÆLP SIMON MÆRKELIG FEJL */
  const handleCounter = () => {
    setTotalPrice(price * counter);
  };

  useEffect(() => {
    handleCounter();
  }, [counter]);

  const [variant, setVariant] = useState();

  const handleVariant = (variantString, isChecked) => {
    if (isChecked) {
      setVariant(variantString);
    } else {
      setVariant("");
    }
  };
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

  useEffect(() => {
    console.log("Foods:", orderInfo.foods);
    console.log("Extras:", orderInfo.extras);
    console.log("Beverages:", orderInfo.beverages);
  }, [orderInfo.foods, orderInfo.extras, orderInfo.beverages]);

  return (
    <section
      className={`flex fixed bg-white shadow-lg w-screen h-screen md:h-auto md:w-1/2 md:inset-x-0 mx-auto ${jost.className}`}
    >
      <div className=" flex flex-col gap-5 gap-x-2">
        <Image
          src={src}
          height={300}
          width={400}
          alt="Billede af Birriatacos"
          className=""
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-4xl">{title}</h3>
          <p className="text-2xl">kr. {price},-</p>
          <p className="text-md line-clamp-3">
            {amount} velsmagende tacos med hjemmelavet langtids braiseret
            oksekød. Serveret med ost, løg, koriander eller persille og lime.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col items-start text-2xl gap-2 font-bold pb-6">
            <h2>Variant</h2>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="variant"
                onChange={(e) => handleVariant("Koriander", e.target.checked)}
                className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
              />
              <p className="text-[16px] font-normal text-start"> Koriander</p>
            </div>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="variant"
                onChange={(e) => handleVariant("Persille", e.target.checked)}
                className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
              />
              <p className="text-[16px] font-normal text-start"> Persille</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Tilbehør</h2>
          <p>Vælg op til en 1 yderlige vare</p>
          <div className="flex flex-row justify-between pr-3">
            <div className="flex flex-row gap-2 py-2">
              <input
                type="checkbox"
                name="tilbehør1"
                onChange={(e) => {
                  handleCheckboxChange(12, e.target.checked);
                  handleExtrasState("Pico de gallo", e.target.checked);
                }}
                className="w-6 h-6 appearance-none focus:ring-blue-500  border-2 border-light-orange checked:bg-light-orange checked:border-orange"
              />
              <p>Pico de gallo</p>
            </div>
            <p className="text-sm">+12,00 kr.</p>
          </div>
          <div className="flex flex-row justify-between pr-3 pb-6">
            <div className="flex flex-row gap-2">
              <input
                type="checkbox"
                name="tilbehør2"
                onChange={(e) => {
                  handleCheckboxChange(15, e.target.checked);
                  handleExtrasState("Pico de gallo", e.target.checked);
                }}
                className="w-6 h-6 appearance-none focus:ring-blue-500  border-2 border-light-orange checked:bg-light-orange checked:border-orange"
              />
              <p>Guacamole</p>
            </div>
            <p className="text-sm">+15,00 kr.</p>
          </div>

          <div className="flex flex-col items-start text-2xl gap-2 font-bold">
            <h2>Sodavand</h2>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="sodavand"
                onChange={(e) => {
                  handleBeveragesState("Coca Cola 0,33 cl", e.target.checked);
                }}
                className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
              />
              <p className="text-[16px] font-normal text-start">
                {" "}
                Coca Cola 0,33 cl
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="sodavand"
                onChange={(e) => {
                  handleBeveragesState(
                    "Coca Cola Zero 0,33 cl",
                    e.target.checked
                  );
                }}
                className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
              />
              <p className="text-[16px] font-normal text-start">
                {" "}
                Coca Cola Zero 0,33 cl
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <input
                type="radio"
                name="sodavand"
                onChange={(e) => {
                  handleBeveragesState("Faxe Kondi 0,33 cl", e.target.checked);
                }}
                className="w-6 h-6 appearance-none focus:ring-blue-500 rounded-2xl border-2 border-light-orange checked:bg-light-orange checked:border-orange "
              />
              <p className="text-[16px] font-normal text-start">
                {" "}
                Faxe Kondi 0,33 cl
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-around">
            <div className="flex flex-row justify-center pt-1 h-10 w-32 bg-gray-300 rounded-xl mb-8">
              <button onClick={handleClick2} className="bg-gray-300 h-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-minus"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
              <p className="h-8 w-8 text-center text-3xl bg-gray-300">
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
                  const isVariantSelected = variant !== undefined;
                  const isBeveragesSelected = beveragesState !== undefined;

                  if (isVariantSelected && isBeveragesSelected) {
                    closeModal();
                    addFoods();
                  } else {
                    toast.success("Ordre markeret som færdig", {
                      style: {
                        border: "1px solid #BF5B22",
                        padding: "16px",
                        color: "#BF5B22",
                      },
                      iconTheme: {
                        primary: "#BF5B22",
                        secondary: "#FFFAEE",
                      },
                    });
                  }
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
    </section>
  );
};

export default OrderModal;
