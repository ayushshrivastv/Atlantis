"use client";

import { useRef, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What makes your AI technology different?",
    answer: "Our AI systems are built on proprietary foundation models that have been trained on diverse, ethically-sourced datasets. We place a strong emphasis on safety, interpretability, and human-centered design, resulting in AI systems that are not just powerful but also reliable, transparent, and aligned with human values. Our research-first approach ensures we're constantly pushing the boundaries of what's possible while maintaining the highest standards of quality and safety."
  },
  {
    question: "How do you ensure your AI is safe and ethical?",
    answer: "Safety and ethics are core to our research and development process. We have dedicated teams focused on alignment, robustness, and safety research. We employ extensive testing and evaluation frameworks, including red-teaming exercises, adversarial testing, and value alignment techniques. Additionally, we maintain a diverse ethics board that provides oversight on our research directions and product decisions, and we regularly publish our safety methodologies to contribute to the broader scientific community."
  },
  {
    question: "Can your technology be integrated with existing systems?",
    answer: "Yes, our AI solutions are designed with interoperability in mind. We offer flexible integration options through our comprehensive API suite, which allows businesses to embed our technology into their existing workflows and systems with minimal disruption. Our team also provides technical support and customization services to ensure smooth integration, regardless of your current technology stack."
  },
  {
    question: "What industries do you currently serve?",
    answer: "Our AI solutions have been successfully deployed across a wide range of industries, including healthcare, finance, education, scientific research, manufacturing, and creative industries. Our technology is particularly valuable in domains that involve complex decision-making, require processing of large amounts of information, or benefit from advanced natural language understanding and generation capabilities."
  },
  {
    question: "Do you offer custom AI solutions for specific business needs?",
    answer: "Absolutely. While our core products serve a wide range of use cases, we understand that some challenges require tailored solutions. Our enterprise team works closely with clients to understand their specific requirements and develop customized AI solutions that address their unique challenges. These solutions can range from specialized model fine-tuning to completely bespoke AI systems built for specific operational contexts."
  },
  {
    question: "How do you handle data privacy and security?",
    answer: "We maintain the highest standards of data privacy and security across all our operations. Client data is protected through state-of-the-art encryption, secure infrastructure, and strict access controls. We are compliant with major data protection regulations including GDPR and CCPA. For enterprise clients, we offer data residency options and private deployments to meet specific security requirements. Our privacy-by-design approach ensures that privacy considerations are built into our products from the ground up, not added as an afterthought."
  },
];

export function FAQ() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about our AI technology and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "border border-gray-800 rounded-lg overflow-hidden bg-zinc-900/30 transition-all duration-500",
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  visible && `transition-all duration-700 delay-${index * 100}`
                )}
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-zinc-800/50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="max-w-md mx-auto mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Still have questions? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-8 font-medium bg-white text-black hover:bg-gray-200 rounded-md transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
