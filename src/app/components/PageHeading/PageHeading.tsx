"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

interface PageHeadingProps {
  title: string;
  description?: string;
  breadcrumb?: boolean;
}

const PageHeading: FC<PageHeadingProps> = ({
  title,
  description,
  breadcrumb = true,
}) => {
  const pathname = usePathname();

  let parts = pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));

  parts = parts.filter(
    (part) =>
      !/^[0-9a-fA-F-]{6,}$/.test(part) &&
      !/^\d+$/.test(part) &&
      part !== "edit" &&
      part !== "create"
  );

  return (
    <div className="w-full mb-6 pb-4">
      {breadcrumb && parts.length > 0 && (
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
          {parts.map((part, index) => (
            <div key={index} className="flex items-center gap-1 capitalize">
              <span>{part}</span>
              {index < parts.length - 1 && (
                <FiChevronRight size={14} className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
      )}

      <h1 className="text-3xl pt-2 font-bold text-gray-800">{title}</h1>

      {description && (
        <p className="text-gray-500 mt-1 text-md">{description}</p>
      )}
    </div>
  );
};

export default PageHeading;
