import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
  login: async (email: string, password: string, rememberMe: boolean) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call - in a real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, accept any email/password combination
      // In a real application, you would validate credentials with your backend
      if (email && password) {
        // Set token in localStorage if rememberMe is true, otherwise in sessionStorage
        const token = `fake-jwt-token-${email}`;
        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }

        set({
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Login failed'
      });
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    set({
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  },
}));
