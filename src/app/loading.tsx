import React from "react";

const Loading = () => {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="h-8 w-48 rounded-lg bg-gray-200 sm:w-64" />
            <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-200" />
          </div>

          <div className="hidden h-10 w-28 rounded-xl bg-gray-200 sm:block" />
        </div>

        {/* Featured News Skeleton */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="aspect-video overflow-hidden rounded-2xl bg-gray-200" />

          <div className="flex flex-col justify-center">
            <div className="h-6 w-24 rounded-full bg-red-100" />
            <div className="mt-5 h-8 w-full rounded-lg bg-gray-200" />
            <div className="mt-3 h-8 w-4/5 rounded-lg bg-gray-200" />
            <div className="mt-5 h-4 w-full rounded bg-gray-200" />
            <div className="mt-3 h-4 w-11/12 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-2/3 rounded bg-gray-200" />
            <div className="mt-6 h-10 w-36 rounded-xl bg-gray-200" />
          </div>
        </section>

        {/* Section Heading */}
        <div className="mt-12 flex items-center gap-3">
          <div className="h-7 w-1.5 rounded-full bg-red-500" />
          <div className="h-7 w-40 rounded-lg bg-gray-200" />
        </div>

        {/* News Cards */}
        <section className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="aspect-video bg-gray-200" />

              <div className="p-5">
                <div className="h-4 w-20 rounded-full bg-red-100" />
                <div className="mt-4 h-5 w-full rounded bg-gray-200" />
                <div className="mt-3 h-5 w-4/5 rounded bg-gray-200" />
                <div className="mt-5 h-3 w-2/3 rounded bg-gray-200" />
              </div>
            </article>
          ))}
        </section>

        

        {/* Loading Indicator */}
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />

          <p className="mt-4 text-sm font-semibold text-gray-600">
            সর্বশেষ সংবাদ লোড হচ্ছে...
          </p>
          <p className="mt-1 text-xs text-gray-400">অনুগ্রহ করে অপেক্ষা করুন</p>
        </div>
      </div>
    </main>

  );
};

export default Loading;
