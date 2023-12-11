import Image from "next/image";

export default function Some(props) {
  return (
    <div className="flex flex-col justify-between items-start md:gap-4">
      <a
        href="https://www.instagram.com/fouramigos_aarhus/"
        className="flex flex-row items-center md:text-xl"
      >
        <svg
          className="mr-2 md:h-[2rem] md:w-[2rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokelinecap="round"
          strokelinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M16.5 7.5l0 .01" />
        </svg>
        @fouramigos_aarhus
      </a>

      <a
        href="https://www.tiktok.com/@four.amigos03"
        className="flex flex-row mt-4 items-center md:text-xl"
      >
        <svg
          className="mr-2 md:h-[2rem] md:w-[2rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokelinecap="round"
          strokelinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
        </svg>
        @four.amigos03
      </a>

      <a
        href="mailto:fouramigosaps@gmail.com"
        className="flex flex-row mt-4 items-center md:text-xl"
      >
        <svg
          className="mr-2 md:h-[2rem] md:w-[2rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokelinecap="round"
          strokelinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
          <path d="M3 7l9 6l9 -6" />
        </svg>
        fouramigosaps@gmail.com
      </a>
      <a
        href="tel:+45 22 66 68 25"
        className="flex flex-row mt-4 items-center md:text-xl"
      >
        <svg
          className="mr-2 md:h-[2rem] md:w-[2rem]"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokelinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        </svg>
        +45 22 66 68 25
      </a>

      <a
        href="https://www.facebook.com/profile.php?id=61551904498625"
        className="flex flex-row mt-4 items-center md:text-xl"
      >
        <svg
          className="mr-2 md:h-[2rem] md:w-[2rem] "
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          strokelinecap="round"
          strokelinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
        </svg>
        Four Amigos
      </a>
    </div>
  );
}
