import HeroSection from "@/Components/HeroSection";
import NavBar from "@/Components/NavBar";
import NewsLetter from "@/Components/NewsLetter";
import PopularSection from "@/Components/popular";
import Image from "next/image";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <PopularSection />
      <NewsLetter />
    </div>
  );
}
