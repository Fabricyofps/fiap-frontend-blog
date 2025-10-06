"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Ops" subtitle="Algo de errado aconteceu!" />;
};

export default ErrorState;
