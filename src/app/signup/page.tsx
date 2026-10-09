
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Email Sign Up
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setMessage("Please enter a valid email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name: email.split("@")[0],
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Signup failed!");
        return;
      }

      if (data) {
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google Sign Up
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setMessage("");

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setMessage(error.message || "Google sign-in failed!");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Google sign-in failed!"
      );

      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form ref={formRef} onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6">
          <legend className="fieldset-legend text-lg">
            Create Account
          </legend>

          <label htmlFor="email" className="label">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <label htmlFor="password" className="label">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            className="input w-full"
            placeholder="Password (minimum 8 characters)"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="btn btn-neutral mt-4 w-full hover:text-red-700"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center my-2">OR</p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="btn bg-amber-800 hover:text-blue-300 w-full"
          >
            {googleLoading
              ? "Connecting to Google..."
              : "Sign Up with Google"}
          </button>

          {message && (
            <p className="mt-3 text-center text-sm" role="status">
              {message}
            </p>
          )}
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;

