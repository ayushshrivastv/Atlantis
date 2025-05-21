"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleParallax = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    const elements = container.querySelectorAll('.parallax-element');
    elements.forEach((el, index) => {
      const depth = index + 1;
      const moveX = x * depth * 20;
      const moveY = y * depth * 20;
      (el as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const elements = container.querySelectorAll('.parallax-element');
    elements.forEach((el) => {
      (el as HTMLElement).style.transform = 'translate(0px, 0px)';
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Abstract background elements with parallax effect */}
      <div
        className="absolute inset-0 parallax-container"
        onMouseMove={handleParallax}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gray-900/30 blur-3xl parallax-element"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-gray-800/20 blur-3xl parallax-element"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-gray-700/10 blur-3xl parallax-element"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2
            className={cn(
              "text-lg font-semibold tracking-wider uppercase mb-4 opacity-0",
              isVisible && "animate-fade-in"
            )}
          >
            Advancing the future of intelligence
          </h2>
          <h1
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0",
              isVisible && "animate-fade-in animate-delay-100"
            )}
          >
            Building AI that amplifies human potential
          </h1>
          <p
            className={cn(
              "text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 opacity-0",
              isVisible && "animate-fade-in animate-delay-200"
            )}
          >
            We're pioneering research in artificial intelligence that's safe, beneficial, and accessible to all
          </p>
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0",
              isVisible && "animate-fade-in animate-delay-300"
            )}
          >
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 h-14 px-8 rounded-md text-lg">
              Explore our research
            </Button>
            <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-900 h-14 px-8 rounded-md text-lg">
              View our products
            </Button>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div
          className={cn(
            "absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0",
            isVisible && "animate-fade-in animate-delay-500"
          )}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2">Scroll to discover</span>
            <div className="w-0.5 h-10 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
