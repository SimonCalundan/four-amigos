import Some from "./Some";

export default function Footer() {
  return (
    <div className="flex flex-col gap-8 text-center  justify-around mt-12 md:flex-row pb-20 ">
      <div className="md:w-44">
        <p className="font-bold pb-2 text-xl ">Åbningstider</p>
        <div className="flex flex-col justify-between md:gap-4 text-xl md:text-base ">
          <p>Tirsdag - Søndag</p>
          <p>16:00 - 20:30</p>
          <p>Mandag </p>
          <p>Lukket</p>
        </div>
      </div>
      <div className="flex flex-col items-center md:w-44">
        <p className="font-bold pb-2 text-xl  ">Kontakt</p>
        <Some />
      </div>
      <div className="flex items-center flex-col md:w-44 ">
        <p className="font-bold pb-2 text-xl ">Adresse</p>
        <div className="flex text-xl md:text-base">
          <svg
            className="md:h-[2rem] md:w-[2rem]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
          <p>Mejlgade 46B 8000 Aarhus C</p>
        </div>
      </div>
    </div>
  );
}
