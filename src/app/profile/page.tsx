
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Profile = () => {
  const { data: session, isPending } = authClient.useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const user = session?.user;

  // Start editing
  const handleEdit = () => {
    setEditName(user?.name || "");
    setMessage("");
    setIsEditing(true);
  };

  // Update profile name
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = editName.trim();

    if (!name) {
      setMessageType("error");
      setMessage("নাম লিখুন।");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        setMessageType("error");
        setMessage(error.message || "Profile update failed.");
        return;
      }

      setMessageType("success");
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে!");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      setMessageType("error");
      setMessage("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/signin";
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-red-600" />
      </div>
    );
  }

  if (!session || !user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Please Sign In
        </h1>

        <p className="mt-2 text-gray-500">
          আপনার Profile দেখতে প্রথমে Sign In করুন।
        </p>

        <Link
          href="/signin"
          className="btn mt-5 bg-red-600 text-white hover:bg-red-700"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>
          <p className="mt-2 text-gray-500">
            আপনার account information দেখুন ও পরিবর্তন করুন।
          </p>
        </div>

        {/* Profile Card */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-md">
          {/* Cover */}
          <div className="h-36 bg-gradient-to-r from-red-700 to-red-500" />

          <div className="px-6 pb-8">
            {/* User Info */}
            <div className="-mt-14 flex flex-col items-center sm:flex-row sm:items-end sm:gap-5">
              {/* Profile Picture */}
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "Profile"}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-red-600">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                )}
              </div>

              <div className="mt-3 text-center sm:mb-2 sm:mt-0 sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name || "User"}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Status Message */}
            {message && (
              <p
                role="status"
                className={`mt-5 rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            {/* Account Details */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  Account Information
                </h3>

                {!isEditing && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="btn btn-sm border-none bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Edit Form */}
              {isEditing && (
                <form onSubmit={handleSave} className="mb-5 space-y-3">
                  <label
                    htmlFor="editName"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    আপনার নাম
                  </label>

                  <input
                    id="editName"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    maxLength={100}
                    required
                    autoComplete="name"
                    className="input w-full border-gray-300 bg-white text-gray-800"
                  />

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={saving || !editName.trim()}
                      className="btn border-none bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user.name || "");
                        setMessage("");
                      }}
                      className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="mt-1 font-semibold text-gray-800">
                    {user.name || "Not provided"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="mt-1 break-all font-semibold text-gray-800">
                    {user.email}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Email Verification
                  </p>
                  <p
                    className={`mt-1 font-semibold ${
                      user.emailVerified
                        ? "text-green-600"
                        : "text-amber-600"
                    }`}
                  >
                    {user.emailVerified ? "Verified" : "Not Verified"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">User ID</p>
                  <p className="mt-1 break-all font-mono text-sm text-gray-700">
                    {user.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleSignOut}
                className="btn border-none bg-red-600 text-white hover:bg-red-700"
              >
                Sign Out
              </button>

              <Link
                href="/"
                className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Profile;
