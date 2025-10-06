"use client";

import { useAuth } from "@/app/libs/stores/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WithAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const WithAuth: React.FC<WithAuthProps> = ({ children, redirectTo = "/" }) => {
  const { isAuthenticated, isExpired } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || isExpired) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isExpired, router, redirectTo]);

  if (!isAuthenticated || isExpired) {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
};

export default WithAuth;
