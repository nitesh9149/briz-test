import Container from "@/app/components/container";
import { HeadingH2 } from "@/app/components/ui/typography";
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
  if (!hasLocale(lang)) return { title: "Delete Account" };
  const dict = await getDictionary(lang as Locale);
  return { title: dict.deleteAccount.metaTitle };
}

async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.deleteAccount;

  return (
    <main className="scroll-mt-30">
      <Container>
        <div className="lg:max-w-4xl 2xl:max-w-5xl 2xl:w-208 mx-auto py-16">
          <HeadingH2 className="mb-8">{t.title}</HeadingH2>
          <DeleteAccountContent content={t.content} />
        </div>
      </Container>
    </main>
  );
}

function DeleteAccountContent({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="[&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_li]:mb-2 [&_li]:leading-relaxed [&_a]:text-primary [&_a]:font-semibold [&_a]:break-words [&_a]:hover:underline"
    ></div>
  );
}

export default DeleteAccountPage;
