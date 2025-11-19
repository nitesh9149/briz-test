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
              <HeadingH4 className="text-error">Seller POV</HeadingH4>
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
              <HeadingH4 className="text-primary">Customer POV</HeadingH4>
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
              <figure className="relative w-full h-[620px] rounded-3xl overflow-hidden">
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
                <HeadingH4>Search or Request a Product</HeadingH4>
                <TextMedium className="text-on-surface">
                  Customers can search for what they need or post a quick
                  request if the item isn’t listed.
                </TextMedium>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
              <figure className="relative w-full h-[620px] rounded-3xl overflow-hidden">
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
                <HeadingH4>Nearby Sellers Get Notified</HeadingH4>
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
              <figure className="relative w-full h-[620px] rounded-3xl overflow-hidden">
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
                <HeadingH4>Chat & Confirm the Order</HeadingH4>
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
            <HeadingH2>Questions? We&apos;ve got answers.</HeadingH2>
            <TextLarge className="text-on-surface">
              Here are some of the most common questions people ask before
              getting started.
            </TextLarge>
          </div>
          <Accordion
            className="max-w-[800px] mx-auto space-y-4"
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Question goes here</AccordionTrigger>
              <AccordionContent>
                Our products are crafted using high-quality, authentic
                materials, including natural Rudraksha beads, energized
                gemstones, sacred Shaligrams, and handcrafted malas. Every item
                is designed with devotion and care.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Question goes here</AccordionTrigger>
              <AccordionContent>
                Our products are crafted using high-quality, authentic
                materials, including natural Rudraksha beads, energized
                gemstones, sacred Shaligrams, and handcrafted malas. Every item
                is designed with devotion and care.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Question goes here</AccordionTrigger>
              <AccordionContent>
                Our products are crafted using high-quality, authentic
                materials, including natural Rudraksha beads, energized
                gemstones, sacred Shaligrams, and handcrafted malas. Every item
                is designed with devotion and care.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Question goes here</AccordionTrigger>
              <AccordionContent>
                Our products are crafted using high-quality, authentic
                materials, including natural Rudraksha beads, energized
                gemstones, sacred Shaligrams, and handcrafted malas. Every item
                is designed with devotion and care.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Container>
      
    </main>
  );
}
