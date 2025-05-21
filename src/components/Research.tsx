"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResearchArea = {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
};

const researchAreas: ResearchArea[] = [
  {
    id: "foundation-models",
    title: "Foundation Models",
    description: "Building the core technologies that power our AI systems",
    content: "Our foundation models research focuses on developing large-scale neural networks that possess broad capabilities and can be adapted to a wide range of tasks. We're pushing the boundaries of what's possible in model scale, efficiency, and capabilities while maintaining a strong focus on safety and reliability.",
    image: "https://ext.same-assets.com/1513452751/780556859.webp"
  },
  {
    id: "alignment",
    title: "AI Alignment",
    description: "Ensuring AI systems act in accordance with human values",
    content: "Our alignment research aims to develop AI systems that are aligned with human values and intentions. We're exploring novel techniques for training models to be helpful, harmless, and honest, even as they become more capable and autonomous.",
    image: "https://ext.same-assets.com/1513452751/1801589045.webp"
  },
  {
    id: "multimodal",
    title: "Multimodal Learning",
    description: "Enabling AI to understand and generate across different types of data",
    content: "Our multimodal research focuses on building AI systems that can seamlessly understand and generate content across different modalities, including text, images, audio, and video. We're developing new architectures and training techniques to enable richer and more natural human-AI interaction.",
    image: "https://ext.same-assets.com/1513452751/2530830555.webp"
  },
  {
    id: "ai-safety",
    title: "AI Safety",
    description: "Developing robust techniques to ensure AI systems remain safe",
    content: "Our safety research is focused on ensuring that advanced AI systems remain safe, reliable, and aligned with human values even as they become more capable. We're developing techniques for adversarial testing, interpretability, robust oversight, and containment of potentially harmful behaviors.",
    image: "https://ext.same-assets.com/1513452751/2405629496.webp"
  },
];

export function Research() {
  const [activeTab, setActiveTab] = useState("foundation-models");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className={cn(
        "py-24 bg-black transition-opacity duration-1000",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Research</h2>
          <p className="text-lg text-gray-400">
            Pioneering the frontier of artificial intelligence with breakthrough research
          </p>
        </div>

        <Tabs
          defaultValue="foundation-models"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-10">
            <TabsList className="bg-zinc-900 p-1">
              {researchAreas.map((area) => (
                <TabsTrigger
                  key={area.id}
                  value={area.id}
                  className="data-[state=active]:bg-zinc-800"
                >
                  {area.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {researchAreas.map((area) => (
            <TabsContent
              key={area.id}
              value={area.id}
              className="transition-all duration-500 transform origin-top data-[state=active]:animate-fade-in"
            >
              <Card className="bg-transparent border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                      <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                      <p className="text-gray-300 mb-6">{area.description}</p>
                      <div className="mb-8 text-gray-400 leading-relaxed">
                        {area.content}
                      </div>
                      <Button className="bg-white text-black hover:bg-gray-200">
                        Learn More
                      </Button>
                    </div>
                    <div className="order-1 md:order-2 overflow-hidden rounded-lg">
                      <img
                        src={area.image}
                        alt={area.title}
                        className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <a href="/research" className="text-gray-300 hover:text-white inline-flex items-center group">
            View all research areas
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
