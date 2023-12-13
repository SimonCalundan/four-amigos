/* Lavet af Simon og Karl */
/* Her er produkterne defineret i array, og alt zustand logik er defineret og håndteres her */

import "@/styles/globals.css";
import { Timestamp } from "firebase/firestore";
import { productList } from "@/stripe/create_checkoutsession";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

import { create } from "zustand";

// Array af produkter med deres value samt deres API price ID
const products = [
  {
    value: "birria_4stk",
    price: "price_1OISY1DB7fsHzg79pEC4bpan",
  },
  {
    value: "birria_5stk",
    price: "price_1OISZKDB7fsHzg793ndHvtHF",
  },
  {
    value: "birria_8stk",
    price: "price_1OISbRDB7fsHzg79uqRpFmmv",
  },
  {
    value: "birria_12stk",
    price: "price_1OISciDB7fsHzg79Qa6utM4d",
  },
  {
    value: "coca_cola",
    price: "price_1OISeKDB7fsHzg79pkYDCriu",
  },
  {
    value: "coca_cola_zero",
    price: "price_1OISf3DB7fsHzg79mv2DGQyn",
  },
  {
    value: "faxe_kondi",
    price: "price_1OISfTDB7fsHzg79wlDxnEY9",
  },
];

// Hook der bruges til at give censor adgang til /admin uden et login
export const useCensor = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (newIsLoggedIn) => set({ isLoggedIn: newIsLoggedIn }),
}));

// hook der bruges til at holde styr på den nuværende ordre til stripe checkout session
export const useStripeInfo = create((set) => ({
  // Tom array der holder stripe info til checkout session
  stripeInfo: [],
  // funktion der tilføjer et item til arrayet
  addItem: (value, count) =>
    set((state) => {
      // leder efter produkt med en "value" key med en værdi der matcher "value" parameteren
      const product = products.find((p) => p.value === value);

      // Hvis produktet ikke eksistere, returneres intet
      if (!product) return state;

      // Hvis opbjektet findes, laves der et nyt objekt som matcher objekt strukturen i kaldet for at lave en ny checkout sesion.
      if (!count) count = 1;
      const newItem = {
        price: product.price,
        quantity: count,
      };
      return { stripeInfo: [...state.stripeInfo, newItem] };
    }),
  removeItem: (value, count) =>
    set((state) => {
      // Find produkt med matchende value
      const product = products.find((p) => p.value === value);

      // Hvis produktet ikke eksistere, returneres intet
      if (!product) return state;

      // Finder index af item i stripeInfo arrayet
      const index = state.stripeInfo.findIndex(
        (item) => item.price === product.price && item.quantity === count
      );

      // Hvis indexet ikke findes, returneres intet
      if (index === -1) return state;

      // Laver en kopi af arrayet og fjerner det item der skal fjernes
      const newStripeInfo = [...state.stripeInfo];
      newStripeInfo.splice(index, 1);
      return { stripeInfo: newStripeInfo };
    }),
}));

/* Zustand objektet useOrderInfo der holder styr på brugerens ordre, der bliver opdateret gennem brugerens bestillings-process. Herunder informationer som kundes mail, navn, valgte mad, drikke og om ordrens status */
export const useOrderInfo = create((set) => ({
  orderInfo: {
    customer_mail: "",
    customer_name: "",
    order_type: "afhentning",
    due_time: Timestamp.fromDate(new Date()),
    foods: [],
    beverages: [],
    extras: [],
    state: "unpaid",
  },
  /* Funktion til at ændre zustand-objektet. setOrderInfo med 2 parametre, den key der skal ændres, og den value der skal indsættes i den key */
  setOrderInfo: (newInfoKey, newInfoValue) => {
    set((state) => ({
      orderInfo: { ...state.orderInfo, [newInfoKey]: newInfoValue },
    }));
  },
  /* En funktion til at nulstille zustandobjektet, her sættes objektet til at være "tomt" pånær de forudbestemte values, såsom ordrens status og type */
  clearOrderInfo: () => {
    set((state) => ({
      orderInfo: {
        customer_mail: "",
        customer_name: "",
        order_type: "afhentning",
        due_time: Timestamp.fromDate(new Date()),
        foods: [],
        beverages: [],
        extras: [],
        state: "unpaid",
      },
    }));
  },
  /* En række funktioner til at tilføje foods, beverages og extras til kundens ordre i zustandobjektet. Disse keys har deres egen funktion, da de er arrays */
  setFoods: (newFoods) => {
    set((state) => ({
      orderInfo: {
        ...state.orderInfo,
        foods: [...state.orderInfo.foods, newFoods],
      },
    }));
  },
  setExtras: (newExtras) => {
    set((state) => ({
      orderInfo: {
        ...state.orderInfo,
        extras: [...state.orderInfo.extras, newExtras],
      },
    }));
  },
  setBeverages: (newBeverages) => {
    set((state) => ({
      orderInfo: {
        ...state.orderInfo,
        beverages: [...state.orderInfo.beverages, newBeverages],
      },
    }));
  },
}));
