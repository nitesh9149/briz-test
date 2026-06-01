import "server-only";
import type { Dictionary, Locale } from "./i18n-config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  // ne: () => import("@/dictionaries/ne.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export type { Dictionary, Locale } from "./i18n-config";
export { locales, defaultLocale, hasLocale } from "./i18n-config";
