import NavBar from "/components/frontpage/navigation/navbar";
import MenuItem from "@/components/frontpage/MenuItem";

const inventory = [
  { title: "Birria Taco Menu (4 stk.)", amount: 4, price: "kr. 149,00" },
  { title: "Birria Taco Menu (5 stk.)", amount: 5, price: "kr. 179,00" },
  { title: "Birria Taco Menu (8 stk.)", amount: 8, price: "kr. 239,00" },
  { title: "Birria Taco Menu (12 stk.)", amount: 12, price: "kr. 319,00" },
];

export default function bestil() {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <h1 className="font-bold text-center font text-3xl pt-4">Bestilling</h1>
      <h2 className="text-2xl font-bold">Menuer</h2>
      <h2 className="text-2xl font-bold">Sodavand</h2>

      {inventory.map((item, index) => {
        <MenuItem
          key={index}
          src="logo.png"
          title={item.title}
          amount={item.amount}
          price={item.price}
        />;
      })}
    </div>
  );
}
