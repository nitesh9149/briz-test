"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Container from "./container";
import Link from "next/link";
import NavLink from "./nav-link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { DownloadIcon, HamburgerIcon, XIcon } from "./icons";
// import SelectGlobalLanguage from "./language-select"; // disabled: English-only for now
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ScanQrToDownloadDialogContent from "./scan-qr-dialog-content";

type NavbarProps = {
  dict: Dictionary;
  lang: Locale;
};

function Navbar({ dict, lang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, openMenu] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const t = dict.nav;
  const home = `/${lang}`;
  const howItWorks = `/${lang}#how-it-works`;
  const faqs = `/${lang}#faqs`;
  const contactUs = `/${lang}/contact-us`;

  return (
    <Sheet open={isMenuOpen} onOpenChange={openMenu}>
      <nav
        className={cn(
          "sticky top-0 left-0 h-(--navbar-height) bg-surface-dim z-99",
          scrolled && "border-b border-outline",
        )}
      >
        <Container className="relative flex items-center justify-between h-full">
          <div className="lg:w-fit">
            <NavLink href={home} className="w-fit inline-block">
              <Image src="/logo.png" alt="Logo" width={64} height={28} />
            </NavLink>
          </div>
          <ul className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            <li>
              <NavLink href={home} className="font-medium">
                {t.home}
              </NavLink>
            </li>
            <li>
              <NavLink href={howItWorks} className="font-medium">
                {t.howItWorks}
              </NavLink>
            </li>
            <li>
              <NavLink href={faqs} className="font-medium">
                {t.faqs}
              </NavLink>
            </li>

            <li>
              <NavLink href={contactUs} className="font-medium">
                {t.contactUs}
              </NavLink>
            </li>
          </ul>
          <div className="hidden md:flex gap-3">
            {/* <SelectGlobalLanguage dict={dict} lang={lang} /> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <DownloadIcon /> {t.downloadApp}
                </Button>
              </DialogTrigger>
              <ScanQrToDownloadDialogContent dict={dict} />
            </Dialog>
          </div>
          <SheetTrigger className="md:hidden">
            {isMenuOpen ? <XIcon /> : <HamburgerIcon />}
          </SheetTrigger>
        </Container>
      </nav>
      <MobileTabMenu
        dict={dict}
        lang={lang}
        closeMenu={() => openMenu(false)}
      />
    </Sheet>
  );
}

function MobileTabMenu({
  closeMenu,
  dict,
  lang,
}: {
  closeMenu: () => void;
  dict: Dictionary;
  lang: Locale;
}) {
  const t = dict.nav;
  const home = `/${lang}`;
  const howItWorks = `/${lang}#how-it-works`;
  const faqs = `/${lang}#faqs`;
  const contactUs = `/${lang}/contact-us`;

  const downloadAppLink = dict.downloadLinks;

  return (
    <>
      <SheetContent side="top" className="top-20" hideClose>
        <SheetHeader className="w-[90%] sm:w-[95%] mx-auto px-0 space-y-6">
          <SheetTitle className="hidden"></SheetTitle>
          <ul className="space-y-6 mt-8">
            <li>
              <NavLink
                onClick={closeMenu}
                href={home}
                className="font-medium w-full inline-block"
              >
                {t.home}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                href={howItWorks}
                className="font-medium w-full inline-block"
              >
                {t.howItWorks}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                href={faqs}
                className="font-medium w-full inline-block"
              >
                {t.faqs}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={closeMenu}
                href={contactUs}
                className="font-medium w-full inline-block"
              >
                {t.contactUs}
              </NavLink>
            </li>
          </ul>
          <div className="flex flex-col gap-3">
            {/* <SelectGlobalLanguage
              className="bg-surface-container"
              dict={dict}
              lang={lang}
            /> */}
            <Link
              href={downloadAppLink.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full">
                {" "}
                <DownloadIcon /> {t.downloadApp}
              </Button>
            </Link>
          </div>
        </SheetHeader>
      </SheetContent>
    </>
  );
}

export default Navbar;
