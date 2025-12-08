import About from "@/sections/About";
import Events from "@/sections/Events";
import Featured from "@/sections/Featured";
import Hero from "@/sections/hero/Hero";
import ServicesOverview from "@/sections/ServicesOverview";
import Works from "@/sections/Works";

const Home = () => {
  return (
    <main className="relative">
      <Hero />
      <About />
      <ServicesOverview />
      <Works />
      <Featured />
      <Events />

    </main>
  );
};

export default Home;
