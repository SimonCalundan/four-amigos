import Image from "next/image";

export default function MenuItem() {
  return (
    <div>
      <Image
        src={props.src}
        height={350}
        width={350}
        alt="Billede af Birriatacos"
      />
      <h3>{props.title}</h3>
      <p>
        {props.amount} velsmagende tacos med hjemmelavet langtids braiseret
        oksekød. Serveret med ost, løg, koriander eller persille og lime.
        <p>{props.pris}</p>
        <button>Tilføj</button>
      </p>
    </div>
  );
}
