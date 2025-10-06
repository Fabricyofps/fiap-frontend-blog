"use client";

import { useState } from "react";
import Container from "../Container/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { HiMenu } from "react-icons/hi";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full bg-white z-30 shadow-md overflow-visible top-0">
      <Container>
        <div className="flex justify-between items-center py-6">
          <Logo />

          <div className="hidden md:flex flex-1 mx-6">
            <Search />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex">
              <UserMenu />
            </div>
            <div className="md:hidden">
              <HiMenu
                size={28}
                className="cursor-pointer text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              />
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            <Search />
            <UserMenu isMobile />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
