import { create } from 'zustand';
import { User } from 'firebase/auth';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const auth = getAuth(app);

  return {
    user: null,
    setUser: (user) => set({ user }),
    isAuthModalOpen: false,
    setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: false }),
    error: null,
    setError: (error) => set({ error }),
    logout: async () => {
      try {
        set({ isLoading: true });
        await signOut(auth);
        set({ 
          user: null,
          isLoading: false
        });
      } catch (error) {
        console.error("Error logging out:", error);
        set({ 
          isLoading: false,
          error: 'Failed to log out. Please try again.'
        });
      }
    },
  };
});
