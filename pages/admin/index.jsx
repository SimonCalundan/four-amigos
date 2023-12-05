import { use, useEffect, useState } from "react";
import Header from "@/components/kitchen-interface/navigation/Header";
import OrderPending from "@/components/kitchen-interface/OrderPending";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/firebase";

import { useCollection } from "react-firebase-hooks/firestore";
import AcceptModal from "@/components/kitchen-interface/AcceptModal";
import {
  doc,
  updateDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import OrderActive from "@/components/kitchen-interface/OrderActive";
import toast, { Toaster } from "react-hot-toast";
import { Reorder } from "framer-motion";

import { Jost } from "next/font/google";

const jost = Jost({ subsets: ["latin"] });

const AdminContent = () => {
  /* 
  
    Handle login
  
  */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  useEffect(() => {
    if (error) console.log(error);
  }, [error]);

  function handleLogin() {
    try {
      signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  /* 
    Handle orders
  */

  const [snapshot, load, err] = useCollection(collection(db, "orders"));
  const [pendingOrders, setPendingOrders] = useState([]);
  useEffect(() => {
    if (snapshot) {
      const pendingOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingOrders(pendingOrders);
    }
    if (err) console.log(err);
  }, [snapshot, err]);

  /* 
    Handle accept
  */

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeOrders, setActiveOrders] = useState([]);
  useEffect(() => {
    console.log(activeOrders);
    console.log(pendingOrders);
  }, [activeOrders, pendingOrders]);

  async function updateOrder(orderID) {
    const docRef = doc(db, "orders", orderID);
    const newPost = {
      state: "active",
    };
    try {
      await updateDoc(docRef, newPost);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTime(orderID, newTime) {
    const docRef = doc(db, "orders", orderID);
    const newPost = {
      due_time: newTime,
    };
    try {
      await updateDoc(docRef, newPost);
    } catch (error) {
      console.log(error);
    }
  }

  async function markAsDone(orderID) {
    const docRef = doc(db, "orders", orderID);
    const newPost = {
      state: "completed",
    };
    try {
      await updateDoc(docRef, newPost);
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
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("order changeed", selectedOrder);
    console.log("test", JSON.stringify(selectedOrder));
  }, [selectedOrder]);

  async function addOrder() {
    const docRef = await addDoc(collection(db, "orders"), pendingOrders[0]);
    console.log("this worked");
  }
  const [deliverTime, setDeliverTime] = useState("00:00");

  if (!user)
    return (
      <main
        className={`flex flex-col h-screen overflow-hidden ${jost.className}`}
      >
        <Toaster />
        <AcceptModal
          handleTimeChange={(time) => {
            const timeString = time;
            setDeliverTime(timeString);
            const [hours, minutes] = timeString.split(":").map(Number);

            const now = new Date();
            const timestamp = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate(),
              hours,
              minutes,
              0,
              0
            );

            if (isNaN(timestamp.getTime())) {
              console.error("Invalid time value");
            } else {
              const seconds = Math.floor(timestamp.getTime() / 1000);
              const nanoseconds = (timestamp.getTime() % 1000) * 1000000;

              const formattedTimestamp = new Timestamp(seconds, nanoseconds);

              updateTime(selectedOrder.id, formattedTimestamp);
            }
          }}
          isOpen={showAcceptModal}
          orderInfo={selectedOrder}
          handleCancel={() => setShowAcceptModal()}
          handleAccept={() => {
            setShowAcceptModal(false);
            setActiveOrders([...activeOrders, selectedOrder]);
            updateOrder(selectedOrder.id);
            console.log(selectedOrder.id);
            setPendingOrders(
              pendingOrders.filter((order) => order.id !== selectedOrder.id)
            );
          }}
        />

        <Header activeLink="Ordre" />

        <header className="bg-white shadow flex z-50">
          <div className="mx-auto w-1/2 border-r-2 border-gray-200 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Afventende
            </h2>
          </div>
          <div className="mx-auto w-1/2 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Aktive
            </h2>
          </div>
        </header>
        <main className="h-full">
          <div className="w-full flex h-full">
            {/* Afventende */}
            <div className="h-[82vh] w-1/2 border-r-2 border-gray-200 flex flex-col gap-8 py-8 px-8 overflow-y-scroll">
              {/* <OrderPending handleAccept={addOrder} /> */}
              {pendingOrders
                .filter((order) => order.state === "pending")
                .map((order, i) => (
                  <OrderPending
                    handleAccept={() => {
                      setSelectedOrder(order);
                      setShowAcceptModal(true);
                    }}
                    key={i}
                    type={order.order_type}
                    food={order.food}
                    beverages={order.beverages}
                    extras={order.extras}
                    time={new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    }).format(new Date(order.due_time * 1000))}
                    usermail={order.customer_mail}
                  />
                ))}
            </div>
            <div className="h-[82vh] w-1/2 border-r-2 border-gray-200 flex flex-col gap-8 py-8 px-8 overflow-y-scroll">
              {pendingOrders
                .filter((order) => order.state === "active")
                .map((order, i) => (
                  <OrderActive
                    handleAccept={() => {
                      markAsDone(order.id);
                    }}
                    key={i}
                    type={order.order_type}
                    food={order.food}
                    beverages={order.beverages}
                    extras={order.extras}
                    username={order.customer_name}
                    timestamp={order.due_time}
                    time={new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    }).format(new Date(order.due_time * 1000))}
                    usermail={order.customer_mail}
                  />
                ))}
            </div>

            {/* Aktive */}
          </div>
        </main>
      </main>
    );
  else
    return (
      <main className="w-screen h-screen flex flex-col">
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-20 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log ind for at se Admin interface
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark-brown0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kode
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark-brown0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-dark-brown px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-brown mt-10"
                >
                  Log ind
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
};

const index = () => {
  return <AdminContent />;
};

export default index;
