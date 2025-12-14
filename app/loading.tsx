import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen flex justify-center items-center px-4">
      <Image src="/loading.svg" alt="Loading" width={100} height={100} />
      Loading...
    </main>
  );
};

export default loading;
