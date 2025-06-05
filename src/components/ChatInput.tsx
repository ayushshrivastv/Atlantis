"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  onMessageSubmit?: (message: string) => void;
}

export function ChatInput({ onMessageSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Call the parent's message handler
    if (onMessageSubmit) {
      onMessageSubmit(message.trim());
    }
    
    console.log("Message submitted:", message);
    setMessage("");
    if (textareaRef.current) {
      // Reset to initial height after submission
      textareaRef.current.style.height = "52px"; // Or use the computed min-height
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate based on content
      const scrollHeight = textareaRef.current.scrollHeight;
      // Attempt to get max-height from Tailwind class (e.g., max-h-60 which is 15rem or 240px)
      // Fallback to a pixel value if parsing fails.
      const computedMaxHeight = getComputedStyle(textareaRef.current).maxHeight;
      const maxHeight = computedMaxHeight.endsWith('px') ? parseInt(computedMaxHeight, 10) : 240;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const initialMinHeightClass = "min-h-[52px]";

  return (
    <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={cn(
          "rounded-3xl bg-white p-2 sm:p-3 transition-all shadow-md",
          isFocused ? "ring-2 ring-blue-500" : "hover:bg-gray-50"
        )}
      >
        <form onSubmit={handleSubmit} id="chat-form" className="flex items-center w-full">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Anything.."
            className={`flex-grow resize-none bg-transparent py-3 pl-4 pr-2 text-gray-900 placeholder-gray-500 outline-none max-h-60 ${initialMinHeightClass} text-sm sm:text-base`}
            rows={1}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for cleaner look
          />
          <Button
            type="submit"
            size="icon"
            className={cn(
              "ml-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 rounded-full w-8 h-8 sm:w-9 sm:h-9 shadow flex-shrink-0",
              !message.trim() && "opacity-50 cursor-not-allowed"
            )}
            disabled={!message.trim()}
          >
            <ArrowUp size={18} />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
