import BestProducts from "@/components/Body/Section1/BestProducts";
import FeaturedProducts from "@/components/Body/Section2/FeaturedProducts";
import PopularCollections from "@/components/Body/Section3/PopularCollections";
import Collections from "@/components/Body/Section4/Collections";
import SectionEnd from "@/components/Body/SectoinEnd/SectionEnd";
import HeadersCollections from "@/components/Headers/HeadersCollections";
import Banner from "@/components/Hero/Banner";

export default function Home() {
  return (
    <main className="w-full h-full relative bg-muted">
      <HeadersCollections />
      <Banner />
      <BestProducts />
      <FeaturedProducts />
      <PopularCollections />
      <Collections />
      <SectionEnd />
    </main>
  );
}
