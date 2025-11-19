import Link from "next/link";
import Container from "./container";
import { HeadingH2, TextDefault, TextMedium } from "./ui/typography";
import Image from "next/image";

function StartConnectingSection() {
  return (
    <Container>
      <div className="rounded-4xl bg-[linear-gradient(108deg,#2F7FEF_3.32%,#3A5CCC_101.69%)] p-4 md:py-24 md:px-[76px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8 order-2 md:order-0">
            <HeadingH2 className="text-on-primary">
              Start connecting today.
            </HeadingH2>
            <TextMedium className="text-on-primary">
              It takes less than 2 minutes to get started — download now and
              grow your local network.
            </TextMedium>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  Instant Connections
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  Real Conversations
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  Faster Deals
                </TextDefault>
              </li>
              <li className="flex gap-4">
                <CheckBadgeIcon />
                <TextDefault className="text-on-primary">
                  Location-Based Matching
                </TextDefault>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-12">
              <Link href="/">
                <Image
                  src="/google-store.png"
                  alt="google store"
                  width={169}
                  height={50}
                />
              </Link>
              <Link href="/">
                <Image
                  src="/apple-store.png"
                  alt="google store"
                  width={149}
                  height={50}
                />
              </Link>
            </div>
          </div>
          <div className="relative md:-mb-24 w-full">
            <Image
              src="/myshop-app-view.png"
              alt="myshop app view"
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
