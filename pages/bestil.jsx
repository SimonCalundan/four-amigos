/* Lavet af Karl */
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
import toast, { Toaster } from "react-hot-toast";

const jost = Jost({ subsets: ["latin"] });

/* En array til styring af deres inventar. Herunder titler, priser og mængder */
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
  /* hook der henter inventory-information fra firebase */
  const [value, loading, error] = useDocument(doc(db, "system", "inventory"));
  const [settings] = useDocument(doc(db, "system", "settings"));
  const [orderSettings, setOrderSettings] = useState({});
  const [data, setData] = useState();

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

  /* state til håndtering af visning af modal */
  const [openModal, setOpenModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);
  /* funktion til at håndtere den valgte vare - bliver passeret til en state der viser de rigtige informationer i modalen */
  const handleItemClick = (item) => {
    setSelectedMenuItem(item);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
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
    <div
      className={`overflow-x-scroll h-screen w-screen relative ${jost.className}`}
    >
      <NavBar />
      <Toaster
        containerStyle={{
          zIndex: 9999,
        }}
      />
      {openModal && (
        <div className=" top-0 left-0 fixed h-[190vh] overflow-hidden w-screen bg-black bg-opacity-40">
          {/* Ordremodalen der trækker alle informationer gennem props og den selectedMenuItem state fra ovenover, så de rigtige informationer bliver vist */}
          <OrderModal
            src="/food_1.jpg"
            title={selectedMenuItem.title}
            price={selectedMenuItem.price}
            amount={selectedMenuItem.amount}
            closeModal={closeModal}
            type={selectedMenuItem.type}
            value={selectedMenuItem.value}
            api={selectedMenuItem.api}
            /* En toaster til visuel confirmation, når man tilføjer noget til kurven */
            submitToast={() => {
              toast.success("Menu er blevet tilføjet til kurven", {
                style: {
                  border: "2px solid #22c55e",
                  padding: "16px",
                  color: "#22c55e",
                },
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#FFFAEE",
                },
              });
            }}
          />
        </div>
      )}
      <h1 className="font-bold text-center font text-3xl lg:text-4xl pt-24">
        Bestilling
      </h1>
      <p className="pt-2 px-3 flex text-center text-lg md:px-10 lg:px-32 lg:text-xl">
        Vi hos Four Amigos ser frem til at tilfredsstille din smag med vores
        autentiske mexicanske retter. Nyd vores udvalg af tacos, der nu
        inkluderer muligheder for 4, 5, 8 & 12 stks. i en portion.
      </p>
      {/* tjekker på indstillinger fra databasen, og beslutter om menuen skal vises */}
      {settings?.data().disable_orders === "true" ||
      settings?.data().max_pending_orders ===
        settings?.data().current_pending_orders ? (
        <div className="w-screen h-full flex justify-center items-center">
          <h2 className="text-2xl font-bold p-4">
            {/* Conditional rendering om disableorders er true, og om menuen skal laodes eller der skal stå der ikke modtages flere ordre */}
            {settings?.data().disable_orders === "true"
              ? "Vi modtager pt. ikke flere ordre"
              : "Loader tacos..."}
          </h2>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold p-4 md:pl-8 lg:pl-16">Menuer</h2>
          <div className="flex flex-wrap gap-8 justify-around mb-10 pl-2 pr-2">
            {/* En .filter og .map over inventory array'en fra øverst i dokumentet. Der bliver først filtreret om typen er drikke eller mad, og herefter renderet det korrekte sted. */}
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
                  onClick={() => {
                    handleItemClick(item);
                  }}
                  submitToast={() => {
                    toast.success("Sodavand er blevet tilføjet til kurven", {
                      style: {
                        border: "2px solid #22c55e",
                        padding: "16px",
                        color: "#22c55e",
                      },
                      iconTheme: {
                        primary: "#22c55e",
                        secondary: "#FFFAEE",
                      },
                    });
                  }}
                />
              ))}
          </div>
          <h2 className="text-2xl font-bold p-4 md:pl-8 lg:pl-16">Sodavand</h2>
          <div className="flex flex-wrap gap-8 justify-around lg:pb-8">
            {inventory
              .filter((item) => item.type === "beverage")
              .map((item, index) => (
                <MenuItem
                  index={index}
                  status={data?.beverages[item.value]}
                  key={index}
                  title={item.title}
                  amount={item.amount}
                  price={item.price}
                  type={item.type}
                  value={item.value}
                  onClick={() => {
                    handleItemClick(item);
                    window.scrollTo(0, 0);
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
