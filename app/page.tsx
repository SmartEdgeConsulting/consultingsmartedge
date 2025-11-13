"use client";

import Suscribe from "@/components/Suscribe";
import About from "@/sections/About";
import Events from "@/sections/Events";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Works from "@/sections/Works";
import { useState } from "react";

const Home = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div className="relative">
      <Hero />
      <About />
      <Services />
      <Works />
      <Events />

      {/* Fixed Bottom Left Button */}
      <button
        onClick={() => setOpenDialog(true)}
        className="fixed animate-bounce bottom-6 right-6 z-50 bg-sec text-white px-4 py-2 rounded-full shadow-lg hover:bg-sec/70 transition"
      >
        Suscribe
      </button>

      <Suscribe open={openDialog} onOpenChange={setOpenDialog}/>

    </div>
  );
};

export default Home;
