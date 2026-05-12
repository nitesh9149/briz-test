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
  if (!hasLocale(lang)) return { title: "Privacy Policy" };
  const dict = await getDictionary(lang as Locale);
  return { title: dict.privacyPolicy.metaTitle };
}

async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  const privacyPolicyDetail = {
    content: "Privacy policy content goes here",
  };
  return (
    <main className="scroll-mt-30">
      <Container>
        <section className="text-center py-16">
          <HeadingH1>{dict.privacyPolicy.title}</HeadingH1>
        </section>
        <section>
          <div className="lg:max-w-4xl 2xl:max-w-5xl 2xl:w-208 mx-auto pb-16">
            <PrivacyPolicyContent content={privacyPolicyDetail.content} />
          </div>
        </section>
      </Container>
    </main>
  );
}

function PrivacyPolicyContent({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="[&>ul]:!bg-tertiary [&>ul]:ml-6 [&>p]:!bg-tertiary [&>h1]:!bg-tertiary [&>h2]:!bg-tertiary  [&>h3]:!bg-tertiary min-h-[200px]"
    ></div>
  );
}

export default PrivacyPolicyPage;
