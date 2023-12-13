/*Emil*/
import NavBar from "@/components/frontpage/navigation/NavBar";
import Some from "@/components/frontpage/footer/Some";
import Image from "next/image";
import ConfirmOrder from "@/components/frontpage/ConfirmOrder";
import { Jost } from "next/font/google";
const jost = Jost({ subsets: ["latin"] });

export default function kontakt() {
  return (
    <main className="bg-light-brown">
      {/*Her bliver NavBar componenten hentet og bliver placeret øverst på siden*/}
      <nav>
        <NavBar />
      </nav>
      <header>
        <h1 className="text-center font-bold text-3xl mb-2 text-dark-orange pt-24">
          Kontakt
        </h1>
      </header>
      {/*Der bliver tilføjet et billede inde fra public mappen, som bliver stylet til at dække et bestemt højde og brede, hvor efter billedet bliver vist fra center, så toppen og bunden af billedet ikke bliver vist, og der er så noget styling der gør at den er responsiv*/}
      <div className="flex flex-col justify-between items-center md:flex-row-reverse md:justify-around mb-4 ">
        <figure className="flex items-center md:w-[60rem] md:h-[30rem] h-60 w-80 overflow-hidden relative mb-8">
          <Image
            src={"/four_5.jpeg"}
            alt="Billede af Four Amigos restaurant"
            layout="fill"
            objectFit="cover"
            objectPosition="center center"
            priority={true}
          />
        </figure>
        {/*Some komponenet bliver sat ind.*/}
        <Some />
        {/*Noget kontent som bliver stylet og rykket rundt så det er responsiv*/}
      </div>
      <section className="flex flex-col justify-between items-center md:items-start md:flex-row md:justify-around mt-4">
        <div className="flex flex-col gap-4 text-start w-full items-center mb-8 md:max-w-100% md:w-1/4 md:text-start md:gap-2">
          <h2 className="text-xl w-full max-w-[20rem] md:max-w-[22rem] text-start md:text-3xl">
            Ingen bordbooking - Først til tacos
          </h2>
          <div className="md:max-w-[22rem] flex flex-col text-start max-w-[20rem]">
            <p className="font-bold text-start text-base md:text-xl">
              Ønsker Du at Booke Privat Arrangement?
            </p>
            <p className=" text-start text-sm md:text-lg">
              Du har muligheden for at booke hele vores restaurant med plads til
              16 personer. Kontakt for mere information herom.
            </p>
          </div>
        </div>
        {/*Åbningstider*/}
        <div className="flex flex-col items-center pb-8 md:items-start md:gap-8">
          <h3 className="font-bold w-80 md:text-xl"> Åbningstider </h3>
          <div className="flex w-80 flex-col md:gap-3 md:text-lg">
            <p>Tirsdag - Søndag</p>
            <p>16:00 - 20:30(køkken)</p>
            <p>Mandag</p>
            <p>Lukket</p>
          </div>
        </div>
        {/*Her bliver der hentet et svg fra nettet, som er en markør*/}
        <div className="flex flex-col justify-between">
          <div className="flex mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              strokelinecap="round"
              strokelinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
            </svg>
            <h3 className="">Mejlgade 46B 8000 Aarhus C</h3>
          </div>
          {/*Her bliver der hentet et billede eller en iframe som viser hvor henne four amigos ligger, ved brug af google maps, som så er blevet stylet i størrelse*/}
          <iframe
            className="md:w-[400px] items-center md:h-[300px] pb-8"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2221.8583756801813!2d10.210260977255183!3d56.15955326058835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464c3fa703ab61af%3A0xde8c7b068bd1b2fe!2sFour%20Amigos!5e0!3m2!1sda!2sdk!4v1701769543892!5m2!1sda!2sdk"
            width="300"
            height="200"
            style={{
              border: 0,
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
