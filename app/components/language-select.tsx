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
import { useState } from "react";

function SelectGlobalLanguage({ className }: { className?: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  return (
    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
      <SelectTrigger
        className={cn(
          "text-base font-semibold h-12 hover:bg-surface-container border border-transparent hover:border-outline",
          className
        )}
      >
        <SelectValue>
          <div className="flex gap-x-2 items-center">
            <figure className="w-4 h-4 relative">
              <Image
                fill
                alt={`${selectedLanguage.label} Flag`}
                src={`/flags/${selectedLanguage.value}.webp`}
                className="object-contain"
              />
            </figure>

            <span>{selectedLanguage.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language}>
            <div className="flex gap-2 items-center">
              <figure className="relative size-4">
                <Image
                  fill
                  alt={`Flag of ${language.label}`}
                  src={`/flags/${language.value}.webp`}
                  className="object-contain"
                />
              </figure>
              {language.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
const languages = [
  { label: "English", value: "english" },
  { label: "Nepali", value: "nepali" },
  { label: "Bangla", value: "bangla" },
  { label: "Hindi", value: "hindi" },
];

export default SelectGlobalLanguage;
