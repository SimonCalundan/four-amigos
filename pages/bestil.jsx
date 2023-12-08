import NavBar from "@/components/frontpage/navigation/NavBar";
import MenuItem from "@/components/frontpage/MenuItem";
import OrderModal from "@/components/frontpage/OrderModal";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState, useEffect, use } from "react";

/* 

Hver ny ordreting bliver gemt som state inden kald til db

brug Timestamp objektet som importeres fra firebase

function updateOrderInfo(key, value) {
  setOrderInfo({
    ...orderInfo,
    [key]: value,
  })
}

input onChange={e => updateOrderInfo("name", e.target.value)}

Hvis array

function updateOrderInfo(type, key, value){
  if (type === "arrayAdd"){
    key og value logik
  }
  else if (type === "arrayRemove"){
    key og value logik
  }
}

Hvis den sidder på Birria 4 stk.
onClick={() => {setOrderInfo({
  ...orderInfo, 
  food: [...orderInfo.food, "Birria tacos 4 stk."]
})}}

Med Timestamp objekt

Omformater Date object (ud fra bruger input i input type time) til millisekunder og nanosekunder 
og derefter indsæt det i timestamp contructoren som vidst herunder 
v v v 
const formattedTimestamp = new Timestamp(seconds, nanoseconds);



----------------------------------------------------------------
state opdatering ved orderupdate:
  const [orderInfo, setOrderInfo] = useState([]); //Object

Hænge sammen med valgmuligheder og hvilket produkt der tilføjes

post til db   -   try catch: 
  const order = orderInfo
  await addDoc(collection(db, "orders"), order)
  husk tid når post til db


*/

export const inventory = [
  {
    title: "Birria Taco Menu (4 stk.)",
    value: "birria_4stk",
    amount: 4,
    price: 149.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (5 stk.)",
    value: "birria_5stk",
    amount: 5,
    price: 179.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (8 stk.)",
    value: "birria_8stk",
    amount: 8,
    price: 239.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (12 stk.)",
    value: "birria_12stk",
    amount: 12,
    price: 319.0,
    type: "food",
  },
  {
    title: "Coca-Cola 0,33 l",
    value: "coca_cola",
    price: 20.0,
    type: "beverage",
  },
  {
    title: "Coca-Cola Zero 0,33 l",
    value: "coca_cola_zero",
    price: 20.0,
    type: "beverage",
  },
  {
    title: "Faxe kondi 0,33 l",
    value: "faxe_kondi",
    price: 20.0,
    type: "beverage",
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

  return (
    <div className="h-screen w-screen relative">
      <NavBar />
      <h1 className="font-bold text-center font text-3xl pt-4">Bestilling</h1>
      {settings?.data().disable_orders === "true" ? (
        <div className="w-screen h-full flex justify-center items-center">
          <h2 className="text-2xl font-bold p-4">
            Vi modtager pt. ikke flere ordre
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
                  src="/next.svg"
                  title={item.title}
                  amount={item.amount}
                  price={item.price}
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
                  src="/next.svg"
                  title={item.title}
                  amount={item.amount}
                  price={item.price}
                  onClick={() => handleItemClick(item)}
                />
              ))}
          </div>

          {openModal && (
            <div className="absolute top-0 h-screen w-screen bg-slate-500 opacity-50">
              <OrderModal
                src="/next.svg"
                title={selectedMenuItem.title}
                price={selectedMenuItem.price}
                amount={selectedMenuItem.amount}
                closeModal={closeModal}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default function bestil() {
  return <OrderContent />;
}
