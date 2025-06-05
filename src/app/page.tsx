"use client";

import { LeftSidebar } from "@/components/LeftSidebar";
import { ChatInput } from "@/components/ChatInput";
import { ContentFeed } from "@/components/ContentFeed";
import { FloatingChatContainer } from "@/components/FloatingChatContainer";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showScroll, setShowScroll] = useState(true);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'assistant'}>>([]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);
  
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

  const handleFirstMessage = (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const
    };
    
    setMessages([userMessage]);
    setIsChatMode(true);
    setIsAssistantThinking(true); // Assistant starts thinking
    
    // Simulate assistant response (replace with actual AI integration)
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: "Hello! I'm here to help you with your questions. How can I assist you today?",
        sender: 'assistant' as const
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsAssistantThinking(false); // Assistant finished thinking
    }, 1000);
  };

  const handleContinueChat = (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsAssistantThinking(true); // Assistant starts thinking
    
    // Simulate assistant response (replace with actual AI integration)
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question. Let me help you with that...",
        sender: 'assistant' as const
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsAssistantThinking(false); // Assistant finished thinking
    }, 1000);
  };

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
        {!isChatMode ? (
          // Landing Screen Layout
          <div className="flex flex-col items-center min-h-screen">
            {/* Hero/Top Section with Chat Input */}
            <div className="w-full flex flex-col items-center pt-24 pb-4">
              <h1 className="text-3xl font-semibold mb-10 text-center animate-fade-in text-white">
                What can I help with?
              </h1>
              <div className="animate-fade-in stagger-delay-2 w-full">
                <ChatInput onMessageSubmit={handleFirstMessage} />
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
            <div className="mt-24">
              <ContentFeed />
            </div>
          </div>
        ) : (
          // Chat Mode Layout
          <div className="flex flex-col min-h-screen">
            {/* Floating Chat Container */}
            <div className="flex-1 overflow-hidden">
              <FloatingChatContainer messages={messages} isLoading={isAssistantThinking} />
            </div>
            
            {/* Fixed Bottom Chat Input */}
            <div className="fixed bottom-0 left-48 right-0 bg-black p-4">
              <div className="w-full max-w-xl mx-auto">
                <ChatInput onMessageSubmit={handleContinueChat} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
