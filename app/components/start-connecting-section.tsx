import Link from "next/link";
import Container from "./container";
import { HeadingH2, TextDefault, TextMedium } from "./ui/typography";
import Image from "next/image";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  dict: Dictionary;
};

function StartConnectingSection({ dict }: Props) {
  const t = dict.productShowcaseCard;
  const downloadAppLinks = dict.downloadLinks;

  return (
    <Container>
      <div className="rounded-4xl bg-[linear-gradient(108deg,#2F7FEF_3.32%,#3A5CCC_101.69%)] p-8 md:py-24 md:px-[76px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 order-2 md:order-0">
            <HeadingH2 className="text-on-primary">{t.title}</HeadingH2>
            <TextMedium className="text-on-primary">{t.description}</TextMedium>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  {t.cardlist1}
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  {t.cardlist2}
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  {t.cardlist3}
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  {t.cardlist4}
                </TextDefault>
              </li>
            </ul>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-12">
              <Link href={downloadAppLinks.googlePlay} target="_blank" rel="noopener noreferrer">
                <Image
                  src="/google-store.png"
                  alt="google store"
                  width={169}
                  height={50}
                  className="h-12 w-auto md:h-[50px]"
                />
              </Link>
              <Link href={downloadAppLinks.appStore} target="_blank" rel="noopener noreferrer">
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
          <div className="relative md:-mb-24 w-full">
            <Image
              src="/myshop-app-view.png"
              alt="Briz app view"
              width={600}
              height={520}
              className="md:absolute bottom-0 right-0 aspect-[15/13] -mr-[76px] xl:w-[530px]"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const CheckBadgeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
  >
    <rect width="26" height="26" fill="#fff" fillOpacity="0.2" rx="13"></rect>
    <path
      fill="#fff"
      d="m11.5 15.38 6.894-6.896 1.06 1.06L11.5 17.5l-4.773-4.773 1.06-1.06z"
    ></path>
  </svg>
);

export default StartConnectingSection;
