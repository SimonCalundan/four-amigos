import React from "react";
import Header from "@/components/kitchen-interface/navigation/Header";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const SettingsContent = () => {
  const [value, loading, error] = useDocument(doc(db, "system", "settings"));

  const [data, setData] = useState({
    disable_orders: false,
    max_pending_orders: 99,
    rush_mode: false,
  });
  useEffect(() => {
    if (value) {
      setData(value.data());
    }
  }, [value]);
  async function updateStatus(key, status) {
    const docRef = doc(db, "system", "settings");
    try {
      await updateDoc(docRef, {
        [key]: status,
      });
      toast.success(`${key} sat til ${status}`, {
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
    } catch (error) {
      console.log(error);
    }
  }

  const [number, setNumber] = useState(0);

  return (
    <main className={`w-screen h-screen flex flex-col ${jost.className}`}>
      <Header activeLink="Indstillinger" />
      <Toaster />
      <section className="w-screen h-full flex flex-col gap-4 p-8">
        <h2 className="text-2xl font-medium mb-10">Indstillinger</h2>
        <div className="flex gap-8 mb-2">
          <div className="flex flex-col w-1/2">
            {/* Food */}
            <h3 className="text-xl mb-2">Generelt</h3>
            <div className="flex flex-col gap-6 w-full pl-4">
              <div className="flex items-center gap-4 text-2xl justify-between">
                <p>Deaktiver bestillinger</p>
                <select
                  className={`bg-dark-brown text-white py-2 px-4 rounded-lg text-lg`}
                  onChange={(e) =>
                    updateStatus("disable_orders", e.target.value)
                  }
                  name=""
                  id=""
                >
                  <option
                    selected={data.disable_orders.toString() === "true"}
                    value={true}
                  >
                    Slået til
                  </option>
                  <option
                    selected={data.disable_orders.toString() === "false"}
                    value={false}
                  >
                    Slået fra
                  </option>
                </select>
              </div>
              <div className="flex items-center gap-4 text-2xl justify-between">
                <p>Rush mode</p>
                <select
                  className={`bg-dark-brown text-white py-2 px-4 rounded-lg text-lg`}
                  onChange={(e) => updateStatus("rush_mode", e.target.value)}
                  name=""
                  id=""
                >
                  <option
                    selected={data.rush_mode.toString() === "true"}
                    value={true}
                  >
                    Slået til
                  </option>
                  <option
                    selected={data.rush_mode.toString() === "false"}
                    value={false}
                  >
                    Slået fra
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-4 text-2xl justify-between">
                <p>Max antal bestillinger</p>
                <div className="flex gap-2 items-center">
                  <input
                    className=" text-right w-40 border-dark-brown border-2 rounded-lg h-[44px] px-4"
                    type="number"
                    defaultValue={data.max_pending_orders}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                  />
                  <button
                    onClick={() => {
                      updateStatus("max_pending_orders", number);
                    }}
                    className="bg-dark-brown text-white py-2 px-4 rounded-lg text-lg w-[114px]"
                  >
                    Opdater
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const indstillinger = () => {
  return <SettingsContent />;
};

export default indstillinger;
