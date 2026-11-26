export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo: string;
  image: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    id: "nuvola",
    title: "Nuvola Commerce & Merchant Platform",
    description:
      "A complete multi-service e-commerce ecosystem consisting of a high-performance Next.js 14 customer storefront, an independent merchant CMS console, and a Fastify 5 + PostgreSQL backend engine with strict role-based access control.",
    tags: ["Next.js 14", "Fastify 5", "TypeScript", "Drizzle ORM", "PostgreSQL", "Tailwind CSS"],
    repo: "https://github.com/JyotiChataut/Nuvola-Market",
    image: "/images/nuvola-market.jpg",
    caseStudy: {
      problem:
        "Modern commerce platforms often blur administrative logic into customer-facing apps, causing security risks, bloated bundle sizes, and slow checkout experiences under heavy traffic.",
      approach:
        "Architected three distinct decoupled services: a Fastify 5 REST API using Drizzle ORM and PostgreSQL as the single source of truth, an isolated merchant CMS admin panel with fine-grained capability checks, and a responsive Next.js 14 storefront with client-persisted cart state and idempotent checkout.",
      outcome:
        "A resilient, high-throughput commerce ecosystem with instant product discovery, multi-step checkout with server validation, and unified merchant catalog control.",
    },
  },
  {
    id: "inventory",
    title: "Multi-Tenant Inventory & Ledger SaaS",
    description:
      "An enterprise multi-tenant inventory management system featuring transactional ledger tracking, warehouse stock controls, purchase orders, asynchronous job processing with BullMQ & Redis, and a modern Radix UI dashboard.",
    tags: ["Next.js 15", "Fastify", "PostgreSQL", "BullMQ", "Redis", "Radix UI", "TanStack Table"],
    repo: "https://github.com/JyotiChataut/inventory-management-frontend",
    image: "/images/inventory-platform.svg",
    caseStudy: {
      problem:
        "Inventory operations demand strict tenant isolation, zero inventory drift, and high responsiveness when handling large SKU catalogs, facility rebalances, and procurement cycles.",
      approach:
        "Implemented strict tenant-isolated transactions (`withTenantTx`) with Drizzle ORM on PostgreSQL, background queue execution using BullMQ and Redis for batch operations, and built an interactive frontend using Next.js 15, TanStack Table, React Hook Form, and Radix UI.",
      outcome:
        "A scalable SaaS solution providing real-time stock visibility, audit-proof transaction ledgers, streamlined purchase order workflows, and sub-100ms API response times.",
    },
  },
  {
    id: "chrochet",
    title: "Chrochet — Handcrafted Showcase & Store",
    description:
      "A boutique digital storefront and media gallery dedicated to handmade crochet creations, featuring interactive video reels, modal product inspections, dynamic category filters, and smooth motion choreography.",
    tags: ["Next.js 15", "React 19", "Framer Motion", "Tailwind CSS", "TypeScript"],
    url: "https://chrochet.vercel.app/",
    repo: "https://github.com/JyotiChataut/chrochet",
    image: "/images/chrochet-preview.png",
    caseStudy: {
      problem:
        "Handmade artisan crafts need visual warmth and tactile appeal online that standard rigid e-commerce templates fail to communicate.",
      approach:
        "Created an immersive visual presentation with custom video reel players, popup inspection cards, tactile photo galleries, and Framer Motion transitions designed around warm, crafted aesthetics.",
      outcome:
        "An engaging web showcase that elevates handcrafted products, connects artisan storytelling with digital browsing, and delivers silky 60fps responsive interactions across mobile and desktop.",
    },
  },
  {
    id: "travel",
    title: "Smart Travel Management System",
    description:
      "A travel browsing interface designed for clear destination discovery, special deals, curated categories, and fluid responsive navigation across devices.",
    tags: ["Grid & Flexbox", "Reusable UI", "Responsive UX", "CSS3"],
    repo: "https://github.com/alpinemarketingstudio/Golden-Travel",
    image: "/images/travel-vangogh.svg",
    caseStudy: {
      problem:
        "Travel portals easily become cluttered with competing visual banners, flight deals, and dense hotel listings that overwhelm travelers.",
      approach:
        "Applied balanced CSS grid and flex systems to structure content hierarchy, accompanied by reusable cards and refined hover states.",
      outcome:
        "A structured, intuitive travel exploration interface with clear user paths for comparing packages and destinations.",
    },
  },
  {
    id: "recipe",
    title: "Recipe Management Web Application",
    description:
      "A structured recipe management web app engineered to display detailed ingredients, cooking instructions, prep timings, and high-res culinary images in a clean, kitchen-friendly format.",
    tags: ["HTML5", "CSS3", "Responsive Design", "Git"],
    repo: "https://github.com/JyotiChataut/reciepe",
    image: "/images/recipe-vangogh.svg",
    caseStudy: {
      problem:
        "Home cooks need clear, readable step-by-step guidance without clutter or accidental misreading during active food preparation.",
      approach:
        "Designed logical component blocks grouping prep times, checklist ingredients, and sequentially ordered step instructions with accessible typography.",
      outcome:
        "A dependable, mobile-friendly culinary guide optimized for easy reading and fast cooking reference.",
    },
  },
];
