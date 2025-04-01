// src/client/layouts/LandingLayout.tsx
import React from "react";
import Header from "@/client/sections/Header";
import Hero from "@/client/sections/Hero";
import Services from "@/client/sections/Services";

const LandingLayout = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Services />
    </main>
  );
};

export default LandingLayout;
