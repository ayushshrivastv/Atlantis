"use client";

import { GoogleAuthProvider, signInWithPopup, getAuth, getRedirectResult } from "firebase/auth";
import { app } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect } from "react";

export function AuthModal() {
  const { setUser, isAuthModalOpen, setIsAuthModalOpen, isLoading, error, setError, setIsLoading } = useAuthStore();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setUser(null);
      setIsLoading(true);
      
      // Try to get any existing redirect result first
      const result = await getRedirectResult(auth);
      if (result?.user) {
        setUser(result.user);
        setIsLoading(false);
        setIsAuthModalOpen(false);
        return;
      }

      // If no redirect result, proceed with popup
      const popupResult = await signInWithPopup(auth, provider);
      
      if (popupResult.user) {
        setUser(popupResult.user);
        setIsLoading(false);
        setIsAuthModalOpen(false);
      } else {
        throw new Error('Authentication cancelled by user');
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setIsLoading(false);
      if (error instanceof Error) {
        setError(error.message === 'Authentication cancelled by user' 
          ? 'Sign in cancelled' 
          : error.message.includes('popup-closed-by-user')
            ? 'Sign in cancelled'
            : 'Failed to sign in. Please check your internet connection and try again.');
      }
    }
  };

  useEffect(() => {
    if (!isAuthModalOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAuthModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login with Google</h2>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-50 text-red-700 text-center">
            {error}
          </div>
        )}
        


        <div className="text-center mb-6">
          <p className="text-gray-600">Sign in with your Google account</p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-100 rounded-full p-6 w-40 h-40 flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              onClick={handleGoogleSignIn}
            >
              <Image src="/google-logo.png" alt="Google logo" width={64} height={64} style={{ width: 'auto', height: 'auto' }} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
