"use client";

import { LeftSidebar } from "@/components/LeftSidebar";
import { ChatInput } from "@/components/ChatInput";
import { ContentFeed } from "@/components/ContentFeed";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showScroll, setShowScroll] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Hide immediately on any scroll
      if (window.scrollY > 10) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex min-h-screen bg-black">
      {/* Login Button */}
      <div className="fixed top-4 right-4 z-[999]">
        <Button 
          variant="outline" 
          className="bg-black text-white border border-gray-700 hover:bg-gray-900 shadow-md transition-all duration-200"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
      </div>
      
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-48">
        <div className="flex flex-col items-center justify-between min-h-screen">
          {/* Hero/Top Section with Chat Input */}
          <div className="w-full flex flex-col items-center pt-24 pb-4">
            <h1 className="text-3xl font-semibold mb-10 text-center animate-fade-in">
              What can I help with?
            </h1>
            <div className="animate-fade-in stagger-delay-2 w-full">
              <ChatInput />
            </div>

          </div>

          {/* Scroll Indicator */}
          {showScroll && (
            <div className="fixed bottom-8 left-[calc(25%+2rem)] flex items-center text-gray-400">
              <div className="text-left">
                <p className="text-sm mr-2 inline">Scroll to explore</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-text-bottom">
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          )}

          {/* Content Feed */}
          <div className="mt-[50vh]">
            <ContentFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
