import React, { use } from "react";
import Header from "@/components/kitchen-interface/navigation/Header";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";

async function updateStatus(key, status) {
  const docRef = doc(db, "system", "inventory");
  try {
    await updateDoc(docRef, {
      [key]: status,
    });
  } catch (error) {
    console.log(error);
  }
}

const MenuItem = ({ title, status, action }) => {
  function colorByStatus() {
    switch (status) {
      case "available":
        return "text-green-500";
      case "few_left":
        return "text-yellow-500";
      case "sold_out":
        return "text-red-500";
      default:
        return "text-black";
    }
  }
  function bgColorByStatus() {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "few_left":
        return "bg-yellow-500";
      case "sold_out":
        return "bg-red-500";
      default:
        return "bg-black";
    }
  }
  function valueByStatus() {
    switch (status) {
      case "available":
        return "Tilgængelig";
      case "few_left":
        return "Få tilbage";
      case "sold_out":
        return "Udsolgt";
      default:
        return "Vælg status";
    }
  }
  return (
    <div className="flex flex-row justify-between items-center border-b border-light-brown pb-2">
      <p className="font-medium text-lg">{title}</p>
      <select
        className={`bg-dark-brown text-white py-2 px-4 rounded-lg text-lg ${bgColorByStatus(
          status
        )}`}
        onChange={(e) => action(e.target.value)}
        name=""
        id=""
      >
        <option selected={status === "available"} value="available">
          Tilgængelig
        </option>
        <option selected={status === "few_left"} value="few_left">
          Få tilbage
        </option>
        <option selected={status === "sold_out"} value="sold_out">
          Udsolgt
        </option>
      </select>
    </div>
  );
};

const MenuContent = () => {
  const [value, loading, error] = useDocument(doc(db, "system", "inventory"));
  const [data, setData] = useState();
  useEffect(() => {
    if (value) {
      console.log("value uformateret", value);
      console.log("value formateret", value.data());
      setData(value.data());
    }
  }, [value]);

  if (value)
    return (
      <main className={`${jost.className}`}>
        <Header activeLink="Menu redigering" />
        <section className="w-screen h-full flex flex-col gap-4 p-8">
          <h2 className="text-2xl font-medium mb-10">Menu Redigering</h2>

          <div className="flex gap-8 mb-2">
            <div className="flex flex-col w-1/2">
              {/* Food */}
              <h3 className="text-xl mb-2">Madvarer</h3>
              <div className="flex flex-col gap-6 w-full pl-4">
                <MenuItem
                  title="Birria Taco Menu (4 stk.)"
                  status={value.data().food.birria_4stk}
                  action={(value) => updateStatus("food.birria_4stk", value)}
                />
                <MenuItem
                  title="Birria Taco Menu (5 stk.)"
                  status={value.data().food.birria_5stk}
                  action={(value) => updateStatus("food.birria_5stk", value)}
                />
                <MenuItem
                  title="Birria Taco Menu (8 stk.)"
                  status={value.data().food.birria_8stk}
                  action={(value) => updateStatus("food.birria_8stk", value)}
                />
                <MenuItem
                  title="Birria Taco Menu (12 stk.)"
                  status={value.data().food.birria_12stk}
                  action={(value) => updateStatus("food.birria_12stk", value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <h3 className="text-xl mb-2">Drikkevarer</h3>
              <div className="flex flex-col gap-6 pl-4">
                <MenuItem
                  title="Coca-Cola 0,33 l"
                  status={value.data().beverages.coca_cola}
                  action={(value) => updateStatus("beverages.coca_cola", value)}
                />
                <MenuItem
                  title="Coca-Cola Zero 0,33 l"
                  status={value.data().beverages.coca_cola_zero}
                  action={(value) =>
                    updateStatus("beverages.coca_cola_zero", value)
                  }
                />
                <MenuItem
                  title="Faxe Kondi 0,33 l"
                  status={value.data().beverages.faxe_kondi}
                  action={(value) =>
                    updateStatus("beverages.faxe_kondi", value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-8">
            <div className="flex flex-col w-1/2">
              <h3 className="text-xl mb-2">Ekstra</h3>

              <div className="flex flex-col gap-6 pl-4">
                <MenuItem
                  title="Guacamole"
                  status={value.data().extras.guacamole}
                  action={(value) => updateStatus("extras.guacamole", value)}
                />
                <MenuItem
                  title="Pico de gallo"
                  status={value.data().extras.pico_de_gallo}
                  action={(value) =>
                    updateStatus("extras.pico_de_gallo", value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-1/2"></div>
          </div>
        </section>
      </main>
    );
  else
    return (
      <div>
        <Header activeLink="Menu redigering" />
        <p>Loading...</p>
      </div>
    );
};

const menu = () => {
  return <MenuContent />;
};

export default menu;
