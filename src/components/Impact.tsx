"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stats = [
  { value: 40, label: "Research Papers", suffix: "+" },
  { value: 5, label: "Patents Filed", suffix: "M+" },
  { value: 200, label: "AI Models Deployed", suffix: "+" },
  { value: 80, label: "Countries Reached", suffix: "+" },
];

const caseStudies = [
  {
    title: "Healthcare Transformation",
    description: "How our AI is helping medical professionals diagnose diseases earlier and more accurately, improving patient outcomes worldwide.",
    image: "https://ext.same-assets.com/1513452751/1801589045.webp"
  },
  {
    title: "Climate Science Acceleration",
    description: "Our models are speeding up climate research by analyzing vast datasets and identifying patterns that would take humans decades to discover.",
    image: "https://ext.same-assets.com/1513452751/2567036389.webp"
  },
  {
    title: "Education For All",
    description: "Making personalized education accessible globally through AI tutors that adapt to individual learning styles and needs.",
    image: "https://ext.same-assets.com/1513452751/474478391.webp"
  }
];

export function Impact() {
  const [counters, setCounters] = useState(stats.map(() => 0));
  const [animationStarted, setAnimationStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animationStarted) {
          setAnimationStarted(true);

          stats.forEach((stat, index) => {
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
              step++;
              current = Math.min(Math.ceil(increment * step), stat.value);

              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = current;
                return newCounters;
              });

              if (current >= stat.value) {
                clearInterval(timer);
              }
            }, duration / steps);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      counterObserver.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        counterObserver.unobserve(counterRef.current);
      }
    };
  }, [animationStarted]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-24 bg-gradient-to-b from-zinc-900 to-black transition-opacity duration-1000",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg text-gray-400">
            Transforming industries and improving lives through artificial intelligence
          </p>
        </div>

        <div
          ref={counterRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10">Case Studies</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className={cn(
                  "bg-zinc-900/60 border-gray-800 hover:border-gray-700 overflow-hidden group transition-all duration-300",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  visible && `transition-all duration-700 delay-${index * 200}`
                )}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-2">{study.title}</h4>
                  <p className="text-gray-400">{study.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href="/impact" className="text-gray-300 hover:text-white inline-flex items-center group">
            View all case studies
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
