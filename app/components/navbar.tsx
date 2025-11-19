"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { HamburgerIcon, XIcon } from "./icons";
import SelectGlobalLanguage from "./language-select";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <Sheet open={isMenuOpen} onOpenChange={openMenu}>
      <nav
        className={cn(
          "sticky top-0 left-0 h-[var(--navbar-height)] bg-surface-dim z-[99]",
          scrolled && "border-b border-outline"
        )}
      >
        <Container className="flex items-center justify-between h-full">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={108} height={36} />
          </Link>
          <ul className="hidden md:flex gap-8">
            <li>
              <Link href="/" className="font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="font-medium">
                How it Works
              </Link>
            </li>
            <li>
              <Link href="/#faqs" className="font-medium">
                FAQs
              </Link>
            </li>

            <li>
              <Link href="/contact-us" className="font-medium">
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="hidden md:flex gap-3">
            <SelectGlobalLanguage />
            <Button intent="neutralAccent">Download App</Button>
          </div>
          <SheetTrigger className="md:hidden">
            {isMenuOpen ? <XIcon /> : <HamburgerIcon />}
          </SheetTrigger>
        </Container>
      </nav>
      <MobileTabMenu closeMenu={() => openMenu(false)} />
    </Sheet>
  );
}

function MobileTabMenu({ closeMenu }: { closeMenu: () => void }) {
  return (
    <>
      <SheetContent side="top" className="top-20" hideClose>
        <SheetHeader className="w-[90%] sm:w-[95%] mx-auto px-0 space-y-6">
          <SheetTitle className="hidden"></SheetTitle>
          <ul className="space-y-6">
            <li>
              <Link onClick={closeMenu} href="/" className="font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/#how-it-works"
                className="font-medium"
              >
                How it Works
              </Link>
            </li>
            <li>
              <Link onClick={closeMenu} href="/#faqs" className="font-medium">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                onClick={closeMenu}
                href="/contact-us"
                className="font-medium"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            <SelectGlobalLanguage className="bg-surface-container" />
            <Button> Download App</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </>
  );
}

export default Navbar;
