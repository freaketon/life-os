import { useCallback, useEffect, useState } from "react";
import { COPY, type Copy, type Lang } from "@/content/copy";

const STORAGE_KEY = "clos-lang";

function detect(): Lang {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const q = params.get("lang");
  if (q === "es" || q === "en") return q;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "es" || saved === "en") return saved;
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  return langs.some((l) => l?.toLowerCase().startsWith("es")) ? "es" : "en";
}

export function useLang(): { lang: Lang; setLang: (l: Lang) => void; t: Copy } {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const next = detect();
    setLangState(next);
    document.documentElement.lang = next;
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return { lang, setLang, t: COPY[lang] };
}
