"use client";

import Suscribe from "@/components/Suscribe";
import { useState } from "react";

const SuscribeButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpenDialog(true)}
        className="fixed animate-bounce bottom-6 right-6 z-50 bg-gradient-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-secondary/70 transition"
      >
        Suscribe
      </button>
      <Suscribe open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
};

export default SuscribeButton;
