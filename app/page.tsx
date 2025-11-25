import About from "@/sections/About";
import Announcement from "@/sections/Announcement";
import Featured from "@/sections/Featured";
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
      <Featured />
      <Announcement />

    </main>
  );
};

export default Home;
