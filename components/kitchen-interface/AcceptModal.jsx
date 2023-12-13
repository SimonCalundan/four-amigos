// Simon
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const AcceptModal = ({
  orderInfo,
  handleAccept,
  handleTimeChange,
  handleCancel,
  isOpen,
}) => {
  // State til at holde styr på om brugeren gerne vil ændre tidspunktet
  const [showTimePicker, setShowTimePicker] = useState(false);

  /* 
    Send confirmation email
  */

  const [time, setTime] = useState(
    orderInfo &&
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(new Date(orderInfo?.due_time * 1000))
  );
  const data = {
    to_mail: orderInfo?.customer_mail,
    to_name: orderInfo?.customer_name,
    formatted_due_time: time,
  };
  async function sendConfirmation() {
    try {
      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          service_id: "service_lh5pxhe",
          template_id: "template_lqvx3yp",
          user_id: "rAW-wIybOviDngkTr",
          template_params: data,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AnimatePresence onExitComplete={() => setShowTimePicker(false)}>
      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
          className="h-screen w-screen bg-black bg-opacity-70 absolute top-0 left-0 z-[99] flex flex-col gap-8 justify-center items-center"
        >
          <motion.div className=" bg-white w-[55rem] h-[30rem] rounded-lg flex">
            <div className="w-1/2 flex flex-col gap-2 py-8 px-8 border-r-2 border-gray-300  rounded-l-lg">
              <h2 className="font-medium text-2xl">Ordre oplysninger</h2>
              <p className="text-gray-900 text-lg">
                <span className="font-semibold">Navn: </span>
                {orderInfo.customer_name}
              </p>
              <div className="flex flex-col h-auto">
                <p className="font-semibold text-lg">Madvarer</p>
                {orderInfo?.foods.map((item, i) => (
                  <p key={i} className="text-gray-900 text">
                    <span>{item.count}x </span>
                    {item.name} {item.variant}
                  </p>
                ))}
              </div>
              <div className="flex flex-col h-auto">
                <p className="font-semibold text-lg">Drikkevarer</p>
                {orderInfo?.beverages.map((item, i) => (
                  <p key={i} className="text-gray-900 text">
                    <span>{item.count}x </span>
                    {item.name}
                  </p>
                ))}
              </div>
              <div className="flex flex-col h-auto">
                <p className="font-semibold text-lg">Extra</p>
                {orderInfo?.extras.map((item, i) => (
                  <p key={i} className="text-gray-900 text">
                    <span>{item.count}x </span>
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 py-8 px-8 rounded-r-lg items-center justify-center">
              <p className="capitalize text-3xl text-gray-900 ">
                {orderInfo?.order_type}{" "}
                <span className="font-bold">
                  {orderInfo &&
                    new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    }).format(new Date(orderInfo.due_time * 1000))}{" "}
                </span>
              </p>
              {/* Button wrapper */}
              <div className="flex flex-col gap-4 w-full mt-10">
                <button
                  onClick={() => {
                    handleAccept();
                    sendConfirmation();
                  }}
                  className="bg-green-600 text-white px-4 py-6 rounded-lg w-4/5 mx-auto text-xl font-medium"
                >
                  Accepter
                </button>
                <div className="w-full flex items-center flex-col justify-centers gap-8">
                  <button
                    onClick={() => setShowTimePicker(!showTimePicker)}
                    className="bg-green-100  text-green-600 px-4 py-6 rounded-lg w-4/5 mx-auto text-xl font-medium"
                  >
                    Ændre tidspunkt
                  </button>
                  {showTimePicker && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 2,
                      }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2 w-full items-center justify-center"
                    >
                      <label
                        htmlFor="timeInput"
                        className="text-2xl text-gray-900"
                      >
                        Angiv nyt tidspunkt
                      </label>
                      <input
                        id="timeInput"
                        min="09:00"
                        max="22:00"
                        step="1500"
                        className="bg-gray-100 border-2 border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 ps-10 p-2.5 text-3xl"
                        type="time"
                        onChange={(e) => {
                          handleTimeChange(e.target.value);
                          setTime(e.target.value);
                        }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          <button
            onClick={() => handleCancel()}
            className="text-2xl bg-white text-white bg-opacity-25 font-medium py-2 px-16 rounded-lg"
          >
            Annuller
          </button>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default AcceptModal;
