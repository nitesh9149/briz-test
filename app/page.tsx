import Image from "next/image";
import Container from "./components/container";
import { Button } from "./components/ui/button";
import {
  HeadingH1,
  HeadingH2,
  HeadingH4,
  HeadingH6,
  TextDefault,
  TextLarge,
  TextMedium,
} from "./components/ui/typography";
import StartConnectingSection from "./components/start-connecting-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import ScanQrToDownloadDialogContent from "./components/scan-qr-dialog-content";
import { Dialog, DialogTrigger } from "./components/ui/dialog";

export default function HomePage() {
  return (
    <main className="space-y-12 md:space-y-[96px] mb-12 relative scroll-mt-30 overflow-x-hidden">
      {/* Hero Section */}
      <Container>
        <div className="flex flex-col pt-8 md:pt-[80px] max-w-[864px] mx-auto items-center justify-center gap-4 md:gap-8 text-center">
          <HeadingH6>Discover. Connect. Grow.</HeadingH6>
          <HeadingH1>
            Where{" "}
            <span className="inline-block bg-primary text-surface-dim px-2 py-0.5 rounded-lg -rotate-[3deg]">
              <span className="inline-block rotate-[3deg]">local</span>
            </span>{" "}
            stores meet nearby customers
          </HeadingH1>
          <TextLarge className="text-on-surface">
            We help local sellers and customers find each other through instant
            product requests, offers, and chat, all in one simple app.
          </TextLarge>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Download App</Button>
            </DialogTrigger>
            <ScanQrToDownloadDialogContent />
          </Dialog>
        </div>
      </Container>

      {/* Video Section */}
      <Container>
        <div className="aspect-[55/31] w-full border-[10px] border-icon-hover rounded-3xl relative">
          <figure className="relative w-full h-full ">
            <Image
              src="/video-thumbnail.png"
              alt="Video Thumbnail"
              fill
              className="object-cover rounded-3xl"
            />
            <Image
              className="absolute z-10 top-0 left-0 right-0 bottom-0 m-auto cursor-pointer"
              src="/play-button.png"
              width={80}
              height={80}
              alt="play button"
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
            Local shopping is broken <br />
            <span className="text-primary">we&apos;re fixing it.</span>
          </HeadingH2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="p-12 space-y-8 bg-error-container rounded-t-3xl md:rounded-l-3xl md:rounded-t-none border-b-2 border-outline md:border-b-0">
              <Image
                src="/home-red.png"
                alt="Home Red"
                width={64}
                height={64}
              />
              <HeadingH4 as="h3" className="text-error">
                Seller POV
              </HeadingH4>
              <TextLarge className="text-on-surface">
                Small stores lose visibility as shopping moves online.
              </TextLarge>
            </div>
            <div className="p-12 space-y-8 bg-primary-container rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none md:border-l-2 md:border-outline">
              <Image
                src="/account-blue.png"
                alt="Account Blue"
                width={64}
                height={64}
              />
              <HeadingH4 as="h3" className="text-primary">
                Customer POV
              </HeadingH4>
              <TextLarge className="text-on-surface">
                Buyers struggle to find nearby products they actually need.
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
              Request. Offer.
              <span className="text-primary"> Chat. Order.</span>
            </HeadingH2>
            <TextLarge className="text-on-surface">
              A real-time, human way to shop locally — connecting customers and
              sellers within minutes.
            </TextLarge>
          </div>
          <div className="space-y-[72px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step1.png"
                  alt="Search or Request a Product"
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  Step 1
                </TextDefault>
                <HeadingH4 as="h3">Search or Request a Product</HeadingH4>
                <TextMedium className="text-on-surface">
                  Customers can search for what they need or post a quick
                  request if the item isn’t listed.
                </TextMedium>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step2.png"
                  alt="Nearby Sellers Get Notified"
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  Step 2
                </TextDefault>
                <HeadingH4 as="h3">Nearby Sellers Get Notified</HeadingH4>
                <TextMedium className="text-on-surface">
                  All nearby sellers receive the customer’s request instantly.
                </TextMedium>
                <TextMedium className="text-on-surface">
                  They can view the details — product name, quantity, and price
                  range — and decide whether to respond.
                </TextMedium>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[480px] md:h-[620px] rounded-3xl overflow-hidden">
                <Image
                  src="/step3.png"
                  alt="Chat & Confirm the Order"
                  className="object-cover"
                  fill
                />
              </figure>
              <div className="space-y-4">
                <TextDefault className="text-primary font-bold">
                  Step 3
                </TextDefault>
                <HeadingH4 as="h3">Chat & Confirm the Order</HeadingH4>
                <TextMedium className="text-on-surface">
                  Once both sides agree, they can chat directly to confirm order
                  and get pickup details.
                </TextMedium>
                <TextMedium className="text-on-surface">
                  Everything stays within the app for clarity and trust.
                </TextMedium>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* start connecting today section */}
      <StartConnectingSection />

      {/* faqs */}
      <Container id="faqs" className="scroll-mt-30">
        <div className="space-y-14">
          <div className="space-y-6 text-center">
            <HeadingH2>What is this app about?</HeadingH2>
            <TextLarge className="text-on-surface">
              It’s a local marketplace that connects nearby customers and
              sellers. Customers can request products, and sellers can offer
              prices, chat, and complete orders — all in one app.
            </TextLarge>
          </div>
          <Accordion
            className="max-w-[800px] mx-auto space-y-4"
            type="single"
            collapsible
          >
            {faqs.map((faq) => (
              <AccordionItem key={faq.idx} value={`item-${faq.idx}`}>
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

const faqs = [
  {
    idx: "1",
    question: "What is this app about?",
    answer:
      "It’s a local marketplace that connects nearby customers and sellers. Customers can request products, and sellers can offer prices, chat, and complete orders - all in one app.",
  },
  {
    idx: "2",
    question: "Who can use this app?",
    answer:
      "Anyone who wants to buy or sell products locally can use the app. Customers looking for the best price nearby Sellers/shops who want to receive more local orders You just need a phone, internet connection, and verified account.",
  },
  {
    idx: "3",
    question: "Is the app free to use?",
    answer:
      "Yes. The app is completely free for both customers and sellers. There are no signup fees, no commissions, and no hidden charges.",
  },
  {
    idx: "4",
    question: "How do I get started as a seller?",
    answer:
      "Sign up using your phone or Google account Switch to Seller Mode Complete your seller profile (shop name, address, products you sell) Turn on location and notification access (both are mandatory) Start receiving product requests from nearby customers",
  },
  {
    idx: "5",
    question: "How do I request a product as a customer?",
    answer:
      "Sign up and stay in Customer Mode Go to “Request a Product” Enter what you need, upload photos (optional), and set quantity Nearby sellers will send you offers Compare prices and accept the best offer",
  },
  {
    idx: "6",
    question: "Can I switch between seller and customer roles?",
    answer:
      "Yes. You can switch anytime. Just use the Seller/Customer toggle in the profile section. Your data, chats, and orders will remain separate for each role.",
  },
  {
    idx: "7",
    question: "What happens if I don’t find the product I’m looking for?",
    answer:
      "If no seller responds: Your request will remain active until it expires You can edit, extend, or repost the request You’ll get notified immediately if a seller sends an offer later This ensures you don’t miss any new responses.",
  },
  {
    idx: "8",
    question: "How do I contact support?",
    answer:
      "You can contact support through: In-app Help Center Or by emailing us at support@myshop.com (placeholder; replace with real email) Our team responds as soon as possible and is available for both customer and seller issues.",
  },
];
