"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/libs/stores/AuthStore";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiLogOut, FiPlusCircle } from "react-icons/fi";
import Avatar from "../Avatar/Avatar";

interface UserMenuProps {
  isMobile?: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ isMobile }) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleCreatePost = () => {
    router.push("/pages/posts/create");
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : ""}`}>
      <div
        className={`flex items-center gap-2 cursor-pointer border rounded-full px-8 py-2 hover:shadow-md transition ${
          isMobile ? "justify-between w-full" : ""
        }`}
        onClick={toggleMenu}
      >
        <Avatar />

        <span className="font-semibold text-gray-400 truncate max-w-[120px]">
          {user.email}
        </span>

        <FiChevronDown size={18} />
      </div>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56 bg-gray-50 shadow-lg rounded-xl border border-gray-200 overflow-hidden z-30 ${
            isMobile ? "relative mt-2 w-full" : ""
          }`}
        >
          {user.role === "professor" && (
            <div
              onClick={handleCreatePost}
              className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 cursor-pointer transition"
            >
              <FiPlusCircle size={16} className="text-gray-800" />
              <span className="text-gray-700">Criar Post</span>
            </div>
          )}
          <div className="border-t border-gray-200"></div>
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 cursor-pointer transition"
          >
            <FiLogOut size={16} className="text-gray-800" />
            <span className="text-gray-700">Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
