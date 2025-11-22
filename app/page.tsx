import SuscribeButton from "@/components/SuscribeButton";
import About from "@/sections/About";
import Announcement from "@/sections/Announcement";
import Hero from "@/sections/hero/Hero";
import ServicesOverview from "@/sections/ServicesOverview";
import Works from "@/sections/Works";

const Home = () => {
  return (
    <main className="relative mt-16">
      <Hero />
      <About />
      <ServicesOverview />
      <Works />
      <Announcement />

      <SuscribeButton />
    </main>
  );
};

export default Home;
