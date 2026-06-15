"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that fixes two same-page navigation gaps
 * that plain <Link> leaves:
 *
 *  1. Clicking a link to the route you're already on (e.g. "Home" from the
 *     bottom of the home page) is a no-op in Next.js — here it smooth-scrolls
 *     to the top.
 *  2. Clicking an in-page hash link (e.g. "How it works") when that hash is
 *     already in the URL is also a no-op — here it re-scrolls to the section
 *     every time.
 *
 * It handles these by scrolling manually rather than relying on the router's
 * URL diffing, so behaviour is consistent no matter what the current hash is.
 */
export default function NavLink({ href, onClick, ...props }: NavLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const hrefStr = typeof href === "string" ? href : "";
    if (hrefStr) {
      const [path, hash] = hrefStr.split("#");
      const samePage = path === "" || path === pathname;

      if (samePage) {
        if (hash) {
          // In-page anchor: scroll to the section ourselves so repeat clicks
          // (when the hash is already in the URL) still work.
          const el = document.getElementById(hash);
          if (el) {
            event.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState(null, "", hrefStr);
          }
        } else {
          // Plain route link to the current page: scroll to top and drop any
          // lingering hash so the URL reflects it.
          event.preventDefault();
          if (window.location.hash) {
            window.history.replaceState(null, "", hrefStr);
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }

    onClick?.(event);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
