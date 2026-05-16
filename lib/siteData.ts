export const phone = "+971 50 236 5485";
export const phoneHref = "tel:+971502365485";
export const whatsappHref = "https://wa.me/971502365485";

export type Service = {
  title: string;
  slug: string;
  image: string;
  icon: string;
  text: string;
  heroText?: string;
  introTitle?: string;
  introText?: string;
  gallery?: string[];
  includes?: string[];
  benefits?: string[];
  process?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
};

export const services: Service[] = [
  {
  title: "Villa Renovation",
  slug: "villa-renovation",
  image: "/assets/services/villa-renovation.png",
  icon: "H",
  text: "Complete villa upgrades, layout improvements, finishing, flooring, ceiling, carpentry and civil works.",
  heroText:
    "Complete villa renovation solutions in Dubai, from layout improvements and civil works to premium finishing and clean handover.",
  introTitle: "Transform Your Villa With a Clear Renovation Plan",
  introText:    "Villa renovation needs careful planning, trade coordination and proper finishing. Our team helps homeowners upgrade interiors, improve layouts, refresh walls and ceilings, repair surfaces, support flooring works and complete the project with a clean, reliable handover.",

  gallery: [
  "/assets/services/villa-renovation.png",
  "/assets/services/interior-painting.png",
  "/assets/services/plumbing-works.png",
  "/assets/services/pergola-garage-roof.png",
],

  includes: [
    "Villa layout improvement and minor civil works",
    "Wall, ceiling and surface preparation",
    "Interior painting and decorative finishing",
    "Flooring, skirting and tile work support",
    "Carpentry, doors and minor repair work",
    "Kitchen and bathroom upgrade coordination",
    "Final inspection, cleaning and handover",
  ],
  benefits: [
    "Creates a more modern and comfortable living space",
    "Improves property appearance and long-term value",
    "Combines multiple renovation trades under one scope",
    "Reduces stress with clearer planning and coordination",
    "Supports both partial upgrades and full villa renovation",
  ],
  process: [
    "Visit the villa and understand renovation goals",
    "Prepare scope of work, timeline and quotation",
    "Confirm materials, finishes and work sequence",
    "Execute renovation with supervision and progress updates",
    "Inspect, clean and hand over the completed work",
  ],
  faqs: [
    {
      question: "Can you renovate a complete villa?",
      answer:
        "Yes, we can handle complete villa renovation scopes including civil works, surface preparation, painting, flooring support, ceilings, carpentry coordination and finishing.",
    },
    {
      question: "Can you do partial villa renovation?",
      answer:
        "Yes, we also handle partial upgrades such as repainting, room renovation, bathroom and kitchen improvements, flooring support and repair works.",
    },
    {
      question: "Do you help with material selection?",
      answer:
        "Yes, we can guide material selection based on the required finish, durability, budget and the existing style of the villa.",
    },
    {
      question: "Do you provide a clear quotation before starting?",
      answer:
        "Yes, we inspect the site and provide a clear quotation with the agreed scope before starting the work.",
    },
  ],
},

  {
    title: "Roof Waterproofing",
    slug: "roof-waterproofing",
    image: "/assets/services/roof-waterproofing.png",
    icon: "D",
    text: "PU coating, crack filling, joint sealing, water leakage treatment and terrace protection.",
  },
  {
    title: "Interior Painting",
    slug: "interior-painting",
    image: "/assets/services/interior-painting.png",
    icon: "P",
    text: "Premium wall and ceiling painting, surface preparation, patching, sanding and clean finishing.",
  },
  {
    title: "AMC Maintenance",
    slug: "amc-maintenance",
    image: "/assets/services/amc-maintenance.png",
    icon: "M",
    text: "Annual maintenance plans for villas, apartments and commercial properties with scheduled inspections.",
  },
  {
    title: "AC Service",
    slug: "ac-service",
    image: "/assets/services/ac-service.png",
    icon: "A",
    text: "FCU servicing, drain line cleaning, leakage checks, filter cleaning and cooling performance inspection.",
  },
  {
    title: "Electrical Works",
    slug: "electrical-works",
    image: "/assets/services/electrical-works.png",
    icon: "E",
    text: "Lighting, sockets, DB checks, troubleshooting, replacements and safe electrical maintenance.",
  },
  {
    title: "Plumbing Works",
    slug: "plumbing-works",
    image: "/assets/services/plumbing-works.png",
    icon: "W",
    text: "Leak repairs, mixer replacement, drainage issues, water pressure checks and bathroom maintenance.",
  },
  {
    title: "Pergola & Garage Roof",
    slug: "pergola-garage-roof",
    image: "/assets/services/pergola-garage-roof.png",
    icon: "R",
    text: "Steel structure, sandwich panel roofing, joint sealing, drainage solutions and touch-up painting.",
  },
  {
    title: "Bird Netting",
    slug: "bird-netting",
    image: "/assets/services/bird-netting.png",
    icon: "B",
    text: "Roof and balcony bird netting, spikes, tile gap closing and entry prevention for cleaner spaces.",
  },
];

export const areas = [
  "Villanova",
  "Arabian Ranches",
  "Dubai Hills",
  "JVC",
  "Mira",
  "Town Square",
  "Jumeirah",
  "Al Furjan",
  "The Springs",
  "Palm Jumeirah",
  "Many More Areas",
];

export const reviews = [
  {
    initials: "SA",
    name: "Sarah A.",
    area: "Arabian Ranches",
    text: "The team handled our villa painting and ceiling repairs very professionally. The quotation was clear, the work area stayed clean and the finish looked excellent.",
  },
  {
    initials: "KM",
    name: "Khalid M.",
    area: "Dubai Hills",
    text: "We called them for roof leakage and waterproofing before summer. They explained the issue properly, sealed the cracks and completed the coating on schedule.",
  },
  {
    initials: "NR",
    name: "Nadia R.",
    area: "Villanova",
    text: "Our AMC plan has been very convenient. AC, plumbing and small electrical issues are checked regularly, and the response is quick whenever we need support.",
  },
];

export const projects = [
  {
    title: "Villa Interior Upgrade",
    area: "Arabian Ranches",
    image: "/assets/services/interior-painting.png",
    text: "Surface preparation, painting, finishing touch-ups and handover cleaning for a family villa.",
  },
  {
    title: "Roof Waterproofing",
    area: "Dubai Hills",
    image: "/assets/services/roof-waterproofing.png",
    text: "Crack treatment, PU coating and terrace protection before the summer season.",
  },
  {
    title: "Pergola Roof Works",
    area: "Jumeirah",
    image: "/assets/services/pergola-garage-roof.png",
    text: "Outdoor shade structure with steel framing, roofing panels and clean finishing.",
  },
];
