
"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email & Password Sign In
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setMessage(error.message || "Sign in failed.");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Sign in error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Google sign-in failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Google sign-in failed."
      );

      setGoogleLoading(false);
    }
  };

  return (
    <div className="mt-10 flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
        <fieldset className="fieldset rounded-box border border-base-300 bg-base-200 p-6">
          <legend className="fieldset-legend text-xl">
            Sign In
          </legend>

          {/* Email */}
          <label htmlFor="email" className="label">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="input w-full"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          {/* Password */}
          <label htmlFor="password" className="label mt-3">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="input w-full"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {/* Error Message */}
          {message && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-500"
            >
              {message}
            </p>
          )}

          {/* Email Sign In Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-neutral mt-5 w-full transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <p className="my-2 text-center">OR</p>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="btn w-full bg-amber-800 hover:text-blue-300 disabled:opacity-60"
          >
            {googleLoading
              ? "Connecting to Google..."
              : "Sign in with Google"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInPage;

