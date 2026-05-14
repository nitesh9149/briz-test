import Container from "@/app/components/container";
import { HeadingH1 } from "@/app/components/ui/typography";
import {
  getDictionary,
  hasLocale,
  type Locale,
} from "@/app/[lang]/dictionaries";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return { title: "Terms of Use" };
  const dict = await getDictionary(lang as Locale);
  return { title: dict.termsOfUse.metaTitle };
}

async function TermsOfUsePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const termsOfUseDetail = {
    content: "Terms of use content goes here",
  };
  return (
    <main className="scroll-mt-30">
      <Container>
        <section className="text-center py-16">
          <HeadingH1>{dict.termsOfUse.title}</HeadingH1>
        </section>
        <section>
          <div className="lg:max-w-4xl 2xl:max-w-5xl 2xl:w-[52rem] mx-auto pb-16">
            <TermsOfUseContent content={termsOfUseDetail.content} />
          </div>
        </section>
      </Container>
    </main>
  );
}

function TermsOfUseContent({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="[&>ul]:!bg-tertiary [&>ul]:ml-6 [&>p]:!bg-tertiary [&>h1]:!bg-tertiary [&>h2]:!bg-tertiary  [&>h3]:!bg-tertiary min-h-[200px]"
    ></div>
  );
}

export default TermsOfUsePage;
