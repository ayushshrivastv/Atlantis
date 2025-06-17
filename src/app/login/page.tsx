"use client";

"use client";

import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const auth = getAuth(app);
    const router = useRouter();
    const { setUser } = useAuthStore();
    const provider = new GoogleAuthProvider();

    // Only run this effect once on mount
    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    const user = result.user;
                    setUser(user);
                    router.push('/');
                }
            } catch (error) {
                console.error("Error handling redirect result:", error);
            }
        };

        handleRedirectResult();
    }, [auth, router, setUser]);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Sign in with Google</h1>
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" className="bg-white hover:bg-gray-200 rounded-full p-4" onClick={handleGoogleSignIn}>
            <Image src="/google-logo.png" alt="Google logo" width={32} height={32} />
          </Button>
        </div>
        <div className="text-sm text-center">
          <Link href="/" className="font-medium text-sky-500 hover:text-sky-400">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
