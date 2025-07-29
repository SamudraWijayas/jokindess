"use client";

import React from "react";

export default function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-lime-500 opacity-20 blur-3xl"></div>
  );
}
