import { Button } from "@/components/ui/button";
import React from "react";

export const HeroSection = () => {
  return (
    <section className="bg-blue-500 text-white py-20 mt-3">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find the Best Course for You
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Discover a wide variety of courses to enhance your skills and achieve
          your goals.
        </p>
        <form
          action=""
          className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden max-w-xl mx-auto"
          aria-label="Search Courses"
        >
          <input
            type="text"
            placeholder="Search for courses..."
            className="flex-grow px-4 py-2 rounded-full text-gray-700 focus:outline-none"
          />
          <Button className="bg-blue-600 dark:bg-blue-800 rounded-full px-6 py-2 text-white hover:bg-blue-700 transition">
            Search
          </Button>
        </form>
      </div>
    </section>
  );
};
