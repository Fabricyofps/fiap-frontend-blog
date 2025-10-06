"use client";

import { useSearch } from "@/app/libs/contexts/SearchContext";
import { BiSearch } from "react-icons/bi";

const Search: React.FC = () => {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          w-full
          py-2
          pl-12
          pr-16
          rounded-full
          border
          border-gray-300
          focus:outline-none
          focus:ring-0
          focus:ring-rose-500
          focus:border-rose-500
          text-gray-700
        "
      />
      <BiSearch
        size={20}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default Search;
