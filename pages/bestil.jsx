import NavBar from "@/components/frontpage/navigation/NavBar";
import MenuItem from "@/components/frontpage/MenuItem";
import OrderModal from "@/components/frontpage/OrderModal";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState, useEffect } from "react";
import { Jost } from "next/font/google";
import { useStripeInfo } from "@/pages/_app";
import { useOrderInfo } from "@/pages/_app";

const jost = Jost({ subsets: ["latin"] });

export const inventory = [
  {
    title: "Birria Taco Menu (4 stk.)",
    value: "birria_4stk",
    amount: 4,
    price: 149.0,
    type: "food",
    api: "price_1OISY1DB7fsHzg79pEC4bpan",
  },
  {
    title: "Birria Taco Menu (5 stk.)",
    value: "birria_5stk",
    amount: 5,
    price: 179.0,
    type: "food",
    api: "price_1OISZKDB7fsHzg793ndHvtHF",
  },
  {
    title: "Birria Taco Menu (8 stk.)",
    value: "birria_8stk",
    amount: 8,
    price: 239.0,
    type: "food",
    api: "price_1OISbRDB7fsHzg79uqRpFmmv",
  },
  {
    title: "Birria Taco Menu (12 stk.)",
    value: "birria_12stk",
    amount: 12,
    price: 319.0,
    type: "food",
    api: "price_1OISciDB7fsHzg79Qa6utM4d",
  },
  {
    title: "Coca-Cola 0,33 l",
    value: "coca_cola",
    price: 20.0,
    type: "beverage",
    api: "price_1OISeKDB7fsHzg79pkYDCriu",
  },
  {
    title: "Coca-Cola Zero 0,33 l",
    value: "coca_cola_zero",
    price: 20.0,
    type: "beverage",
    api: "price_1OISf3DB7fsHzg79mv2DGQyn",
  },
  {
    title: "Faxe kondi 0,33 l",
    value: "faxe_kondi",
    price: 20.0,
    type: "beverage",
    api: "price_1OISfTDB7fsHzg79wlDxnEY9",
  },
];

const OrderContent = () => {
  const [value, loading, error] = useDocument(doc(db, "system", "inventory"));
  const [settings] = useDocument(doc(db, "system", "settings"));
  const [orderSettings, setOrderSettings] = useState({});
  const [data, setData] = useState();

  const [orderInfo, setOrderInfo] = useState({
    customer_mail: "",
    customer_name: "",
    due_time: "",
    beverages: [],
    foods: [],
    extras: [],
    order_type: "",
    state: "",
  });
  const [foods, setFoods] = useState({
    count: 0,
    name: "",
    variant: "",
  });
  const updateFood = (updatedProperties) => {
    setFoods((prevFoods) => ({
      ...prevFoods,
      ...updatedProperties,
    }));
  };

  const [beverages, setBeverages] = useState({
    count: 0,
    name: "",
  });
  const updateBeverages = (updatedProperties) => {
    setBeverages((prevBeverages) => ({
      ...prevBeverages,
      ...updatedProperties,
    }));
  };
  const [extras, setExtras] = useState({
    count: 0,
    name: "",
  });
  const updateExtras = (updatedProperties) => {
    setExtras((prevExtras) => ({
      ...prevExtras,
      ...updatedProperties,
    }));
  };

  useEffect(() => {
    if (value) {
      setData(value.data());
    }
  }, [value]);

  useEffect(() => {
    if (settings) {
      setOrderSettings(settings.data());
      console.log(settings.data());
    }
  }, [settings]);

  //Modal passed props from MenuItem
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);
  const handleItemClick = (item) => {
    setSelectedMenuItem(item);
    setOpenModal(true);
    console.log("selected menu item", item);
  };
  const closeModal = () => {
    setOpenModal(false);
    console.log("closed modal");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const useModal = (modalOpen) => {
    useEffect(() => {
      const handleBodyOverflow = () => {
        document.body.style.overflow = modalOpen ? "hidden" : "auto";
      };

      handleBodyOverflow();

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [modalOpen]);
  };

  return (
    <div className={`h-screen w-screen relative ${jost.className}`}>
      <NavBar />
      {openModal && (
        <div className=" top-0 left-0 absolute h-[190vh] overflow-hidden w-screen bg-black bg-opacity-40">
          <OrderModal
            src="/food_1.jpg"
            title={selectedMenuItem.title}
            price={selectedMenuItem.price}
            amount={selectedMenuItem.amount}
            closeModal={closeModal}
            type={selectedMenuItem.type}
            value={selectedMenuItem.value}
            api={selectedMenuItem.api}
          />
        </div>
      )}
      <h1 className="font-bold text-center font text-3xl pt-4">Bestilling</h1>
      {settings?.data().disable_orders === "true" ||
      settings?.data().max_pending_orders ===
        settings?.data().current_pending_orders ? (
        <div className="w-screen h-full flex justify-center items-center">
          <h2 className="text-2xl font-bold p-4">
            {settings?.data().disable_orders === "true"
              ? "Vi modtager pt. ikke flere ordre"
              : "Loader tacos..."}
          </h2>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold p-4">Menuer</h2>
          <div className="flex flex-wrap gap-4 justify-around">
            {inventory
              .filter((item) => item.type === "food")
              .map((item, index) => (
                <MenuItem
                  status={data?.food[item.value]}
                  key={index}
                  title={item.title}
                  amount={item.amount}
                  price={item.price}
                  type={item.type}
                  value={item.value}
                  onClick={() => handleItemClick(item)}
                />
              ))}
          </div>
          <h2 className="text-2xl font-bold p-4">Sodavand</h2>
          <div className="flex flex-wrap gap-4 justify-around">
            {inventory
              .filter((item) => item.type === "beverage")
              .map((item, index) => (
                <MenuItem
                  status={data?.beverages[item.value]}
                  key={index}
                  title={item.title}
                  amount={item.amount}
                  price={item.price}
                  type={item.type}
                  value={item.value}
                  onClick={() => {
                    handleItemClick(item);
                  }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function bestil() {
  return <OrderContent />;
}
