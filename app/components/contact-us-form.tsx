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

type FieldErrors = Partial<Record<string, string>>;

// Maps the API's field names to the form input `name` attributes.
const API_FIELD_TO_NAME: Record<string, string> = {
  full_name: "fullName",
  email: "email",
  phone_number: "phoneNumber",
  message: "message",
};

function firstMessage(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  return undefined;
}

function parseApiErrors(error: unknown): {
  fields: FieldErrors;
  general?: string;
} {
  const fields: FieldErrors = {};
  let general: string | undefined;

  const data =
    error && typeof error === "object"
      ? (error as { data?: unknown }).data
      : undefined;

  // The field map may be the body itself or nested under `detail`.
  let source: unknown = data;
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail?: unknown }).detail;
    if (typeof detail === "string") general = detail;
    else source = detail;
  }

  if (source && typeof source === "object" && !Array.isArray(source)) {
    for (const [key, value] of Object.entries(
      source as Record<string, unknown>
    )) {
      const msg = firstMessage(value);
      if (!msg) continue;
      if (key === "non_field_errors") general = general ?? msg;
      else fields[API_FIELD_TO_NAME[key] ?? key] = msg;
    }
  }

  return { fields, general };
}

function ContactUsForm({ dict }: { dict: Dictionary }) {
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const t = dict.contactUs.form;

  function clearFieldError(name: string) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  // Phone number may only contain a plus sign, digits and spaces.
  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const sanitized = event.target.value.replace(/[^\d+ ]/g, "");
    if (sanitized !== event.target.value) {
      event.target.value = sanitized;
    }
    clearFieldError("phoneNumber");
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);

    const payload = {
      full_name: ((formData.get("fullName") as string) ?? "").trim(),
      email: ((formData.get("email") as string) ?? "").trim(),
      phone_number: ((formData.get("phoneNumber") as string) ?? "").trim(),
      message: ((formData.get("message") as string) ?? "").trim(),
    };

    // Client-side required validation — show inline errors for any empty field.
    const nextErrors: FieldErrors = {};
    if (!payload.full_name) nextErrors.fullName = t.requiredError;
    if (!payload.email) nextErrors.email = t.requiredError;
    if (!payload.phone_number) nextErrors.phoneNumber = t.requiredError;
    if (!payload.message) nextErrors.message = t.requiredError;
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsPending(true);
    setErrors({});

    try {
      await sendContactMessage({ payload });

      toast.success(t.successMessage, { position: "bottom-right" });
      formEl.reset();
    } catch (error) {
      const { fields, general } = parseApiErrors(error);
      setErrors(fields);
      const summary = general ?? Object.values(fields)[0] ?? t.errorMessage;
      toast.error(summary, { position: "bottom-right" });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Fragment>
      <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
        <FormGroup>
          <Label htmlFor="fullName">{t.fullName}</Label>
          <Input
            type="text"
            required
            id="fullName"
            name="fullName"
            placeholder={t.fullNamePlaceholder}
            aria-invalid={!!errors.fullName}
            onChange={() => clearFieldError("fullName")}
          />
          {errors.fullName && (
            <p className="text-error text-sm">{errors.fullName}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">{t.email}</Label>
          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder={t.emailPlaceholder}
            aria-invalid={!!errors.email}
            onChange={() => clearFieldError("email")}
          />
          {errors.email && <p className="text-error text-sm">{errors.email}</p>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">{t.phone}</Label>
          <Input
            required
            id="phone"
            type="text"
            inputMode="tel"
            maxLength={15}
            name="phoneNumber"
            placeholder={t.phonePlaceholder}
            aria-invalid={!!errors.phoneNumber}
            onChange={handlePhoneChange}
          />
          {errors.phoneNumber && (
            <p className="text-error text-sm">{errors.phoneNumber}</p>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">{t.message}</Label>
          <TextArea
            required
            id="message"
            name="message"
            placeholder={t.messagePlaceholder}
            aria-invalid={!!errors.message}
            onChange={() => clearFieldError("message")}
          />
          {errors.message && (
            <p className="text-error text-sm">{errors.message}</p>
          )}
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
