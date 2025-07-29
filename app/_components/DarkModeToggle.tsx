"use client";

import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      onClick={toggleDarkMode}
      className="w-14 h-8 flex items-center bg-gradient-to-r from-green-300 to-lime-300 dark:bg-green-900 dark:from-lime-900 dark:to-green-900 shadow-xl rounded-full p-1 cursor-pointer transition-colors duration-300 relative"
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center
        ${darkMode ? "translate-x-6" : "translate-x-0"}`}
      >
        {darkMode ? (
          <MdDarkMode className="text-yellow-400" size={16} />
        ) : (
          <MdLightMode className="text-yellow-400" size={16} />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
