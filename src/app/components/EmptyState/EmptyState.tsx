"use client";

import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { useSearch } from "@/app/libs/contexts/SearchContext";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Sem blogs disponíveis",
  subtitle = "Tente buscar por outro tema.",
  showReset,
}) => {
  const { setQuery } = useSearch();

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div
      className="
        h-[60vh]
        flex
        flex-col
        gap-4
        justify-center
        items-center
        text-center
        px-6
      "
    >
      <Heading title={title} subtitle={subtitle} center />

      {showReset && (
        <div className="mt-6 w-48">
          <Button outline label="Redefinir pesquisa" onClick={handleReset} />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
