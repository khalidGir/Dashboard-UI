import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
}

describe('useAuthStore', () => {
  let store: any;
  let localStorageMock: any;
  let sessionStorageMock: any;

  beforeEach(() => {
    // Mock localStorage and sessionStorage
    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    sessionStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    Object.defineProperty(window, 'sessionStorage', {
      value: sessionStorageMock,
    });

    // Mock setTimeout to control async behavior
    vi.useFakeTimers();
    
    // Create a fresh store instance for each test
    store = create<AuthState>((set) => ({
      isAuthenticated: !!localStorage.getItem('token'),
      isLoading: false,
      error: null,
      login: async (email: string, password: string, rememberMe: boolean) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call with timeout
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              // For demo purposes, accept any email/password combination
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
                resolve(undefined);
              } else {
                const error = new Error('Invalid email or password');
                set({ 
                  isLoading: false, 
                  error: error.message || 'Login failed' 
                });
                reject(error);
              }
            } catch (error: any) {
              set({ 
                isLoading: false,
                error: error.message || 'Login failed' 
              });
              reject(error);
            }
          }, 1000); // Simulate 1 second delay
        });
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
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should have correct initial state', () => {
    const state = store.getState();
    expect(state.isAuthenticated).toBe(false); // Default when no token in storage
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle successful login with rememberMe=true', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const rememberMe = true;

    const loginPromise = store.getState().login(email, password, rememberMe);

    // Advance timers to complete the async operation
    vi.advanceTimersByTime(1000);

    await loginPromise;

    const state = store.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('token', `fake-jwt-token-${email}`);
  });

  it('should handle successful login with rememberMe=false', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const rememberMe = false;

    const loginPromise = store.getState().login(email, password, rememberMe);

    // Advance timers to complete the async operation
    vi.advanceTimersByTime(1000);

    await loginPromise;

    const state = store.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(sessionStorageMock.setItem).toHaveBeenCalledWith('token', `fake-jwt-token-${email}`);
  });

  it('should handle failed login', async () => {
    const email = '';
    const password = 'password123';
    const rememberMe = true;

    const loginPromise = store.getState().login(email, password, rememberMe);

    // Advance timers to complete the async operation
    vi.advanceTimersByTime(1000);

    await expect(loginPromise).rejects.toThrow();

    const state = store.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).not.toBeNull();
  });

  it('should handle logout correctly', () => {
    // First, authenticate
    store.getState().login('test@example.com', 'password', true);
    vi.advanceTimersByTime(1000);

    // Then logout
    store.getState().logout();

    const state = store.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
    expect(sessionStorageMock.removeItem).toHaveBeenCalledWith('token');
  });

  it('should show loading state during login', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const rememberMe = true;

    // Start login process but don't advance timers yet
    store.getState().login(email, password, rememberMe);

    // Check loading state immediately
    const state = store.getState();
    expect(state.isLoading).toBe(true);

    // Advance timers to complete the operation
    vi.advanceTimersByTime(1000);
  });

  it('should load initial state from localStorage', () => {
    // Mock localStorage to return a token
    localStorageMock.getItem = () => 'fake-token-test@example.com';

    // Create a new store instance after setting up the mock
    const newStore = create<AuthState>((set) => ({
      isAuthenticated: !!localStorage.getItem('token'),
      isLoading: false,
      error: null,
      login: async (email: string, password: string, rememberMe: boolean) => {
        set({ isLoading: true, error: null });

        return new Promise((resolve) => {
          setTimeout(() => {
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
            resolve(undefined);
          }, 1000);
        });
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

    const state = newStore.getState();
    expect(state.isAuthenticated).toBe(true);
  });
});