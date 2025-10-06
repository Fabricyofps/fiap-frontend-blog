"use client";

import { useAuthStore } from "@/app/libs/stores/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, isTokenExpired, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const now = Date.now();
    const expTime = (user.exp || 0) * 1000;
    const remaining = expTime - now;

    if (remaining <= 0) {
      logout();
      toast.error("Sua sessão expirou.");
      router.push("/");
      return;
    }

    const timeout = setTimeout(() => {
      logout();
      toast.error("Sua sessão expirou.");
      router.push("/");
    }, remaining);

    return () => clearTimeout(timeout);
  }, [user, isTokenExpired, logout, router]);

  return <>{children}</>;
};
