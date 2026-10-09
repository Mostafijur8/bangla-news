import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-red-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl sm:p-12">
        {/* 404 Illustration */}
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
          <span className="text-5xl font-extrabold tracking-tight text-red-600">
            404
          </span>
          <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 ring-4 ring-white" />
        </div>

        {/* Heading */}
        <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-red-600">
          Page Not Found
        </p>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-slate-500 sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে, ঠিকানা পরিবর্তন হয়েছে অথবা
          লিংকটি ভুল।
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200"
          >
            ← হোম পেজে ফিরে যান
          </Link>

          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
          >
            সব খবর দেখুন
          </Link>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-5">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Bangla News
          </p>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
