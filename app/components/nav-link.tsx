"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in replacement for next/link that scrolls to the top of the page when
 * the user clicks it while already on the destination route. Next.js does
 * nothing in that case (no navigation occurs), so without this a "Home" click
 * from the bottom of the home page would leave the user where they are.
 *
 * In-page hash links (e.g. "#faqs") are left untouched so anchor scrolling
 * keeps working.
 */
export default function NavLink({ href, onClick, ...props }: NavLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const hrefStr = typeof href === "string" ? href : "";
    const isHashLink = hrefStr.includes("#");

    if (!isHashLink && hrefStr && pathname === hrefStr) {
      event.preventDefault();
      // Drop any lingering hash (e.g. "#how-it-works") so the URL reflects
      // the top of the page.
      if (window.location.hash) {
        window.history.replaceState(null, "", hrefStr);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onClick?.(event);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
