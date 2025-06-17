"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
}

interface FloatingChatContainerProps {
  messages: Message[];
  isLoading?: boolean; // Add isLoading prop
}

export function FloatingChatContainer({ messages, isLoading }: FloatingChatContainerProps) { // Destructure isLoading
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div 
      ref={containerRef}
      className="h-full flex flex-col bg-black text-white overflow-hidden"
    >
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto px-28 py-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-3 text-sm sm:text-base",
                  message.sender === 'user'
                    ? "bg-white text-black ml-auto"
                    : "bg-white text-black mr-auto"
                )}
              >
                {message.sender === 'assistant' && (
                  <div className="flex items-center mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 mr-2 text-black"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                      <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                      <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                      <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                      <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                      <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
                    </svg>
                    <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md font-medium">Gemini</span>
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-md font-medium">MongoDB</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap break-words">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator for when assistant is thinking */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-black rounded-2xl px-4 py-3 max-w-[70%] mr-auto">
                <div className="whitespace-pre-wrap break-words">
                  Thinking...
                </div>
              </div>
            </div>
          )}
          
          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
