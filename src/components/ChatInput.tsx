"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ChatInput() {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("Message submitted:", message);
    setMessage("");
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            "relative rounded-xl bg-[#0d0d0d] transition-all overflow-hidden",
            isFocused
              ? "shadow-sm ring-1 ring-gray-500"
              : "hover:bg-[#111111]"
          )}
        >
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What can I help with?"
            className="w-full resize-none bg-transparent py-3 pl-4 pr-14 text-white outline-none max-h-60 min-h-[52px]"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            className={cn(
              "absolute right-2 bottom-2 h-8 w-8 rounded-full bg-white text-black hover:bg-gray-300",
              !message.trim() && "opacity-50 cursor-not-allowed"
            )}
            disabled={!message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>

      <div className="flex justify-center mt-4 space-x-2">
        <button className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md transition-colors">
          Search with NexusAI
        </button>
        <button className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md transition-colors">
          Voice Chat
        </button>
        <button className="text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md transition-colors">
          Research
        </button>
      </div>
    </div>
  );
}
