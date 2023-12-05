import Image from "next/image";
import { Jost } from "next/font/google";
import NavBar from "@/components/frontpage/navigation/NavBar";
import Footer from "@/components/frontpage/footer/Footer";

const jost = Jost({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`h-screen w-screen ${jost.className}`}>
      <NavBar />
      <h1 className="text-center text-3xl mt-6 font-bold">Velkommen</h1>
      <h2 className="text-center text-xl ">Til Four Amigos</h2>
      <Footer />
    </div>
  );
}
