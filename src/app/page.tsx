"use client";

import { ChatInput } from "@/components/ChatInput";
import { ContentFeed } from "@/components/ContentFeed";
import { FloatingChatContainer } from "@/components/FloatingChatContainer";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chatStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const { isChatMode, enterChatMode } = useChatStore();
  const { user, isAuthModalOpen, setIsAuthModalOpen, logout } = useAuthStore();
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ id: string, text: string, sender: 'user' | 'assistant' }>>([]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);

  const handleSendMessage = async (messageText: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!messageText.trim()) return;

    const newUserMessage = { id: Date.now().toString(), text: messageText, sender: 'user' as const };
    setMessages(prev => [...prev, newUserMessage]);
    enterChatMode();
    setIsAssistantThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.statusText}`);
      }

      const assistantMessage = { id: (Date.now() + 1).toString(), text: data.reply, sender: 'assistant' as const };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessageText = error instanceof Error ? error.message : "An unknown error occurred.";
      const errorMessage = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: 'assistant' as const };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAssistantThinking(false);
    }
  };

  return (
    <div className="min-h-screen">
      {isChatMode ? (
        // Chat Mode Layout
        <div className="flex flex-col h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">
              <FloatingChatContainer messages={messages} isLoading={isAssistantThinking} />
            </div>
          </div>
          <div className="fixed bottom-0 left-48 right-0 bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-xl mx-auto">
              <ChatInput onMessageSubmit={handleSendMessage} />
            </div>
          </div>
        </div>
      ) : (
        // Landing Screen Layout
        <div className="relative flex flex-col items-center">
          <div className="w-full flex flex-col items-center pt-24 pb-4">
            <h1 className="text-5xl font-semibold mb-10 text-center animate-fade-in text-white">
              What can I help with?
            </h1>
            <div className="animate-fade-in stagger-delay-2 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <ChatInput onMessageSubmit={handleSendMessage} />
            </div>
          </div>
          <div className="absolute top-6 right-6">
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" className="bg-transparent text-white hover:bg-white/10 hover:text-white border-white/30 px-8 py-3 text-lg">
                  {user.displayName || 'User'}
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-red-500 hover:bg-red-500/10 hover:text-red-500 border-red-500/30 px-4 py-2 text-sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="bg-transparent text-white hover:bg-white/10 hover:text-white border-white/30 px-8 py-3 text-lg" onClick={() => setIsAuthModalOpen(true)}>
                Login
              </Button>
            )}
          </div>
          <AuthModal />
          <ContentFeed />
        </div>
      )}
    </div>
  );
}
