"use client";

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CTA() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-zinc-900 to-black"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gray-800/20 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-gray-800/10 blur-3xl"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center py-16 px-4 sm:px-12 rounded-2xl border border-gray-800 bg-gradient-to-b from-zinc-900/70 to-black/70 backdrop-blur-sm transform transition-all duration-1000",
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join us in shaping the future of artificial intelligence
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you're a researcher, developer, business, or just curious about AI,
            we have resources and opportunities for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 h-14 px-8 rounded-md text-lg"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 hover:bg-gray-900 h-14 px-8 rounded-md text-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
