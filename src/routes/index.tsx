import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// ============================================================
// REPLACE THESE PLACEHOLDER LINKS BEFORE LAUNCH
// ============================================================
const LINKS = {
  STRIPE_BLUEPRINT_LINK: "https://buy.stripe.com/dRmcN6gwZfDS8X29C27Zu00",
  STRIPE_BUILD_LINK: "https://buy.stripe.com/4gMbJ2a8B2R60qw15w7Zu01",
  STRIPE_PRIVATE_OS_LINK: "https://buy.stripe.com/eVq28s4OhfDS4GM4hI7Zu02",
  STRIPE_MONTHLY_SUPPORT_LINK: "https://buy.stripe.com/dRmbJ294xcrG1uAeWm7Zu03",
  BOOKING_CALL_LINK: "https://calendar.app.google/B7jN2x8bw55wXyLY7",
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
    links: [{ rel: "canonical", href: "/" }],
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
          offers: [
            { "@type": "Offer", name: "Carry-Less Blueprint", price: "1500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Build My System", price: "7500", priceCurrency: "USD" },
            { "@type": "Offer", name: "Private Operating System", price: "12000", priceCurrency: "USD" },
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
  return (
    <main className="relative min-h-screen bg-background text-foreground grain-bg overflow-x-clip">
      <Backdrop />
      <Nav />
      <Hero reduce={!!reduce} isMobile={isMobile} />
      <Manifesto />
      <Replaces />
      <HowItWorks />
      <Packages />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
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
  const initial =
    dir === "left"
      ? { opacity: 0, x: -distance }
      : dir === "right"
      ? { opacity: 0, x: distance }
      : dir === "scale"
      ? { opacity: 0, scale: 0.96 }
      : { opacity: 0, y: distance };
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
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
          <a href="#manifesto" className="hover:text-foreground transition">Manifesto</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#packages" className="hover:text-foreground transition">Packages</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href={LINKS.BOOKING_CALL_LINK}
          className="btn-ghost-gold hidden sm:inline-flex items-center rounded-full px-4 py-2 text-sm hover:brightness-125"
        >
          Book a fit call
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO — static 3D scene, no scroll scrubbing ---------------- */
function Hero({ reduce, isMobile }: { reduce: boolean; isMobile: boolean }) {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(80,220,160,0.14), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(196,163,90,0.10), transparent 55%), #060809",
        }}
      />

      {/* Static depth orbs */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[560px] w-[560px] rounded-full bg-jade/15 blur-[100px]" />
        <div className="absolute -bottom-40 -right-24 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* Static perspective grid (CSS only, no scroll transforms) */}
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

      {/* Concentric rings — CSS-only slow spin, desktop only */}
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

      {/* HUD brackets (desktop only) */}
      {!isMobile && (
        <div aria-hidden className="pointer-events-none absolute inset-6 lg:inset-10 z-[5] hidden md:block">
          <span className="absolute top-0 left-0 h-6 w-6 border-l border-t border-jade/50" />
          <span className="absolute top-0 right-0 h-6 w-6 border-r border-t border-jade/50" />
          <span className="absolute bottom-0 left-0 h-6 w-6 border-l border-b border-jade/50" />
          <span className="absolute bottom-0 right-0 h-6 w-6 border-r border-b border-jade/50" />
        </div>
      )}

      {/* Fade to page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

      {/* Copy */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground/80 mb-8"
        >
          <span className="h-px w-10 bg-jade/60" />
          Private AI Systems · Alejandro Arango
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-foreground"
        >
          Get your life <br className="hidden md:block" />
          <span className="italic text-shimmer">out of your head.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 max-w-2xl text-balance text-lg md:text-xl leading-relaxed text-muted-foreground"
        >
          I build private AI systems that remember what you forget, handle what you
          keep avoiding, and run the parts of your life your brain has been carrying
          on memory, guilt, and adrenaline.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 space-y-2 text-[15px] text-foreground/85"
        >
          <li className="flex items-start gap-3"><span className="mt-2 h-1 w-4 flex-shrink-0 bg-jade/70" /> You stop holding your to-do list in your head.</li>
          <li className="flex items-start gap-3"><span className="mt-2 h-1 w-4 flex-shrink-0 bg-jade/70" /> You stop losing hours to inbox, calendar, and admin.</li>
          <li className="flex items-start gap-3"><span className="mt-2 h-1 w-4 flex-shrink-0 bg-jade/70" /> You stop running your life on anxiety and last-minute effort.</li>
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
            See the packages
            <ArrowRight />
          </a>
          <a
            href={LINKS.BOOKING_CALL_LINK}
            className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px] hover:brightness-125"
          >
            Book a fit call
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-md text-sm text-muted-foreground/70 italic"
        >
          Limited private builds. Each system is built around a real life.
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
function Manifesto() {
  return (
    <section id="manifesto" className="relative py-32 md:py-48 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-px w-10 bg-gold/60" />
          Manifesto
        </div>

        <Reveal
          dir="up"
          distance={40}
          duration={0.8}
          className="glass-panel-strong relative overflow-hidden p-10 md:p-20"
        >
          <div className="relative space-y-8 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.25] text-foreground/95">
            <p>For years my brain was doing the job of a system.</p>
            <ul className="space-y-2 text-[clamp(1.15rem,2vw,1.5rem)] font-sans text-muted-foreground not-italic">
              <li><span className="text-foreground/90">Memory</span> was my project manager.</li>
              <li><span className="text-foreground/90">Anxiety</span> was my reminder app.</li>
              <li><span className="text-foreground/90">Guilt</span> was my calendar.</li>
              <li><span className="text-foreground/90">Adrenaline</span> was my execution plan.</li>
            </ul>
            <p className="italic text-muted-foreground">It worked until it did not.</p>
            <p>Now I build the systems I wish I had back then, so the people I work with can put their life down.</p>
            <p className="pt-4">
              This is not AI to do <span className="italic text-gold">more.</span>
            </p>
            <p className="text-jade">This is AI so you can carry less.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- REPLACES ---------------- */
function Replaces() {
  const items = [
    { title: "Stop holding it all in your head", copy: "Your projects, tasks, and open loops live in the system. You get to close browser tabs and forget things on purpose." },
    { title: "Stop being your own reminder app", copy: "The system remembers deadlines, follow-ups, birthdays, and the things you keep meaning to get to. You stop startling awake at 2am." },
    { title: "Stop running your calendar on guilt", copy: "Your week gets planned around what actually matters, not what you feel worst about ignoring." },
    { title: "Stop needing panic to execute", copy: "Work gets done in normal time, on normal days, without waiting for a deadline to force your hand." },
  ];
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal dir="left" distance={50}>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-jade/60" />
              What changes
            </div>
            <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              Four things you stop <br className="hidden md:block" />
              <span className="italic text-muted-foreground">doing manually.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
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
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "We map what you are carrying",
      copy: "In one working session I map the tasks, decisions, follow-ups, and open loops your brain is holding. You leave with a clear picture of the load, not a longer to-do list.",
      deliverables: ["Life and work systems audit", "Open-loop inventory", "Tool and account review"],
    },
    {
      n: "02",
      title: "I design a system that fits your life",
      copy: "I turn the map into a plan: what your AI handles, what it reminds you of, what it drafts for you, and what stays yours. You approve it before anything gets built.",
      deliverables: ["AI workflow architecture", "Claude, ChatGPT, or Hermes-based setup", "Personal operating protocols"],
    },
    {
      n: "03",
      title: "I build it and hand it over",
      copy: "You get a working system you can actually use, with documentation and a walkthrough. You do not need to become an engineer or a productivity nerd to run it.",
      deliverables: ["Implementation and testing", "Handoff documentation", "Optional monthly support"],
    },
  ];
  return (
    <section id="how" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal dir="right" distance={50} className="mb-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            How it works
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            Three steps to a life <br />
            that <span className="italic text-jade">runs itself.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            This is not coaching. It is not therapy. It is a real system, built around how your
            life actually breaks, so the parts that keep failing stop failing.
          </p>
        </Reveal>

        <div className="space-y-6">
          {steps.map((s, i) => (
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
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground/70 mb-4">Deliverables</p>
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
function Packages() {
  const packages = [
    {
      name: "Carry-Less Blueprint",
      tag: "Blueprint",
      price: "$1,500",
      priceUnit: "USD",
      desc: "You get a clear plan for the exact system your life needs, before you commit to building anything. Best if you want the map first.",
      outcome: "By the end you know exactly what to build, in what order, and can start acting on the plan the same week — with or without me.",
      deliverables: [
        "Personal systems audit",
        "Open-loop and load map",
        "Recommended AI stack",
        "Workflow architecture blueprint",
        "Priority build roadmap",
      ],
      primary: { label: "Start With Blueprint", href: LINKS.STRIPE_BLUEPRINT_LINK },
      secondary: { label: "Book A Fit Call", href: LINKS.BOOKING_CALL_LINK },
      featured: false,
    },
    {
      name: "The Install",
      tag: "System Install",
      price: "$4,500",
      priceUnit: "USD",
      desc: "Your life, running on the system. Set up with you in three weeks.",
      outcome: "You leave with a working system running your real life and a plain guide to keep it going without me.",
      deliverables: [
        "Your full audit: where your time, energy, and attention actually leak",
        "The complete Carry-Less system, the same one I run my own life on",
        "Set up together, live, around your real tools, calendar, and roles",
        "Your daily and weekly routines, tuned to how your brain works",
        "A plain written guide so you can change anything later without me",
        "A check-in 30 days after, to fix whatever real life breaks",
        { text: "LifeOS AI access: 200 messages/mo included", kind: "AI" },
      ],
      primary: { label: "Join The Install", href: LINKS.STRIPE_BUILD_LINK },
      secondary: { label: "Book A Fit Call", href: LINKS.BOOKING_CALL_LINK },
      featured: true,
    },
    {
      name: "Private Operating System",
      tag: "Private OS",
      price: "$12,500+",
      priceUnit: "USD",
      desc: "A small number of fully bespoke builds per year for complex individuals or companies. Every part designed around your specific life or operation, not a shared framework.",
      outcome: "You get a private system architected end to end around your reality, delivered as a working operating layer you own outright.",
      deliverables: [
        "Everything in The Install, fully bespoke",
        "Life or operation architecture from scratch",
        "Advanced agent and workflow design",
        "Custom dashboards and handoff assets",
        "Expanded integrations and testing",
        "Scope and timeline based on complexity",
        { text: "LifeOS AI access: 500 messages/mo included", kind: "AI" },
      ],
      primary: { label: "Apply For Private OS", href: LINKS.STRIPE_PRIVATE_OS_LINK },
      secondary: { label: "Book A Fit Call", href: LINKS.BOOKING_CALL_LINK },
      featured: false,
    },
  ];

  return (
    <section id="packages" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal dir="left" distance={50} className="mb-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-jade/60" />
            Packages
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            Pick where you want <span className="italic text-muted-foreground">to start.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Three ways in: get the plan, join the install, or apply for a fully private build.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} dir="up" distance={40} delay={i * 0.08}>
              <div
                className={`relative flex flex-col h-full p-8 md:p-10 rounded-2xl ${
                  p.featured
                    ? "glass-panel-strong border-jade/40 shadow-[0_40px_120px_-20px_rgba(80,220,160,0.25)]"
                    : "glass-panel"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-jade px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-jade-foreground">
                      Most chosen
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-3">{p.tag}</p>
                    <h3 className="font-display text-3xl leading-tight text-foreground">{p.name}</h3>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl text-foreground">{p.price}</span>
                    <span className="text-sm text-muted-foreground">{p.priceUnit}</span>
                  </div>
                  {p.priceNote && (
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-jade/90">{p.priceNote}</p>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed text-[15px] mb-4">{p.desc}</p>
                <p className="text-foreground/90 leading-relaxed text-[15px] mb-8 border-l-2 border-jade/60 pl-4">
                  {p.outcome}
                </p>

                <div className="hairline mb-6" />

                <ul className="space-y-3 mb-10 flex-1">
                  {p.deliverables.map((d, idx) => {
                    const isObj = typeof d === "object";
                    const text = isObj ? (d as any).text : (d as string);
                    const kind = isObj ? (d as any).kind : null;
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
                    href={p.primary.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                      p.featured ? "btn-jade hover:btn-jade-hover" : "bg-foreground text-background hover:bg-foreground/90"
                    }`}
                  >
                    {p.primary.label} <ArrowRight />
                  </a>
                  <a
                    href={p.secondary.href}
                    className="btn-ghost-gold inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm hover:brightness-125"
                  >
                    {p.secondary.label}
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
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold mb-2">Add-on · Ongoing Care</p>
              <h3 className="font-display text-2xl leading-tight text-foreground mb-2">
                Monthly Support <span className="text-muted-foreground text-lg">— $1,500 / month</span>
              </h3>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                Add ongoing support to any of the three tiers above. Monthly workflow review, prompt refinement, documentation updates, and system adjustments as your life and tools change.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
              <a
                href={LINKS.STRIPE_MONTHLY_SUPPORT_LINK}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold bg-foreground text-background hover:bg-foreground/90 transition"
              >
                Activate Monthly Support <ArrowRight />
              </a>
              <a
                href={LINKS.BOOKING_CALL_LINK}
                className="btn-ghost-gold inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm hover:brightness-125"
              >
                Ask A Question
              </a>
            </div>
          </div>
        </Reveal>

        <p className="mt-12 max-w-2xl text-sm text-muted-foreground/75 italic leading-relaxed">
          Private builds are limited because each one is built around a real life. No
          countdowns. No fake scarcity. Just the reality that deep custom work takes focus.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    { q: "What is the difference between the three levels and how do I know which one is for me?", a: "Blueprint is the plan: you want the map before you commit to building. The Install is the guided system installation: a defined process, a defined timeline, and live sessions where we wire the Carry-Less system into your real life on a proven framework. Private OS is a small number of fully bespoke builds per year: for complex individuals or companies whose life or operation is too specific to fit into a shared framework. Rule of thumb — if you want direction, Blueprint. If you want the system running in your life inside a few weeks, The Install. If nothing off the shelf will ever fit you, Private OS." },
    { q: "Is this therapy?", a: "No. This is not therapy, medical advice, or mental health treatment. It is a real system I design and build for you." },
    { q: "Do I need to be neurodivergent?", a: "No. It works especially well for people with ADHD, autism, AuDHD, or high cognitive load, but the system helps anyone whose life has too many open loops." },
    { q: "Do I need Claude or ChatGPT already?", a: "No. We pick the right tools for your situation. You own your own accounts." },
    { q: "Is software included?", a: "No. Software, hosting, and third-party tools are billed separately and owned by you." },
    { q: "Can you build it fully for me?", a: "Yes. That is the Private OS tier." },
    { q: "Can I start smaller?", a: "Yes. Start with the Blueprint if you want the plan before the build." },
    { q: "How long does it take?", a: "Blueprint is delivered soon after the audit. Build is usually 2 to 3 weeks. Private OS depends on complexity." },
    { q: "What happens after the build?", a: "You run it yourself, or you keep me on with Monthly Support at $1,500 per month." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal dir="right" distance={50} className="mb-16">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            Questions
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            Answered <span className="italic text-muted-foreground">before you ask.</span>
          </h2>
        </Reveal>

        <Reveal dir="up" distance={40} className="glass-panel divide-y divide-white/[0.06]">
          {items.map((item, i) => {
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
function FinalCTA() {
  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-jade/[0.06] blur-[100px]" />
      </div>
      <div className="mx-auto max-w-5xl text-center">
        <Reveal dir="up" distance={30}>
          <h2 className="font-display text-balance text-[clamp(2.2rem,6vw,5rem)] leading-[1.02]">
            Put your life down. <br className="hidden md:block" />
            <span className="italic text-jade">Let the system carry it.</span>
          </h2>
          <div className="mt-8 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              If your life is running on memory, guilt, and last-minute effort, more discipline
              is not the fix.
            </p>
            <p className="text-foreground">A real system is.</p>
            <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground/70 pt-4">Pick where you want to start.</p>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={LINKS.STRIPE_BLUEPRINT_LINK} className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm hover:brightness-125">
            Start With Blueprint <span className="text-muted-foreground/70">$1,500</span>
          </a>
          <a href={LINKS.STRIPE_BUILD_LINK} className="btn-jade hover:btn-jade-hover inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm">
            Build My System <span className="opacity-70">$7,500</span> <ArrowRight />
          </a>
          <a href={LINKS.STRIPE_PRIVATE_OS_LINK} className="btn-ghost-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm hover:brightness-125">
            Apply For Private OS <span className="text-muted-foreground/70">$12,000+</span>
          </a>
        </div>
        <div className="mt-6">
          <a href={LINKS.BOOKING_CALL_LINK} className="text-sm text-muted-foreground hover:text-foreground transition underline underline-offset-4 decoration-jade/40">
            Or book a fit call first →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-14">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <div className="font-display text-2xl text-foreground">ArangoRaw</div>
          <div className="text-sm text-muted-foreground mt-1">The Carry-Less Operating System</div>
        </div>
        <p className="text-sm text-muted-foreground italic md:text-center">
          Built for people who were carrying too much for too long.
        </p>
        <div className="md:text-right text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} ArangoRaw · Alejandro Arango
        </div>
      </div>
    </footer>
  );
}

/* ---------------- STICKY MOBILE CTA ---------------- */
function StickyMobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] px-3 pt-3">
      <div className="glass-panel-strong flex items-center gap-2 p-2.5">
        <div className="flex-1 pl-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Build your</p>
          <p className="text-sm font-display text-foreground leading-tight">Carry-Less OS</p>
        </div>
        <a
          href={LINKS.STRIPE_BUILD_LINK}
          className="btn-jade inline-flex items-center rounded-full px-4 py-2.5 text-xs font-semibold"
        >
          Pay
        </a>
        <a
          href={LINKS.BOOKING_CALL_LINK}
          className="btn-ghost-gold inline-flex items-center rounded-full px-4 py-2.5 text-xs"
        >
          Call
        </a>
      </div>
    </div>
  );
}
