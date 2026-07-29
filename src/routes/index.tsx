import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/use-lang";
import type { Copy, Lang } from "@/content/copy";

const LINKS = {
  STRIPE_BLUEPRINT_LINK: "https://buy.stripe.com/dRmcN6gwZfDS8X29C27Zu00",
  STRIPE_BUILD_LINK: "https://buy.stripe.com/eVq4gA2G963ib5a4hI7Zu05",
  STRIPE_PRIVATE_OS_LINK: "https://buy.stripe.com/bJe9AUa8BezOehmcOe7Zu04",
  STRIPE_MONTHLY_SUPPORT_LINK: "https://buy.stripe.com/dRmbJ294xcrG1uAeWm7Zu03",
  BOOKING_CALL_LINK: "https://calendar.app.google/B7jN2x8bw55wXyLY7",
};

const TIER_LINK: Record<"blueprint" | "install" | "privateOs", string> = {
  blueprint: LINKS.STRIPE_BLUEPRINT_LINK,
  install: LINKS.STRIPE_BUILD_LINK,
  privateOs: LINKS.STRIPE_PRIVATE_OS_LINK,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Carry-Less Operating System | Private AI Systems by Alejandro Arango" },
      {
        name: "description",
        content:
          "A private AI system that runs the parts of your life you keep forgetting, avoiding, or holding in your head. Built for founders, creators, and neurodivergent professionals.",
      },
      { property: "og:title", content: "Get your life out of your head." },
      {
        property: "og:description",
        content: "Private AI systems that carry the load your brain keeps carrying manually.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "alternate", hrefLang: "en", href: "/?lang=en" },
      { rel: "alternate", hrefLang: "es", href: "/?lang=es" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "The Carry-Less Operating System",
          provider: {
            "@type": "Person",
            name: "Alejandro Arango",
            brand: "ArangoRaw",
          },
          description:
            "Private AI operating system buildouts for founders, creators, and neurodivergent professionals.",
          areaServed: "Worldwide",
          availableLanguage: ["en", "es"],
          offers: [
            { "@type": "Offer", name: "Carry-Less Blueprint", price: "1500", priceCurrency: "USD" },
            { "@type": "Offer", name: "The Install", price: "4500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Private Operating System", price: "12500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Carry-Less OS Monthly Support", price: "1500", priceCurrency: "USD", priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "USD", billingIncrement: 1, unitCode: "MON" } },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return isMobile;
}

function LandingPage() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t.meta.title]);

  return (
    <main className="relative min-h-screen bg-background text-foreground grain-bg overflow-x-clip">
      <Backdrop />
      <Nav t={t} lang={lang} setLang={setLang} />
      <Hero t={t} reduce={!!reduce} isMobile={isMobile} />
      <Manifesto t={t} />
      <Replaces t={t} />
      <HowItWorks t={t} />
      <Packages t={t} />
      <FAQ t={t} />
      <FinalCTA t={t} />
      <Footer t={t} />
      <StickyMobileCTA t={t} />
    </main>
  );
}

/* ---------------- STATIC BACKDROP (no scroll listener) ---------------- */
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-24 top-[10vh] h-[55vh] w-[55vh] rounded-full bg-jade/[0.08] blur-[80px]" />
      <div className="absolute -right-20 top-[60vh] h-[50vh] w-[50vh] rounded-full bg-gold/[0.06] blur-[80px]" />
    </div>
  );
}

/* ---------------- REVEAL (one-shot IntersectionObserver, no scroll listener) ---------------- */
type RevealDir = "left" | "right" | "up" | "scale";
function Reveal({
  children,
  dir = "up",
  delay = 0,
  distance = 40,
  duration = 0.7,
  className,
}: {
  children: ReactNode;
  dir?: RevealDir;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const offset =
    dir === "left" ? `translate3d(-${distance}px,0,0)`
      : dir === "right" ? `translate3d(${distance}px,0,0)`
        : dir === "scale" ? "scale(0.96)"
          : `translate3d(0,${distance}px,0)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : offset,
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- LANGUAGE TOGGLE ---------------- */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 text-[11px] uppercase tracking-[0.16em]"
      role="group"
      aria-label="Language"
    >
      {(["en", "es"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition ${
            lang === l ? "bg-jade text-jade-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ t, lang, setLang }: { t: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-jade opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-jade" />
          </span>
          <span className="font-display text-lg tracking-tight text-foreground/95">
            ArangoRaw <span className="text-muted-foreground/70">/</span>{" "}
            <span className="text-muted-foreground/80 italic">Carry-Less OS</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#manifesto" className="hover:text-foreground transition">{t.nav.manifesto}</a>
          <a href="#how" className="hover:text-foreground transition">{t.nav.how}</a>
          <a href="#packages" className="hover:text-foreground transition">{t.nav.packages}</a>
          <a href="#faq" className="hover:text-foreground transition">{t.nav.faq}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <a
            href={LINKS.BOOKING_CALL_LINK}
            className="btn-ghost-gold hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm hover:brightness-125"
          >
            {t.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ t, reduce, isMobile }: { t: Copy; reduce: boolean; isMobile: boolean }) {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(80,220,160,0.14), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(196,163,90,0.10), transparent 55%), #060809",
        }}
      />

      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[560px] w-[560px] rounded-full bg-jade/15 blur-[100px]" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {!reduce && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[70%] opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(80,220,160,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(80,220,160,0.35) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 40%, transparent 85%)",
            transform: "perspective(900px) rotateX(62deg)",
            transformOrigin: "50% 100%",
          }}
        />
      )}

      {!reduce && !isMobile && (
        <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[520px] w-[520px] md:h-[640px] md:w-[640px] animate-[spin_60s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border border-jade/25" />
            <div className="absolute inset-8 rounded-full border border-jade/15" />
            <div className="absolute inset-20 rounded-full border border-gold/20" />
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-jade shadow-[0_0_20px_4px_rgba(80,220,160,0.7)]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[380px] w-[380px] md:h-[460px] md:w-[460px] animate-[spin_90s_linear_infinite_reverse]">
              <div className="absolute inset-0 rounded-full border border-gold/25 border-dashed" />
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_3px_rgba(196,163,90,0.7)]" />
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div aria-hidden className="pointer-events-none absolute inset-6 lg:inset-10 z-[5] hidden md:block">
          <span className="absolute top-0 left-0 h-6 w-6 border-l border-t border-jade/50" />
          <span className="absolute top-0 right-0 h-6 w-6 border-r border-t border-jade/50" />
          <span className="absolute bottom-0 left-0 h-6 w-6 border-l border-b border-jade/50" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-r border-b border-jade/50" />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground/80 mb-8"
        >
          <span className="h-px w-10 bg-jade/60" />
          {t.hero.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-foreground"
        >
          {t.hero.h1a} <br className="hidden md:block" />
          <span className="italic text-shimmer">{t.hero.h1b}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 max-w-2xl text-balance text-lg md:text-xl leading-relaxed text-muted-foreground"
        >
          {t.hero.sub}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 space-y-2 text-[15px] text-foreground/85"
        >
          {t.hero.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-2 h-1 w-4 flex-shrink-0 bg-jade/70" /> {b}
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#packages"
            className="btn-jade hover:btn-jade-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px]"
          >
            {t.hero.ctaPackages}
            <ArrowRight />
          </a>
          <a
            href={LINKS.BOOKING_CALL_LINK}
            className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] hover:brightness-125"
          >
            {t.hero.ctaCall}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-md text-sm text-muted-foreground/70 italic"
        >
          {t.hero.note}
        </motion.p>
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto({ t }: { t: Copy }) {
  const m = t.manifesto;
  return (
    <section id="manifesto" className="relative py-32 md:py-48 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-px w-10 bg-gold/60" />
          {m.label}
        </div>

        <Reveal
          dir="up"
          distance={40}
          duration={0.8}
          className="glass-panel-strong relative overflow-hidden p-10 md:p-20"
        >
          <div className="relative space-y-8 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.25] text-foreground/95">
            <p>{m.p1}</p>
            <ul className="space-y-2 text-[clamp(1.15rem,2vw,1.5rem)] font-sans text-muted-foreground not-italic">
              {m.items.map((it) => (
                <li key={it.k}>
                  <span className="text-foreground/90">{it.k}</span> {it.v}
                </li>
              ))}
            </ul>
            <p className="italic text-muted-foreground">{m.p2}</p>
            <p>{m.p3}</p>
            <p className="pt-4">
              {m.p4a} <span className="italic text-gold">{m.p4b}</span>
            </p>
            <p className="text-jade">{m.p5}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- REPLACES ---------------- */
function Replaces({ t }: { t: Copy }) {
  const r = t.replaces;
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal dir="left" distance={50}>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-jade/60" />
              {r.label}
            </div>
            <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              {r.h2a} <br className="hidden md:block" />
              <span className="italic text-muted-foreground">{r.h2b}</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {r.items.map((item, i) => (
            <Reveal key={item.title} dir="up" distance={30} delay={i * 0.06}>
              <div className="glass-panel p-8 h-full flex flex-col gap-6 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/60">0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-jade" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-foreground mb-3 leading-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{item.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks({ t }: { t: Copy }) {
  const h = t.how;
  return (
    <section id="how" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal dir="right" distance={50} className="mb-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            {h.label}
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            {h.h2a} <br />
            <span className="italic text-jade">{h.h2b}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">{h.intro}</p>
        </Reveal>

        <div className="space-y-6">
          {h.steps.map((s, i) => (
            <Reveal key={s.n} dir="up" distance={40} delay={i * 0.08}>
              <article className="glass-panel p-8 md:p-12 relative overflow-hidden hover:border-jade/30 transition">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start gap-4">
                    <span className="font-display text-6xl md:text-7xl text-jade/80 leading-none">{s.n}</span>
                    <span className="h-px flex-1 md:w-16 md:flex-none bg-border" />
                  </div>
                  <div className="md:col-span-6">
                    <h3 className="font-display text-3xl md:text-4xl mb-4 text-foreground">{s.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base">{s.copy}</p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70 mb-4">{h.deliverablesLabel}</p>
                    <ul className="space-y-3">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-sm text-foreground/85">
                          <span className="mt-1.5 h-1 w-4 flex-shrink-0 bg-jade/70" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PACKAGES ---------------- */
function Packages({ t }: { t: Copy }) {
  const p = t.packages;
  return (
    <section id="packages" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal dir="left" distance={50} className="mb-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-jade/60" />
            {p.label}
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            {p.h2a} <span className="italic text-muted-foreground">{p.h2b}</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">{p.intro}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {p.tiers.map((tier, i) => (
            <Reveal key={tier.name} dir="up" distance={40} delay={i * 0.08}>
              <div
                className={`relative flex flex-col h-full p-8 md:p-10 rounded-2xl ${
                  tier.featured
                    ? "glass-panel-strong border-jade/40 shadow-[0_40px_120px_-20px_rgba(80,220,160,0.25)]"
                    : "glass-panel"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-jade px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-jade-foreground">
                      {p.mostChosen}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-3">{tier.tag}</p>
                    <h3 className="font-display text-3xl leading-tight text-foreground">{tier.name}</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl text-foreground">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.priceUnit}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">{tier.desc}</p>
                <p className="text-foreground/90 leading-relaxed text-[15px] mb-8 border-l-2 border-jade/60 pl-4">
                  {tier.outcome}
                </p>

                <div className="hairline mb-6" />

                <ul className="space-y-3 mb-10 flex-1">
                  {tier.deliverables.map((d, idx) => {
                    const isObj = typeof d === "object";
                    const text = isObj ? d.text : d;
                    const kind = isObj ? d.kind : null;
                    return (
                      <li key={idx} className="flex items-start gap-3 text-sm text-foreground/85">
                        <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-jade" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>
                          {kind && (
                            <span className="mr-2 inline-block rounded-full border border-gold/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold/90 align-middle">
                              {kind}
                            </span>
                          )}
                          <span>{text}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col gap-3">
                  <a
                    href={TIER_LINK[tier.link]}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                      tier.featured ? "btn-jade hover:btn-jade-hover" : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    {tier.primaryLabel} <ArrowRight />
                  </a>
                  <a
                    href={LINKS.BOOKING_CALL_LINK}
                    className="btn-ghost-gold inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm hover:brightness-125"
                  >
                    {tier.secondaryLabel}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Monthly Support add-on strip */}
        <Reveal dir="up" distance={30} delay={0.1}>
          <div className="mt-10 glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">{p.addon.label}</p>
              <h3 className="font-display text-2xl leading-tight text-foreground mb-2">
                {p.addon.title} <span className="text-muted-foreground text-lg">— {p.addon.priceLine}</span>
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{p.addon.copy}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
              <a
                href={LINKS.STRIPE_MONTHLY_SUPPORT_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition"
              >
                {p.addon.cta} <ArrowRight />
              </a>
              <a
                href={LINKS.BOOKING_CALL_LINK}
                className="btn-ghost-gold inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm hover:brightness-125"
              >
                {p.addon.ask}
              </a>
            </div>
          </div>
        </Reveal>

        <p className="mt-12 max-w-2xl text-sm text-muted-foreground/75 italic leading-relaxed">{p.note}</p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ({ t }: { t: Copy }) {
  const [open, setOpen] = useState<number | null>(0);
  const f = t.faq;

  return (
    <section id="faq" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal dir="right" distance={50} className="mb-16">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            {f.label}
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            {f.h2a} <span className="italic text-muted-foreground">{f.h2b}</span>
          </h2>
        </Reveal>

        <Reveal dir="up" distance={40} className="glass-panel divide-y divide-white/[0.06]">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="w-full flex items-center justify-between gap-6 px-6 md:px-8 py-6 text-left group focus-visible:outline-none focus-visible:bg-white/5 hover:bg-white/[0.02] transition"
                >
                  <span className="font-display text-lg md:text-xl text-foreground/95">{item.q}</span>
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-border transition ${
                      isOpen ? "bg-jade text-jade-foreground border-jade rotate-45" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-7 text-muted-foreground leading-relaxed text-[15px] max-w-3xl">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA({ t }: { t: Copy }) {
  const c = t.finalCta;
  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-jade/[0.06] blur-[100px]" />
      </div>
      <div className="mx-auto max-w-5xl text-center">
        <Reveal dir="up" distance={30}>
          <h2 className="font-display text-balance text-[clamp(2.2rem,6vw,5rem)] leading-[1.02]">
            {c.h2a} <br className="hidden md:block" />
            <span className="italic text-jade">{c.h2b}</span>
          </h2>
          <div className="mt-8 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>{c.p1}</p>
            <p className="text-foreground">{c.p2}</p>
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground/70 pt-4">{c.p3}</p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={LINKS.STRIPE_BLUEPRINT_LINK} className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm hover:brightness-125">
            {c.blueprint} <span className="text-muted-foreground/70">$1,500</span>
          </a>
          <a href={LINKS.STRIPE_BUILD_LINK} className="btn-jade hover:btn-jade-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm">
            {c.install} <span className="opacity-70">$4,500</span> <ArrowRight />
          </a>
          <a href={LINKS.STRIPE_PRIVATE_OS_LINK} className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm hover:brightness-125">
            {c.privateOs} <span className="text-muted-foreground/70">$12,500+</span>
          </a>
        </div>
        <div className="mt-6">
          <a href={LINKS.BOOKING_CALL_LINK} className="text-sm text-muted-foreground hover:text-foreground transition underline underline-offset-4 decoration-jade/40">
            {c.or}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ t }: { t: Copy }) {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-14">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <div className="font-display text-2xl text-foreground">ArangoRaw</div>
          <div className="text-sm text-muted-foreground mt-1">{t.footer.sub}</div>
        </div>
        <p className="text-sm text-muted-foreground italic md:text-center">{t.footer.tagline}</p>
        <div className="md:text-right text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} ArangoRaw · Alejandro Arango
        </div>
      </div>
    </footer>
  );
}

/* ---------------- STICKY MOBILE CTA ---------------- */
function StickyMobileCTA({ t }: { t: Copy }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] px-3 pt-3">
      <div className="glass-panel-strong flex items-center gap-2 p-2.5">
        <div className="flex-1 pl-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{t.sticky.small}</p>
          <p className="text-sm font-display text-foreground leading-tight">{t.sticky.big}</p>
        </div>
        <a
          href={LINKS.STRIPE_BUILD_LINK}
          className="btn-jade inline-flex items-center rounded-full px-4 py-2.5 text-xs font-semibold"
        >
          {t.sticky.pay}
        </a>
        <a
          href={LINKS.BOOKING_CALL_LINK}
          className="btn-ghost-gold inline-flex items-center rounded-full px-4 py-2.5 text-xs"
        >
          {t.sticky.call}
        </a>
      </div>
    </div>
  );
}
