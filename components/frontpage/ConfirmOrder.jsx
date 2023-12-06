import React from "react";
import { useState } from "react";

const ConfirmOrder = ({ onClick }) => {
  const [counter, setCounter] = useState(0);

  const handleClick1 = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleClick2 = () => {
    if (counter > 0) setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-row justify-center pt-1 h-10 w-32 bg-gray-300 rounded-xl">
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
          <input
            className="h-8 w-8 text-center text-3xl bg-gray-300"
            type="number"
            value={counter}
          />
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
          <button className=" flex flex-row bg-light-orange rounded-xl h-10 w-64 gap-16 p-2">
            <p>Tilføj til bestilling</p>
            <p>145.kr</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
