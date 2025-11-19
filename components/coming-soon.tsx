import React from "react";

const ComingSoon = () => {
  return (
    <div className="max-w-2xl w-full text-center space-y-8">
      {/* Main heading */}
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold text-primary/90 dark:text-primary/80">
          Coming Soon
        </h1>
        <div className="h-1 w-24 bg-primary/60 mx-auto rounded-full"></div>
      </div>

      {/* Subheading */}
      <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
        We're working hard to bring you something amazing.
      </p>

      {/* Description */}
      <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-500 max-w-xl mx-auto">
        This page is currently under construction. Check back soon to discover
        what we have in store for you.
      </p>

      {/* Decorative elements */}
      <div className="flex items-center justify-center gap-2 pt-8">
        <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse delay-150"></div>
        <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Optional notification section */}
      {/* <div className="pt-8">
      <p className="text-sm text-zinc-500 dark:text-zinc-600 mb-4">
        Want to be notified when we launch?
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg border border-primary/30 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <button className="px-6 py-3 bg-primary/90 hover:bg-primary text-white rounded-lg font-medium transition-colors duration-200">
          Notify Me
        </button>
      </div>
    </div> */}
    </div>
  );
};

export default ComingSoon;
