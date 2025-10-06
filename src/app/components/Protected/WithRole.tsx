"use client";

import { useAuth } from "@/app/libs/stores/AuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface WithRoleProps {
  children: React.ReactNode;
  requiredRole: "aluno" | "professor";
  redirectTo?: string;
}

const WithRole: React.FC<WithRoleProps> = ({
  children,
  requiredRole,
  redirectTo = "/",
}) => {
  const { role, isAuthenticated, isExpired } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || isExpired || role !== requiredRole) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isExpired, role, requiredRole, router, redirectTo]);

  if (!isAuthenticated || isExpired || role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default WithRole;
