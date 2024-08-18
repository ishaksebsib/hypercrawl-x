"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { Input } from "../ui/input";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

const Hero = () => {
  return (
    <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          OloStep WebScraper
        </h1>
        <p className="text-neutral-500 max-w-md mx-auto my-2 text-sm text-center relative z-10">
          Experience unparalleled speed with a Web Scraping API delivering
          results in 2-6 seconds, at an unbeatable price. It avoids all bot
          detection and can parallelize up to 100K requests in minutes
        </p>
        <div className="flex flex-col justify-center items-center gap-4 py-4 sm:flex-row sm:py-8">
          <Input
            type="text"
            placeholder="https://en.wikipedia.org/wiki/Alexander_the_Great"
            className="text-white rounded-lg border border-neutral-400 focus:ring-2 focus:ring-teal-500  w-full relative z-10 bg-neutral-950 placeholder:text-neutral-400 placeholder:text-xs sm:placeholder:text-md md:placeholder:text-lg"
          />
					<HoverBorderGradient className="w-32 hover:bg-white hover:text-black">Scrape Now</HoverBorderGradient>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default Hero;
