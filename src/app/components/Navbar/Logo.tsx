"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/pages/home")}
      alt="Logo"
      className="hidden md:block cursor-pointer"
      height={120}
      width={170}
      src="/static/images/Logo.png"
      loading="eager"
      priority={true}
    />
  );
};

export default Logo;
