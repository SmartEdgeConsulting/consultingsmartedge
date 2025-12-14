import RegistrationHero from "@/sections/hero/RegistrationHero";
import RegistrationForm from "@/forms/RegistrationForm";
import React from "react";

const Registration = () => {
  return (
    <main className="mt-16 max-w-7xl mx-auto">
      <RegistrationHero />
      <RegistrationForm />
    </main>
  );
};

export default Registration;
