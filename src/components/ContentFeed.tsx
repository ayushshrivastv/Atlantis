"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  readTime: string;
  date?: string;
}

interface ContentCategory {
  title: string;
  items: ContentItem[];
}

const contentCategories: ContentCategory[] = [
  {
    title: "Featured",
    items: [
      {
        id: "nexus-core",
        title: "Introducing Nexus Core",
        description: "Our flagship AI system with breakthrough capabilities in reasoning and problem-solving",
        image: "https://ext.same-assets.com/1513452751/1406521742.webp",
        type: "Release",
        readTime: "8 min read"
      },
      {
        id: "vision-api",
        title: "Vision API Now Available",
        description: "Integrate powerful vision capabilities into your applications",
        image: "https://ext.same-assets.com/1513452751/2749911493.webp",
        type: "Product",
        readTime: "5 min read"
      },
      {
        id: "research-paper",
        title: "Scaling Laws for Neural Language Models",
        description: "Our research on the relationship between model size, compute, and performance",
        image: "https://ext.same-assets.com/1513452751/1801589045.webp",
        type: "Research",
        readTime: "12 min read"
      }
    ]
  },
  {
    title: "Latest News",
    items: [
      {
        id: "new-office",
        title: "NexusAI Opens New Research Lab in Toronto",
        description: "Expanding our global research footprint",
        image: "https://ext.same-assets.com/1513452751/780556859.webp",
        type: "Company",
        readTime: "3 min read",
        date: "May 10, 2025"
      },
      {
        id: "partnership",
        title: "Strategic Partnership with Academic Institutions",
        description: "Collaborating with leading universities on AI safety research",
        image: "https://ext.same-assets.com/1513452751/3239987721.webp",
        type: "Partnership",
        readTime: "4 min read",
        date: "May 2, 2025"
      },
      {
        id: "conference",
        title: "Join Us at AI Summit 2025",
        description: "NexusAI researchers to present latest breakthroughs",
        image: "https://ext.same-assets.com/1513452751/2530830555.webp",
        type: "Event",
        readTime: "2 min read",
        date: "Apr 28, 2025"
      }
    ]
  },
  {
    title: "Research Spotlight",
    items: [
      {
        id: "alignment",
        title: "Advances in AI Alignment",
        description: "New techniques for ensuring AI systems act according to human intent",
        image: "https://ext.same-assets.com/1513452751/2405629496.webp",
        type: "Research",
        readTime: "15 min read"
      },
      {
        id: "multimodal",
        title: "Multimodal Learning Frameworks",
        description: "Unifying vision, language, and audio understanding in a single model",
        image: "https://ext.same-assets.com/1513452751/2567036389.webp",
        type: "Publication",
        readTime: "10 min read"
      }
    ]
  }
];

export function ContentFeed() {
  const [visibleItems, setVisibleItems] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 100px 0px" }
    );

    document.querySelectorAll(".content-item").forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll(".content-item").forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto pt-16 pb-32">
      {contentCategories.map((category, categoryIndex) => (
        <section key={category.title} className="mb-24">
          {/* Content section without heading */}

          <div className={categoryIndex === 0 ? "grid grid-cols-1 gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
            {category.items.map((item, itemIndex) => (
              <Card
                key={item.id}
                id={`${category.title}-${item.id}`}
                className={cn(
                  "content-item bg-zinc-900/30 overflow-hidden transition-all duration-700 shadow-sm hover:bg-zinc-800/40 cursor-pointer group",
                  visibleItems[`${category.title}-${item.id}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10",
                  categoryIndex === 0 && "md:flex md:items-center"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden",
                    categoryIndex === 0
                      ? "aspect-[16/9] md:w-1/2 md:h-auto"
                      : "aspect-square"
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <CardContent className={cn(
                  "p-4",
                  categoryIndex === 0 && "md:w-1/2"
                )}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-300">
                      {item.type}
                    </span>
                    {item.date && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{item.date}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                  <div className="text-xs text-gray-500">{item.readTime}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
