import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthModalOpen: false,
      authView: 'login', // 'login' | 'register' | 'forgot'

      openAuthModal: (view = 'login') => set({ isAuthModalOpen: true, authView: view }),
      closeAuthModal: () => set({ isAuthModalOpen: false }),
      setAuthView: (view) => set({ authView: view }),

      login: (userData, token) => set({ 
        user: userData, 
        token: token, 
        isAuthenticated: true,
        isAuthModalOpen: false
      }),

      logout: () => set({ 
        user: null, 
        token: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'duongdiy-auth', // name of the item in storage (default: localStorage)
    }
  )
);
