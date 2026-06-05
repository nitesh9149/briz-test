import Image from "next/image";
import Container from "../components/container";
import {
  HeadingH1,
  HeadingH2,
  HeadingH4,
  TextDefault,
  TextLarge,
  TextMedium,
} from "../components/ui/typography";
import StartConnectingSection from "../components/start-connecting-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const { metaTitle, metaDescription, keywords } = dict.home;
  const url = `/${lang}`;

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName: "Briz",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Briz",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const downloadAppLink = dict.downloadLinks;

  return (
    <main className="space-y-12 md:space-y-24 mb-12 relative scroll-mt-30 overflow-x-hidden">
      {/* Hero Section */}
      <Container>
        <div className="flex flex-col pt-8 md:pt-20 max-w-[864px] mx-auto items-center justify-center gap-4 md:gap-8 text-center">
          {/* <HeadingH6>{dict.hero.tagline}</HeadingH6> */}
          <TextMedium className="text-on-surface flex items-center gap-3">
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
          <HeadingH1 className="pt-4 md:pt-1">
            {dict.hero.titlePart1}{" "}
            <span className="inline-block bg-primary text-surface-dim px-2 py-0.5 rounded-lg -rotate-[3deg]">
              <span className="inline-block rotate-[3deg]">
                {dict.hero.titleHighlight}
              </span>
            </span>{" "}
            {dict.hero.titlePart2}
          </HeadingH1>
          <TextLarge className="text-on-surface">
            {dict.hero.description}
          </TextLarge>

          <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
            <Link href={downloadAppLink.googlePlay}>
              <Image
                src="/google-store.png"
                alt="google store"
                width={169}
                height={50}
                className="h-12 w-auto md:h-[50px]"
              />
            </Link>
            <Link href={downloadAppLink.appStore}>
              <Image
                src="/apple-store.png"
                alt="google store"
                width={149}
                height={50}
                className="h-12 w-auto md:h-[50px]"
              />
            </Link>
          </div>
        </div>
      </Container>

      {/* Video Section */}
      <Container>
        <div className="relative w-full">
          <figure className="relative aspect-55/31 w-full overflow-hidden rounded-3xl border-3 md:border-5 border-icon-hover shadow-[0px_10px_18px_-2px_#0A090B12]">
            <Image
              src="/video-thumbnail.png"
              alt="Video Thumbnail"
              fill
              unoptimized
              className="object-cover"
            />
          </figure>
          <Image
            className="absolute z-10 -top-[35px] md:-top-[105px] -right-[32px] md:-right-[91px] w-[40px] md:w-auto"
            src="/three-yellow-line.png"
            width={68}
            height={114}
            alt="three yellow lines"
          />
        </div>
      </Container>

      {/* seller/customer pov */}
      <Container>
        <div className="space-y-14">
          <HeadingH2 className="text-center">
            {dict.pov.titleLine1} <br />
            <span className="text-primary">{dict.pov.titleLine2}</span>
          </HeadingH2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="p-12 space-y-8 bg-primary-container rounded-t-3xl md:rounded-l-3xl md:rounded-t-none border-b-2 border-outline md:border-b-0">
              <Image
                src="/account-blue.png"
                alt="Account Blue"
                width={64}
                height={64}
              />
              <HeadingH4 as="h3" className="text-primary">
                {dict.pov.customerTitle}
              </HeadingH4>
              <TextLarge className="text-on-surface">
                {dict.pov.customerDescription}
              </TextLarge>
            </div>
            <div className="p-12 space-y-8 bg-error-container rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none md:border-l-2 md:border-outline">
              <Image
                src="/home-red.png"
                alt="Home Red"
                width={64}
                height={64}
              />
              <HeadingH4 as="h3" className="text-error">
                {dict.pov.sellerTitle}
              </HeadingH4>
              <TextLarge className="text-on-surface">
                {dict.pov.sellerDescription}
              </TextLarge>
            </div>
          </div>
        </div>
      </Container>

      {/* request offer */}
      <Container id="how-it-works" className="scroll-mt-30">
        <div className="space-y-14">
          <div className="space-y-6 text-center">
            <HeadingH2>
              {dict.howItWorks.titlePart1}
              <span className="text-primary">
                {" "}
                {dict.howItWorks.titlePart2}
              </span>
            </HeadingH2>
            <TextLarge className="text-on-surface">
              {dict.howItWorks.description}
            </TextLarge>
          </div>
          <div className="space-y-[72px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step1.png"
                  alt={dict.howItWorks.step1Title}
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  {dict.howItWorks.step} 1
                </TextDefault>
                <HeadingH4 as="h3">{dict.howItWorks.step1Title}</HeadingH4>
                <TextMedium className="text-on-surface">
                  {dict.howItWorks.step1Description}
                </TextMedium>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step2.png"
                  alt={dict.howItWorks.step2Title}
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  {dict.howItWorks.step} 2
                </TextDefault>
                <HeadingH4 as="h3">{dict.howItWorks.step2Title}</HeadingH4>
                <TextMedium className="text-on-surface">
                  {dict.howItWorks.step2Description}
                </TextMedium>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step3.png"
                  alt={dict.howItWorks.step3Title}
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  {dict.howItWorks.step} 3
                </TextDefault>
                <HeadingH4 as="h3">{dict.howItWorks.step3Title}</HeadingH4>
                <TextMedium className="text-on-surface">
                  {dict.howItWorks.step3Description}
                </TextMedium>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* start connecting today section */}
      <StartConnectingSection dict={dict} />

      {/* faqs */}
      <Container id="faqs" className="scroll-mt-30">
        <div className="space-y-14">
          <div className="space-y-6 text-center">
            <HeadingH2>{dict.faqsSection.title}</HeadingH2>
            <TextLarge className="text-on-surface">
              {dict.faqsSection.description}
            </TextLarge>
          </div>
          <Accordion
            className="max-w-[800px] mx-auto space-y-4"
            type="single"
            collapsible
          >
            {dict.faqsSection.items.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </main>
  );
}
