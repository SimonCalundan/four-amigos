import React from "react";
import ConfirmOrder from "@/components/frontpage/ConfirmOrder";

const OrderModal = (props) => {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <h2>Variant</h2>
        <input type="radio" />
        <input type="radio" />
        <h2>Tilbehør</h2>
        <input type="checkbox" />
        <input type="checkbox" />
        <h2>Sodavand</h2>
        <input type="radio" />
        <input type="radio" />
      </div>
      <ConfirmOrder />
    </div>
  );
};

export default OrderModal;
