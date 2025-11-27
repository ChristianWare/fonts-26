"use client";

import React from "react";
import ReactLenis from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }) {
  return <ReactLenis root>{children}</ReactLenis>;
}
