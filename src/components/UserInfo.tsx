"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {user ? (
        <div className="flex shrink-0 items-center gap-3">
          {/* Profile Picture */}
          <Link href="/profile">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                className="h-10 w-10 rounded-full border-2 border-white object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </Link>

          {/* Gmail Name */}
          <Link
            href="/profile"
            className="max-w-32 truncate text-sm font-semibold text-white sm:max-w-none"
          >
            {user.name || user.email}
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-gray-500 bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="rounded-lg border border-gray-500 px-3 py-2 text-sm font-semibold text-white transition hover:border-blue-400 hover:bg-gray-800 hover:text-blue-400 sm:px-5"
          >
            লগইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md sm:px-5"
          >
            রেজিস্ট্রেশন
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
