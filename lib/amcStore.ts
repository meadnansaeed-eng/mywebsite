export type ClientRecord = {
  id: string;
  name: string;
  clientType: "AMC Client" | "Walk-in" | "Lead";
  phone: string;
  whatsapp: string;
  email: string;
  company: string;
  notes: string;
};

export type PropertyRecord = {
  id: string;
  clientId: string;
  title: string;
  villaNumber: string;
  community: string;
  area: string;
  phase: string;
  rooms: number;
  acUnits: number;
  mapLink: string;
  accessNotes: string;
  parkingNotes: string;
  gateAccess: string;
};

export type LocationArea = {
  name: string;
  communities: {
    name: string;
    phases: string[];
  }[];
};

export type ContractRecord = {
  id: string;
  clientId: string;
  propertyId: string;
  plan: string;
  type: string;
  startDate: string;
  endDate: string;
  lastAcServiceDate: string;
  lastDuctCleaningDate: string;
  lastWaterTankCleaningDate: string;
  lastSolarHeaterCleaningDate: string;
  includedAcServices: number;
  includedDuctCleanings: number;
  includedWaterTankCleanings: number;
  includedSolarHeaterCleanings: number;
  customPlanNotes: string;
  visits: number;
  included: string;
  excluded: string;
  warranty: string;
  emergencySupport: string;
  sla: string;
  value: number;
  status: "Active" | "Expiring" | "Expired";
};

export type TechnicianRecord = {
  id: string;
  name: string;
  phone: string;
  trade: string;
  status: "Available" | "Busy" | "Off Duty";
  todayCapacity: number;
};

export type JobRecord = {
  id: string;
  clientId: string;
  propertyId: string;
  technicianId: string;
  title: string;
  priority: "Low" | "Normal" | "High" | "Emergency";
  status:
    | "Pending"
    | "Assigned"
    | "In Progress"
    | "Waiting Material"
    | "Completed"
    | "Cancelled";
  scheduledDate: string;
  scheduledTime: string;
  clockIn: string;
  clockOut: string;
  navigationLink: string;
  checklist: string;
  remarks: string;
  materialsUsed: string;
  beforePhotos: string;
  afterPhotos: string;
  customerSignature: string;
};

export type QuotationRecord = {
  id: string;
  clientId: string;
  propertyId: string;
  template: string;
  items: string;
  labor: number;
  materials: number;
  vatRate: number;
  warranty: string;
  paymentTerms: string;
  status: "Draft" | "Sent" | "Approved" | "Rejected";
  approvalName: string;
  approvalDate: string;
};

export type InvoiceRecord = {
  id: string;
  clientId: string;
  quotationId: string;
  description: string;
  subtotal: number;
  vatRate: number;
  trn: string;
  paidAmount: number;
  dueDate: string;
  reminderDate: string;
  status: "Paid" | "Partially Paid" | "Pending" | "Overdue";
};

export type ExpenseRecord = {
  id: string;
  date: string;
  category: string;
  vendor: string;
  description: string;
  amount: number;
  vatRate: number;
  jobId: string;
  receiptUrl: string;
};

export type ComplaintRecord = {
  id: string;
  clientId: string;
  propertyId: string;
  jobId: string;
  issue: string;
  openedDate: string;
  resolvedDate: string;
  status: "Open" | "In Progress" | "Resolved";
  resolutionNotes: string;
};

export type PlanRule = {
  name: string;
  acServices: number;
  ductCleanings: number;
  waterTankCleanings: number;
  solarHeaterCleanings: number;
};

export type CrmSettings = {
  company: {
    name: string;
    logoUrl: string;
    trn: string;
    address: string;
    phone: string;
    email: string;
    bankDetails: string;
    stampSignatureUrl: string;
  };
  amc: {
    ppmFrequency: string;
    includedServices: string;
    exclusions: string;
    slaResponseTime: string;
    renewalReminderDays: number;
  };
  serviceJobs: {
    categories: string;
    acCleaningPrice: number;
    inspectionCharge: number;
    emergencyCharge: number;
    minimumVisitCharge: number;
  };
  tickets: {
    priorityLevels: string;
    statusWorkflow: string;
    complaintTypes: string;
    emergencyRules: string;
  };
  invoices: {
    vatRate: number;
    invoicePrefix: string;
    receiptPrefix: string;
    paymentTerms: string;
    autoNumbering: boolean;
  };
  quotations: {
    termsConditions: string;
    warrantyText: string;
    validityDays: number;
    defaultPaymentSchedule: string;
  };
  whatsappTemplates: {
    jobCreated: string;
    technicianAssigned: string;
    technicianOnTheWay: string;
    jobCompleted: string;
    invoiceSent: string;
    amcRenewalReminder: string;
  };
};

export type InventoryRecord = {
  id: string;
  item: string;
  category: string;
  stock: number;
  unit: string;
  reorderLevel: number;
  supplier: string;
};

export type AmcStore = {
  clients: ClientRecord[];
  properties: PropertyRecord[];
  contracts: ContractRecord[];
  technicians: TechnicianRecord[];
  jobs: JobRecord[];
  quotations: QuotationRecord[];
  invoices: InvoiceRecord[];
  inventory: InventoryRecord[];
  expenses: ExpenseRecord[];
  complaints: ComplaintRecord[];
  communities: string[];
  areas: string[];
  locationAreas: LocationArea[];
  plans: string[];
  planRules: PlanRule[];
  crmSettings: CrmSettings;
};

export const emptyStore: AmcStore = {
  clients: [],
  properties: [],
  contracts: [],
  technicians: [],
  jobs: [],
  quotations: [],
  invoices: [],
  inventory: [],
  expenses: [],
  complaints: [],
  communities: [],
  areas: [],
  locationAreas: [],
  plans: [],
  planRules: [],
  crmSettings: {
    company: {
      name: "",
      logoUrl: "",
      trn: "",
      address: "",
      phone: "",
      email: "",
      bankDetails: "",
      stampSignatureUrl: "",
    },
    amc: {
      ppmFrequency: "",
      includedServices: "",
      exclusions: "",
      slaResponseTime: "",
      renewalReminderDays: 30,
    },
    serviceJobs: {
      categories: "",
      acCleaningPrice: 0,
      inspectionCharge: 0,
      emergencyCharge: 0,
      minimumVisitCharge: 0,
    },
    tickets: {
      priorityLevels: "",
      statusWorkflow: "",
      complaintTypes: "",
      emergencyRules: "",
    },
    invoices: {
      vatRate: 5,
      invoicePrefix: "INV",
      receiptPrefix: "RCT",
      paymentTerms: "",
      autoNumbering: true,
    },
    quotations: {
      termsConditions: "",
      warrantyText: "",
      validityDays: 15,
      defaultPaymentSchedule: "",
    },
    whatsappTemplates: {
      jobCreated: "",
      technicianAssigned: "",
      technicianOnTheWay: "",
      jobCompleted: "",
      invoiceSent: "",
      amcRenewalReminder: "",
    },
  },
};

const amcClientNames = [
  "Ahmed Al Mansoori",
  "Fatima Al Qasimi",
  "Omar Haddad",
  "Mariam Al Nuaimi",
  "Khalid Al Suwaidi",
  "Nadia Rahman",
  "Hassan Farooq",
  "Leila Darwish",
  "Yousef Karim",
  "Aisha Mahmoud",
  "Rashid Al Balooshi",
  "Samira Khan",
  "Bilal Siddiqui",
  "Noor Al Falasi",
  "Tariq Ibrahim",
  "Huda Al Mehairi",
  "Adnan Malik",
  "Reem Abdullah",
  "Faisal Noor",
  "Zainab Ali",
  "Imran Shah",
  "Mona Yasin",
  "Saif Al Ketbi",
  "Amna Saeed",
  "Farhan Qureshi",
  "Lina George",
  "Majid Salem",
  "Sana Akhtar",
  "Ibrahim Nasser",
];

const walkInClientNames = [
  "Green Vista Homes",
  "Dubai Marina Tenant",
  "Palm View Residence",
  "JVC Apartment 1205",
  "Arabian Ranches Villa",
  "Damac Hills Tenant",
  "Business Bay Office",
  "Al Barsha Homeowner",
  "Mirdif Villa Client",
  "Dubai Hills Townhouse",
  "Jumeirah Villa Owner",
  "The Springs Resident",
  "Motor City Apartment",
  "Nad Al Sheba Villa",
  "Silicon Oasis Office",
  "Town Square Resident",
  "Meadows Villa Client",
  "JLT Office Manager",
  "Al Furjan Townhouse",
  "Sports City Tenant",
  "Discovery Gardens Flat",
  "Emirates Hills Villa",
  "Meydan Property Owner",
  "Tecom Office Client",
  "Al Warqa Homeowner",
  "Dubai Creek Tenant",
  "Festival City Villa",
  "Al Safa Apartment",
  "Jaddaf Building Unit",
];

const leadClientNames = [
  "Elite Villa Inquiry",
  "Prime Home Renovation Lead",
  "Golden Sands Property",
  "Horizon Facilities Lead",
  "Maple Community Inquiry",
  "Rosewood Villa Prospect",
  "Urban Nest Lead",
  "Marina Crown Inquiry",
  "Creekside Villa Prospect",
  "Palm Estate Lead",
  "Sunrise Home Inquiry",
  "Bluewater Apartment Lead",
  "Evergreen Villa Prospect",
  "Skyline Maintenance Lead",
  "Orchid Homes Inquiry",
  "Pearl Residence Lead",
  "Vista Heights Prospect",
  "Harbor Point Inquiry",
  "Cedar Villa Lead",
  "Lagoon View Prospect",
  "Sapphire Homes Inquiry",
  "Metro Living Lead",
  "Gardenia Villa Prospect",
  "Al Qudra Home Inquiry",
  "Falcon Estate Lead",
  "Canal View Prospect",
  "Downtown Loft Inquiry",
  "Terrace Villa Lead",
  "Oasis Park Prospect",
  "Nova Homes Inquiry",
];

function createDemoClient(
  id: string,
  name: string,
  clientType: ClientRecord["clientType"],
  index: number
): ClientRecord {
  const phoneSuffix = String(2300000 + index).slice(-7);
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]+/g, ".");

  return {
    id,
    name,
    clientType,
    phone: `+971 50 ${phoneSuffix.slice(0, 3)} ${phoneSuffix.slice(3)}`,
    whatsapp: `+971 50 ${phoneSuffix.slice(0, 3)} ${phoneSuffix.slice(3)}`,
    email: `${cleanName}@example.com`,
    company: clientType === "AMC Client" ? "" : name,
    notes:
      clientType === "AMC Client"
        ? "Demo AMC client with service history and renewal follow-up."
        : clientType === "Lead"
          ? "Demo lead for quotation and AMC conversion follow-up."
          : "Demo one-time / walk-in client for service job flow.",
  };
}

const demoClientsSeed: ClientRecord[] = [
  {
    id: "client-1",
    name: "Sarah Al Maktoum",
    clientType: "AMC Client",
    phone: "+971 50 236 5485",
    whatsapp: "+971 50 236 5485",
    email: "sarah@example.com",
    company: "",
    notes: "Prefers morning visits. Full villa AMC customer.",
  },
  ...amcClientNames.map((name, index) =>
    createDemoClient(`client-amc-${index + 2}`, name, "AMC Client", index + 2)
  ),
  {
    id: "client-2",
    name: "Blue Palm Properties",
    clientType: "Walk-in",
    phone: "+971 55 901 1144",
    whatsapp: "+971 55 901 1144",
    email: "ops@bluepalm.example",
    company: "Blue Palm Properties",
    notes: "Manages multiple building maintenance jobs in JVC.",
  },
  ...walkInClientNames.map((name, index) =>
    createDemoClient(
      `client-walkin-${index + 2}`,
      name,
      "Walk-in",
      index + 32
    )
  ),
  ...leadClientNames.map((name, index) =>
    createDemoClient(`client-lead-${index + 1}`, name, "Lead", index + 61)
  ),
];

export const demoClients: ClientRecord[] = [...demoClientsSeed].sort((a, b) => {
  const scoreA = (a.id.charCodeAt(a.id.length - 1) * 17 + a.name.length) % 97;
  const scoreB = (b.id.charCodeAt(b.id.length - 1) * 17 + b.name.length) % 97;

  return scoreA - scoreB || a.name.localeCompare(b.name);
});

export const defaultLocationAreas: LocationArea[] = [
    {
      name: "Wadi Al Safa 5",
      communities: [
        {
          name: "Villanova",
          phases: [
            "La Quinta",
            "La Rosa 1",
            "La Rosa 2",
            "Amaranta 1",
            "Amaranta 2",
          ],
        },
      ],
    },
    {
      name: "Dubai",
      communities: [
        {
          name: "JVC",
          phases: ["District 10", "District 11", "District 12"],
        },
        {
          name: "Dubai Hills",
          phases: ["Maple 1", "Maple 2", "Sidra"],
        },
      ],
    },
    {
      name: "Arabian Ranches",
      communities: [
        {
          name: "Arabian Ranches",
          phases: ["Al Reem", "Saheel", "Mirador"],
        },
      ],
    },
    {
      name: "Damac Hills",
      communities: [
        {
          name: "Damac Hills",
          phases: ["The Park Villas", "Brookfield", "Richmond"],
        },
      ],
    },
    {
      name: "Jumeirah",
      communities: [
        {
          name: "Jumeirah",
          phases: ["Jumeirah 1", "Jumeirah 2", "Jumeirah 3"],
        },
      ],
    },
  ];

const propertyLocations = defaultLocationAreas.flatMap((area) =>
  area.communities.flatMap((community) =>
    community.phases.map((phase) => ({
      area: area.name,
      community: community.name,
      phase,
    }))
  )
);

const noPropertyClientIds = new Set([
  "client-lead-3",
  "client-walkin-7",
  "client-amc-11",
  "client-lead-18",
]);

const twoPropertyClientIds = new Set([
  "client-2",
  "client-amc-3",
  "client-amc-9",
  "client-amc-17",
  "client-walkin-4",
  "client-walkin-12",
  "client-walkin-24",
  "client-lead-6",
  "client-lead-14",
  "client-lead-25",
]);

function createDemoProperty(
  client: ClientRecord,
  index: number,
  propertyNumber: number
): PropertyRecord {
  const location = propertyLocations[(index + propertyNumber) % propertyLocations.length];
  const isBuilding = client.company && propertyNumber === 1;
  const id =
    client.id === "client-1" && propertyNumber === 1
      ? "property-1"
      : client.id === "client-2" && propertyNumber === 1
        ? "property-2"
        : `property-${client.id}-${propertyNumber}`;

  return {
    id,
    clientId: client.id,
    title:
      client.id === "client-1" && propertyNumber === 1
        ? "Villa 42"
        : client.id === "client-2" && propertyNumber === 1
          ? "Building B"
          : isBuilding
            ? `Building ${String.fromCharCode(64 + ((index % 6) + 1))}`
            : `Villa ${20 + index}${propertyNumber > 1 ? `-${propertyNumber}` : ""}`,
    villaNumber:
      client.id === "client-1" && propertyNumber === 1
        ? "42"
        : client.id === "client-2" && propertyNumber === 1
          ? "B"
          : `${20 + index}${propertyNumber > 1 ? `-${propertyNumber}` : ""}`,
    area: location.area,
    community: location.community,
    phase: location.phase,
    rooms: isBuilding ? 12 + (index % 12) : 2 + (index % 5),
    acUnits: isBuilding ? 16 + (index % 15) : 3 + (index % 6),
    mapLink: "https://maps.google.com",
    accessNotes:
      propertyNumber > 1
        ? "Second property under same client. Confirm access before visit."
        : "Call customer before arrival and confirm access.",
    parkingNotes: isBuilding
      ? "Use visitor or basement parking."
      : "Park near villa service entrance.",
    gateAccess:
      client.id === "client-1" && propertyNumber === 1
        ? "Security approval by WhatsApp."
        : "Community security may request job card.",
  };
}

export const demoProperties: PropertyRecord[] = demoClients.flatMap(
  (client, index) => {
    if (noPropertyClientIds.has(client.id)) {
      return [];
    }

    const propertyCount = twoPropertyClientIds.has(client.id) ? 2 : 1;

    return Array.from({ length: propertyCount }, (_, propertyIndex) =>
      createDemoProperty(client, index, propertyIndex + 1)
    );
  }
);

export const initialStore: AmcStore = {
  clients: demoClients,
  properties: demoProperties,
  communities: Array.from(
    new Set(
      defaultLocationAreas.flatMap((area) =>
        area.communities.map((community) => community.name)
      )
    )
  ),
  areas: defaultLocationAreas.map((area) => area.name),
  locationAreas: defaultLocationAreas,
  plans: ["Silver", "Gold", "Platinum"],
  planRules: [
    {
      name: "Silver",
      acServices: 1,
      ductCleanings: 1,
      waterTankCleanings: 1,
      solarHeaterCleanings: 1,
    },
    {
      name: "Gold",
      acServices: 2,
      ductCleanings: 2,
      waterTankCleanings: 2,
      solarHeaterCleanings: 2,
    },
    {
      name: "Platinum",
      acServices: 3,
      ductCleanings: 3,
      waterTankCleanings: 2,
      solarHeaterCleanings: 2,
    },
  ],
  crmSettings: {
    company: {
      name: "3Sixty Renovations",
      logoUrl: "",
      trn: "100000000000003",
      address: "Dubai, United Arab Emirates",
      phone: "+971 50 236 5485",
      email: "info@3sixtyrenovations.ae",
      bankDetails: "Bank name, IBAN and account details",
      stampSignatureUrl: "",
    },
    amc: {
      ppmFrequency: "Based on selected AMC plan",
      includedServices:
        "AC service, duct cleaning, water tank cleaning, solar heater cleaning",
      exclusions: "Major spare parts, authority approvals, structural works",
      slaResponseTime: "4 hours emergency, 24 hours standard",
      renewalReminderDays: 30,
    },
    serviceJobs: {
      categories: "AC Cleaning, Plumbing, Electrical, Civil, Emergency",
      acCleaningPrice: 350,
      inspectionCharge: 150,
      emergencyCharge: 250,
      minimumVisitCharge: 150,
    },
    tickets: {
      priorityLevels: "Low, Normal, High, Emergency",
      statusWorkflow: "Open, In Progress, Waiting Customer, Resolved, Closed",
      complaintTypes: "Quality, Delay, Revisit, Warranty, Emergency",
      emergencyRules: "Emergency tickets must be assigned immediately.",
    },
    invoices: {
      vatRate: 5,
      invoicePrefix: "INV",
      receiptPrefix: "RCT",
      paymentTerms: "Due on receipt unless otherwise agreed.",
      autoNumbering: true,
    },
    quotations: {
      termsConditions:
        "Quotation is subject to site inspection and material availability.",
      warrantyText: "30 days workmanship warranty unless otherwise stated.",
      validityDays: 15,
      defaultPaymentSchedule: "50% advance, 50% after completion",
    },
    whatsappTemplates: {
      jobCreated: "Your service job has been created. Ref: {{job_id}}",
      technicianAssigned:
        "{{technician_name}} has been assigned to your service job.",
      technicianOnTheWay:
        "Our technician is on the way to your property. Map: {{map_link}}",
      jobCompleted: "Your service job has been completed. Thank you.",
      invoiceSent: "Your invoice {{invoice_no}} has been sent. Amount: {{amount}}",
      amcRenewalReminder:
        "Your AMC contract is due for renewal on {{renewal_date}}.",
    },
  },
  contracts: [
    {
      id: "contract-1",
      clientId: "client-1",
      propertyId: "property-1",
      plan: "Gold",
      type: "Full villa AMC",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      lastAcServiceDate: "2026-01-15",
      lastDuctCleaningDate: "2026-01-15",
      lastWaterTankCleaningDate: "2026-01-20",
      lastSolarHeaterCleaningDate: "2026-01-20",
      includedAcServices: 2,
      includedDuctCleanings: 2,
      includedWaterTankCleanings: 2,
      includedSolarHeaterCleanings: 2,
      customPlanNotes: "",
      visits: 6,
      included: "AC, plumbing, electrical checks, minor civil inspection",
      excluded: "Major materials, authority approvals, structural works",
      warranty: "30 days workmanship",
      emergencySupport: "24/7 call-out support",
      sla: "4 hours emergency, 24 hours standard",
      value: 8500,
      status: "Active",
    },
  ],
  technicians: [
    {
      id: "tech-1",
      name: "Rashid Khan",
      phone: "+971 52 100 2233",
      trade: "AC Technician",
      status: "Available",
      todayCapacity: 5,
    },
    {
      id: "tech-2",
      name: "Sameer Ali",
      phone: "+971 56 880 4422",
      trade: "Plumber",
      status: "Busy",
      todayCapacity: 4,
    },
  ],
  jobs: [
    {
      id: "job-1",
      clientId: "client-1",
      propertyId: "property-1",
      technicianId: "tech-1",
      title: "AC AMC preventive visit",
      priority: "Normal",
      status: "Assigned",
      scheduledDate: "2026-05-24",
      scheduledTime: "08:30",
      clockIn: "",
      clockOut: "",
      navigationLink: "https://maps.google.com",
      checklist: "Filter cleaning, drain line check, cooling inspection",
      remarks: "",
      materialsUsed: "",
      beforePhotos: "",
      afterPhotos: "",
      customerSignature: "",
    },
  ],
  quotations: [
    {
      id: "quote-1",
      clientId: "client-1",
      propertyId: "property-1",
      template: "AC maintenance",
      items: "Full villa AC preventive maintenance package",
      labor: 1200,
      materials: 300,
      vatRate: 5,
      warranty: "30 days workmanship",
      paymentTerms: "50% advance, 50% after completion",
      status: "Sent",
      approvalName: "",
      approvalDate: "",
    },
  ],
  invoices: [
    {
      id: "invoice-1",
      clientId: "client-1",
      quotationId: "quote-1",
      description: "AC maintenance quotation invoice",
      subtotal: 1500,
      vatRate: 5,
      trn: "100000000000003",
      paidAmount: 750,
      dueDate: "2026-06-01",
      reminderDate: "2026-05-29",
      status: "Partially Paid",
    },
  ],
  inventory: [
    {
      id: "stock-1",
      item: "AC filters",
      category: "AC",
      stock: 18,
      unit: "pcs",
      reorderLevel: 10,
      supplier: "Dubai HVAC Supplies",
    },
  ],
  expenses: [
    {
      id: "expense-1",
      date: "2026-05-24",
      category: "AC parts",
      vendor: "Dubai HVAC Supplies",
      description: "Filters and drain cleaning consumables",
      amount: 220,
      vatRate: 5,
      jobId: "job-1",
      receiptUrl: "",
    },
  ],
  complaints: [
    {
      id: "complaint-1",
      clientId: "client-1",
      propertyId: "property-1",
      jobId: "job-1",
      issue: "Customer requested faster AC follow-up timing",
      openedDate: "2026-05-20",
      resolvedDate: "2026-05-22",
      status: "Resolved",
      resolutionNotes: "Technician visit slot adjusted for morning schedule.",
    },
  ],
};

export function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.round(Math.random() * 10000)}`;
}
