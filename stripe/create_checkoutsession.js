// Simon
const stripe = require("stripe")(
  "sk_test_51OFbSaDB7fsHzg79ZXXVvlqVU7m9AF6qe5Ur0yDrFdTdQEwPJnAa9iOhFpdLPwb7Qfi9vxqpxCA6ZCptxge2hlVX00AEps0O38"
);

export const productList = [
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

// Funktion der tager et array af produkter og returnere en checkout session fra Stripe
export async function createSession(itemsArray) {
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "https://fouramigos.vercel.app/success",
      line_items: itemsArray,
      mode: "payment",
    });
    return session.url;
  } catch (error) {
    console.log(error);
    return error;
  }
}
