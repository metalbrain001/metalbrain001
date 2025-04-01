// components/sections/Services.tsx
"use client";
import React from "react";
import ServicesCard from "../card/ServicesCard";
import { ServicesOptions } from "../constants";

interface ServicesProps {
  title?: string;
  subtitle?: string;
  items?: typeof ServicesOptions;
}

const Services: React.FC<ServicesProps> = ({
  title = "Our Services",
  subtitle = "What we offer",
  items = ServicesOptions,
}) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-[#0a0a23] to-black text-white">
      <div className="container mx-auto text-center mb-12 max-w-3xl">
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        <p className="text-lg text-gray-300">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {items.map((service) => (
          <ServicesCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            buttonText={service.buttonText}
            href={service.href}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
