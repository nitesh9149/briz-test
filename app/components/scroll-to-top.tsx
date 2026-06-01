"use client";

import { useEffect } from "react";

/**
 * Forces the window to the top when the page it's rendered on mounts.
 * Useful when navigating in from a scrolled position (e.g. the navbar link
 * clicked while scrolled down the home page).
 */
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;
