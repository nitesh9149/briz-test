"use client";

import React, { Fragment, useState } from "react";
import FormGroup from "./ui/form-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TextArea } from "./ui/textarea";
import { sendContactMessage } from "../api";
import toast, { Toaster } from "react-hot-toast";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function ContactUsForm({ dict }: { dict: Dictionary }) {
  const [isPending, setIsPending] = useState(false);
  const t = dict.contactUs.form;

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);

    const formEl = event.currentTarget;

    const formData = new FormData(formEl);

    try {
      const data = await sendContactMessage({
        payload: {
          full_name: formData.get("fullName") as string,
          email: formData.get("email") as string,
          phone_number: formData.get("phoneNumber") as string,
          message: formData.get("message") as string,
        },
      });

      console.log("data", data);

      toast.success(t.successMessage, { position: "bottom-right" });
      formEl.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <FormGroup>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            type="text"
            required
            id="fullName"
            name="fullName"
            placeholder={t.fullNamePlaceholder}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            required
            id="phone"
            type="text"
            maxLength={15}
            name="phoneNumber"
            placeholder={t.phonePlaceholder}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">{t.message}</Label>
          <TextArea
            required
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
          />
        </FormGroup>

        <Button disabled={isPending} type="submit">
          {t.sendMessage}
        </Button>
      </form>
      <Toaster />
    </Fragment>
  );
}

export default ContactUsForm;
