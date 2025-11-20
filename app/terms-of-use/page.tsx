import Container from "@/app/components/container";
import { HeadingH1 } from "@/app/components/ui/typography";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Use",
  };
}
function TermsOfUsePage() {
  const termsOfUseDetail = {
    content: "Terms of use content goes here",
  };
  return (
    <main className="scroll-mt-30">
      <Container>
        <section className="text-center py-16">
          <HeadingH1>Terms of Use</HeadingH1>
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
      className="[&>ul]:!bg-tertiary [&>ul]:ml-6 [&>p]:!bg-tertiary [&>h1]:!bg-tertiary [&>h2]:!bg-tertiary  [&>h3]:!bg-tertiary"
    ></div>
  );
}

export default TermsOfUsePage;
