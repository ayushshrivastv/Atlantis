"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

const productData = [
  {
    title: "Nexus Core",
    description: "Our flagship general-purpose AI system with state-of-the-art capabilities in reasoning, language understanding, and problem-solving.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17L12 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.92896 14.5L1.3934 18.0355" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M19.0711 14.5L22.6066 18.0355" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="9" r="7" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="9" r="3" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Nexus Vision",
    description: "Advanced computer vision AI that can analyze and understand images and video with human-like perception and contextual awareness.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
        <path d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Nexus Language",
    description: "Cutting-edge language model capable of understanding, generating, and translating human language with remarkable fluency and accuracy.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 13H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 17H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Nexus API",
    description: "Integrate our powerful AI technologies directly into your applications, products, and services with our comprehensive API suite.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 7L7 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 17H7V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
      </svg>
    ),
  },
];

export function Products() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start showing cards sequentially
          let timer = 0;
          const newVisibleCards = productData.map((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newArr = [...prev];
                newArr[i] = true;
                return newArr;
              });
            }, timer);
            timer += 150;
            return false;
          });
          setVisibleCards(newVisibleCards);
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-lg text-gray-400">
            Cutting-edge AI solutions designed to transform industries and enhance human capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productData.map((product, index) => (
            <Card
              key={index}
              className={cn(
                "bg-zinc-900/60 border-gray-800 hover:border-gray-700 transition-all duration-300 transform",
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <CardHeader className="pb-0">
                <div className="mb-4">{product.icon}</div>
                <CardTitle className="text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-gray-400">{product.description}</p>
              </CardContent>
              <CardFooter>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-white inline-flex items-center group"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
