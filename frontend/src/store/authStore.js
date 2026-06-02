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

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('duongdiy-auth');
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
        window.location.href = '/home';
      },
    }),
    {
      name: 'duongdiy-auth', // name of the item in storage (default: localStorage)
    }
  )
);
