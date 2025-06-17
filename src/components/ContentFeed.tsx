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
    title: "Special Report",
    items: [
      {
        id: "ai-financial-analyst",
        title: "The Data Whisperer: Can AI Help Us Truly Understand the World Around Us?",
        description: `NEW DELHI – In a time when information is everywhere yet understanding often feels elusive, the challenge isn't just collecting data—it's making sense of it. From climate records to mental health surveys, the digital age has gifted us oceans of public datasets, rich with potential but difficult to navigate. This is where a new breed of technology is stepping in: AI-driven tools that can not only process massive volumes of data but also communicate their meaning with surprising clarity. With the rise of intelligent agents and vector search technologies like those in MongoDB, the dream of interactive, conversational data exploration is becoming a reality. Imagine asking a question—What’s driving housing shortages in urban areas?—and receiving not just a graph, but a clear, contextual explanation grounded in real-world data. By embedding datasets into searchable, semantic frameworks and integrating with platforms like Google, developers are creating systems that allow users to query, visualize, and engage with information in ways that feel more human than machine. But as with any paradigm shift, the promise of AI-powered insight comes with essential questions—about transparency, inclusivity, and the role of human judgment. In this next frontier of understanding, the machines may help us listen more closely to what the data has been trying to tell us all along.`,
        image: "/images/Gta8NpEXkAAcA5d.jpeg", // Local image
        type: "Insight",
        readTime: "2 min read",
      }
    ]
  }
];

const HighlightedDescription = ({ text }: { text: string }) => {
  const parts = text.split(/(MongoDB|Google)/g);
  return (
    <p className="text-sm text-white/90 mb-3">
      {parts.map((part, i) =>
        part === 'MongoDB' || part === 'Google' ? (
          <span key={i} className="bg-purple-500/30 text-purple-300 px-1 rounded-sm font-semibold">{part}</span>
        ) : (
          part
        )
      )}
    </p>
  );
};

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
    <div className="w-full max-w-2xl mx-auto pt-16 pb-32">
      {contentCategories.map((category, categoryIndex) => (
        <section key={category.title} className="mb-24">
          {/* Content section without heading */}

          <div className={categoryIndex === 0 ? "grid grid-cols-1 gap-8" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
            {category.items.map((item, itemIndex) => (
              <Card
                key={item.id}
                id={`${category.title}-${item.id}`}
                className={cn(
                  "content-item overflow-hidden transition-all duration-700 group relative",
                  visibleItems[`${category.title}-${item.id}`]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
              >
                <img src={item.image} alt={item.title} className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                  <HighlightedDescription text={item.description} />
                  <div className="text-xs text-gray-300">{item.readTime}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
