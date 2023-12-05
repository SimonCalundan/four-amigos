import NavBar from "@/components/frontpage/navigation/NavBar";
import MenuItem from "@/components/frontpage/MenuItem";
import OrderModal from "@/components/frontpage/OrderModal";

const inventory = [
  {
    title: "Birria Taco Menu (4 stk.)",
    amount: 4,
    price: 149.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (5 stk.)",
    amount: 5,
    price: 179.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (8 stk.)",
    amount: 8,
    price: 239.0,
    type: "food",
  },
  {
    title: "Birria Taco Menu (12 stk.)",
    amount: 12,
    price: 319.0,
    type: "food",
  },
  {
    title: "Coca-Cola 0,33 l",
    price: 20.0,
    type: "beverage",
  },
  {
    title: "Coca-Cola Zero 0,33 l",
    price: 20.0,
    type: "beverage",
  },
  {
    title: "Faxe kondi 0,33 l",
    price: 20.0,
    type: "beverage",
  },
];

export default function bestil() {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <h1 className="font-bold text-center font text-3xl pt-4">Bestilling</h1>
      <h2 className="text-2xl font-bold p-4">Menuer</h2>
      <div className="flex flex-wrap gap-4 justify-around">
        {inventory
          .filter((item) => item.type === "food")
          .map((item, index) => (
            <MenuItem
              key={index}
              src="/next.svg"
              title={item.title}
              amount={item.amount}
              price={item.price}
            />
          ))}
      </div>
      <h2 className="text-2xl font-bold p-4">Sodavand</h2>
      <div className="flex flex-wrap gap-4 justify-around">
        {inventory
          .filter((item) => item.type === "beverage")
          .map((item, index) => (
            <MenuItem
              key={index}
              src="/next.svg"
              title={item.title}
              amount={item.amount}
              price={item.price}
            />
          ))}
      </div>
      <div>
        <OrderModal />
      </div>
    </div>
  );
}
