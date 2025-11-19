import { Metadata } from "next";
import ContactUsForm from "../components/contact-us-form";
import Container from "../components/container";
import { EmailIconFill, MapIconFill, PhoneIconFill } from "../components/icons";
import StartConnectingSection from "../components/start-connecting-section";
import {
  HeadingH1,
  HeadingH5,
  TextLarge,
  TextMedium,
  TextSmall,
} from "../components/ui/typography";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactUsPage() {
  return (
    <Container>
      <div className="text-center py-16 space-y-6">
        <HeadingH1>
          Need Help with the <span className="text-primary">App</span>?
        </HeadingH1>
        <TextLarge className="text-on-surface">
          We’d love to hear from you. Whether you’re a customer or seller, our
          team is here to help.
        </TextLarge>
      </div>
      <div className="grid md:grid-cols-2 mb-16 gap-12">
        <ul className="space-y-11">
          <li className="flex gap-3">
            <PhoneIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">Support Number</TextSmall>
              <a
                className="text-on-surface-variant font-bold text-lg"
                href="tel:+"
              >
                +977-9813496809, 01-4115272
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <EmailIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">Support Email</TextSmall>
              <a
                className="text-on-surface-variant font-bold text-lg"
                href="mailto:support@bytecommerce.com"
              >
                support@bytecommerce.com
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapIconFill />
            <div className="space-y-1">
              <TextSmall className="text-on-surface">
                WhatsApp Live Chat
              </TextSmall>
              <TextMedium className="font-bold">
                Jawalakhel, Lalitpur
              </TextMedium>
            </div>
          </li>
        </ul>
        <div className="flex flex-col gap-6">
          <HeadingH5>Send Us a Message</HeadingH5>
          <ContactUsForm />
        </div>
      </div>

      {/* start connecting today section */}
      <div className="py-8">
        <StartConnectingSection />
      </div>
    </Container>
  );
}
