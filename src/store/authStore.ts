import { create } from 'zustand';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '../firebase/config';

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  initAuth: () => () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isLoading: true,

  user: null,
  setUser: (user) => set({ user }),

  initAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, isLoading: false });
    });
    return unsubscribe;
  },

  logout: async () => {
    await signOut(auth);
  },
}));
