import { notFound } from "next/navigation";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import {
  getDictionary,
  hasLocale,
  locales,
  type Locale,
} from "./dictionaries";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Navbar dict={dict} lang={lang as Locale} />
      {children}
      <Footer dict={dict} lang={lang as Locale} />
      {/* Set the document language without remounting the html element */}
      <SetHtmlLang lang={lang} />
    </>
  );
}

function SetHtmlLang({ lang }: { lang: string }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
      }}
    />
  );
}
