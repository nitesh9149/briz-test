import { Metadata } from "next";
import ContactUsForm from "@/app/components/contact-us-form";
import Container from "@/app/components/container";
import {
  EmailIconFill,
  MapIconFill,
  PhoneIconFill,
} from "@/app/components/icons";
import StartConnectingSection from "@/app/components/start-connecting-section";
import {
  HeadingH1,
  HeadingH5,
  TextLarge,
  TextMedium,
  TextSmall,
} from "@/app/components/ui/typography";
import {
  getDictionary,
  hasLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return { title: "Contact us" };
  const dict = await getDictionary(lang as Locale);
  const { metaTitle, metaDescription } = dict.contactUs;
  const url = `/${lang}/contact-us`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${metaTitle} | Briz`,
      description: metaDescription,
      url,
      siteName: "Briz",
      type: "website",
      images: [{ url: "/video-thumbnail.png", alt: "Briz" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} | Briz`,
      description: metaDescription,
      images: ["/video-thumbnail.png"],
    },
  };
}

export default async function ContactUsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.contactUs;

  return (
    <Container>
      <div className="text-center py-16 space-y-6">
        <HeadingH1 className="text-primary">
          {t.headingPart1}{" "}
          <span className="text-on-surface-variant">
            {t.headingHighlight} {t.headingSuffix}
          </span>
        </HeadingH1>
        <TextLarge className="text-on-surface">{t.description}</TextLarge>
      </div>
      <div className="grid md:grid-cols-2 mb-16 gap-12">
        <ul className="space-y-11">
          <li className="flex gap-3">
            <PhoneIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">
                {t.supportNumber}
              </TextSmall>
              <a
                className="text-on-surface-variant font-bold text-lg"
                href="tel:9761812176"
              >
                +977 9761812176
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <EmailIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">
                {t.supportEmail}
              </TextSmall>
              <a
                className="text-on-surface-variant font-bold text-lg"
                href="mailto:contact@brizmarket.com"
              >
                contact@brizmarket.com
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">
                {t.addressTitle}
              </TextSmall>
              <TextMedium className="font-bold">Bagdol, Lalitpur</TextMedium>
            </div>
          </li>
        </ul>
        <div className="flex flex-col gap-6">
          <HeadingH5>{t.sendUsAMessage}</HeadingH5>
          <ContactUsForm dict={dict} />
        </div>
      </div>

      {/* start connecting today section */}
      <div className="py-8">
        <StartConnectingSection dict={dict} />
      </div>
    </Container>
  );
}
