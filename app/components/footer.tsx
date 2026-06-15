import Link from "next/link";
import NavLink from "./nav-link";
import Container from "./container";
import Image from "next/image";
import { TextDefault, TextMedium } from "./ui/typography";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from "./icons";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

type FooterProps = {
  dict: Dictionary;
  lang: Locale;
};

function Footer({ dict, lang }: FooterProps) {
  const t = dict.footer;
  const nav = dict.nav;
  const base = `/${lang}`;

  const downloadAppLinks = dict.downloadLinks;

  return (
    <>
      <section className="bg-surface-bright border-y border-outline">
        <Container>
          <div className="py-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-16">
            <div className="col-span-2 md:max-w-[80%]">
              <Link href={base}>
                <Image src="/logo.png" alt="Logo" width={64} height={28} />
              </Link>
              <TextDefault className="text-on-surface mt-4">
                {t.description}
              </TextDefault>
              <ul className="flex items-center gap-6 mt-6">
                <li>
                  <a href={t.facebookLink} aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href={t.instagramLink} aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a href={t.tiktokLink} aria-label="TikTok">
                    <TiktokIcon />
                  </a>
                </li>
                <li>
                  <a href={t.youtubeLink} aria-label="YouTube">
                    <YoutubeIcon />
                  </a>
                </li>
                {/* <li>
                  <a href={t.linkedinLink} aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                </li> */}
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">{t.quickLinks}</TextDefault>
              <ul className="space-y-6">
                <li>
                  <NavLink href={base}>{nav.home}</NavLink>
                </li>
                <li>
                  <Link href={`${base}#how-it-works`}>{nav.howItWorks}</Link>
                </li>
                <li>
                  <Link href={`${base}#faqs`}>{nav.faqs}</Link>
                </li>
                <li>
                  <NavLink href={`${base}/contact-us`}>{nav.contactUs}</NavLink>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">{t.others}</TextDefault>
              <ul className="space-y-6">
                <li>
                  <NavLink href={`${base}/privacy-policy`}>
                    {t.privacyPolicy}
                  </NavLink>
                </li>
                <li>
                  <NavLink href={`${base}/terms-of-use`}>{t.termsOfUse}</NavLink>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">
                {t.downloadAppNow}
              </TextDefault>
              <ul className="space-y-6">
                <li>
                  <Link href={downloadAppLinks.googlePlay}>
                    <figure className="relative w-[140px] md:w-[163px] aspect-27/8">
                      <Image
                        src="/google-store.png"
                        alt="google store"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </figure>
                  </Link>
                </li>
                <li>
                  <Link href={downloadAppLinks.appStore}>
                    <figure className="relative w-[140px] md:w-[163px] aspect-149/50">
                      <Image
                        src="/apple-store.png"
                        alt="apple store"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </figure>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <div className="py-6 bg-surface-bright">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <TextMedium className="text-on-surface flex items-center gap-3 pt-2">
              {dict.hero.tagline}{" "}
              <Link
                href="https://www.karobarapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/karobar.png"
                  alt="Karobar Logo"
                  width={103}
                  height={24}
                  className="inline-block"
                />
              </Link>
            </TextMedium>
            <TextDefault className="text-center">
              {t.copyright.replace(
                "{year}",
                new Date().getFullYear().toString(),
              )}
            </TextDefault>
          </div>
        </Container>
      </div>
    </>
  );
}
export default Footer;
