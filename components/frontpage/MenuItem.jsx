import Image from "next/image";

export default function MenuItem({
  status,
  src,
  title,
  amount,
  price,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick({ status, src, title, amount, price, onClick })}
      className={`flex bg-white shadow-xl p-4 rounded-lg w-11/12 md:w-2/5 cursor-pointer ${
        status === "sold_out" && "opacity-50 pointer-events-none"
      }`}
    >
      <div className="w-1/2">
        <Image
          src={src}
          height={200}
          width={200}
          alt="Billede af Birriatacos"
          className=""
        />
      </div>
      <div className="w-1/2">
        <h3 className="font-bold text-xl pb-2">{title}</h3>
        <p className="line-clamp-3">
          {amount} velsmagende tacos med hjemmelavet langtids braiseret oksekød.
          Serveret med ost, løg, koriander eller persille og lime.
        </p>
        <div className="flex pt-2 items-center justify-between">
          <p className="text-lg">kr. {price},-</p>
          <button className="bg-light-orange p-2 pl-4 pr-4 rounded-lg">
            Tilføj
          </button>
        </div>
      </div>
    </div>
  );
}
