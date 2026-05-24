import {
  AlertTriangle,
  Banknote,
  CalendarDays,
  Clock3,
  FileText,
  Home,
  MapPin,
  MessageCircle,
  Package,
  ShieldCheck,
  UserRoundCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type AmcMetric = {
  label: string;
  value: string;
  helper: string;
  tone: "red" | "blue" | "green" | "amber";
  icon: LucideIcon;
};

export type AmcNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const amcNavItems: AmcNavItem[] = [
  { label: "Dashboard", href: "#dashboard", icon: Home },
  { label: "Clients", href: "#clients", icon: Users },
  { label: "Properties", href: "#properties", icon: MapPin },
  { label: "Contracts", href: "#contracts", icon: ShieldCheck },
  { label: "Jobs", href: "#jobs", icon: Wrench },
  { label: "Technicians", href: "#technicians", icon: UserRoundCheck },
  { label: "Quotations", href: "#quotations", icon: FileText },
  { label: "Invoices", href: "#invoices", icon: Banknote },
  { label: "Inventory", href: "#inventory", icon: Package },
  { label: "Calendar", href: "#calendar", icon: CalendarDays },
  { label: "Automation", href: "#automation", icon: MessageCircle },
];

export const amcMetrics: AmcMetric[] = [
  {
    label: "AMC Clients",
    value: "128",
    helper: "18 new villa accounts this quarter",
    tone: "blue",
    icon: Users,
  },
  {
    label: "Active Contracts",
    value: "96",
    helper: "AED 1.42M annual contract value",
    tone: "green",
    icon: ShieldCheck,
  },
  {
    label: "Pending Jobs",
    value: "34",
    helper: "12 visits scheduled for today",
    tone: "amber",
    icon: Clock3,
  },
  {
    label: "Expiring Soon",
    value: "11",
    helper: "Renewal reminders due this week",
    tone: "red",
    icon: AlertTriangle,
  },
];

export const upcomingVisits = [
  {
    time: "08:30",
    client: "Sarah Al Maktoum",
    property: "Villa 42, La Rosa, Villanova",
    service: "AC AMC preventive visit",
    technician: "Rashid",
    status: "Assigned",
  },
  {
    time: "10:00",
    client: "Blue Palm Properties",
    property: "Building B, JVC",
    service: "Plumbing leak inspection",
    technician: "Sameer",
    status: "In Progress",
  },
  {
    time: "13:30",
    client: "Khalid M.",
    property: "Arabian Ranches 2",
    service: "Electrical DB safety check",
    technician: "Noman",
    status: "Pending",
  },
  {
    time: "16:00",
    client: "Nadia R.",
    property: "Damac Hills",
    service: "Full villa AMC inspection",
    technician: "Imran",
    status: "Assigned",
  },
];

export const clients = [
  {
    name: "Sarah Al Maktoum",
    phone: "+971 50 236 5485",
    community: "Villanova",
    contract: "Full Villa AMC",
    value: "AED 8,500",
    status: "Active",
  },
  {
    name: "Blue Palm Properties",
    phone: "+971 55 901 1144",
    community: "JVC",
    contract: "Building AMC",
    value: "AED 62,000",
    status: "Renewal Due",
  },
  {
    name: "Khalid M.",
    phone: "+971 52 455 0091",
    community: "Arabian Ranches",
    contract: "AC + Plumbing AMC",
    value: "AED 5,900",
    status: "Active",
  },
];

export const properties = [
  {
    title: "Villa 42",
    community: "La Rosa, Villanova",
    access: "Gate pass required, park near service entrance",
    map: "Pinned",
  },
  {
    title: "Villa 18",
    community: "Arabian Ranches",
    access: "Call customer 20 minutes before arrival",
    map: "Pinned",
  },
  {
    title: "Townhouse 7",
    community: "Damac Hills",
    access: "Security approval already shared",
    map: "Needs pin",
  },
];

export const jobPipeline = [
  { label: "Pending", count: 9, color: "bg-slate-400" },
  { label: "Assigned", count: 12, color: "bg-blue-500" },
  { label: "In Progress", count: 7, color: "bg-amber-500" },
  { label: "Waiting Material", count: 4, color: "bg-red-500" },
  { label: "Completed", count: 31, color: "bg-emerald-500" },
];

export const modules = [
  {
    title: "Client Management",
    text: "Client profile, WhatsApp number, AMC history, payment history and service notes.",
    items: ["Searchable records", "Customer history", "Payment visibility"],
  },
  {
    title: "Property Management",
    text: "Villa details built for Dubai communities, access notes, parking, gate entry and map pins.",
    items: ["Villa number", "Community and area", "Access instructions"],
  },
  {
    title: "AMC Contracts",
    text: "Basic, comprehensive, AC, electrical, plumbing and full villa AMC contract tracking.",
    items: ["Start and end dates", "Included services", "Expiry reminders"],
  },
  {
    title: "Work Orders",
    text: "Job assignment, priority, photos, checklist, material usage and completion report.",
    items: ["Before/after photos", "Signature capture", "SLA tracking"],
  },
  {
    title: "Technician Panel",
    text: "Mobile-first view for today's jobs, Google Maps, checklist, remarks and completion.",
    items: ["Daily route", "Photo upload", "Work notes"],
  },
  {
    title: "Quotations",
    text: "Professional quote builder with items, labor, VAT, warranty, payment terms and PDF export.",
    items: ["Templates", "VAT", "WhatsApp sharing"],
  },
  {
    title: "Invoices",
    text: "Invoice generation, payment tracking, due reminders and receipt records.",
    items: ["Paid status", "Overdue alerts", "Receipts"],
  },
  {
    title: "Reports",
    text: "Revenue, technician performance, AMC renewals, pending payments and material usage.",
    items: ["Renewals", "Revenue", "Team output"],
  },
];

export const automationMessages = [
  "Job assigned",
  "Technician arriving",
  "Invoice sent",
  "AMC expiry reminder",
  "Payment reminder",
  "Renewal offer",
];

export const buildPhases = [
  {
    title: "Phase 1",
    duration: "2-4 weeks",
    focus: "Operations foundation",
    items: ["Login", "Dashboard", "Clients", "Properties", "Contracts", "Jobs"],
  },
  {
    title: "Phase 2",
    duration: "2 weeks",
    focus: "Commercial workflow",
    items: ["Quotations", "Invoices", "PDF export", "Calendar", "Notifications"],
  },
  {
    title: "Phase 3",
    duration: "2-4 weeks",
    focus: "Automation and intelligence",
    items: ["WhatsApp", "Customer portal", "Reports", "Inventory", "Routing"],
  },
];

export const technicianChecklist = [
  "Open assigned job and Google Maps",
  "Upload before photos",
  "Complete AC, plumbing and electrical checklist",
  "Add material usage and remarks",
  "Capture customer signature",
  "Submit completion report",
];
