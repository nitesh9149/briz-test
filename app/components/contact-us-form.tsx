"use client";

import React, { Fragment, useState } from "react";
import FormGroup from "./ui/form-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TextArea } from "./ui/textarea";

function ContactUsForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);

    const formEl = event.currentTarget;

    const formData = new FormData(formEl);

    console.log("formData", formData, formEl);

    // try {
    //   const data = await sendContactMessage({
    //     params: { language },
    //     payload: {
    //       full_name: formData.get("fullName") as string,
    //       email: formData.get("email") as string,
    //       phone_number: formData.get("phoneNumber") as string,
    //       message: formData.get("message") as string,
    //     },
    //   });

    //   toast.success(data.detail, { position: "bottom-right" });
    //   formEl.reset();
    // } catch (error) {
    // } finally {
    //   setIsPending(false);
    // }
  }

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <FormGroup>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            type="text"
            required
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Phone</Label>
          <Input
            required
            id="phone"
            type="text"
            maxLength={15}
            name="phoneNumber"
            placeholder="Enter your phone number"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            required
            id="message"
            name="message"
            placeholder="Enter your message here"
          />
        </FormGroup>

        <Button disabled={isPending} type="submit">
          Send Message
        </Button>
      </form>
    </Fragment>
  );
}

export default ContactUsForm;
