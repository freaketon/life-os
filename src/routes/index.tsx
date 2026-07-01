import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import video1Asset from "@/assets/video_bg_1.mp4.asset.json";
import video2Asset from "@/assets/video_bg_2.mp4.asset.json";

// ============================================================
// REPLACE THESE PLACEHOLDER LINKS BEFORE LAUNCH
// ============================================================
const LINKS = {
  STRIPE_BLUEPRINT_LINK: "#STRIPE_BLUEPRINT_LINK",
  STRIPE_BUILD_LINK: "#STRIPE_BUILD_LINK",
  STRIPE_PRIVATE_OS_LINK: "#STRIPE_PRIVATE_OS_LINK",
  STRIPE_MONTHLY_SUPPORT_LINK: "#STRIPE_MONTHLY_SUPPORT_LINK",
  BOOKING_CALL_LINK: "#BOOKING_CALL_LINK",
};

// TODO: Replace with your final CDN video URLs if desired.
// Currently using uploaded assets: "video bg 1.mp4" and "video bg 2.mp4"
const HERO_VIDEO_SRC = video1Asset.url;
const MANIFESTO_VIDEO_SRC = video2Asset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Carry-Less Operating System | Private AI Systems by Alejandro Arango" },
      {
        name: "description",
        content:
          "A private AI operating system buildout for founders, creators, neurodivergent professionals, and overloaded people who need their life to stop depending on memory, adrenaline, and open loops.",
      },
      { property: "og:title", content: "Your brain was never supposed to be the operating system." },
      {
        property: "og:description",
        content: "Private Claude and Hermes-based AI operating systems built around your real life.",
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

function LandingPage() {
  const reduce = useReducedMotion();
  return (
    <main className="relative min-h-screen bg-background text-foreground grain-bg overflow-x-clip">
      <Nav />
      <Hero reduce={!!reduce} />
      <Manifesto reduce={!!reduce} />
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

/* ---------------- HERO with scroll-scrubbed video ---------------- */
function Hero({ reduce }: { reduce: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.85, 0]);
  // Scroll-driven video parallax: subtle vertical drift + zoom as user scrolls
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);

  // Mouse parallax
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  // Scroll-controlled video: map scroll progress to video.currentTime, smoothed via rAF
  useEffect(() => {
    if (reduce) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const handleMeta = () => setVideoReady(true);
    video.addEventListener("loadedmetadata", handleMeta);
    if (video.readyState >= 1) setVideoReady(true);

    const update = () => {
      if (!videoRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress across the pinned hero (section is 200vh so we get room)
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const duration = videoRef.current.duration;
      if (!isFinite(duration) || duration <= 0) return;
      targetTimeRef.current = progress * duration;
      // Smooth interpolation, but snap to endpoints so the final frame (brain rotation) actually lands
      const diff = targetTimeRef.current - currentTimeRef.current;
      if (progress >= 0.995) {
        currentTimeRef.current = duration;
      } else if (progress <= 0.005) {
        currentTimeRef.current = 0;
      } else {
        currentTimeRef.current += diff * 0.12;
      }
      try {
        videoRef.current.currentTime = currentTimeRef.current;
      } catch { /* seek errors ignored */ }
    };

    const loop = () => {
      update();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadedmetadata", handleMeta);
    };
  }, [reduce]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video background — scroll scrubs currentTime, mouse + scroll drive parallax transform */}
        {!reduce ? (
          <motion.div
            className="absolute inset-0 h-full w-full will-change-transform"
            style={{
              y: videoY,
              scale: videoScale,
              x: mouse.x * -4,
              rotateX: mouse.y * -1,
              rotateY: mouse.x * 1,
              transformPerspective: 1200,
              transformOrigin: "right center",
              transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover [object-position:85%_center] sm:[object-position:88%_center] md:[object-position:90%_center] lg:[object-position:95%_center] xl:[object-position:right_center]"
              src={HERO_VIDEO_SRC}
              muted
              playsInline
              preload="auto"
            />
          </motion.div>
        ) : (
          // Static fallback for reduced motion
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 40%, rgba(80,220,160,0.15), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(196,163,90,0.1), transparent 60%), #070707",
            }}
            aria-hidden
          />
        )}

        {/* Cinematic overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#070707_85%)]" />

        {/* Ambient light beams */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-jade/10 blur-[120px] animate-drift" />
          <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-gold/10 blur-[120px] animate-drift" style={{ animationDelay: "-6s" }} />
        </div>

        {/* Floating architecture cards */}
        <ArchitectureLayer mouse={mouse} reduce={reduce} />

        {/* Copy */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground/80 mb-8"
          >
            <span className="h-px w-10 bg-jade/60" />
            Private AI Systems · Alejandro Arango
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(2.5rem,7vw,6rem)] leading-[0.98] text-foreground"
          >
            Your brain was never <br className="hidden md:block" />
            <span className="italic text-shimmer">supposed to be</span> the{" "}
            <span className="text-jade">operating system.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-8 max-w-2xl text-balance text-lg md:text-xl leading-relaxed text-muted-foreground"
          >
            Private AI systems for founders, creators, neurodivergent professionals, and
            overloaded people whose lives have been running on memory, adrenaline, guilt,
            and open loops.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#packages"
              className="btn-jade hover:btn-jade-hover inline-flex items-center gap-2 rounded-full px-7 py-4 text-[15px]"
            >
              Choose your build
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
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 max-w-md text-sm text-muted-foreground/70 italic"
          >
            Private builds are limited because each system is built around a real life.
          </motion.p>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
            <span>{videoReady || reduce ? "Scroll to assemble" : "Loading system…"}</span>
            <span className="h-10 w-px bg-gradient-to-b from-jade/60 to-transparent" />
          </div>
        </motion.div>
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

/* Floating architecture cards with mouse parallax */
function ArchitectureLayer({ mouse, reduce }: { mouse: { x: number; y: number }; reduce: boolean }) {
  const fragments: Array<{
    label: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    depth: number;
    delay: number;
    accent?: boolean;
  }> = [
    { label: "Memory", top: "18%", left: "8%", depth: 30, delay: 0.4 },
    { label: "Anxiety", top: "26%", right: "10%", depth: 45, delay: 0.6 },
    { label: "Guilt", bottom: "28%", left: "12%", depth: 25, delay: 0.8 },
    { label: "Adrenaline", bottom: "18%", right: "14%", depth: 50, delay: 1.0 },
    { label: "AI Architecture", top: "12%", left: "50%", depth: 15, delay: 1.2, accent: true },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
      {/* Grid lines */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(245,240,235,0.5)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Connecting jade lines (SVG) */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="jadeLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#50DCA0" stopOpacity="0" />
            <stop offset="50%" stopColor="#50DCA0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#50DCA0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="15%" y1="24%" x2="50%" y2="18%" stroke="url(#jadeLine)" strokeWidth="1" />
        <line x1="88%" y1="30%" x2="52%" y2="18%" stroke="url(#jadeLine)" strokeWidth="1" />
        <line x1="18%" y1="70%" x2="50%" y2="20%" stroke="url(#jadeLine)" strokeWidth="1" />
        <line x1="82%" y1="80%" x2="52%" y2="20%" stroke="url(#jadeLine)" strokeWidth="1" />
      </svg>

      {fragments.map((f, i) => {
        const px = reduce ? 0 : mouse.x * f.depth;
        const py = reduce ? 0 : mouse.y * f.depth;
        return (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: f.delay, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              top: f.top,
              left: f.left,
              right: f.right,
              bottom: f.bottom,
              transform: `translate3d(${px}px, ${py}px, 0)`,
              transition: "transform 400ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div
              className={`glass-panel px-4 py-3 flex items-center gap-3 ${
                f.accent ? "border-jade/40 shadow-[0_0_40px_-10px_rgba(80,220,160,0.35)]" : ""
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  f.accent ? "bg-jade animate-pulse-node" : "bg-foreground/40"
                }`}
              />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground/85">{f.label}</span>
            </div>
          </motion.div>
        );
      })}



      {/* AI nodes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-jade/70 animate-pulse-node"
          style={{
            top: `${20 + Math.sin(i) * 30 + 30}%`,
            left: `${15 + i * 13}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- MANIFESTO ---------------- */
function Manifesto({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lightX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);

  return (
    <section id="manifesto" className="relative py-32 md:py-48 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          <span className="h-px w-10 bg-gold/60" />
          Manifesto
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel-strong relative overflow-hidden p-10 md:p-20"
          style={{ boxShadow: "0 60px 160px -40px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05)" }}
        >
          {/* Animated light sweep */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-jade/[0.06] to-transparent blur-2xl"
              style={{ left: lightX }}
            />
          )}
          <div className="relative space-y-8 font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.25] text-foreground/95">
            <p>For years I used my nervous system as infrastructure.</p>
            <ul className="space-y-2 text-[clamp(1.15rem,2vw,1.5rem)] font-sans text-muted-foreground not-italic">
              <li><span className="text-foreground/90">Memory</span> as project management.</li>
              <li><span className="text-foreground/90">Anxiety</span> as reminder system.</li>
              <li><span className="text-foreground/90">Guilt</span> as calendar.</li>
              <li><span className="text-foreground/90">Adrenaline</span> as execution plan.</li>
            </ul>
            <p className="italic text-muted-foreground">It worked until it did not.</p>
            <p>Now I build the systems I wish existed when my life was too heavy to hold manually.</p>
            <p className="text-muted-foreground/80">That is what this is.</p>
            <p className="pt-4">
              Not AI to do <span className="italic text-gold">more.</span>
            </p>
            <p className="text-jade">AI to carry less.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- REPLACES ---------------- */
function Replaces() {
  const items = [
    { title: "Memory", copy: "Project management should not live inside your head." },
    { title: "Anxiety", copy: "Your reminder system should not be your nervous system." },
    { title: "Guilt", copy: "Your calendar should not be powered by shame." },
    { title: "Adrenaline", copy: "Execution should not require emergency mode." },
  ];
  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-jade/60" />
              What this replaces
            </div>
            <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05]">
              Four things your life <br className="hidden md:block" />
              <span className="italic text-muted-foreground">was never meant to run on.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <TiltCard key={item.title} index={i}>
              <div className="glass-panel p-8 h-full flex flex-col gap-6 relative overflow-hidden group">
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-jade/5 blur-2xl group-hover:bg-jade/10 transition" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/60">0{i + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-jade animate-pulse-node" style={{ animationDelay: `${i * 0.3}s` }} />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{item.copy}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ children, index }: { children: ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0 });
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -y * 8, ry: x * 8 });
  };
  const onLeave = () => setT({ rx: 0, ry: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(1200px) rotateX(${t.rx}deg) rotateY(${t.ry}deg)`,
        transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Audit the load",
      copy: "We map the invisible weight: recurring decisions, abandoned tasks, message anxiety, calendar pressure, household operations, creative work, business loops, and the parts of life your brain keeps manually holding.",
      deliverables: ["Life and work systems audit", "Open-loop inventory", "Tool and account review"],
    },
    {
      n: "02",
      title: "Design the OS",
      copy: "We turn the mess into structure: inputs, routines, agents, prompts, automations, dashboards, and decision flows that give your life a cleaner operating layer.",
      deliverables: ["AI workflow architecture", "Claude, ChatGPT, or Hermes-based setup", "Personal operating protocols"],
    },
    {
      n: "03",
      title: "Build the machine",
      copy: "The system gets built, tested, documented, and handed over so you can use it without needing to become an engineer or productivity monk.",
      deliverables: ["Implementation and testing", "Handoff documentation", "Optional monthly support"],
    },
  ];
  return (
    <section id="how" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            How it works
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            From scattered life fragments <br />
            to <span className="italic text-jade">operating architecture.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            This is systems architecture, AI setup, workflow design, and personal operations
            support. It is built around the actual way your life breaks, not around a generic
            productivity fantasy.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-8 md:p-12 relative overflow-hidden group hover:border-jade/30 transition"
            >
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
            </motion.article>
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
      desc: "The map before the build. Best if you need clarity, architecture, and a practical implementation plan before committing to a full system.",
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
      name: "Build My System",
      tag: "Core Build",
      price: "$7,500",
      priceUnit: "USD",
      desc: "The practical AI operating system buildout. Best if you already know your current life cannot keep running through memory and manual force.",
      deliverables: [
        "Everything in Blueprint",
        "Claude, ChatGPT, or Hermes setup",
        "Custom prompts and operating routines",
        "Task, calendar, and message workflows",
        "Documentation and handoff session",
        "Usually built in 2 to 3 weeks",
      ],
      primary: { label: "Build My System", href: LINKS.STRIPE_BUILD_LINK },
      secondary: { label: "Book A Fit Call", href: LINKS.BOOKING_CALL_LINK },
      featured: true,
    },
    {
      name: "Private Operating System",
      tag: "Private OS",
      price: "$12,000+",
      priceUnit: "USD",
      desc: "A deeper private build for complex lives, multiple roles, family operations, creative systems, business systems, or high cognitive load environments.",
      deliverables: [
        "Everything in Build",
        "Multi-role life architecture",
        "Advanced agent and workflow design",
        "Custom dashboards and handoff assets",
        "Expanded integrations and testing",
        "Scope based on complexity",
      ],
      primary: { label: "Apply For Private OS", href: LINKS.STRIPE_PRIVATE_OS_LINK },
      secondary: { label: "Book A Fit Call", href: LINKS.BOOKING_CALL_LINK },
      featured: false,
    },
  ];

  return (
    <section id="packages" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-jade/60" />
            Packages
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            Choose the level <span className="italic text-muted-foreground">that fits.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
            Start with the map, build the core system, or apply for a private operating system
            built around your full life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col p-8 md:p-10 rounded-2xl ${
                p.featured
                  ? "glass-panel-strong border-jade/40 lg:-my-4 shadow-[0_40px_120px_-20px_rgba(80,220,160,0.25)]"
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
              </div>

              <p className="text-muted-foreground leading-relaxed text-[15px] mb-8">{p.desc}</p>

              <div className="hairline mb-6" />

              <ul className="space-y-3 mb-10 flex-1">
                {p.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-foreground/85">
                    <svg className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-jade" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{d}</span>
                  </li>
                ))}
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
            </motion.div>
          ))}
        </div>

        <p className="mt-12 max-w-2xl text-sm text-muted-foreground/75 italic leading-relaxed">
          Private builds are limited because each system is built around a real life. No
          countdowns. No fake scarcity. Just the reality that deep custom work requires focus.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    { q: "Is this therapy?", a: "No. This is not therapy, medical advice, or mental health treatment. It is systems architecture, AI setup, workflow design, and personal operations support." },
    { q: "Do I need to be neurodivergent?", a: "No. But the system is especially useful for people with ADHD, autism, AuDHD, high cognitive load, complex roles, or lives with too many open loops." },
    { q: "Do I need Claude or ChatGPT already?", a: "Not necessarily. We will decide what tools fit your situation. You will own your own accounts." },
    { q: "Is software included?", a: "No. Software subscriptions, hosting, and third-party tools are billed separately and owned by you." },
    { q: "Can you build it fully for me?", a: "Yes. That is the Private OS tier." },
    { q: "Can I start smaller?", a: "Yes. Start with the Blueprint if you want the map before the build." },
    { q: "How long does it take?", a: "Blueprint is usually delivered after the audit. Build usually takes 2 to 3 weeks. Private OS depends on complexity." },
    { q: "What happens after the build?", a: "You can run it yourself, or continue with optional monthly support starting at $1,500 per month depending on the level of support needed." },
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-40 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            <span className="h-px w-10 bg-gold/60" />
            Questions
          </div>
          <h2 className="font-display text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
            Answered <span className="italic text-muted-foreground">before you ask.</span>
          </h2>
        </div>

        <div className="glass-panel divide-y divide-white/[0.06]">
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-jade/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[120px]" />
      </div>
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[clamp(2.2rem,6vw,5rem)] leading-[1.02]"
        >
          Your brain should not have to keep <br className="hidden md:block" />
          <span className="italic text-jade">carrying the whole machine.</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-8 space-y-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          <p>
            If your life is running on memory, adrenaline, guilt, and too many open loops, the
            answer is not more discipline.
          </p>
          <p className="text-foreground">The answer is architecture.</p>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground/70 pt-4">Choose the level that fits.</p>
        </motion.div>

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
          {/* TODO: Replace with your domain / hosting metadata / legal links */}
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

// Unused import guard (keep MANIFESTO_VIDEO_SRC referenced for future secondary section)
void MANIFESTO_VIDEO_SRC;
