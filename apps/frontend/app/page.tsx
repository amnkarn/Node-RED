import Appbar from "@/components/Appbar";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";



export default function Landing() {
  return (
    <div className="bg-white w-full">
      <Appbar />
      <Hero />
      <Banner />
      <Footer />
    </div>
  );
}
