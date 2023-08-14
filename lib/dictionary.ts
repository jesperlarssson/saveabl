
import type { Locale } from "@/i18n.config";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  sv: () => import("@/dictionaries/sv.json").then((module) => module.default),
  da: () => import("@/dictionaries/da.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
