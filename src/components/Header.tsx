
import Image from "next/image";
import React from "react";
import Navlinks from "./Navlinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-700 bg-gray-900 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo & Website Info */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 overflow-hidden rounded-xl border border-gray-600 bg-white p-1 shadow-sm">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="বাংলা নিউজ"
                width={52}
                height={52}
                className="h-11 w-11 object-contain sm:h-13 sm:w-13"
              />
            </Link>
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-white sm:text-2xl">
              বাংলা নিউজ
            </h1>

            <p className="mt-0.5 text-xs text-gray-300 sm:text-sm">
              {date}
            </p>
          </div>
        </div>

        {/* Authentication Buttons */}
        <UserInfo/>
      
      </div>

      {/* Navbar */}
      <Navlinks />
    </header>
  );
};

export default Header;

