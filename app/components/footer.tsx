import Link from "next/link";
import Container from "./container";
import Image from "next/image";
import { TextDefault } from "./ui/typography";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  YoutubeIcon,
} from "./icons";

function Footer() {
  return (
    <>
      <section className="bg-surface-bright border-y border-outline">
        <Container>
          <div className="py-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-16">
            <div className="col-span-2 md:max-w-[80%]">
              <Link href="/">
                <Image src="/logo.png" alt="Logo" width={108} height={36} />
              </Link>
              <TextDefault className="text-on-surface mt-4">
                A local marketplace connecting customers and sellers in real
                time — request, chat, and shop instantly.
              </TextDefault>
              <ul className="flex items-center gap-6 mt-6">
                <li>
                  <a href="#" aria-label="Facebook">
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="TikTok">
                    <TiktokIcon />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="YouTube">
                    <YoutubeIcon />
                  </a>
                </li>
                <li>
                  <a href="#" aria-label="LinkedIn">
                    <LinkedinIcon />
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">Quick Links</TextDefault>
              <ul className="space-y-6">
                <li>
                  <Link href="#">Home</Link>
                </li>
                <li>
                  <Link href="/#how-it-works">How it Works</Link>
                </li>
                <li>
                  <Link href="/#faqs">FAQs</Link>
                </li>
                <li>
                  <Link href="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">Others</TextDefault>
              <ul className="space-y-6">
                <li>
                  <Link href="/pages/terms-of-use">Terms of Use</Link>
                </li>
                <li>
                  <Link href="/pages/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <TextDefault className="font-bold">Download App Now</TextDefault>
              <ul className="space-y-6">
                <li>
                  <Link href="/">
                    <figure className="relative w-[163px] h-12">
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
                  <Link href="/">
                    <figure className="relative w-[163px] h-12">
                      <Image
                        src="/apple-store.png"
                        alt="google store"
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
          <TextDefault className="text-center">
            © 2025 myShop. All rights reserved.
          </TextDefault>
        </Container>
      </div>
    </>
  );
}
export default Footer;
