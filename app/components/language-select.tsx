// Language switcher — temporarily disabled (only English is enabled for now).
// To re-enable: uncomment this file, add "ne" back in i18n-config.ts and
// dictionaries.ts, and uncomment the usages in navbar.tsx.

/*
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/i18n-config";
import { locales } from "@/app/[lang]/i18n-config";

type LanguageOption = {
  label: string;
  value: Locale;
  flag: string;
};

type Props = {
  className?: string;
  dict: Dictionary;
  lang: Locale;
};

function SelectGlobalLanguage({ className, dict, lang }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const options: LanguageOption[] = [
    { label: dict.languageSelect.english, value: "en", flag: "english" },
    { label: dict.languageSelect.nepali, value: "ne", flag: "nepali" },
  ];

  const current = options.find((o) => o.value === lang) ?? options[0];

  const handleChange = (next: string) => {
    if (!locales.includes(next as Locale)) return;
    if (next === lang) return;

    // Replace the leading /<lang> segment in the pathname
    const segments = pathname.split("/");
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const nextPath = segments.join("/") || `/${next}`;

    startTransition(() => {
      router.replace(nextPath);
      router.refresh();
    });
  };

  return (
    <Select value={current.value} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        className={cn(
          "text-base font-semibold h-12 hover:bg-surface-container border border-transparent hover:border-outline justify-center",
          className
        )}
        aria-label={dict.languageSelect.label}
        hideIcon
      >
        <SelectValue>
          <div className="flex gap-x-2 items-center">
            <figure className="w-4 h-4 relative">
              <Image
                fill
                alt={`${current.label} Flag`}
                src={`/flags/${current.flag}.webp`}
                className="object-contain"
              />
            </figure>
            <span>{current.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex gap-2 items-center">
              <figure className="relative size-4">
                <Image
                  fill
                  alt={`Flag of ${option.label}`}
                  src={`/flags/${option.flag}.webp`}
                  className="object-contain"
                />
              </figure>
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectGlobalLanguage;
*/
