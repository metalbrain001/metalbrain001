// Hero section component
import React from "react";
import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/sign-up");
  };
  return (
    <section className="bg-s1 relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 max-w-512 max-lg:max-w-388">
            <div className="caption small-2 uppercase text-p3">
              Welcome to the future
            </div>
            <h1 className="text-6xl font-bold uppercase leading-tight text-p4 mb-10 max-lg:text-5xl max-md:text-4xl max-md:leading-snug max-sm:text-3xl max-sm:leading-snug">
              <span className="block">We are a creative agency</span>
              <span className="block">that loves to innovate</span>
            </h1>
            <p className="max-w-440 mb-14 body-1 max-md:mb-10 mt-2 text-xl font-medium leading-relaxed text-p4">
              We're passionate creatives, developers, and problem-solvers
              building experiences that matter.{" "}
              <span className="text-blue-400 font-semibold underline cursor-pointer">
                Let’s create something remarkable together.
              </span>
            </p>
            <Button
              variant="ghost"
              type="submit"
              iconLeft={
                <img
                  src="/assets/images/submit.svg"
                  alt="submit icon"
                  className="w-5 h-5"
                />
              }
              onClick={handleGetStarted} // or "/login"
            >
              <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
                Get Started
              </span>
            </Button>
          </div>
          {/* Right Section - Image */}
          <div className="hero-img hero-img_res">
            <img
              src="/assets/images/hero3.png"
              alt="hero"
              className="w-full h-auto scale-110 max-md:scale-100 transition-transform duration-300"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
