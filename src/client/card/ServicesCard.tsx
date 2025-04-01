// components/ui/ServicesCard.tsx
"use client";
import React from "react";
import Button from "../components/Button";

interface ServicesCardProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
  buttonText?: string;
  href?: string;
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  title,
  description,
  icon,
  buttonText,
  href,
}) => {
  return (
    <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 text-white">
      <div className="mb-4 flex items-center space-x-3">
        {typeof icon === "string" ? (
          <img src={icon} alt={title} className="w-8 h-8 object-contain" />
        ) : (
          icon
        )}
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <p className="text-base mb-5 opacity-80">{description}</p>
      {buttonText && href && (
        <Button href={href} variant="secondary" size="sm">
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ServicesCard;
