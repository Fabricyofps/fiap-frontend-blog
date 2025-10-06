import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface User {
  sub: string;
  email: string;
  role: "aluno" | "professor";
  iat: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setUserFromToken: (token: string) => boolean;
  login: (token: string) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setUserFromToken: (token: string): boolean => {
        try {
          const decoded: JwtPayload & Partial<User> = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000);

          if (decoded.exp && decoded.exp < now) {
            console.warn("Token expirado.");
            get().logout();
            return false;
          }

          set({
            token,
            user: {
              sub: decoded.sub || "",
              email: decoded.email || "",
              role: (decoded.role as "aluno" | "professor") ?? "aluno",
              iat: decoded.iat || 0,
              exp: decoded.exp || 0,
            },
            isAuthenticated: true,
          });

          return true;
        } catch (error) {
          console.error("Erro ao decodificar token:", error);
          get().logout();
          return false;
        }
      },

      login: (token: string) => {
        get().setUserFromToken(token);
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      isTokenExpired: () => {
        const { token, user } = get();
        if (!token || !user) return true;
        const now = Math.floor(Date.now() / 1000);
        return user.exp < now;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useAuth = () => {
  const { token, user, isAuthenticated, login, logout, isTokenExpired } =
    useAuthStore();

  const effectiveAuthenticated = isAuthenticated && !isTokenExpired();

  if (isTokenExpired() && isAuthenticated) {
    logout();
  }

  return {
    user,
    isAuthenticated: effectiveAuthenticated,
    role: user?.role,
    token,
    login,
    logout,
    isExpired: isTokenExpired(),
  };
};
