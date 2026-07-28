export type Deliverable = string | { text: string; kind: string };

export type Copy = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  nav: { manifesto: string; how: string; packages: string; faq: string; book: string };
  hero: {
    eyebrow: string;
    h1a: string;
    h1b: string;
    sub: string;
    bullets: string[];
    ctaPackages: string;
    ctaCall: string;
    note: string;
  };
  manifesto: {
    label: string;
    p1: string;
    items: { k: string; v: string }[];
    p2: string;
    p3: string;
    p4a: string;
    p4b: string;
    p5: string;
  };
  replaces: { label: string; h2a: string; h2b: string; items: { title: string; copy: string }[] };
  how: {
    label: string;
    h2a: string;
    h2b: string;
    intro: string;
    deliverablesLabel: string;
    steps: { n: string; title: string; copy: string; deliverables: string[] }[];
  };
  packages: {
    label: string;
    h2a: string;
    h2b: string;
    intro: string;
    mostChosen: string;
    tiers: {
      name: string;
      tag: string;
      price: string;
      priceUnit: string;
      desc: string;
      outcome: string;
      deliverables: Deliverable[];
      primaryLabel: string;
      secondaryLabel: string;
      link: "blueprint" | "install" | "privateOs";
      featured: boolean;
    }[];
    addon: { label: string; title: string; priceLine: string; copy: string; cta: string; ask: string };
    note: string;
  };
  faq: { label: string; h2a: string; h2b: string; items: { q: string; a: string }[] };
  finalCta: {
    h2a: string;
    h2b: string;
    p1: string;
    p2: string;
    p3: string;
    blueprint: string;
    install: string;
    privateOs: string;
    or: string;
  };
  footer: { tagline: string; sub: string };
  sticky: { small: string; big: string; pay: string; call: string };
};

const en: Copy = {
  meta: {
    title: "The Carry-Less Operating System | Private AI Systems by Alejandro Arango",
    description:
      "A private AI system that runs the parts of your life you keep forgetting, avoiding, or holding in your head. Built for founders, creators, and neurodivergent professionals.",
    ogTitle: "Get your life out of your head.",
    ogDescription: "Private AI systems that carry the load your brain keeps carrying manually.",
  },
  nav: {
    manifesto: "Manifesto",
    how: "How it works",
    packages: "Packages",
    faq: "FAQ",
    book: "Book a fit call",
  },
  hero: {
    eyebrow: "Private AI Systems · Alejandro Arango",
    h1a: "Get your life",
    h1b: "out of your head.",
    sub: "I build private AI systems that remember what you forget, handle what you keep avoiding, and run the parts of your life your brain has been carrying on memory, guilt, and adrenaline.",
    bullets: [
      "You stop holding your to-do list in your head.",
      "You stop losing hours to inbox, calendar, and admin.",
      "You stop running your life on anxiety and last-minute effort.",
    ],
    ctaPackages: "See the packages",
    ctaCall: "Book a fit call",
    note: "Limited private builds. Each system is built around a real life.",
  },
  manifesto: {
    label: "Manifesto",
    p1: "For years my brain was doing the job of a system.",
    items: [
      { k: "Memory", v: "was my project manager." },
      { k: "Anxiety", v: "was my reminder app." },
      { k: "Guilt", v: "was my calendar." },
      { k: "Adrenaline", v: "was my execution plan." },
    ],
    p2: "It worked until it did not.",
    p3: "Now I build the systems I wish I had back then, so the people I work with can put their life down.",
    p4a: "This is not AI to do",
    p4b: "more.",
    p5: "This is AI so you can carry less.",
  },
  replaces: {
    label: "What changes",
    h2a: "Four things you stop",
    h2b: "doing manually.",
    items: [
      {
        title: "Stop holding it all in your head",
        copy: "Your projects, tasks, and open loops live in the system. You get to close browser tabs and forget things on purpose.",
      },
      {
        title: "Stop being your own reminder app",
        copy: "The system remembers deadlines, follow-ups, birthdays, and the things you keep meaning to get to. You stop startling awake at 2am.",
      },
      {
        title: "Stop running your calendar on guilt",
        copy: "Your week gets planned around what actually matters, not what you feel worst about ignoring.",
      },
      {
        title: "Stop needing panic to execute",
        copy: "Work gets done in normal time, on normal days, without waiting for a deadline to force your hand.",
      },
    ],
  },
  how: {
    label: "How it works",
    h2a: "Three steps to a life",
    h2b: "runs itself.",
    intro:
      "This is not coaching. It is not therapy. It is a real system, built around how your life actually breaks, so the parts that keep failing stop failing.",
    deliverablesLabel: "Deliverables",
    steps: [
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
        deliverables: [
          "AI workflow architecture",
          "Claude, ChatGPT, or Hermes-based setup",
          "Personal operating protocols",
        ],
      },
      {
        n: "03",
        title: "I build it and hand it over",
        copy: "You get a working system you can actually use, with documentation and a walkthrough. You do not need to become an engineer or a productivity nerd to run it.",
        deliverables: ["Implementation and testing", "Handoff documentation", "Optional monthly support"],
      },
    ],
  },
  packages: {
    label: "Packages",
    h2a: "Pick where you want",
    h2b: "to start.",
    intro: "Three ways in: get the plan, join the install, or apply for a fully private build.",
    mostChosen: "Most chosen",
    tiers: [
      {
        name: "Carry-Less Blueprint",
        tag: "Blueprint",
        price: "$1,500",
        priceUnit: "USD",
        desc: "You get a clear plan for the exact system your life needs, before you commit to building anything. Best if you want the map first.",
        outcome:
          "By the end you know exactly what to build, in what order, and can start acting on the plan the same week, with or without me.",
        deliverables: [
          "Personal systems audit",
          "Open-loop and load map",
          "Recommended AI stack",
          "Workflow architecture blueprint",
          "Priority build roadmap",
        ],
        primaryLabel: "Start With Blueprint",
        secondaryLabel: "Book A Fit Call",
        link: "blueprint",
        featured: false,
      },
      {
        name: "The Install",
        tag: "System Install",
        price: "$4,500",
        priceUnit: "USD",
        desc: "Your life, running on the system. Set up with you in three weeks.",
        outcome:
          "You leave with a working system running your real life and a plain guide to keep it going without me.",
        deliverables: [
          "Your full audit: where your time, energy, and attention actually leak",
          "The complete Carry-Less system, the same one I run my own life on",
          "Set up together, live, around your real tools, calendar, and roles",
          "Your daily and weekly routines, tuned to how your brain works",
          "A plain written guide so you can change anything later without me",
          "A check-in 30 days after, to fix whatever real life breaks",
          { text: "LifeOS AI: first month included, 500 messages", kind: "AI" },
        ],
        primaryLabel: "Join The Install",
        secondaryLabel: "Book A Fit Call",
        link: "install",
        featured: true,
      },
      {
        name: "Private Operating System",
        tag: "Private OS",
        price: "$12,500+",
        priceUnit: "USD",
        desc: "A small number of fully bespoke builds per year for complex individuals or companies. Every part designed around your specific life or operation, not a shared framework.",
        outcome:
          "You get a private system architected end to end around your reality, delivered as a working operating layer you own outright.",
        deliverables: [
          "Everything in The Install, fully bespoke",
          "Life or operation architecture from scratch",
          "Advanced agent and workflow design",
          "Custom dashboards and handoff assets",
          "Expanded integrations and testing",
          "Scope and timeline based on complexity",
          { text: "LifeOS AI: first month included, 500 messages", kind: "AI" },
        ],
        primaryLabel: "Apply For Private OS",
        secondaryLabel: "Book A Fit Call",
        link: "privateOs",
        featured: false,
      },
    ],
    addon: {
      label: "Add-on · Ongoing Care",
      title: "Monthly Support",
      priceLine: "$1,500 / month",
      copy: "Add ongoing support to any of the three tiers above. Monthly workflow review, prompt refinement, documentation updates, and system adjustments as your life and tools change.",
      cta: "Activate Monthly Support",
      ask: "Ask A Question",
    },
    note: "Private builds are limited because each one is built around a real life. No countdowns. No fake scarcity. Just the reality that deep custom work takes focus.",
  },
  faq: {
    label: "Questions",
    h2a: "Answered",
    h2b: "before you ask.",
    items: [
      {
        q: "What is the difference between the three levels and how do I know which one is for me?",
        a: "Blueprint is the plan: you want the map before you commit to building. The Install is the guided system installation: a defined process, a defined timeline, and live sessions where we wire the Carry-Less system into your real life on a proven framework. Private OS is a small number of fully bespoke builds per year, for complex individuals or companies whose life or operation is too specific to fit into a shared framework. Rule of thumb: if you want direction, Blueprint. If you want the system running in your life inside a few weeks, The Install. If nothing off the shelf will ever fit you, Private OS.",
      },
      {
        q: "What is LifeOS AI and how does the message limit work?",
        a: "LifeOS AI is the private messaging layer that runs on your system, so you can text or chat with your own operating system and get answers based on your setup, goals, and routines. The Install and Private OS include your first month with 500 messages. After that it is $69 per month for 500 messages per month.",
      },
      {
        q: "Is this therapy?",
        a: "No. This is not therapy, medical advice, or mental health treatment. It is a real system I design and build for you.",
      },
      {
        q: "Do I need to be neurodivergent?",
        a: "No. It works especially well for people with ADHD, autism, AuDHD, or high cognitive load, but the system helps anyone whose life has too many open loops.",
      },
      {
        q: "Do I need Claude or ChatGPT already?",
        a: "No. We pick the right tools for your situation. You own your own accounts.",
      },
      {
        q: "Is software included?",
        a: "No. Software, hosting, and third-party tools are billed separately and owned by you.",
      },
      { q: "Can you build it fully for me?", a: "Yes. That is the Private OS tier." },
      { q: "Can I start smaller?", a: "Yes. Start with the Blueprint if you want the plan before the build." },
      {
        q: "How long does it take?",
        a: "Blueprint is delivered soon after the audit. The Install is usually 2 to 3 weeks. Private OS depends on complexity.",
      },
      {
        q: "What happens after the build?",
        a: "You run it yourself, or you keep me on with Monthly Support at $1,500 per month.",
      },
    ],
  },
  finalCta: {
    h2a: "Put your life down.",
    h2b: "Let the system carry it.",
    p1: "If your life is running on memory, guilt, and last-minute effort, more discipline is not the fix.",
    p2: "A real system is.",
    p3: "Pick where you want to start.",
    blueprint: "Start With Blueprint",
    install: "Build My System",
    privateOs: "Apply For Private OS",
    or: "Or book a fit call first →",
  },
  footer: {
    tagline: "Built for people who were carrying too much for too long.",
    sub: "The Carry-Less Operating System",
  },
  sticky: { small: "Build your", big: "Carry-Less OS", pay: "Pay", call: "Call" },
};

const es: Copy = {
  meta: {
    title: "El Sistema Operativo Carry-Less | Sistemas de IA privados por Alejandro Arango",
    description:
      "Un sistema de IA privado que se encarga de las partes de tu vida que olvidas, evitas o cargas en la cabeza. Para fundadores, creadores y profesionales neurodivergentes.",
    ogTitle: "Saca tu vida de tu cabeza.",
    ogDescription: "Sistemas de IA privados que cargan lo que tu cerebro sigue cargando a mano.",
  },
  nav: {
    manifesto: "Manifiesto",
    how: "Cómo funciona",
    packages: "Paquetes",
    faq: "Preguntas",
    book: "Agenda una llamada",
  },
  hero: {
    eyebrow: "Sistemas de IA privados · Alejandro Arango",
    h1a: "Saca tu vida",
    h1b: "de tu cabeza.",
    sub: "Construyo sistemas de IA privados que recuerdan lo que olvidas, se encargan de lo que evitas y manejan las partes de tu vida que tu cerebro viene cargando con memoria, culpa y adrenalina.",
    bullets: [
      "Dejas de guardar tu lista de tareas en la cabeza.",
      "Dejas de perder horas en correo, calendario y trámites.",
      "Dejas de mover tu vida con ansiedad y esfuerzo de último minuto.",
    ],
    ctaPackages: "Ver los paquetes",
    ctaCall: "Agenda una llamada",
    note: "Cupos limitados. Cada sistema se construye alrededor de una vida real.",
  },
  manifesto: {
    label: "Manifiesto",
    p1: "Durante años mi cerebro hacía el trabajo de un sistema.",
    items: [
      { k: "La memoria", v: "era mi gestor de proyectos." },
      { k: "La ansiedad", v: "era mi app de recordatorios." },
      { k: "La culpa", v: "era mi calendario." },
      { k: "La adrenalina", v: "era mi plan de ejecución." },
    ],
    p2: "Funcionó hasta que dejó de funcionar.",
    p3: "Hoy construyo los sistemas que me habrían servido entonces, para que la gente con la que trabajo pueda soltar el peso.",
    p4a: "Esto no es IA para hacer",
    p4b: "más.",
    p5: "Es IA para que cargues menos.",
  },
  replaces: {
    label: "Qué cambia",
    h2a: "Cuatro cosas que dejas",
    h2b: "de hacer a mano.",
    items: [
      {
        title: "Deja de cargarlo todo en la cabeza",
        copy: "Tus proyectos, tareas y pendientes viven en el sistema. Puedes cerrar pestañas y olvidar cosas a propósito.",
      },
      {
        title: "Deja de ser tu propia app de recordatorios",
        copy: "El sistema recuerda fechas límite, seguimientos, cumpleaños y eso que siempre piensas hacer. Dejas de despertarte a las 2am.",
      },
      {
        title: "Deja de organizar tu calendario con culpa",
        copy: "Tu semana se planea alrededor de lo que de verdad importa, no de lo que te hace sentir peor por ignorarlo.",
      },
      {
        title: "Deja de necesitar pánico para avanzar",
        copy: "El trabajo se hace en tiempo normal, en días normales, sin esperar a que una fecha límite te obligue.",
      },
    ],
  },
  how: {
    label: "Cómo funciona",
    h2a: "Tres pasos hacia una vida",
    h2b: "se maneja sola.",
    intro:
      "Esto no es coaching ni terapia. Es un sistema real, construido alrededor de cómo se rompe tu vida de verdad, para que lo que falla deje de fallar.",
    deliverablesLabel: "Entregables",
    steps: [
      {
        n: "01",
        title: "Mapeamos lo que estás cargando",
        copy: "En una sesión de trabajo mapeo las tareas, decisiones, seguimientos y pendientes que tu cerebro sostiene. Sales con una foto clara de la carga, no con una lista más larga.",
        deliverables: ["Auditoría de vida y trabajo", "Inventario de pendientes abiertos", "Revisión de herramientas y cuentas"],
      },
      {
        n: "02",
        title: "Diseño un sistema que encaja con tu vida",
        copy: "Convierto el mapa en un plan: qué maneja tu IA, qué te recuerda, qué redacta por ti y qué sigue siendo tuyo. Lo apruebas antes de construir nada.",
        deliverables: [
          "Arquitectura de flujos con IA",
          "Configuración con Claude, ChatGPT o Hermes",
          "Protocolos personales de operación",
        ],
      },
      {
        n: "03",
        title: "Lo construyo y te lo entrego",
        copy: "Recibes un sistema que funciona y que puedes usar, con documentación y una guía en vivo. No tienes que volverte ingeniero ni experto en productividad.",
        deliverables: ["Implementación y pruebas", "Documentación de entrega", "Soporte mensual opcional"],
      },
    ],
  },
  packages: {
    label: "Paquetes",
    h2a: "Elige dónde quieres",
    h2b: "empezar.",
    intro: "Tres formas de entrar: recibe el plan, entra a la instalación o aplica a un sistema privado a medida.",
    mostChosen: "El más elegido",
    tiers: [
      {
        name: "Carry-Less Blueprint",
        tag: "Blueprint",
        price: "$1,500",
        priceUnit: "USD",
        desc: "Recibes un plan claro del sistema exacto que tu vida necesita, antes de comprometerte a construir nada. Ideal si quieres el mapa primero.",
        outcome:
          "Al final sabes exactamente qué construir, en qué orden, y puedes empezar a aplicarlo esa misma semana, conmigo o sin mí.",
        deliverables: [
          "Auditoría de tus sistemas personales",
          "Mapa de pendientes y carga mental",
          "Stack de IA recomendado",
          "Arquitectura de flujos de trabajo",
          "Hoja de ruta por prioridad",
        ],
        primaryLabel: "Empezar con el Blueprint",
        secondaryLabel: "Agenda una llamada",
        link: "blueprint",
        featured: false,
      },
      {
        name: "The Install",
        tag: "Instalación",
        price: "$4,500",
        priceUnit: "USD",
        desc: "Tu vida, corriendo sobre el sistema. Instalado contigo en tres semanas.",
        outcome:
          "Sales con un sistema funcionando sobre tu vida real y una guía simple para mantenerlo sin mí.",
        deliverables: [
          "Tu auditoría completa: dónde se fugan tu tiempo, energía y atención",
          "El sistema Carry-Less completo, el mismo con el que corro mi vida",
          "Instalado juntos, en vivo, sobre tus herramientas, calendario y roles reales",
          "Tus rutinas diarias y semanales, ajustadas a cómo funciona tu cabeza",
          "Una guía escrita simple para cambiar lo que quieras después sin mí",
          "Una revisión a los 30 días, para arreglar lo que la vida real rompa",
          { text: "LifeOS AI: primer mes incluido, 500 mensajes", kind: "IA" },
        ],
        primaryLabel: "Entrar a The Install",
        secondaryLabel: "Agenda una llamada",
        link: "install",
        featured: true,
      },
      {
        name: "Sistema Operativo Privado",
        tag: "Private OS",
        price: "$12,500+",
        priceUnit: "USD",
        desc: "Unos pocos sistemas totalmente a medida al año, para personas o empresas complejas. Cada parte diseñada alrededor de tu vida u operación específica, no de un marco compartido.",
        outcome:
          "Recibes un sistema privado diseñado de punta a punta alrededor de tu realidad, entregado como una capa operativa que es tuya.",
        deliverables: [
          "Todo lo de The Install, totalmente a medida",
          "Arquitectura de vida u operación desde cero",
          "Diseño avanzado de agentes y flujos",
          "Tableros y materiales de entrega personalizados",
          "Integraciones y pruebas ampliadas",
          "Alcance y tiempos según complejidad",
          { text: "LifeOS AI: primer mes incluido, 500 mensajes", kind: "IA" },
        ],
        primaryLabel: "Aplicar al Private OS",
        secondaryLabel: "Agenda una llamada",
        link: "privateOs",
        featured: false,
      },
    ],
    addon: {
      label: "Complemento · Acompañamiento",
      title: "Soporte Mensual",
      priceLine: "$1,500 / mes",
      copy: "Agrega acompañamiento continuo a cualquiera de los tres niveles. Revisión mensual de flujos, ajuste de prompts, actualización de documentación y cambios al sistema conforme cambian tu vida y tus herramientas.",
      cta: "Activar Soporte Mensual",
      ask: "Hacer una pregunta",
    },
    note: "Los sistemas privados son limitados porque cada uno se construye alrededor de una vida real. Sin cuentas regresivas. Sin escasez falsa. Solo la realidad de que el trabajo a medida requiere foco.",
  },
  faq: {
    label: "Preguntas",
    h2a: "Respondidas",
    h2b: "antes de que preguntes.",
    items: [
      {
        q: "¿Cuál es la diferencia entre los tres niveles y cómo sé cuál es para mí?",
        a: "El Blueprint es el plan: quieres el mapa antes de comprometerte a construir. The Install es la instalación guiada: un proceso definido, un tiempo definido y sesiones en vivo donde montamos el sistema Carry-Less sobre tu vida real con un marco probado. El Private OS son unos pocos sistemas totalmente a medida al año, para personas o empresas cuya vida u operación es demasiado específica para un marco compartido. Regla simple: si quieres dirección, Blueprint. Si quieres el sistema funcionando en pocas semanas, The Install. Si nada estándar te va a servir, Private OS.",
      },
      {
        q: "¿Qué es LifeOS AI y cómo funciona el límite de mensajes?",
        a: "LifeOS AI es la capa privada de conversación que corre sobre tu sistema, para que le escribas a tu propio sistema operativo y recibas respuestas basadas en tu configuración, tus metas y tus rutinas. The Install y Private OS incluyen el primer mes con 500 mensajes. Después son $69 al mes por 500 mensajes mensuales.",
      },
      {
        q: "¿Esto es terapia?",
        a: "No. Esto no es terapia, consejo médico ni tratamiento de salud mental. Es un sistema real que diseño y construyo para ti.",
      },
      {
        q: "¿Tengo que ser neurodivergente?",
        a: "No. Funciona especialmente bien con TDAH, autismo, AuDHD o alta carga mental, pero le sirve a cualquiera con demasiados pendientes abiertos.",
      },
      {
        q: "¿Necesito tener Claude o ChatGPT?",
        a: "No. Elegimos las herramientas correctas para tu caso. Las cuentas son tuyas.",
      },
      {
        q: "¿El software está incluido?",
        a: "No. El software, el hosting y las herramientas de terceros se pagan aparte y son tuyos.",
      },
      { q: "¿Puedes construirlo todo por mí?", a: "Sí. Ese es el nivel Private OS." },
      { q: "¿Puedo empezar más pequeño?", a: "Sí. Empieza con el Blueprint si quieres el plan antes de construir." },
      {
        q: "¿Cuánto tarda?",
        a: "El Blueprint se entrega poco después de la auditoría. The Install suele tomar de 2 a 3 semanas. El Private OS depende de la complejidad.",
      },
      {
        q: "¿Qué pasa después de la construcción?",
        a: "Lo manejas tú, o me mantienes con el Soporte Mensual a $1,500 al mes.",
      },
    ],
  },
  finalCta: {
    h2a: "Suelta el peso.",
    h2b: "Deja que el sistema lo cargue.",
    p1: "Si tu vida corre con memoria, culpa y esfuerzo de último minuto, más disciplina no es la solución.",
    p2: "Un sistema real sí.",
    p3: "Elige dónde quieres empezar.",
    blueprint: "Empezar con el Blueprint",
    install: "Construir mi sistema",
    privateOs: "Aplicar al Private OS",
    or: "O agenda una llamada primero →",
  },
  footer: {
    tagline: "Hecho para quienes cargaron demasiado por demasiado tiempo.",
    sub: "El Sistema Operativo Carry-Less",
  },
  sticky: { small: "Construye tu", big: "Carry-Less OS", pay: "Pagar", call: "Llamada" },
};

export type Lang = "en" | "es";
export const COPY: Record<Lang, Copy> = { en, es };
