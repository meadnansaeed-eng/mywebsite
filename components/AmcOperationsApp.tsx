"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Banknote,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  ClipboardCheck,
  Clock3,
  CreditCard,
  Edit3,
  Eye,
  FileDown,
  FileText,
  FileClock,
  Fuel,
  Gauge,
  Home,
  MapPin,
  MessageSquareWarning,
  Navigation,
  Package,
  Plus,
  Receipt,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Truck,
  UserRoundCheck,
  Users,
  Wallet,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  demoClients,
  demoContracts,
  demoProperties,
  initialStore,
  makeId,
  type AmcStore,
  type ClientRecord,
  type ContractRecord,
  type ComplaintRecord,
  type CrmSettings,
  type ExpenseRecord,
  type DriverRecord,
  type FuelLogRecord,
  type InventoryRecord,
  type InvoiceRecord,
  type JobRecord,
  type LocationArea,
  type PlanRule,
  type PropertyRecord,
  type QuotationRecord,
  type TechnicianRecord,
  type VehicleRecord,
} from "@/lib/amcStore";

type ModuleKey =
  | "dashboard"
  | "clients"
  | "properties"
  | "contracts"
  | "ppm"
  | "jobs"
  | "renovation"
  | "technicians"
  | "fleet"
  | "quotations"
  | "invoices"
  | "inventory"
  | "expenses"
  | "complaints"
  | "settings"
  | "reports";

type FormMode = "create" | "edit";

type RecordCollectionKey =
  | "clients"
  | "properties"
  | "contracts"
  | "technicians"
  | "vehicles"
  | "drivers"
  | "fuelLogs"
  | "jobs"
  | "quotations"
  | "invoices"
  | "inventory"
  | "expenses"
  | "complaints";

type DashboardStats = {
  clients: number;
  amcClients: number;
  walkInClients: number;
  leads: number;
  properties: number;
  activeContracts: number;
  expiringContracts: number;
  ppmDueThisWeek: number;
  overduePpm: number;
  emergencyJobs: number;
  pendingJobs: number;
  completedJobs: number;
  pendingQuotations: number;
  quoteValue: number;
  invoiceValue: number;
  paid: number;
  outstanding: number;
  cashCollected: number;
  earnedAmcRevenue: number;
  nonAmcRevenue: number;
  technicianAvailable: number;
  lowStock: number;
  expenses: number;
  renewalRate: number;
  complaintResolutionDays: number;
  occupiedVehicles: number;
  availableVehicles: number;
  fuelSpend: number;
};

type ClientType = ClientRecord["clientType"];

const clientTypes: ClientType[] = [
  "AMC Client",
  "Walk-in",
  "Lead",
];

const storageKey = "amc-operations-store-v1";

const modules: { key: ModuleKey; label: string; icon: LucideIcon }[] = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "clients", label: "Clients", icon: Users },
  { key: "properties", label: "Properties", icon: MapPin },
  { key: "contracts", label: "AMC Contracts", icon: ShieldCheck },
  { key: "ppm", label: "PPM Schedule", icon: CalendarClock },
  { key: "jobs", label: "Service Jobs", icon: Wrench },
  { key: "renovation", label: "Renovation Projects", icon: Building2 },
  { key: "technicians", label: "Technicians", icon: UserRoundCheck },
  { key: "fleet", label: "Fleet", icon: Truck },
  { key: "quotations", label: "Quotations", icon: FileText },
  { key: "invoices", label: "Invoices & Payments", icon: Banknote },
  { key: "expenses", label: "Expenses", icon: CreditCard },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "complaints", label: "Tickets", icon: MessageSquareWarning },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "reports", label: "Reports", icon: ClipboardCheck },
];

const panelIcons: Record<string, LucideIcon> = {
  Clients: Users,
  Properties: Building2,
  "AMC Contracts": ShieldCheck,
  "Service Jobs": Wrench,
  Technicians: UserRoundCheck,
  Fleet: Truck,
  Vehicles: Truck,
  Drivers: UserRoundCheck,
  "Fuel Logs": Fuel,
  Quotations: FileText,
  "Invoices & Payments": Banknote,
  Expenses: CreditCard,
  Inventory: Package,
  Complaints: MessageSquareWarning,
  Settings,
  "Linked Properties": Building2,
  "AMC Contracts Profile": ShieldCheck,
  "Service Jobs Profile": Wrench,
  "Invoices & Payments Profile": Banknote,
};

const reportIcons: Record<string, LucideIcon> = {
  Clients: Users,
  Properties: Building2,
  "Active Contracts": ShieldCheck,
  "Pending Jobs": Clock3,
  Revenue: Banknote,
  Outstanding: AlertTriangle,
  "Quotation Pipeline": FileText,
  "Invoice Revenue": Receipt,
  "Paid Collected": Wallet,
  "Low Stock Items": Package,
  Expenses: CreditCard,
  "Occupied Vehicles": Truck,
  "Fuel Spend": Fuel,
  "Complaint Resolution": MessageSquareWarning,
  Contracts: ShieldCheck,
  Jobs: Wrench,
  "Invoice Total": Banknote,
};

const sectionHeaderTone = "bg-teal-700 text-white";
const sectionIconTone = "bg-white/15 text-white";

const clientBlank: ClientRecord = {
  id: "",
  name: "",
  clientType: "Walk-in",
  phone: "",
  whatsapp: "",
  email: "",
  company: "",
  notes: "",
};

const propertyBlank: PropertyRecord = {
  id: "",
  clientId: "",
  title: "",
  villaNumber: "",
  community: "",
  area: "",
  phase: "",
  rooms: 0,
  acUnits: 0,
  mapLink: "",
  accessNotes: "",
  parkingNotes: "",
  gateAccess: "",
};

const contractBlank: ContractRecord = {
  id: "",
  clientId: "",
  propertyId: "",
  plan: "Silver",
  type: "Full villa AMC",
  startDate: "",
  endDate: "",
  lastAcServiceDate: "",
  lastDuctCleaningDate: "",
  lastWaterTankCleaningDate: "",
  lastSolarHeaterCleaningDate: "",
  includedAcServices: 1,
  includedDuctCleanings: 1,
  includedWaterTankCleanings: 1,
  includedSolarHeaterCleanings: 1,
  customPlanNotes: "",
  visits: 4,
  included: "",
  excluded: "",
  warranty: "",
  emergencySupport: "",
  sla: "",
  value: 0,
  status: "Active",
};

const technicianBlank: TechnicianRecord = {
  id: "",
  name: "",
  phone: "",
  trade: "",
  status: "Available",
  todayCapacity: 4,
};

const jobBlank: JobRecord = {
  id: "",
  clientId: "",
  propertyId: "",
  technicianId: "",
  teamTechnicianIds: "",
  vehicleId: "",
  driverId: "",
  openingMileage: 0,
  closingMileage: 0,
  title: "",
  priority: "Normal",
  status: "Pending",
  scheduledDate: "",
  scheduledTime: "",
  clockIn: "",
  clockOut: "",
  navigationLink: "",
  checklist: "",
  remarks: "",
  materialsUsed: "",
  beforePhotos: "",
  afterPhotos: "",
  customerSignature: "",
};

const vehicleBlank: VehicleRecord = {
  id: "",
  code: "",
  plateNumber: "",
  type: "Van",
  status: "Available",
  currentMileage: 0,
  registrationExpiry: "",
  insuranceExpiry: "",
  notes: "",
};

const driverBlank: DriverRecord = {
  id: "",
  name: "",
  phone: "",
  licenseNumber: "",
  status: "Available",
};

const fuelBlank: FuelLogRecord = {
  id: "",
  vehicleId: "",
  driverId: "",
  jobId: "",
  date: "",
  odometer: 0,
  litres: 0,
  amount: 0,
  station: "",
  receiptUrl: "",
  notes: "",
};

const quoteBlank: QuotationRecord = {
  id: "",
  clientId: "",
  propertyId: "",
  template: "Renovation",
  items: "",
  labor: 0,
  materials: 0,
  vatRate: 5,
  warranty: "",
  paymentTerms: "",
  status: "Draft",
  approvalName: "",
  approvalDate: "",
};

const invoiceBlank: InvoiceRecord = {
  id: "",
  clientId: "",
  quotationId: "",
  description: "",
  subtotal: 0,
  vatRate: 5,
  trn: "",
  paidAmount: 0,
  dueDate: "",
  reminderDate: "",
  status: "Pending",
};

const inventoryBlank: InventoryRecord = {
  id: "",
  item: "",
  category: "",
  stock: 0,
  unit: "pcs",
  reorderLevel: 0,
  supplier: "",
};

const expenseBlank: ExpenseRecord = {
  id: "",
  date: "",
  category: "Consumables",
  vendor: "",
  description: "",
  amount: 0,
  vatRate: 5,
  jobId: "",
  receiptUrl: "",
};

const complaintBlank: ComplaintRecord = {
  id: "",
  clientId: "",
  propertyId: "",
  jobId: "",
  issue: "",
  openedDate: "",
  resolvedDate: "",
  status: "Open",
  resolutionNotes: "",
};

function money(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function totalWithVat(subtotal: number, vatRate: number) {
  return subtotal + subtotal * (vatRate / 100);
}

function isExpiring(date: string) {
  if (!date) return false;
  const end = new Date(date).getTime();
  const now = new Date().getTime();
  const days = (end - now) / 86400000;
  return days >= 0 && days <= 45;
}

function getPlanRule(planName: string): PlanRule {
  const defaultRule = initialStore.planRules.find(
    (rule) => rule.name.toLowerCase() === planName.toLowerCase()
  );

  return (
    defaultRule || {
      name: planName,
      acServices: 1,
      ductCleanings: 1,
      waterTankCleanings: 1,
      solarHeaterCleanings: 1,
    }
  );
}

function serviceVisitsPerYear(contract: ContractRecord, service: ServiceKey) {
  const planRule = getPlanRule(contract.plan || "Silver");

  if (service === "ac") {
    return contract.includedAcServices || planRule.acServices;
  }
  if (service === "duct") {
    return contract.includedDuctCleanings || planRule.ductCleanings;
  }
  if (service === "tank") {
    return contract.includedWaterTankCleanings || planRule.waterTankCleanings;
  }

  return contract.includedSolarHeaterCleanings || planRule.solarHeaterCleanings;
}

type ServiceKey = "ac" | "duct" | "tank" | "solar";

const serviceLabels: Record<ServiceKey, string> = {
  ac: "AC Service",
  duct: "Duct Cleaning",
  tank: "Water Tank Cleaning",
  solar: "Solar Heater Cleaning",
};

function lastServiceDate(contract: ContractRecord, service: ServiceKey) {
  if (service === "ac") return contract.lastAcServiceDate;
  if (service === "duct") return contract.lastDuctCleaningDate;
  if (service === "tank") return contract.lastWaterTankCleaningDate;
  return contract.lastSolarHeaterCleaningDate;
}

function nextServiceDueDate(contract: ContractRecord, service: ServiceKey) {
  const baseDate = lastServiceDate(contract, service) || contract.startDate;
  if (!baseDate) return "";

  const visits = Math.max(serviceVisitsPerYear(contract, service), 1);
  const intervalMonths = 12 / visits;
  const due = new Date(baseDate);
  due.setMonth(due.getMonth() + intervalMonths);

  return due.toISOString().slice(0, 10);
}

function nextAcDueDate(contract: ContractRecord) {
  return nextServiceDueDate(contract, "ac");
}

function contractServiceRows(contract: ContractRecord) {
  const services: ServiceKey[] = ["ac", "duct", "tank", "solar"];

  return services.map((service) => {
    const dueDate = nextServiceDueDate(contract, service);
    const status = dueStatus(dueDate);

    return {
      service,
      label: serviceLabels[service],
      visits: serviceVisitsPerYear(contract, service),
      lastDate: lastServiceDate(contract, service),
      dueDate,
      status,
    };
  });
}

function dueStatus(dueDate: string) {
  if (!dueDate) {
    return {
      label: "Not scheduled",
      tone: "bg-slate-100 text-slate-700 ring-slate-200",
      days: null,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const days = Math.ceil((due.getTime() - today.getTime()) / 86400000);

  if (days < 0) {
    return {
      label: `${Math.abs(days)} days overdue`,
      tone: "bg-red-50 text-red-700 ring-red-200",
      days,
    };
  }

  if (days <= 7) {
    return {
      label: `${days} days left`,
      tone: "bg-red-50 text-red-700 ring-red-200",
      days,
    };
  }

  if (days <= 30) {
    return {
      label: `${days} days left`,
      tone: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      days,
    };
  }

  return {
    label: `${days} days left`,
    tone: "bg-blue-50 text-blue-700 ring-blue-200",
    days,
  };
}

function clientTypeTone(clientType: ClientType) {
  if (clientType === "AMC Client") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (clientType === "Lead") {
    return "bg-amber-50 text-amber-700 ring-amber-200";
  }

  return "bg-blue-50 text-blue-700 ring-blue-200";
}

function normalizeClientType(value: string | undefined): ClientType {
  if (value === "AMC Client" || value === "Lead" || value === "Walk-in") {
    return value;
  }

  if (value === "One-Time / Walk-in") {
    return "Walk-in";
  }

  return "Walk-in";
}

function sortClientsForDisplay(clients: ClientRecord[]) {
  const demoOrder = new Map(
    demoClients.map((client, index) => [client.id, index])
  );

  return [...clients].sort((a, b) => {
    const aOrder = demoOrder.get(a.id);
    const bOrder = demoOrder.get(b.id);

    if (aOrder !== undefined && bOrder !== undefined) {
      return aOrder - bOrder;
    }
    if (aOrder !== undefined) return 1;
    if (bOrder !== undefined) return -1;

    return 0;
  });
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

function buildLocationAreas(saved: Partial<AmcStore>): LocationArea[] {
  if (saved.locationAreas?.length) {
    return saved.locationAreas.map((area) => ({
      ...area,
      communities: area.communities.map((community) => ({
        ...community,
        phases: uniqueSorted(community.phases || []),
      })),
    }));
  }

  const areaNames = uniqueSorted([
    ...initialStore.locationAreas.map((area) => area.name),
    ...(saved.areas || []),
    ...(saved.properties || []).map((property) => property.area),
  ]);

  return areaNames.map((areaName) => {
    const initialArea = initialStore.locationAreas.find(
      (area) => area.name === areaName
    );
    const propertyCommunities = (saved.properties || [])
      .filter((property) => property.area === areaName)
      .map((property) => property.community);
    const communityNames = uniqueSorted([
      ...(initialArea?.communities.map((community) => community.name) || []),
      ...(areaName === "Wadi Al Safa 5" ? ["Villanova"] : []),
      ...propertyCommunities,
    ]);

    return {
      name: areaName,
      communities: communityNames.map((communityName) => {
        const initialCommunity = initialArea?.communities.find(
          (community) => community.name === communityName
        );
        const propertyPhases = (saved.properties || [])
          .filter(
            (property) =>
              property.area === areaName && property.community === communityName
          )
          .map((property) => property.phase);

        return {
          name: communityName,
          phases: uniqueSorted([
            ...(initialCommunity?.phases || []),
            ...propertyPhases,
          ]),
        };
      }),
    };
  });
}

function normalizeStore(saved: Partial<AmcStore>): AmcStore {
  const savedContracts = saved.contracts || [];
  const clients = (saved.clients || []).map((client) => ({
    ...client,
    clientType: savedContracts.some((contract) => contract.clientId === client.id)
      ? "AMC Client"
      : normalizeClientType((client as ClientRecord & { clientType?: string }).clientType),
  }));
  const clientIds = new Set(clients.map((client) => client.id));
  const mergedClients = [
    ...clients,
    ...demoClients.filter((client) => !clientIds.has(client.id)),
  ];
  const sortedClients = sortClientsForDisplay(mergedClients);
  const locationAreas = buildLocationAreas(saved);
  const areas = uniqueSorted(locationAreas.map((area) => area.name));
  const communities = uniqueSorted(
    locationAreas.flatMap((area) =>
      area.communities.map((community) => community.name)
    )
  );
  const savedProperties = (saved.properties || []).map((property) => ({
    ...property,
    phase: property.phase || "",
    rooms: property.rooms || 0,
    acUnits: property.acUnits || 0,
  }));
  const propertyIds = new Set(savedProperties.map((property) => property.id));
  const mergedProperties = [
    ...savedProperties,
    ...demoProperties.filter((property) => !propertyIds.has(property.id)),
  ];
  const savedContractIds = new Set(savedContracts.map((contract) => contract.id));
  const mergedContracts = [
    ...savedContracts,
    ...demoContracts.filter((contract) => !savedContractIds.has(contract.id)),
  ];

  return {
    ...initialStore,
    ...saved,
    clients: sortedClients,
    properties: mergedProperties,
    contracts: mergedContracts,
    technicians: saved.technicians || [],
    vehicles: saved.vehicles || initialStore.vehicles,
    drivers: saved.drivers || initialStore.drivers,
    jobs: (saved.jobs || []).map((job) => ({
      ...job,
      teamTechnicianIds: job.teamTechnicianIds || job.technicianId || "",
      vehicleId: job.vehicleId || "",
      driverId: job.driverId || "",
      openingMileage: job.openingMileage || 0,
      closingMileage: job.closingMileage || 0,
    })),
    quotations: saved.quotations || [],
    invoices: saved.invoices || [],
    inventory: saved.inventory || [],
    expenses: saved.expenses || [],
    complaints: saved.complaints || [],
    fuelLogs: saved.fuelLogs || initialStore.fuelLogs,
  communities,
  areas,
  locationAreas,
  plans: saved.plans || initialStore.plans,
    planRules:
      saved.planRules ||
      (saved.plans || initialStore.plans).map((name) => getPlanRule(name)),
    crmSettings: {
      ...initialStore.crmSettings,
      ...saved.crmSettings,
      company: {
        ...initialStore.crmSettings.company,
        ...saved.crmSettings?.company,
      },
      amc: {
        ...initialStore.crmSettings.amc,
        ...saved.crmSettings?.amc,
      },
      serviceJobs: {
        ...initialStore.crmSettings.serviceJobs,
        ...saved.crmSettings?.serviceJobs,
      },
      tickets: {
        ...initialStore.crmSettings.tickets,
        ...saved.crmSettings?.tickets,
      },
      invoices: {
        ...initialStore.crmSettings.invoices,
        ...saved.crmSettings?.invoices,
      },
      quotations: {
        ...initialStore.crmSettings.quotations,
        ...saved.crmSettings?.quotations,
      },
      whatsappTemplates: {
        ...initialStore.crmSettings.whatsappTemplates,
        ...saved.crmSettings?.whatsappTemplates,
      },
    },
  };
}

export default function AmcOperationsApp() {
  const [store, setStore] = useState<AmcStore>(initialStore);
  const storageLoaded = useRef(false);
  const [active, setActive] = useState<ModuleKey>("dashboard");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [clientTypeFilter, setClientTypeFilter] = useState<"All" | ClientType>(
    "All"
  );

  const [clientForm, setClientForm] = useState<ClientRecord>(clientBlank);
  const [propertyForm, setPropertyForm] =
    useState<PropertyRecord>(propertyBlank);
  const [contractForm, setContractForm] =
    useState<ContractRecord>(contractBlank);
  const [technicianForm, setTechnicianForm] =
    useState<TechnicianRecord>(technicianBlank);
  const [jobForm, setJobForm] = useState<JobRecord>(jobBlank);
  const [vehicleForm, setVehicleForm] = useState<VehicleRecord>(vehicleBlank);
  const [driverForm, setDriverForm] = useState<DriverRecord>(driverBlank);
  const [fuelForm, setFuelForm] = useState<FuelLogRecord>(fuelBlank);
  const [quoteForm, setQuoteForm] = useState<QuotationRecord>(quoteBlank);
  const [invoiceForm, setInvoiceForm] = useState<InvoiceRecord>(invoiceBlank);
  const [inventoryForm, setInventoryForm] =
    useState<InventoryRecord>(inventoryBlank);
  const [expenseForm, setExpenseForm] = useState<ExpenseRecord>(expenseBlank);
  const [complaintForm, setComplaintForm] =
    useState<ComplaintRecord>(complaintBlank);
  const [communityInput, setCommunityInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [phaseInput, setPhaseInput] = useState("");
  const [selectedSettingsArea, setSelectedSettingsArea] = useState(
    initialStore.locationAreas[0]?.name || ""
  );
  const [selectedSettingsCommunity, setSelectedSettingsCommunity] = useState(
    initialStore.locationAreas[0]?.communities[0]?.name || ""
  );
  const [planInput, setPlanInput] = useState("");
  const [communitySearch, setCommunitySearch] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [planSearch, setPlanSearch] = useState("");

  const [formMode, setFormMode] = useState<FormMode>("create");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (saved) {
      window.setTimeout(() => {
        setStore(normalizeStore(JSON.parse(saved) as Partial<AmcStore>));
      }, 0);
    }

    storageLoaded.current = true;
  }, []);

  useEffect(() => {
    if (storageLoaded.current) {
      window.localStorage.setItem(storageKey, JSON.stringify(store));
    }
  }, [store]);

  const clientName = (id: string) =>
    store.clients.find((client) => client.id === id)?.name || "Unassigned";
  const propertyName = (id: string) =>
    store.properties.find((property) => property.id === id)?.title ||
    "Unassigned";
  const propertyOptionsForClient = (clientId: string) =>
    store.properties
      .filter((property) => !clientId || property.clientId === clientId)
      .map((property) => [property.id, property.title]);
  const communitiesForArea = (areaName: string) =>
    store.locationAreas.find((area) => area.name === areaName)?.communities ||
    [];
  const phasesForCommunity = (areaName: string, communityName: string) =>
    communitiesForArea(areaName).find(
      (community) => community.name === communityName
    )?.phases || [];
  const technicianName = (id: string) =>
    store.technicians.find((technician) => technician.id === id)?.name ||
    "Unassigned";
  const vehicleName = (id: string) =>
    store.vehicles.find((vehicle) => vehicle.id === id)?.code || "Unassigned";
  const driverName = (id: string) =>
    store.drivers.find((driver) => driver.id === id)?.name || "Unassigned";
  const technicianTeamName = (ids: string) =>
    ids
      .split(",")
      .map((id) => technicianName(id.trim()))
      .filter((name) => name !== "Unassigned")
      .join(", ") || "Unassigned";

  const stats = useMemo(() => {
    const quoteValue = store.quotations.reduce(
      (sum, quote) => sum + totalWithVat(quote.labor + quote.materials, quote.vatRate),
      0
    );
    const invoiceValue = store.invoices.reduce(
      (sum, invoice) => sum + totalWithVat(invoice.subtotal, invoice.vatRate),
      0
    );
    const paid = store.invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
    const ppmRows = store.contracts.flatMap((contract) =>
      contractServiceRows({ ...contractBlank, ...contract })
    );
    const ppmDueThisWeek = ppmRows.filter(
      (row) => row.status.days !== null && row.status.days >= 0 && row.status.days <= 7
    ).length;
    const overduePpm = ppmRows.filter(
      (row) => row.status.days !== null && row.status.days < 0
    ).length;
    const earnedAmcRevenue = store.contracts
      .filter((contract) => contract.status === "Active")
      .reduce((sum, contract) => sum + contract.value / 12, 0);
    const nonAmcRevenue = store.invoices.reduce((sum, invoice) => {
      const client = store.clients.find((item) => item.id === invoice.clientId);

      return client?.clientType === "AMC Client"
        ? sum
        : sum + totalWithVat(invoice.subtotal, invoice.vatRate);
    }, 0);
    const expenseValue = store.expenses.reduce(
      (sum, expense) => sum + totalWithVat(expense.amount, expense.vatRate),
      0
    );
    const contractsWithStatus = store.contracts.filter(
      (contract) => contract.status === "Active" || contract.status === "Expired"
    );
    const renewalRate = contractsWithStatus.length
      ? Math.round(
          (store.contracts.filter((contract) => contract.status === "Active")
            .length /
            contractsWithStatus.length) *
            100
        )
      : 0;
    const resolvedComplaints = store.complaints.filter(
      (complaint) => complaint.openedDate && complaint.resolvedDate
    );
    const complaintResolutionDays = resolvedComplaints.length
      ? Math.round(
          resolvedComplaints.reduce((sum, complaint) => {
            const opened = new Date(complaint.openedDate).getTime();
            const resolved = new Date(complaint.resolvedDate).getTime();
            return sum + Math.max((resolved - opened) / 86400000, 0);
          }, 0) / resolvedComplaints.length
        )
      : 0;

    return {
      clients: store.clients.length,
      amcClients: store.clients.filter(
        (client) => client.clientType === "AMC Client"
      ).length,
      walkInClients: store.clients.filter(
        (client) => client.clientType === "Walk-in"
      ).length,
      leads: store.clients.filter((client) => client.clientType === "Lead")
        .length,
      properties: store.properties.length,
      activeContracts: store.contracts.filter(
        (contract) => contract.status === "Active"
      ).length,
      expiringContracts: store.contracts.filter((contract) =>
        isExpiring(contract.endDate)
      ).length,
      ppmDueThisWeek,
      overduePpm,
      emergencyJobs: store.jobs.filter((job) => job.priority === "Emergency")
        .length,
      pendingJobs: store.jobs.filter((job) => job.status !== "Completed").length,
      completedJobs: store.jobs.filter((job) => job.status === "Completed")
        .length,
      pendingQuotations: store.quotations.filter(
        (quote) => quote.status === "Draft" || quote.status === "Sent"
      ).length,
      quoteValue,
      invoiceValue,
      paid,
      outstanding: Math.max(invoiceValue - paid, 0),
      cashCollected: paid,
      earnedAmcRevenue,
      nonAmcRevenue,
      technicianAvailable: store.technicians.filter(
        (technician) => technician.status === "Available"
      ).length,
      lowStock: store.inventory.filter(
        (item) => item.stock <= item.reorderLevel
      ).length,
      expenses: expenseValue,
      renewalRate,
      complaintResolutionDays,
      occupiedVehicles: store.vehicles.filter(
        (vehicle) => vehicle.status === "Occupied"
      ).length,
      availableVehicles: store.vehicles.filter(
        (vehicle) => vehicle.status === "Available"
      ).length,
      fuelSpend: store.fuelLogs.reduce((sum, log) => sum + log.amount, 0),
    };
  }, [store]);

  function upsert<K extends RecordCollectionKey>(
    key: K,
    record: AmcStore[K][number],
    blank: AmcStore[K][number],
    prefix: string,
    reset: (value: never) => void
  ) {
    const existingId = record.id;
    const nextRecord = {
      ...record,
      id: existingId || makeId(prefix),
    } as AmcStore[K][number];

    setStore((current) => ({
      ...current,
      [key]: existingId
        ? current[key].map((item) =>
            item.id === existingId ? nextRecord : item
          )
        : [nextRecord, ...current[key]],
    }));
    reset(blank as never);
    setFormMode("create");
    setFormOpen(false);
  }

  function remove<K extends RecordCollectionKey>(key: K, id: string) {
    setStore((current) => ({
      ...current,
      [key]: current[key].filter((item) => item.id !== id),
    }));
  }

  function saveContract() {
    const existingId = contractForm.id;
    const nextContract = {
      ...contractBlank,
      ...contractForm,
      id: existingId || makeId("contract"),
    };

    setStore((current) => ({
      ...current,
      clients: current.clients.map((client) =>
        client.id === nextContract.clientId
          ? { ...client, clientType: "AMC Client" }
          : client
      ),
      contracts: existingId
        ? current.contracts.map((contract) =>
            contract.id === existingId ? nextContract : contract
          )
        : [nextContract, ...current.contracts],
    }));
    setContractForm(contractBlank);
    setFormMode("create");
    setFormOpen(false);
  }

  function resetAllData() {
    setStore(initialStore);
    window.localStorage.setItem(storageKey, JSON.stringify(initialStore));
  }

  function addSettingListItem(
    key: "communities" | "areas" | "plans",
    value: string,
    reset: (value: string) => void
  ) {
    const cleanValue = value.trim();

    if (!cleanValue) return;

    setStore((current) => {
      const existing = current[key].map((item) => item.toLowerCase());

      if (existing.includes(cleanValue.toLowerCase())) {
        return current;
      }

      const next = {
        ...current,
        [key]: [...current[key], cleanValue].sort((a, b) =>
          a.localeCompare(b)
        ),
      };

      if (key === "plans") {
        return {
          ...next,
          planRules: [...current.planRules, getPlanRule(cleanValue)],
        };
      }

      return next;
    });
    reset("");
  }

  function removeSettingListItem(
    key: "communities" | "areas" | "plans",
    value: string
  ) {
    setStore((current) => ({
      ...current,
      [key]: current[key].filter((item) => item !== value),
      planRules:
        key === "plans"
          ? current.planRules.filter((rule) => rule.name !== value)
          : current.planRules,
    }));
  }

  function addLocationArea(value: string) {
    const cleanValue = value.trim();
    if (!cleanValue) return;

    setStore((current) => {
      if (
        current.locationAreas.some(
          (area) => area.name.toLowerCase() === cleanValue.toLowerCase()
        )
      ) {
        return current;
      }

      const locationAreas = [
        ...current.locationAreas,
        { name: cleanValue, communities: [] },
      ].sort((a, b) => a.name.localeCompare(b.name));

      return {
        ...current,
        locationAreas,
        areas: uniqueSorted(locationAreas.map((area) => area.name)),
      };
    });
    setSelectedSettingsArea(cleanValue);
    setSelectedSettingsCommunity("");
    setAreaInput("");
  }

  function addLocationCommunity(areaName: string, value: string) {
    const cleanValue = value.trim();
    if (!areaName || !cleanValue) return;

    setStore((current) => {
      const locationAreas = current.locationAreas.map((area) => {
        if (area.name !== areaName) return area;
        if (
          area.communities.some(
            (community) =>
              community.name.toLowerCase() === cleanValue.toLowerCase()
          )
        ) {
          return area;
        }

        return {
          ...area,
          communities: [
            ...area.communities,
            { name: cleanValue, phases: [] },
          ].sort((a, b) => a.name.localeCompare(b.name)),
        };
      });

      return {
        ...current,
        locationAreas,
        communities: uniqueSorted(
          locationAreas.flatMap((area) =>
            area.communities.map((community) => community.name)
          )
        ),
      };
    });
    setSelectedSettingsCommunity(cleanValue);
    setCommunityInput("");
  }

  function addLocationPhase(
    areaName: string,
    communityName: string,
    value: string
  ) {
    const cleanValue = value.trim();
    if (!areaName || !communityName || !cleanValue) return;

    setStore((current) => ({
      ...current,
      locationAreas: current.locationAreas.map((area) =>
        area.name !== areaName
          ? area
          : {
              ...area,
              communities: area.communities.map((community) =>
                community.name !== communityName
                  ? community
                  : {
                      ...community,
                      phases: uniqueSorted([...community.phases, cleanValue]),
                    }
              ),
            }
      ),
    }));
    setPhaseInput("");
  }

  function removeLocationArea(areaName: string) {
    setStore((current) => {
      const locationAreas = current.locationAreas.filter(
        (area) => area.name !== areaName
      );

      return {
        ...current,
        locationAreas,
        areas: uniqueSorted(locationAreas.map((area) => area.name)),
        communities: uniqueSorted(
          locationAreas.flatMap((area) =>
            area.communities.map((community) => community.name)
          )
        ),
      };
    });
    setSelectedSettingsArea("");
    setSelectedSettingsCommunity("");
  }

  function removeLocationCommunity(areaName: string, communityName: string) {
    setStore((current) => {
      const locationAreas = current.locationAreas.map((area) =>
        area.name !== areaName
          ? area
          : {
              ...area,
              communities: area.communities.filter(
                (community) => community.name !== communityName
              ),
            }
      );

      return {
        ...current,
        locationAreas,
        communities: uniqueSorted(
          locationAreas.flatMap((area) =>
            area.communities.map((community) => community.name)
          )
        ),
      };
    });
    setSelectedSettingsCommunity("");
  }

  function removeLocationPhase(
    areaName: string,
    communityName: string,
    phaseName: string
  ) {
    setStore((current) => ({
      ...current,
      locationAreas: current.locationAreas.map((area) =>
        area.name !== areaName
          ? area
          : {
              ...area,
              communities: area.communities.map((community) =>
                community.name !== communityName
                  ? community
                  : {
                      ...community,
                      phases: community.phases.filter(
                        (phase) => phase !== phaseName
                      ),
                    }
              ),
            }
      ),
    }));
  }

  function updatePlanRule(planName: string, updates: Partial<PlanRule>) {
    setStore((current) => ({
      ...current,
      planRules: current.planRules.map((rule) =>
        rule.name === planName ? { ...rule, ...updates } : rule
      ),
    }));
  }

  function updateCrmSettings<Section extends keyof CrmSettings>(
    section: Section,
    updates: Partial<CrmSettings[Section]>
  ) {
    setStore((current) => ({
      ...current,
      crmSettings: {
        ...current.crmSettings,
        [section]: {
          ...current.crmSettings[section],
          ...updates,
        },
      },
    }));
  }

  function openQuotationPdf(quote: QuotationRecord) {
    const client = store.clients.find((item) => item.id === quote.clientId);
    const property = store.properties.find((item) => item.id === quote.propertyId);
    const subtotal = quote.labor + quote.materials;
    const vat = subtotal * (quote.vatRate / 100);
    const total = subtotal + vat;

    openPrintDocument(
      "Quotation",
      buildBusinessDocumentHtml({
        title: "Quotation",
        documentNo: quote.id,
        clientName: client?.name || "Client",
        clientPhone: client?.phone || "",
        clientEmail: client?.email || "",
        property: property
          ? `${property.title}, ${property.community}, ${property.area}`
          : "Not linked",
        status: quote.status,
        rows: [
          ["Template", quote.template],
          ["Scope / Items", quote.items || "-"],
          ["Labor", money(quote.labor)],
          ["Materials", money(quote.materials)],
          [`VAT ${quote.vatRate}%`, money(vat)],
          ["Total", money(total)],
          ["Warranty", quote.warranty || "-"],
          ["Payment Terms", quote.paymentTerms || "-"],
          ["Digital Approval", quote.approvalName ? `${quote.approvalName} / ${quote.approvalDate || "-"}` : "-"],
        ],
      })
    );
  }

  function openInvoicePdf(invoice: InvoiceRecord) {
    const client = store.clients.find((item) => item.id === invoice.clientId);
    const subtotal = invoice.subtotal;
    const vat = subtotal * (invoice.vatRate / 100);
    const total = subtotal + vat;
    const outstanding = Math.max(total - invoice.paidAmount, 0);

    openPrintDocument(
      "Invoice",
      buildBusinessDocumentHtml({
        title: "Invoice",
        documentNo: invoice.id,
        clientName: client?.name || "Client",
        clientPhone: client?.phone || "",
        clientEmail: client?.email || "",
        property: "See linked quotation / job record",
        status: invoice.status,
        rows: [
          ["Description", invoice.description || "-"],
          ["Subtotal", money(subtotal)],
          [`VAT ${invoice.vatRate}%`, money(vat)],
          ["TRN", invoice.trn || "-"],
          ["Total", money(total)],
          ["Paid", money(invoice.paidAmount)],
          ["Outstanding", money(outstanding)],
          ["Due Date", invoice.dueDate || "-"],
          ["Payment Reminder", invoice.reminderDate || "-"],
        ],
      })
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-slate-200 px-6 py-6">
              <div className="text-2xl font-black uppercase tracking-[0.14em]">
                <span className="text-red-500">3</span>Sixty
              </div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-slate-500">
                AMC Operations
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
              {modules.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    setFormMode("create");
                    setFormOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-bold transition hover:bg-slate-100 ${
                    active === key
                      ? "bg-slate-950 text-white hover:bg-slate-900"
                      : "text-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>

            <div className="border-t border-slate-200 p-4">
              <button
                type="button"
                onClick={resetAllData}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-600"
              >
                <Settings className="h-4 w-4" />
                Reset Demo Data
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="flex min-h-16 flex-wrap items-center justify-between gap-4 px-4 py-3 lg:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-red-500">
                  Live Internal Software
                </p>
                <h1 className="text-lg font-black md:text-2xl">
                  AMC Maintenance Operations
                </h1>
              </div>

              <div className="flex min-w-full items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 md:min-w-96">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search records"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2 lg:hidden">
              {modules.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActive(key);
                    setFormOpen(false);
                  }}
                  className={`shrink-0 rounded-md px-3 py-2 text-xs font-black ${
                    active === key
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </header>

          <div className="px-4 py-6 lg:px-8">
            {active === "dashboard" && (
              <Dashboard
                stats={stats}
                jobs={store.jobs}
                contracts={store.contracts}
                invoices={store.invoices}
                clientName={clientName}
                propertyName={propertyName}
                technicianName={technicianName}
                vehicleName={vehicleName}
                driverName={driverName}
              />
            )}

            {active === "ppm" && (
              <PpmPanel
                contracts={store.contracts}
                clientName={clientName}
                propertyName={propertyName}
              />
            )}

            {active === "clients" && (
              <ModulePanel
                title="Clients"
                subtitle="Add customers, contact details, WhatsApp numbers and account notes."
                addLabel="Add Client"
                formOpen={formOpen}
                formMode={formMode}
                onAdd={() => {
                  setClientForm(clientBlank);
                  setFormMode("create");
                  setFormOpen(true);
                }}
                onClose={() => setFormOpen(false)}
                recordHeaderActions={
                  <div className="flex flex-wrap gap-2">
                    {(["All", ...clientTypes] as ("All" | ClientType)[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setClientTypeFilter(type)}
                        className={`rounded-md px-3 py-2 text-xs font-black transition ${
                          clientTypeFilter === type
                            ? "bg-white text-slate-950"
                            : "bg-white/15 text-white hover:bg-white/25"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                }
                form={
                  <form
                    className="grid gap-4 lg:grid-cols-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      upsert("clients", clientForm, clientBlank, "client", setClientForm);
                    }}
                  >
                    <TextInput label="Client name" value={clientForm.name} onChange={(name) => setClientForm({ ...clientForm, name })} required />
                    <SelectInput label="Client type" value={clientForm.clientType} onChange={(clientType) => setClientForm({ ...clientForm, clientType: clientType as ClientType })} options={clientTypes.map((value) => [value, value])} required />
                    <TextInput label="Phone" value={clientForm.phone} onChange={(phone) => setClientForm({ ...clientForm, phone })} />
                    <TextInput label="WhatsApp" value={clientForm.whatsapp} onChange={(whatsapp) => setClientForm({ ...clientForm, whatsapp })} />
                    <TextInput label="Email" value={clientForm.email} onChange={(email) => setClientForm({ ...clientForm, email })} />
                    <TextInput label="Company" value={clientForm.company} onChange={(company) => setClientForm({ ...clientForm, company })} />
                    <TextArea label="Notes" value={clientForm.notes} onChange={(notes) => setClientForm({ ...clientForm, notes })} />
                    <FormActions mode={formMode} onCancel={() => { setClientForm(clientBlank); setFormMode("create"); setFormOpen(false); }} />
                  </form>
                }
              >
                <DataTable
                  headers={["Name", "Type", "Properties", "Phone", "WhatsApp", "Email", "Company", "Notes", "Actions"]}
                  rows={store.clients
                    .filter((client) => clientTypeFilter === "All" || client.clientType === clientTypeFilter)
                    .filter((client) => matchesSearch(search, client))
                    .map((client) => {
                      const propertyCount = store.properties.filter(
                        (property) => property.clientId === client.id
                      ).length;

                      return [
                        client.name,
                        <StatusPill key={`${client.id}-type`} label={client.clientType} tone={clientTypeTone(client.clientType)} />,
                        <StatusPill
                          key={`${client.id}-properties`}
                          label={propertyCount ? `${propertyCount} properties` : "No property"}
                          tone={
                            propertyCount
                              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                              : "bg-red-50 text-red-700 ring-red-200"
                          }
                        />,
                        client.phone,
                        client.whatsapp,
                        client.email,
                        client.company || "-",
                        client.notes || "-",
                        <RowActions
                          key={client.id}
                          onView={() => setSelectedClientId(client.id)}
                          onEdit={() => { setClientForm(client); setFormMode("edit"); setFormOpen(true); }}
                          onDelete={() => remove("clients", client.id)}
                        />,
                      ];
                    })}
                />
              </ModulePanel>
            )}

            {active === "properties" && (
              <ModulePanel
                title="Properties"
                subtitle="Store villa/building details, communities, gate access and map links."
                addLabel="Add Property"
                formOpen={formOpen}
                formMode={formMode}
                onAdd={() => {
                  setPropertyForm(propertyBlank);
                  setFormMode("create");
                  setFormOpen(true);
                }}
                onClose={() => setFormOpen(false)}
                form={
                  <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("properties", propertyForm, propertyBlank, "property", setPropertyForm); }}>
                    <SelectInput label="Client" value={propertyForm.clientId} onChange={(clientId) => setPropertyForm({ ...propertyForm, clientId })} options={store.clients.map((client) => [client.id, client.name])} required />
                    <TextInput label="Property title" value={propertyForm.title} onChange={(title) => setPropertyForm({ ...propertyForm, title })} required />
                    <TextInput label="Villa / building number" value={propertyForm.villaNumber} onChange={(villaNumber) => setPropertyForm({ ...propertyForm, villaNumber })} />
                    <SearchableListInput label="Area" value={propertyForm.area} onChange={(area) => setPropertyForm({ ...propertyForm, area, community: "", phase: "" })} options={store.locationAreas.map((area) => area.name)} />
                    <SearchableListInput label="Community" value={propertyForm.community} onChange={(community) => setPropertyForm({ ...propertyForm, community, phase: "" })} options={communitiesForArea(propertyForm.area).map((community) => community.name)} />
                    <SearchableListInput label="Phase" value={propertyForm.phase || ""} onChange={(phase) => setPropertyForm({ ...propertyForm, phase })} options={phasesForCommunity(propertyForm.area, propertyForm.community)} />
                    <NumberInput label="Number of rooms" value={propertyForm.rooms || 0} onChange={(rooms) => setPropertyForm({ ...propertyForm, rooms })} />
                    <NumberInput label="Number of AC units" value={propertyForm.acUnits || 0} onChange={(acUnits) => setPropertyForm({ ...propertyForm, acUnits })} />
                    <TextInput label="Google Maps link" value={propertyForm.mapLink} onChange={(mapLink) => setPropertyForm({ ...propertyForm, mapLink })} />
                    <TextArea label="Access notes" value={propertyForm.accessNotes} onChange={(accessNotes) => setPropertyForm({ ...propertyForm, accessNotes })} />
                    <TextArea label="Parking notes" value={propertyForm.parkingNotes} onChange={(parkingNotes) => setPropertyForm({ ...propertyForm, parkingNotes })} />
                    <TextArea label="Gate access" value={propertyForm.gateAccess} onChange={(gateAccess) => setPropertyForm({ ...propertyForm, gateAccess })} />
                    <FormActions mode={formMode} onCancel={() => { setPropertyForm(propertyBlank); setFormMode("create"); setFormOpen(false); }} />
                  </form>
                }
              >
                <DataTable
                  headers={["Property", "Client", "Area", "Community", "Phase", "Rooms", "AC Units", "Access", "Actions"]}
                  rows={store.properties.filter((property) => matchesSearch(search, property)).map((property) => [
                    property.title,
                    clientName(property.clientId),
                    property.area,
                    property.community,
                    property.phase || "-",
                    property.rooms || 0,
                    property.acUnits || 0,
                    property.accessNotes || "-",
                    <RowActions key={property.id} onEdit={() => { setPropertyForm(property); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("properties", property.id)} />,
                  ])}
                />
              </ModulePanel>
            )}

            {active === "contracts" && (
              <ModulePanel
                title="AMC Contracts"
                subtitle="Create AMC packages with dates, visits, exclusions, SLA and renewal status."
                addLabel="Add Contract"
                formOpen={formOpen}
                formMode={formMode}
                onAdd={() => {
                  setContractForm(contractBlank);
                  setFormMode("create");
                  setFormOpen(true);
                }}
                onClose={() => setFormOpen(false)}
                form={
                  <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); saveContract(); }}>
                    <SelectInput label="Client" value={contractForm.clientId} onChange={(clientId) => setContractForm({ ...contractForm, clientId, propertyId: "" })} options={store.clients.map((client) => [client.id, client.name])} required />
                    <SelectInput label="Property" value={contractForm.propertyId} onChange={(propertyId) => setContractForm({ ...contractForm, propertyId })} options={propertyOptionsForClient(contractForm.clientId)} required />
                    <SelectInput label="AMC plan" value={contractForm.plan || "Silver"} onChange={(plan) => {
                      const rule = store.planRules.find((item) => item.name === plan) || getPlanRule(plan);
                      setContractForm({
                        ...contractForm,
                        plan,
                        includedAcServices: rule.acServices,
                        includedDuctCleanings: rule.ductCleanings,
                        includedWaterTankCleanings: rule.waterTankCleanings,
                        includedSolarHeaterCleanings: rule.solarHeaterCleanings,
                      });
                    }} options={store.plans.map((value) => [value, value])} />
                    <SelectInput label="Contract type" value={contractForm.type} onChange={(type) => setContractForm({ ...contractForm, type })} options={["Basic AMC", "Comprehensive AMC", "AC AMC", "Electrical AMC", "Plumbing AMC", "Full villa AMC"].map((value) => [value, value])} />
                    <TextInput label="Start date" type="date" value={contractForm.startDate} onChange={(startDate) => setContractForm({ ...contractForm, startDate })} />
                    <TextInput label="End date" type="date" value={contractForm.endDate} onChange={(endDate) => setContractForm({ ...contractForm, endDate })} />
                    <TextInput label="Last AC service date" type="date" value={contractForm.lastAcServiceDate || ""} onChange={(lastAcServiceDate) => setContractForm({ ...contractForm, lastAcServiceDate })} />
                    <TextInput label="Last duct cleaning date" type="date" value={contractForm.lastDuctCleaningDate || ""} onChange={(lastDuctCleaningDate) => setContractForm({ ...contractForm, lastDuctCleaningDate })} />
                    <TextInput label="Last water tank cleaning date" type="date" value={contractForm.lastWaterTankCleaningDate || ""} onChange={(lastWaterTankCleaningDate) => setContractForm({ ...contractForm, lastWaterTankCleaningDate })} />
                    <TextInput label="Last solar heater cleaning date" type="date" value={contractForm.lastSolarHeaterCleaningDate || ""} onChange={(lastSolarHeaterCleaningDate) => setContractForm({ ...contractForm, lastSolarHeaterCleaningDate })} />
                    <NumberInput label="AC services / year" value={contractForm.includedAcServices || 0} onChange={(includedAcServices) => setContractForm({ ...contractForm, includedAcServices })} />
                    <NumberInput label="Duct cleanings / year" value={contractForm.includedDuctCleanings || 0} onChange={(includedDuctCleanings) => setContractForm({ ...contractForm, includedDuctCleanings })} />
                    <NumberInput label="Water tank cleanings / year" value={contractForm.includedWaterTankCleanings || 0} onChange={(includedWaterTankCleanings) => setContractForm({ ...contractForm, includedWaterTankCleanings })} />
                    <NumberInput label="Solar heater cleanings / year" value={contractForm.includedSolarHeaterCleanings || 0} onChange={(includedSolarHeaterCleanings) => setContractForm({ ...contractForm, includedSolarHeaterCleanings })} />
                    <NumberInput label="Number of visits" value={contractForm.visits} onChange={(visits) => setContractForm({ ...contractForm, visits })} />
                    <NumberInput label="Contract value" value={contractForm.value} onChange={(value) => setContractForm({ ...contractForm, value })} />
                    <SelectInput label="Status" value={contractForm.status} onChange={(status) => setContractForm({ ...contractForm, status: status as ContractRecord["status"] })} options={["Active", "Expiring", "Expired"].map((value) => [value, value])} />
                    <TextArea label="Included services" value={contractForm.included} onChange={(included) => setContractForm({ ...contractForm, included })} />
                    <TextArea label="Excluded services" value={contractForm.excluded} onChange={(excluded) => setContractForm({ ...contractForm, excluded })} />
                    <TextInput label="Warranty" value={contractForm.warranty} onChange={(warranty) => setContractForm({ ...contractForm, warranty })} />
                    <TextInput label="Emergency support" value={contractForm.emergencySupport} onChange={(emergencySupport) => setContractForm({ ...contractForm, emergencySupport })} />
                    <TextInput label="SLA response time" value={contractForm.sla} onChange={(sla) => setContractForm({ ...contractForm, sla })} />
                    <TextArea className="lg:col-span-3" label="Custom plan notes" value={contractForm.customPlanNotes || ""} onChange={(customPlanNotes) => setContractForm({ ...contractForm, customPlanNotes })} />
                    <FormActions mode={formMode} onCancel={() => { setContractForm(contractBlank); setFormMode("create"); setFormOpen(false); }} />
                  </form>
                }
              >
                <DataTable headers={["Plan", "Includes / Year", "Client", "Property", "Next AC Due", "Countdown", "Value", "Status", "Actions"]} rows={store.contracts.filter((contract) => matchesSearch(search, contract)).map((contract) => {
                  const dueDate = nextAcDueDate(contract);
                  const status = dueStatus(dueDate);

                  return [
                  contract.plan || "Silver",
                  `AC ${serviceVisitsPerYear(contract, "ac")} / Duct ${serviceVisitsPerYear(contract, "duct")} / Tank ${serviceVisitsPerYear(contract, "tank")} / Solar ${serviceVisitsPerYear(contract, "solar")}`,
                  clientName(contract.clientId),
                  propertyName(contract.propertyId),
                  dueDate || "-",
                  <StatusPill key={`${contract.id}-due`} label={status.label} tone={status.tone} />,
                  money(contract.value),
                  contract.status,
                  <RowActions key={contract.id} onEdit={() => { setContractForm({ ...contractBlank, ...contract }); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("contracts", contract.id)} />,
                ];
                })} />
              </ModulePanel>
            )}

            {active === "jobs" && (
              <ModulePanel
                title="Service Jobs"
                subtitle="Assign technicians, update status, add checklist, materials, photo links and signature notes."
                addLabel="Add Job"
                formOpen={formOpen}
                formMode={formMode}
                onAdd={() => {
                  setJobForm(jobBlank);
                  setFormMode("create");
                  setFormOpen(true);
                }}
                onClose={() => setFormOpen(false)}
                form={
                  <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("jobs", jobForm, jobBlank, "job", setJobForm); }}>
                    <TextInput label="Job title" value={jobForm.title} onChange={(title) => setJobForm({ ...jobForm, title })} required />
                    <SelectInput label="Client" value={jobForm.clientId} onChange={(clientId) => setJobForm({ ...jobForm, clientId, propertyId: "" })} options={store.clients.map((client) => [client.id, client.name])} required />
                    <SelectInput label="Property" value={jobForm.propertyId} onChange={(propertyId) => setJobForm({ ...jobForm, propertyId })} options={propertyOptionsForClient(jobForm.clientId)} required />
                    <SelectInput label="Technician" value={jobForm.technicianId} onChange={(technicianId) => setJobForm({ ...jobForm, technicianId })} options={store.technicians.map((tech) => [tech.id, tech.name])} />
                    <TextInput label="Team technician IDs" value={jobForm.teamTechnicianIds || ""} onChange={(teamTechnicianIds) => setJobForm({ ...jobForm, teamTechnicianIds })} />
                    <SelectInput label="Driver" value={jobForm.driverId || ""} onChange={(driverId) => setJobForm({ ...jobForm, driverId })} options={store.drivers.map((driver) => [driver.id, driver.name])} />
                    <SelectInput label="Vehicle" value={jobForm.vehicleId || ""} onChange={(vehicleId) => setJobForm({ ...jobForm, vehicleId })} options={store.vehicles.map((vehicle) => [vehicle.id, `${vehicle.code} - ${vehicle.plateNumber}`])} />
                    <SelectInput label="Priority" value={jobForm.priority} onChange={(priority) => setJobForm({ ...jobForm, priority: priority as JobRecord["priority"] })} options={["Low", "Normal", "High", "Emergency"].map((value) => [value, value])} />
                    <SelectInput label="Status" value={jobForm.status} onChange={(status) => setJobForm({ ...jobForm, status: status as JobRecord["status"] })} options={["Pending", "Assigned", "In Progress", "Waiting Material", "Completed", "Cancelled"].map((value) => [value, value])} />
                    <TextInput label="Scheduled date" type="date" value={jobForm.scheduledDate} onChange={(scheduledDate) => setJobForm({ ...jobForm, scheduledDate })} />
                    <TextInput label="Scheduled time" type="time" value={jobForm.scheduledTime} onChange={(scheduledTime) => setJobForm({ ...jobForm, scheduledTime })} />
                    <TextInput label="Clock in" type="time" value={jobForm.clockIn || ""} onChange={(clockIn) => setJobForm({ ...jobForm, clockIn })} />
                    <TextInput label="Clock out" type="time" value={jobForm.clockOut || ""} onChange={(clockOut) => setJobForm({ ...jobForm, clockOut })} />
                    <NumberInput label="Opening mileage" value={jobForm.openingMileage || 0} onChange={(openingMileage) => setJobForm({ ...jobForm, openingMileage })} />
                    <NumberInput label="Closing mileage" value={jobForm.closingMileage || 0} onChange={(closingMileage) => setJobForm({ ...jobForm, closingMileage })} />
                    <TextInput label="WhatsApp navigation link" value={jobForm.navigationLink || ""} onChange={(navigationLink) => setJobForm({ ...jobForm, navigationLink })} />
                    <TextArea className="lg:col-span-1" label="Checklist" value={jobForm.checklist} onChange={(checklist) => setJobForm({ ...jobForm, checklist })} />
                    <TextArea className="lg:col-span-1" label="Remarks" value={jobForm.remarks} onChange={(remarks) => setJobForm({ ...jobForm, remarks })} />
                    <TextArea className="lg:col-span-1" label="Material usage" value={jobForm.materialsUsed} onChange={(materialsUsed) => setJobForm({ ...jobForm, materialsUsed })} />
                    <TextInput label="Before photo links" value={jobForm.beforePhotos} onChange={(beforePhotos) => setJobForm({ ...jobForm, beforePhotos })} />
                    <TextInput label="After photo links" value={jobForm.afterPhotos} onChange={(afterPhotos) => setJobForm({ ...jobForm, afterPhotos })} />
                    <TextInput label="Customer signature note" value={jobForm.customerSignature} onChange={(customerSignature) => setJobForm({ ...jobForm, customerSignature })} />
                    <div className="lg:col-span-3">
                      <FormActions mode={formMode} onCancel={() => { setJobForm(jobBlank); setFormMode("create"); setFormOpen(false); }} />
                    </div>
                  </form>
                }
              >
                <DataTable headers={["Job", "Client", "Property", "Team", "Vehicle", "Driver", "KM", "Date", "Priority", "Status", "Nav", "Actions"]} rows={store.jobs.filter((job) => matchesSearch(search, job)).map((job) => [
                  job.title,
                  clientName(job.clientId),
                  propertyName(job.propertyId),
                  technicianTeamName(job.teamTechnicianIds || job.technicianId),
                  vehicleName(job.vehicleId || ""),
                  driverName(job.driverId || ""),
                  Math.max((job.closingMileage || 0) - (job.openingMileage || 0), 0),
                  `${job.scheduledDate || "-"} ${job.scheduledTime || ""}`,
                  job.priority,
                  job.status,
                  job.navigationLink ? <a key={`${job.id}-nav`} href={job.navigationLink} target="_blank" className="inline-flex items-center gap-1 font-black text-blue-600"><Navigation className="h-4 w-4" /> Open</a> : "-",
                  <RowActions key={job.id} onEdit={() => { setJobForm(job); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("jobs", job.id)} />,
                ])} />
              </ModulePanel>
            )}

            {active === "renovation" && (
              <RenovationPanel
                quotations={store.quotations}
                invoices={store.invoices}
                clientName={clientName}
                propertyName={propertyName}
              />
            )}

            {active === "technicians" && (
              <ModulePanel title="Technicians" subtitle="Create technician profiles, trade, availability and daily capacity." addLabel="Add Technician" formOpen={formOpen} formMode={formMode} onAdd={() => { setTechnicianForm(technicianBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("technicians", technicianForm, technicianBlank, "tech", setTechnicianForm); }}>
                  <TextInput label="Technician name" value={technicianForm.name} onChange={(name) => setTechnicianForm({ ...technicianForm, name })} required />
                  <TextInput label="Phone" value={technicianForm.phone} onChange={(phone) => setTechnicianForm({ ...technicianForm, phone })} />
                  <TextInput label="Trade" value={technicianForm.trade} onChange={(trade) => setTechnicianForm({ ...technicianForm, trade })} />
                  <SelectInput label="Status" value={technicianForm.status} onChange={(status) => setTechnicianForm({ ...technicianForm, status: status as TechnicianRecord["status"] })} options={["Available", "Busy", "Off Duty"].map((value) => [value, value])} />
                  <NumberInput label="Today's capacity" value={technicianForm.todayCapacity} onChange={(todayCapacity) => setTechnicianForm({ ...technicianForm, todayCapacity })} />
                  <FormActions mode={formMode} onCancel={() => { setTechnicianForm(technicianBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Name", "Phone", "Trade", "Status", "Capacity", "Actions"]} rows={store.technicians.filter((tech) => matchesSearch(search, tech)).map((tech) => [
                  tech.name,
                  tech.phone,
                  tech.trade,
                  tech.status,
                  tech.todayCapacity,
                  <RowActions key={tech.id} onEdit={() => { setTechnicianForm(tech); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("technicians", tech.id)} />,
                ])} />
              </ModulePanel>
            )}

            {active === "fleet" && (
              <FleetPanel
                vehicles={store.vehicles}
                drivers={store.drivers}
                jobs={store.jobs}
                fuelLogs={store.fuelLogs}
                vehicleForm={vehicleForm}
                driverForm={driverForm}
                fuelForm={fuelForm}
                formOpen={formOpen}
                formMode={formMode}
                setVehicleForm={setVehicleForm}
                setDriverForm={setDriverForm}
                setFuelForm={setFuelForm}
                setFormMode={setFormMode}
                setFormOpen={setFormOpen}
                upsert={upsert}
                remove={remove}
                vehicleName={vehicleName}
                driverName={driverName}
                technicianTeamName={technicianTeamName}
              />
            )}

            {active === "quotations" && (
              <ModulePanel title="Quotations" subtitle="Create quotations with item description, labor, materials, VAT, warranty and payment terms." addLabel="Add Quotation" formOpen={formOpen} formMode={formMode} onAdd={() => { setQuoteForm(quoteBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("quotations", quoteForm, quoteBlank, "quote", setQuoteForm); }}>
                  <SelectInput label="Client" value={quoteForm.clientId} onChange={(clientId) => setQuoteForm({ ...quoteForm, clientId, propertyId: "" })} options={store.clients.map((client) => [client.id, client.name])} required />
                  <SelectInput label="Property" value={quoteForm.propertyId} onChange={(propertyId) => setQuoteForm({ ...quoteForm, propertyId })} options={propertyOptionsForClient(quoteForm.clientId)} />
                  <SelectInput label="Template" value={quoteForm.template} onChange={(template) => setQuoteForm({ ...quoteForm, template })} options={["Waterproofing", "Painting", "AC maintenance", "Renovation", "Electrical", "Plumbing"].map((value) => [value, value])} />
                  <TextArea label="Items / scope" value={quoteForm.items} onChange={(items) => setQuoteForm({ ...quoteForm, items })} />
                  <NumberInput label="Labor" value={quoteForm.labor} onChange={(labor) => setQuoteForm({ ...quoteForm, labor })} />
                  <NumberInput label="Materials" value={quoteForm.materials} onChange={(materials) => setQuoteForm({ ...quoteForm, materials })} />
                  <NumberInput label="VAT rate" value={quoteForm.vatRate} onChange={(vatRate) => setQuoteForm({ ...quoteForm, vatRate })} />
                  <TextInput label="Warranty" value={quoteForm.warranty} onChange={(warranty) => setQuoteForm({ ...quoteForm, warranty })} />
                  <TextInput label="Payment terms" value={quoteForm.paymentTerms} onChange={(paymentTerms) => setQuoteForm({ ...quoteForm, paymentTerms })} />
                  <SelectInput label="Status" value={quoteForm.status} onChange={(status) => setQuoteForm({ ...quoteForm, status: status as QuotationRecord["status"] })} options={["Draft", "Sent", "Approved", "Rejected"].map((value) => [value, value])} />
                  <TextInput label="Digital approval name" value={quoteForm.approvalName || ""} onChange={(approvalName) => setQuoteForm({ ...quoteForm, approvalName })} />
                  <TextInput label="Approval date" type="date" value={quoteForm.approvalDate || ""} onChange={(approvalDate) => setQuoteForm({ ...quoteForm, approvalDate })} />
                  <FormActions mode={formMode} onCancel={() => { setQuoteForm(quoteBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Template", "Client", "Property", "Scope", "Total", "Approval", "Status", "Actions"]} rows={store.quotations.filter((quote) => matchesSearch(search, quote)).map((quote) => [
                  quote.template,
                  clientName(quote.clientId),
                  propertyName(quote.propertyId),
                  quote.items || "-",
                  money(totalWithVat(quote.labor + quote.materials, quote.vatRate)),
                  quote.approvalName ? `${quote.approvalName} / ${quote.approvalDate || "-"}` : "-",
                  quote.status,
                  <div key={quote.id} className="flex gap-2">
                    <PdfButton onClick={() => openQuotationPdf(quote)} />
                    <RowActions onEdit={() => { setQuoteForm(quote); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("quotations", quote.id)} />
                  </div>,
                ])} />
              </ModulePanel>
            )}

            {active === "invoices" && (
              <ModulePanel title="Invoices & Payments" subtitle="Track VAT, paid amount, due dates and payment status." addLabel="Add Invoice" formOpen={formOpen} formMode={formMode} onAdd={() => { setInvoiceForm(invoiceBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("invoices", invoiceForm, invoiceBlank, "invoice", setInvoiceForm); }}>
                  <SelectInput label="Client" value={invoiceForm.clientId} onChange={(clientId) => setInvoiceForm({ ...invoiceForm, clientId })} options={store.clients.map((client) => [client.id, client.name])} required />
                  <SelectInput label="Quotation" value={invoiceForm.quotationId} onChange={(quotationId) => setInvoiceForm({ ...invoiceForm, quotationId })} options={store.quotations.map((quote) => [quote.id, `${quote.template} - ${clientName(quote.clientId)}`])} />
                  <TextArea label="Description" value={invoiceForm.description} onChange={(description) => setInvoiceForm({ ...invoiceForm, description })} />
                  <NumberInput label="Subtotal" value={invoiceForm.subtotal} onChange={(subtotal) => setInvoiceForm({ ...invoiceForm, subtotal })} />
                  <NumberInput label="VAT rate" value={invoiceForm.vatRate} onChange={(vatRate) => setInvoiceForm({ ...invoiceForm, vatRate })} />
                  <TextInput label="TRN" value={invoiceForm.trn || ""} onChange={(trn) => setInvoiceForm({ ...invoiceForm, trn })} />
                  <NumberInput label="Paid amount" value={invoiceForm.paidAmount} onChange={(paidAmount) => setInvoiceForm({ ...invoiceForm, paidAmount })} />
                  <TextInput label="Due date" type="date" value={invoiceForm.dueDate} onChange={(dueDate) => setInvoiceForm({ ...invoiceForm, dueDate })} />
                  <TextInput label="Payment reminder date" type="date" value={invoiceForm.reminderDate || ""} onChange={(reminderDate) => setInvoiceForm({ ...invoiceForm, reminderDate })} />
                  <SelectInput label="Status" value={invoiceForm.status} onChange={(status) => setInvoiceForm({ ...invoiceForm, status: status as InvoiceRecord["status"] })} options={["Paid", "Partially Paid", "Pending", "Overdue"].map((value) => [value, value])} />
                  <FormActions mode={formMode} onCancel={() => { setInvoiceForm(invoiceBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Client", "Description", "TRN", "Total", "Paid", "Due", "Reminder", "Status", "Actions"]} rows={store.invoices.filter((invoice) => matchesSearch(search, invoice)).map((invoice) => [
                  clientName(invoice.clientId),
                  invoice.description,
                  invoice.trn || "-",
                  money(totalWithVat(invoice.subtotal, invoice.vatRate)),
                  money(invoice.paidAmount),
                  invoice.dueDate || "-",
                  invoice.reminderDate || "-",
                  invoice.status,
                  <div key={invoice.id} className="flex gap-2">
                    <PdfButton onClick={() => openInvoicePdf(invoice)} />
                    <RowActions onEdit={() => { setInvoiceForm(invoice); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("invoices", invoice.id)} />
                  </div>,
                ])} />
              </ModulePanel>
            )}

            {active === "expenses" && (
              <ModulePanel title="Expenses" subtitle="Track job expenses, vendors, receipts, VAT and operating costs." addLabel="Add Expense" formOpen={formOpen} formMode={formMode} onAdd={() => { setExpenseForm(expenseBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("expenses", expenseForm, expenseBlank, "expense", setExpenseForm); }}>
                  <TextInput label="Date" type="date" value={expenseForm.date} onChange={(date) => setExpenseForm({ ...expenseForm, date })} />
                  <SelectInput label="Category" value={expenseForm.category} onChange={(category) => setExpenseForm({ ...expenseForm, category })} options={["Filters", "Pumps", "AC parts", "Consumables", "Tools", "Transport", "Subcontractor"].map((value) => [value, value])} />
                  <TextInput label="Vendor" value={expenseForm.vendor} onChange={(vendor) => setExpenseForm({ ...expenseForm, vendor })} />
                  <SelectInput label="Linked job" value={expenseForm.jobId} onChange={(jobId) => setExpenseForm({ ...expenseForm, jobId })} options={store.jobs.map((job) => [job.id, job.title])} />
                  <NumberInput label="Amount" value={expenseForm.amount} onChange={(amount) => setExpenseForm({ ...expenseForm, amount })} />
                  <NumberInput label="VAT rate" value={expenseForm.vatRate} onChange={(vatRate) => setExpenseForm({ ...expenseForm, vatRate })} />
                  <TextInput label="Receipt URL" value={expenseForm.receiptUrl} onChange={(receiptUrl) => setExpenseForm({ ...expenseForm, receiptUrl })} />
                  <TextArea className="lg:col-span-2" label="Description" value={expenseForm.description} onChange={(description) => setExpenseForm({ ...expenseForm, description })} />
                  <FormActions mode={formMode} onCancel={() => { setExpenseForm(expenseBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Date", "Category", "Vendor", "Job", "Amount", "VAT Total", "Receipt", "Actions"]} rows={store.expenses.filter((expense) => matchesSearch(search, expense)).map((expense) => [
                  expense.date || "-",
                  expense.category,
                  expense.vendor || "-",
                  store.jobs.find((job) => job.id === expense.jobId)?.title || "-",
                  money(expense.amount),
                  money(totalWithVat(expense.amount, expense.vatRate)),
                  expense.receiptUrl ? <a key={`${expense.id}-receipt`} href={expense.receiptUrl} target="_blank" className="font-black text-blue-600">Open</a> : "-",
                  <RowActions key={expense.id} onEdit={() => { setExpenseForm(expense); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("expenses", expense.id)} />,
                ])} />
              </ModulePanel>
            )}

            {active === "inventory" && (
              <ModulePanel title="Inventory" subtitle="Track material stock, tools, reorder levels and suppliers." addLabel="Add Inventory Item" formOpen={formOpen} formMode={formMode} onAdd={() => { setInventoryForm(inventoryBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("inventory", inventoryForm, inventoryBlank, "stock", setInventoryForm); }}>
                  <TextInput label="Item" value={inventoryForm.item} onChange={(item) => setInventoryForm({ ...inventoryForm, item })} required />
                  <SelectInput label="Category" value={inventoryForm.category} onChange={(category) => setInventoryForm({ ...inventoryForm, category })} options={["Filters", "Pumps", "AC parts", "Consumables", "Tools", "Plumbing", "Electrical"].map((value) => [value, value])} />
                  <NumberInput label="Stock" value={inventoryForm.stock} onChange={(stock) => setInventoryForm({ ...inventoryForm, stock })} />
                  <TextInput label="Unit" value={inventoryForm.unit} onChange={(unit) => setInventoryForm({ ...inventoryForm, unit })} />
                  <NumberInput label="Reorder level" value={inventoryForm.reorderLevel} onChange={(reorderLevel) => setInventoryForm({ ...inventoryForm, reorderLevel })} />
                  <TextInput label="Supplier" value={inventoryForm.supplier} onChange={(supplier) => setInventoryForm({ ...inventoryForm, supplier })} />
                  <FormActions mode={formMode} onCancel={() => { setInventoryForm(inventoryBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Item", "Category", "Stock", "Reorder", "Supplier", "Status", "Actions"]} rows={store.inventory.filter((item) => matchesSearch(search, item)).map((item) => [
                  item.item,
                  item.category,
                  `${item.stock} ${item.unit}`,
                  item.reorderLevel,
                  item.supplier,
                  item.stock <= item.reorderLevel ? "Low stock" : "OK",
                  <RowActions key={item.id} onEdit={() => { setInventoryForm(item); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("inventory", item.id)} />,
                ])} />
              </ModulePanel>
            )}

            {active === "complaints" && (
              <ModulePanel title="Complaints" subtitle="Track complaints, resolution status and complaint resolution time." addLabel="Add Complaint" formOpen={formOpen} formMode={formMode} onAdd={() => { setComplaintForm(complaintBlank); setFormMode("create"); setFormOpen(true); }} onClose={() => setFormOpen(false)} form={
                <form className="grid gap-4 lg:grid-cols-3" onSubmit={(event) => { event.preventDefault(); upsert("complaints", complaintForm, complaintBlank, "complaint", setComplaintForm); }}>
                  <SelectInput label="Client" value={complaintForm.clientId} onChange={(clientId) => setComplaintForm({ ...complaintForm, clientId, propertyId: "" })} options={store.clients.map((client) => [client.id, client.name])} required />
                  <SelectInput label="Property" value={complaintForm.propertyId} onChange={(propertyId) => setComplaintForm({ ...complaintForm, propertyId })} options={propertyOptionsForClient(complaintForm.clientId)} />
                  <SelectInput label="Linked job" value={complaintForm.jobId} onChange={(jobId) => setComplaintForm({ ...complaintForm, jobId })} options={store.jobs.map((job) => [job.id, job.title])} />
                  <TextInput label="Opened date" type="date" value={complaintForm.openedDate} onChange={(openedDate) => setComplaintForm({ ...complaintForm, openedDate })} />
                  <TextInput label="Resolved date" type="date" value={complaintForm.resolvedDate} onChange={(resolvedDate) => setComplaintForm({ ...complaintForm, resolvedDate })} />
                  <SelectInput label="Status" value={complaintForm.status} onChange={(status) => setComplaintForm({ ...complaintForm, status: status as ComplaintRecord["status"] })} options={["Open", "In Progress", "Resolved"].map((value) => [value, value])} />
                  <TextArea className="lg:col-span-3" label="Issue" value={complaintForm.issue} onChange={(issue) => setComplaintForm({ ...complaintForm, issue })} />
                  <TextArea className="lg:col-span-3" label="Resolution notes" value={complaintForm.resolutionNotes} onChange={(resolutionNotes) => setComplaintForm({ ...complaintForm, resolutionNotes })} />
                  <FormActions mode={formMode} onCancel={() => { setComplaintForm(complaintBlank); setFormMode("create"); setFormOpen(false); }} />
                </form>
              }>
                <DataTable headers={["Client", "Property", "Issue", "Opened", "Resolved", "Days", "Status", "Actions"]} rows={store.complaints.filter((complaint) => matchesSearch(search, complaint)).map((complaint) => {
                  const days = complaint.openedDate && complaint.resolvedDate
                    ? Math.max(Math.round((new Date(complaint.resolvedDate).getTime() - new Date(complaint.openedDate).getTime()) / 86400000), 0)
                    : "-";

                  return [
                    clientName(complaint.clientId),
                    propertyName(complaint.propertyId),
                    complaint.issue,
                    complaint.openedDate || "-",
                    complaint.resolvedDate || "-",
                    days,
                    complaint.status,
                    <RowActions key={complaint.id} onEdit={() => { setComplaintForm(complaint); setFormMode("edit"); setFormOpen(true); }} onDelete={() => remove("complaints", complaint.id)} />,
                  ];
                })} />
              </ModulePanel>
            )}

            {active === "settings" && (
                <SettingsPanel
                locationAreas={store.locationAreas}
                plans={store.plans}
                planRules={store.planRules}
                crmSettings={store.crmSettings}
                communityInput={communityInput}
                areaInput={areaInput}
                phaseInput={phaseInput}
                selectedArea={selectedSettingsArea}
                selectedCommunity={selectedSettingsCommunity}
                planInput={planInput}
                communitySearch={communitySearch}
                areaSearch={areaSearch}
                planSearch={planSearch}
                setCommunityInput={setCommunityInput}
                setAreaInput={setAreaInput}
                setPhaseInput={setPhaseInput}
                setSelectedArea={setSelectedSettingsArea}
                setSelectedCommunity={setSelectedSettingsCommunity}
                setPlanInput={setPlanInput}
                setCommunitySearch={setCommunitySearch}
                setAreaSearch={setAreaSearch}
                setPlanSearch={setPlanSearch}
                  onAdd={addSettingListItem}
                onRemove={removeSettingListItem}
                onAddArea={addLocationArea}
                onAddCommunity={addLocationCommunity}
                onAddPhase={addLocationPhase}
                onRemoveArea={removeLocationArea}
                onRemoveCommunity={removeLocationCommunity}
                onRemovePhase={removeLocationPhase}
                onUpdatePlanRule={updatePlanRule}
                onUpdateCrmSettings={updateCrmSettings}
              />
            )}

            {active === "reports" && <Reports stats={stats} store={store} />}
          </div>
        </section>
      </div>

      {selectedClientId && (
        <ClientProfileModal
          client={store.clients.find((client) => client.id === selectedClientId)}
          store={store}
          onClose={() => setSelectedClientId(null)}
          propertyName={propertyName}
          technicianName={technicianName}
        />
      )}
    </main>
  );
}

type UpsertRecord = <K extends RecordCollectionKey>(
  key: K,
  record: AmcStore[K][number],
  blank: AmcStore[K][number],
  prefix: string,
  reset: (value: never) => void
) => void;

type RemoveRecord = <K extends RecordCollectionKey>(key: K, id: string) => void;

function FleetPanel({
  vehicles,
  drivers,
  jobs,
  fuelLogs,
  vehicleForm,
  driverForm,
  fuelForm,
  formMode,
  setVehicleForm,
  setDriverForm,
  setFuelForm,
  setFormMode,
  setFormOpen,
  upsert,
  remove,
  vehicleName,
  driverName,
  technicianTeamName,
}: {
  vehicles: VehicleRecord[];
  drivers: DriverRecord[];
  jobs: JobRecord[];
  fuelLogs: FuelLogRecord[];
  vehicleForm: VehicleRecord;
  driverForm: DriverRecord;
  fuelForm: FuelLogRecord;
  formOpen: boolean;
  formMode: FormMode;
  setVehicleForm: (value: VehicleRecord) => void;
  setDriverForm: (value: DriverRecord) => void;
  setFuelForm: (value: FuelLogRecord) => void;
  setFormMode: (value: FormMode) => void;
  setFormOpen: (value: boolean) => void;
  upsert: UpsertRecord;
  remove: RemoveRecord;
  vehicleName: (id: string) => string;
  driverName: (id: string) => string;
  technicianTeamName: (ids: string) => string;
}) {
  const occupiedJobs = jobs.filter((job) => job.vehicleId && job.status !== "Completed" && job.status !== "Cancelled");
  const totalFuel = fuelLogs.reduce((sum, log) => sum + log.amount, 0);
  const totalKm = jobs.reduce(
    (sum, job) => sum + Math.max((job.closingMileage || 0) - (job.openingMileage || 0), 0),
    0
  );

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
            <Truck className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Dispatch & Fleet
            </p>
            <h2 className="mt-2 text-2xl font-black">Fleet</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              Track vehicle availability, assigned drivers, job mileage, and fuel consumption.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReportCard label="Vehicles" value={String(vehicles.length)} icon={Truck} />
        <ReportCard label="Occupied Vehicles" value={String(vehicles.filter((vehicle) => vehicle.status === "Occupied").length)} icon={Truck} />
        <ReportCard label="Fuel Spend" value={money(totalFuel)} icon={Fuel} />
        <ReportCard label="KM Recorded" value={String(totalKm)} icon={Gauge} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <SettingsCard title="Vehicles" icon={Truck}>
          <TextInput label="Vehicle code" value={vehicleForm.code} onChange={(code) => setVehicleForm({ ...vehicleForm, code })} />
          <TextInput label="Plate number" value={vehicleForm.plateNumber} onChange={(plateNumber) => setVehicleForm({ ...vehicleForm, plateNumber })} />
          <SelectInput label="Vehicle type" value={vehicleForm.type} onChange={(type) => setVehicleForm({ ...vehicleForm, type: type as VehicleRecord["type"] })} options={["Van", "Pickup", "Car", "Bike"].map((value) => [value, value])} />
          <SelectInput label="Status" value={vehicleForm.status} onChange={(status) => setVehicleForm({ ...vehicleForm, status: status as VehicleRecord["status"] })} options={["Available", "Occupied", "Maintenance", "Off Road"].map((value) => [value, value])} />
          <NumberInput label="Current mileage" value={vehicleForm.currentMileage} onChange={(currentMileage) => setVehicleForm({ ...vehicleForm, currentMileage })} />
          <TextInput label="Registration expiry" type="date" value={vehicleForm.registrationExpiry} onChange={(registrationExpiry) => setVehicleForm({ ...vehicleForm, registrationExpiry })} />
          <TextInput label="Insurance expiry" type="date" value={vehicleForm.insuranceExpiry} onChange={(insuranceExpiry) => setVehicleForm({ ...vehicleForm, insuranceExpiry })} />
          <TextArea label="Notes" value={vehicleForm.notes} onChange={(notes) => setVehicleForm({ ...vehicleForm, notes })} />
          <button type="button" onClick={() => upsert("vehicles", vehicleForm, vehicleBlank, "vehicle", setVehicleForm as (value: never) => void)} className="rounded-md bg-red-500 px-5 py-3 text-sm font-black uppercase text-white">
            {formMode === "edit" ? "Save Vehicle" : "Add Vehicle"}
          </button>
        </SettingsCard>

        <SettingsCard title="Drivers" icon={UserRoundCheck}>
          <TextInput label="Driver name" value={driverForm.name} onChange={(name) => setDriverForm({ ...driverForm, name })} />
          <TextInput label="Phone" value={driverForm.phone} onChange={(phone) => setDriverForm({ ...driverForm, phone })} />
          <TextInput label="License number" value={driverForm.licenseNumber} onChange={(licenseNumber) => setDriverForm({ ...driverForm, licenseNumber })} />
          <SelectInput label="Status" value={driverForm.status} onChange={(status) => setDriverForm({ ...driverForm, status: status as DriverRecord["status"] })} options={["Available", "Assigned", "Off Duty"].map((value) => [value, value])} />
          <button type="button" onClick={() => upsert("drivers", driverForm, driverBlank, "driver", setDriverForm as (value: never) => void)} className="rounded-md bg-red-500 px-5 py-3 text-sm font-black uppercase text-white">
            {formMode === "edit" ? "Save Driver" : "Add Driver"}
          </button>
        </SettingsCard>

        <SettingsCard title="Fuel Logs" icon={Fuel}>
          <SelectInput label="Vehicle" value={fuelForm.vehicleId} onChange={(vehicleId) => setFuelForm({ ...fuelForm, vehicleId })} options={vehicles.map((vehicle) => [vehicle.id, `${vehicle.code} - ${vehicle.plateNumber}`])} />
          <SelectInput label="Driver" value={fuelForm.driverId} onChange={(driverId) => setFuelForm({ ...fuelForm, driverId })} options={drivers.map((driver) => [driver.id, driver.name])} />
          <SelectInput label="Linked job" value={fuelForm.jobId} onChange={(jobId) => setFuelForm({ ...fuelForm, jobId })} options={jobs.map((job) => [job.id, job.title])} />
          <TextInput label="Date" type="date" value={fuelForm.date} onChange={(date) => setFuelForm({ ...fuelForm, date })} />
          <NumberInput label="Odometer" value={fuelForm.odometer} onChange={(odometer) => setFuelForm({ ...fuelForm, odometer })} />
          <NumberInput label="Litres" value={fuelForm.litres} onChange={(litres) => setFuelForm({ ...fuelForm, litres })} />
          <NumberInput label="Amount" value={fuelForm.amount} onChange={(amount) => setFuelForm({ ...fuelForm, amount })} />
          <TextInput label="Fuel station" value={fuelForm.station} onChange={(station) => setFuelForm({ ...fuelForm, station })} />
          <button type="button" onClick={() => upsert("fuelLogs", fuelForm, fuelBlank, "fuel", setFuelForm as (value: never) => void)} className="rounded-md bg-red-500 px-5 py-3 text-sm font-black uppercase text-white">
            {formMode === "edit" ? "Save Fuel" : "Add Fuel"}
          </button>
        </SettingsCard>
      </div>

      <SummaryTable
        title="Vehicle Occupancy"
        icon={Truck}
        headers={["Vehicle", "Plate", "Status", "Assigned Job", "Driver", "Team"]}
        rows={vehicles.map((vehicle) => {
          const job = occupiedJobs.find((item) => item.vehicleId === vehicle.id);
          return [
            vehicle.code,
            vehicle.plateNumber,
            <StatusPill key={`${vehicle.id}-status`} label={vehicle.status} tone={vehicle.status === "Available" ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : vehicle.status === "Occupied" ? "bg-amber-50 text-amber-700 ring-amber-200" : "bg-red-50 text-red-700 ring-red-200"} />,
            job?.title || "-",
            job ? driverName(job.driverId || "") : "-",
            job ? technicianTeamName(job.teamTechnicianIds || job.technicianId) : "-",
          ];
        })}
      />

      <SummaryTable
        title="Vehicles"
        icon={Truck}
        headers={["Vehicle", "Plate", "Type", "Mileage", "Registration", "Insurance", "Actions"]}
        rows={vehicles.map((vehicle) => [
          vehicle.code,
          vehicle.plateNumber,
          vehicle.type,
          vehicle.currentMileage,
          vehicle.registrationExpiry || "-",
          vehicle.insuranceExpiry || "-",
          <RowActions key={vehicle.id} onEdit={() => { setVehicleForm(vehicle); setFormMode("edit"); setFormOpen(false); }} onDelete={() => remove("vehicles", vehicle.id)} />,
        ])}
      />

      <SummaryTable
        title="Fuel Consumption"
        icon={Fuel}
        headers={["Date", "Vehicle", "Driver", "Job", "Odometer", "Litres", "Amount", "AED / Litre", "Actions"]}
        rows={fuelLogs.map((log) => [
          log.date || "-",
          vehicleName(log.vehicleId),
          driverName(log.driverId),
          jobs.find((job) => job.id === log.jobId)?.title || "-",
          log.odometer,
          log.litres,
          money(log.amount),
          log.litres ? money(log.amount / log.litres) : "-",
          <RowActions key={log.id} onEdit={() => { setFuelForm(log); setFormMode("edit"); setFormOpen(false); }} onDelete={() => remove("fuelLogs", log.id)} />,
        ])}
      />
    </section>
  );
}

function Dashboard({
  stats,
  jobs,
  contracts,
  invoices,
  clientName,
  propertyName,
  technicianName,
  vehicleName,
  driverName,
}: {
  stats: DashboardStats;
  jobs: JobRecord[];
  contracts: ContractRecord[];
  invoices: InvoiceRecord[];
  clientName: (id: string) => string;
  propertyName: (id: string) => string;
  technicianName: (id: string) => string;
  vehicleName: (id: string) => string;
  driverName: (id: string) => string;
}) {
  const cards: {
    label: string;
    value: string | number;
    helper: string;
    icon: LucideIcon;
    tone: string;
  }[] = [
    {
      label: "Active AMC Contracts",
      value: stats.activeContracts,
      helper: "Running AMC agreements",
      icon: ShieldCheck,
      tone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    },
    {
      label: "AMC Clients",
      value: stats.amcClients,
      helper: "Customers with AMC relationship",
      icon: Users,
      tone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    },
    {
      label: "Walk-in Clients",
      value: stats.walkInClients,
      helper: "One-time service customers",
      icon: UserRoundCheck,
      tone: "bg-blue-50 text-blue-600 ring-blue-100",
    },
    {
      label: "Sales Leads",
      value: stats.leads,
      helper: "Needs quotation or follow-up",
      icon: ClipboardList,
      tone: "bg-amber-50 text-amber-600 ring-amber-100",
    },
    {
      label: "Expiring AMC Contracts",
      value: stats.expiringContracts,
      helper: "Renewals needing attention",
      icon: FileClock,
      tone: "bg-amber-50 text-amber-600 ring-amber-100",
    },
    {
      label: "PPM Due This Week",
      value: stats.ppmDueThisWeek,
      helper: "Scheduled preventive services",
      icon: CalendarClock,
      tone: "bg-blue-50 text-blue-600 ring-blue-100",
    },
    {
      label: "Overdue PPM",
      value: stats.overduePpm,
      helper: "Missed preventive visits",
      icon: AlertTriangle,
      tone: "bg-red-50 text-red-600 ring-red-100",
    },
    {
      label: "Emergency Jobs",
      value: stats.emergencyJobs,
      helper: "High urgency service jobs",
      icon: MessageSquareWarning,
      tone: "bg-red-50 text-red-600 ring-red-100",
    },
    {
      label: "Open Service Jobs",
      value: stats.pendingJobs,
      helper: "Jobs not completed",
      icon: Clock3,
      tone: "bg-amber-50 text-amber-600 ring-amber-100",
    },
    {
      label: "Pending Quotations",
      value: stats.pendingQuotations,
      helper: "Draft and sent proposals",
      icon: FileText,
      tone: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    },
    {
      label: "Overdue Payments",
      value: money(stats.outstanding),
      helper: "Remaining receivables",
      icon: AlertTriangle,
      tone: "bg-red-50 text-red-600 ring-red-100",
    },
    {
      label: "Cash Collected",
      value: money(stats.cashCollected),
      helper: "Actual money collected",
      icon: Wallet,
      tone: "bg-green-50 text-green-600 ring-green-100",
    },
    {
      label: "Earned AMC Revenue",
      value: money(stats.earnedAmcRevenue),
      helper: "Monthly recognized AMC value",
      icon: Banknote,
      tone: "bg-teal-50 text-teal-600 ring-teal-100",
    },
    {
      label: "Non-AMC Revenue",
      value: money(stats.nonAmcRevenue),
      helper: "One-time job invoice value",
      icon: Receipt,
      tone: "bg-purple-50 text-purple-600 ring-purple-100",
    },
    {
      label: "Technician Availability",
      value: stats.technicianAvailable,
      helper: "Available technicians now",
      icon: UserRoundCheck,
      tone: "bg-sky-50 text-sky-600 ring-sky-100",
    },
    {
      label: "Occupied Vehicles",
      value: stats.occupiedVehicles,
      helper: `${stats.availableVehicles} vehicles available`,
      icon: Truck,
      tone: "bg-orange-50 text-orange-600 ring-orange-100",
    },
    {
      label: "Fuel Spend",
      value: money(stats.fuelSpend),
      helper: "Recorded fleet fuel cost",
      icon: Fuel,
      tone: "bg-lime-50 text-lime-700 ring-lime-100",
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, helper, icon: Icon, tone }) => (
          <article
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">{label}</p>
                <strong className="mt-3 block text-3xl font-black">
                  {value}
                </strong>
              </div>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-md ring-1 ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-500">{helper}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SummaryTable
          title="Upcoming / Open Jobs"
          icon={Wrench}
          tone="blue"
          rows={jobs.slice(0, 6).map((job) => [
            job.title,
            clientName(job.clientId),
            propertyName(job.propertyId),
            technicianName(job.technicianId),
            vehicleName(job.vehicleId || ""),
            driverName(job.driverId || ""),
            job.status,
          ])}
          headers={["Job", "Client", "Property", "Tech", "Vehicle", "Driver", "Status"]}
        />
        <SummaryTable
          title="Contract Renewals"
          icon={FileClock}
          tone="green"
          rows={contracts.slice(0, 6).map((contract) => [
            contract.type,
            clientName(contract.clientId),
            contract.endDate,
            money(contract.value),
            isExpiring(contract.endDate) ? "Renew soon" : contract.status,
          ])}
          headers={["Type", "Client", "End Date", "Value", "Status"]}
        />
        <SummaryTable
          title="AMC Service Due Countdown"
          icon={CalendarClock}
          tone="amber"
          rows={contracts
            .flatMap((contract) =>
              contractServiceRows({ ...contractBlank, ...contract }).map(
                (serviceRow) => ({
                  contract: { ...contractBlank, ...contract },
                  ...serviceRow,
                  sort: serviceRow.status.days ?? 9999,
                })
              )
            )
            .sort((a, b) => a.sort - b.sort)
            .slice(0, 8)
            .map(({ contract, label, visits, dueDate, status }) => [
              clientName(contract.clientId),
              propertyName(contract.propertyId),
              label,
              contract.plan || "Silver",
              `${visits} / year`,
              dueDate || "-",
              <StatusPill key={`${contract.id}-dashboard-due`} label={status.label} tone={status.tone} />,
            ])}
          headers={["Client", "Property", "Service", "Plan", "Visits", "Next Due", "Countdown"]}
        />
        <SummaryTable
          title="Payment Follow Up"
          icon={Wallet}
          tone="red"
          rows={invoices.slice(0, 6).map((invoice) => [
            clientName(invoice.clientId),
            invoice.description,
            money(totalWithVat(invoice.subtotal, invoice.vatRate)),
            money(invoice.paidAmount),
            invoice.status,
          ])}
          headers={["Client", "Invoice", "Total", "Paid", "Status"]}
        />
      </div>
    </div>
  );
}

function Reports({ stats, store }: { stats: DashboardStats; store: AmcStore }) {
  const technicianRows = store.technicians.map((tech) => {
    const assigned = store.jobs.filter((job) => job.technicianId === tech.id);
    return [
      tech.name,
      tech.trade,
      assigned.length,
      assigned.filter((job) => job.status === "Completed").length,
      tech.status,
    ];
  });

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ReportCard label="Quotation Pipeline" value={money(stats.quoteValue)} />
        <ReportCard label="Invoice Revenue" value={money(stats.invoiceValue)} />
        <ReportCard label="Paid Collected" value={money(stats.paid)} />
        <ReportCard label="Expenses" value={money(stats.expenses)} />
        <ReportCard label="Low Stock Items" value={String(stats.lowStock)} />
        <ReportCard label="Renewal Rate" value={`${stats.renewalRate}%`} icon={ShieldCheck} />
        <ReportCard label="Complaint Resolution" value={`${stats.complaintResolutionDays} days`} />
      </div>
      <SummaryTable
        title="Technician Performance"
        icon={UserRoundCheck}
        headers={["Technician", "Trade", "Assigned", "Completed", "Status"]}
        rows={technicianRows}
      />
      <SummaryTable
        title="Pending Payments"
        icon={AlertTriangle}
        headers={["Client", "Description", "Total", "Paid", "Status"]}
        rows={store.invoices
          .filter((invoice) => invoice.status !== "Paid")
          .map((invoice) => [
            store.clients.find((client) => client.id === invoice.clientId)?.name ||
              "Client",
            invoice.description,
            money(totalWithVat(invoice.subtotal, invoice.vatRate)),
            money(invoice.paidAmount),
            invoice.status,
          ])}
      />
      <SummaryTable
        title="Expense Tracking"
        icon={CreditCard}
        headers={["Date", "Category", "Vendor", "Amount", "VAT Total"]}
        rows={store.expenses.map((expense) => [
          expense.date || "-",
          expense.category,
          expense.vendor || "-",
          money(expense.amount),
          money(totalWithVat(expense.amount, expense.vatRate)),
        ])}
      />
      <SummaryTable
        title="Complaint Resolution"
        icon={MessageSquareWarning}
        headers={["Client", "Issue", "Opened", "Resolved", "Days", "Status"]}
        rows={store.complaints.map((complaint) => {
          const days = complaint.openedDate && complaint.resolvedDate
            ? Math.max(
                Math.round(
                  (new Date(complaint.resolvedDate).getTime() -
                    new Date(complaint.openedDate).getTime()) /
                    86400000
                ),
                0
              )
            : "-";

          return [
            store.clients.find((client) => client.id === complaint.clientId)
              ?.name || "Client",
            complaint.issue,
            complaint.openedDate || "-",
            complaint.resolvedDate || "-",
            days,
            complaint.status,
          ];
        })}
      />
    </div>
  );
}

function PpmPanel({
  contracts,
  clientName,
  propertyName,
}: {
  contracts: ContractRecord[];
  clientName: (id: string) => string;
  propertyName: (id: string) => string;
}) {
  const [expandedContracts, setExpandedContracts] = useState<string[]>([]);
  const groupedRows = contracts
    .map((contract) => {
      const safeContract = { ...contractBlank, ...contract };
      const services = contractServiceRows(safeContract).sort(
        (a, b) => (a.status.days ?? 9999) - (b.status.days ?? 9999)
      );
      const overdueCount = services.filter(
        (service) => service.status.days !== null && service.status.days < 0
      ).length;
      const dueSoonCount = services.filter(
        (service) =>
          service.status.days !== null &&
          service.status.days >= 0 &&
          service.status.days <= 7
      ).length;
      const nextService = services[0];

      return {
        contract: safeContract,
        services,
        overdueCount,
        dueSoonCount,
        nextService,
      };
    })
    .sort((a, b) => {
      const aDays = a.nextService?.status.days ?? 9999;
      const bDays = b.nextService?.status.days ?? 9999;

      return aDays - bDays;
    });

  function toggleContract(contractId: string) {
    setExpandedContracts((current) =>
      current.includes(contractId)
        ? current.filter((id) => id !== contractId)
        : [...current, contractId]
    );
  }

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
            <CalendarClock className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Preventive Maintenance
            </p>
            <h2 className="mt-2 text-2xl font-black">PPM Schedule</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              Calendar-style view of due, overdue, and completed preventive
              services from AMC contracts.
            </p>
          </div>
        </div>
      </div>

      <SummaryTable
        title="Due This Week"
        icon={CalendarClock}
        tone="blue"
        customContent={
          <PpmBoard
            rows={groupedRows.filter((row) => row.dueSoonCount > 0)}
            expandedContracts={expandedContracts}
            onToggle={toggleContract}
            clientName={clientName}
            propertyName={propertyName}
            mode="due"
          />
        }
      />

      <SummaryTable
        title="Overdue PPM"
        icon={AlertTriangle}
        tone="red"
        customContent={
          <PpmBoard
            rows={groupedRows.filter((row) => row.overdueCount > 0)}
            expandedContracts={expandedContracts}
            onToggle={toggleContract}
            clientName={clientName}
            propertyName={propertyName}
            mode="overdue"
          />
        }
      />

      <SummaryTable
        title="All PPM Checklists"
        icon={ClipboardCheck}
        customContent={
          <PpmBoard
            rows={groupedRows}
            expandedContracts={expandedContracts}
            onToggle={toggleContract}
            clientName={clientName}
            propertyName={propertyName}
            mode="all"
          />
        }
      />
    </section>
  );
}

function PpmBoard({
  rows,
  expandedContracts,
  onToggle,
  clientName,
  propertyName,
  mode = "all",
}: {
  rows: {
    contract: ContractRecord;
    services: ReturnType<typeof contractServiceRows>;
    overdueCount: number;
    dueSoonCount: number;
    nextService: ReturnType<typeof contractServiceRows>[number];
  }[];
  expandedContracts: string[];
  onToggle: (contractId: string) => void;
  clientName: (id: string) => string;
  propertyName: (id: string) => string;
  mode?: "all" | "due" | "overdue";
}) {
  return (
    <div className="grid gap-4 p-5">
      {rows.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center font-bold text-slate-500">
          No PPM records found.
        </div>
      ) : (
        rows.map((row) => {
            const expanded = expandedContracts.includes(row.contract.id);
            const visibleServices =
              mode === "due"
                ? row.services.filter(
                    (service) =>
                      service.status.days !== null &&
                      service.status.days >= 0 &&
                      service.status.days <= 7
                  )
                : mode === "overdue"
                  ? row.services.filter(
                      (service) =>
                        service.status.days !== null && service.status.days < 0
                    )
                  : row.services;
            const statusLabel = row.overdueCount
              ? `${row.overdueCount} overdue`
              : row.dueSoonCount
                ? `${row.dueSoonCount} due this week`
                : "Scheduled";
            const statusTone = row.overdueCount
              ? "bg-red-50 text-red-700 ring-red-200"
              : row.dueSoonCount
                ? "bg-blue-50 text-blue-700 ring-blue-200"
                : "bg-emerald-50 text-emerald-700 ring-emerald-200";
            const headlineService = visibleServices[0] || row.nextService;

            return (
              <article
                key={row.contract.id}
                className="rounded-lg border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid gap-4 border-b border-slate-100 p-5 xl:grid-cols-[1.2fr_1fr_auto] xl:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black text-slate-950">
                        {clientName(row.contract.clientId)}
                      </h3>
                      <StatusPill label={row.contract.plan || "AMC"} tone="bg-slate-100 text-slate-700 ring-slate-200" />
                    </div>
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      {propertyName(row.contract.propertyId)}
                    </p>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md bg-slate-50 px-4 py-3">
                      <p className="text-xs font-black uppercase text-slate-400">
                        Next Required Service
                      </p>
                      <p className="mt-1 font-black text-slate-900">
                        {headlineService?.label || "-"}
                      </p>
                    </div>
                    <div className="rounded-md bg-slate-50 px-4 py-3">
                      <p className="text-xs font-black uppercase text-slate-400">
                        Next Due Date
                      </p>
                      <p className="mt-1 font-black text-slate-900">
                        {headlineService?.dueDate || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 xl:justify-end">
                    <StatusPill label={statusLabel} tone={statusTone} />
                    <button
                      type="button"
                      onClick={() => onToggle(row.contract.id)}
                      className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
                      aria-label={expanded ? "Collapse PPM services" : "Expand PPM services"}
                      title={expanded ? "Collapse" : "Expand"}
                    >
                      {expanded ? "Hide" : "Details"}
                      <ChevronDown
                        className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 p-5 md:grid-cols-2 xl:grid-cols-4">
                  {row.services.map((service) => {
                    const isFocus = visibleServices.some(
                      (item) => item.service === service.service
                    );
                    return (
                      <div
                        key={`${row.contract.id}-${service.service}`}
                        className={`rounded-lg border p-4 ${
                          isFocus
                            ? "border-red-200 bg-red-50/50"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-black text-slate-950">
                              {service.label}
                            </p>
                            <p className="mt-1 text-xs font-bold text-slate-500">
                              {service.visits} visits / year
                            </p>
                          </div>
                          <StatusPill
                            label={service.status.label}
                            tone={service.status.tone}
                          />
                        </div>
                        {expanded && (
                          <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Last</span>
                              <span>{service.lastDate || "-"}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Next</span>
                              <span>{service.dueDate || "-"}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })
      )}
    </div>
  );
}

function RenovationPanel({
  quotations,
  invoices,
  clientName,
  propertyName,
}: {
  quotations: QuotationRecord[];
  invoices: InvoiceRecord[];
  clientName: (id: string) => string;
  propertyName: (id: string) => string;
}) {
  const renovationQuotes = quotations.filter(
    (quote) =>
      quote.template.toLowerCase().includes("renovation") ||
      quote.items.toLowerCase().includes("renovation")
  );

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
            <Building2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Projects
            </p>
            <h2 className="mt-2 text-2xl font-black">Renovation Projects</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              Use quotations and invoices to manage renovation scopes, project
              payments, and approved work.
            </p>
          </div>
        </div>
      </div>

      <SummaryTable
        title="Project Quotations"
        icon={FileText}
        headers={["Client", "Property", "Scope", "Total", "Status", "Approval"]}
        rows={renovationQuotes.map((quote) => [
          clientName(quote.clientId),
          propertyName(quote.propertyId),
          quote.items || "-",
          money(totalWithVat(quote.labor + quote.materials, quote.vatRate)),
          quote.status,
          quote.approvalName ? `${quote.approvalName} / ${quote.approvalDate || "-"}` : "-",
        ])}
      />

      <SummaryTable
        title="Project Payments"
        icon={Banknote}
        headers={["Client", "Description", "Total", "Paid", "Outstanding", "Status"]}
        rows={invoices.map((invoice) => {
          const total = totalWithVat(invoice.subtotal, invoice.vatRate);

          return [
            clientName(invoice.clientId),
            invoice.description || "-",
            money(total),
            money(invoice.paidAmount),
            money(Math.max(total - invoice.paidAmount, 0)),
            invoice.status,
          ];
        })}
      />
    </section>
  );
}

function SettingsPanel({
  locationAreas,
  plans,
  planRules,
  crmSettings,
  communityInput,
  areaInput,
  phaseInput,
  selectedArea,
  selectedCommunity,
  planInput,
  communitySearch,
  areaSearch,
  planSearch,
  setCommunityInput,
  setAreaInput,
  setPhaseInput,
  setSelectedArea,
  setSelectedCommunity,
  setPlanInput,
  setCommunitySearch,
  setAreaSearch,
  setPlanSearch,
  onAdd,
  onRemove,
  onAddArea,
  onAddCommunity,
  onAddPhase,
  onRemoveArea,
  onRemoveCommunity,
  onRemovePhase,
  onUpdatePlanRule,
  onUpdateCrmSettings,
}: {
  locationAreas: LocationArea[];
  plans: string[];
  planRules: PlanRule[];
  crmSettings: CrmSettings;
  communityInput: string;
  areaInput: string;
  phaseInput: string;
  selectedArea: string;
  selectedCommunity: string;
  planInput: string;
  communitySearch: string;
  areaSearch: string;
  planSearch: string;
  setCommunityInput: (value: string) => void;
  setAreaInput: (value: string) => void;
  setPhaseInput: (value: string) => void;
  setSelectedArea: (value: string) => void;
  setSelectedCommunity: (value: string) => void;
  setPlanInput: (value: string) => void;
  setCommunitySearch: (value: string) => void;
  setAreaSearch: (value: string) => void;
  setPlanSearch: (value: string) => void;
  onAdd: (
    key: "communities" | "areas" | "plans",
    value: string,
    reset: (value: string) => void
  ) => void;
  onRemove: (key: "communities" | "areas" | "plans", value: string) => void;
  onAddArea: (value: string) => void;
  onAddCommunity: (areaName: string, value: string) => void;
  onAddPhase: (areaName: string, communityName: string, value: string) => void;
  onRemoveArea: (areaName: string) => void;
  onRemoveCommunity: (areaName: string, communityName: string) => void;
  onRemovePhase: (
    areaName: string,
    communityName: string,
    phaseName: string
  ) => void;
  onUpdatePlanRule: (planName: string, updates: Partial<PlanRule>) => void;
  onUpdateCrmSettings: <Section extends keyof CrmSettings>(
    section: Section,
    updates: Partial<CrmSettings[Section]>
  ) => void;
}) {
  const selectedAreaRecord =
    locationAreas.find((area) => area.name === selectedArea) ||
    locationAreas[0];
  const selectedCommunityRecord =
    selectedAreaRecord?.communities.find(
      (community) => community.name === selectedCommunity
    ) || selectedAreaRecord?.communities[0];
  const filteredAreas = locationAreas.filter((area) =>
    area.name.toLowerCase().includes(areaSearch.trim().toLowerCase())
  );
  const filteredCommunities = (selectedAreaRecord?.communities || []).filter(
    (community) =>
      community.name.toLowerCase().includes(communitySearch.trim().toLowerCase())
  );

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
            <Settings className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Configuration
            </p>
            <h2 className="mt-2 text-2xl font-black">Settings</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
              Manage Dubai property hierarchy as Area, Community, and Phase, then reuse it in property records.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SettingsCard title="Company Settings" icon={Building2}>
          <TextInput label="Company name" value={crmSettings.company.name} onChange={(name) => onUpdateCrmSettings("company", { name })} />
          <TextInput label="Logo URL" value={crmSettings.company.logoUrl} onChange={(logoUrl) => onUpdateCrmSettings("company", { logoUrl })} />
          <TextInput label="TRN" value={crmSettings.company.trn} onChange={(trn) => onUpdateCrmSettings("company", { trn })} />
          <TextInput label="Phone" value={crmSettings.company.phone} onChange={(phone) => onUpdateCrmSettings("company", { phone })} />
          <TextInput label="Email" value={crmSettings.company.email} onChange={(email) => onUpdateCrmSettings("company", { email })} />
          <TextInput label="Stamp / signature URL" value={crmSettings.company.stampSignatureUrl} onChange={(stampSignatureUrl) => onUpdateCrmSettings("company", { stampSignatureUrl })} />
          <TextArea className="xl:col-span-2" label="Address" value={crmSettings.company.address} onChange={(address) => onUpdateCrmSettings("company", { address })} />
          <TextArea className="xl:col-span-2" label="Bank details" value={crmSettings.company.bankDetails} onChange={(bankDetails) => onUpdateCrmSettings("company", { bankDetails })} />
        </SettingsCard>

        <SettingsCard title="AMC Settings" icon={ShieldCheck}>
          <TextInput label="PPM frequency" value={crmSettings.amc.ppmFrequency} onChange={(ppmFrequency) => onUpdateCrmSettings("amc", { ppmFrequency })} />
          <TextInput label="SLA response time" value={crmSettings.amc.slaResponseTime} onChange={(slaResponseTime) => onUpdateCrmSettings("amc", { slaResponseTime })} />
          <NumberInput label="Renewal reminder days" value={crmSettings.amc.renewalReminderDays} onChange={(renewalReminderDays) => onUpdateCrmSettings("amc", { renewalReminderDays })} />
          <TextArea className="xl:col-span-2" label="Included services" value={crmSettings.amc.includedServices} onChange={(includedServices) => onUpdateCrmSettings("amc", { includedServices })} />
          <TextArea className="xl:col-span-2" label="Exclusions" value={crmSettings.amc.exclusions} onChange={(exclusions) => onUpdateCrmSettings("amc", { exclusions })} />
        </SettingsCard>

        <SettingsCard title="Service Job Settings" icon={Wrench}>
          <TextArea className="xl:col-span-2" label="Service categories" value={crmSettings.serviceJobs.categories} onChange={(categories) => onUpdateCrmSettings("serviceJobs", { categories })} />
          <NumberInput label="AC cleaning price" value={crmSettings.serviceJobs.acCleaningPrice} onChange={(acCleaningPrice) => onUpdateCrmSettings("serviceJobs", { acCleaningPrice })} />
          <NumberInput label="Inspection charge" value={crmSettings.serviceJobs.inspectionCharge} onChange={(inspectionCharge) => onUpdateCrmSettings("serviceJobs", { inspectionCharge })} />
          <NumberInput label="Emergency charge" value={crmSettings.serviceJobs.emergencyCharge} onChange={(emergencyCharge) => onUpdateCrmSettings("serviceJobs", { emergencyCharge })} />
          <NumberInput label="Minimum visit charge" value={crmSettings.serviceJobs.minimumVisitCharge} onChange={(minimumVisitCharge) => onUpdateCrmSettings("serviceJobs", { minimumVisitCharge })} />
        </SettingsCard>

        <SettingsCard title="Ticket Settings" icon={MessageSquareWarning}>
          <TextArea label="Priority levels" value={crmSettings.tickets.priorityLevels} onChange={(priorityLevels) => onUpdateCrmSettings("tickets", { priorityLevels })} />
          <TextArea label="Status workflow" value={crmSettings.tickets.statusWorkflow} onChange={(statusWorkflow) => onUpdateCrmSettings("tickets", { statusWorkflow })} />
          <TextArea label="Complaint types" value={crmSettings.tickets.complaintTypes} onChange={(complaintTypes) => onUpdateCrmSettings("tickets", { complaintTypes })} />
          <TextArea label="Emergency rules" value={crmSettings.tickets.emergencyRules} onChange={(emergencyRules) => onUpdateCrmSettings("tickets", { emergencyRules })} />
        </SettingsCard>

        <SettingsCard title="Invoice Settings" icon={Banknote}>
          <NumberInput label="VAT %" value={crmSettings.invoices.vatRate} onChange={(vatRate) => onUpdateCrmSettings("invoices", { vatRate })} />
          <TextInput label="Invoice prefix" value={crmSettings.invoices.invoicePrefix} onChange={(invoicePrefix) => onUpdateCrmSettings("invoices", { invoicePrefix })} />
          <TextInput label="Receipt prefix" value={crmSettings.invoices.receiptPrefix} onChange={(receiptPrefix) => onUpdateCrmSettings("invoices", { receiptPrefix })} />
          <CheckboxInput label="Auto numbering" checked={crmSettings.invoices.autoNumbering} onChange={(autoNumbering) => onUpdateCrmSettings("invoices", { autoNumbering })} />
          <TextArea className="xl:col-span-2" label="Payment terms" value={crmSettings.invoices.paymentTerms} onChange={(paymentTerms) => onUpdateCrmSettings("invoices", { paymentTerms })} />
        </SettingsCard>

        <SettingsCard title="Quotation Settings" icon={FileText}>
          <NumberInput label="Validity days" value={crmSettings.quotations.validityDays} onChange={(validityDays) => onUpdateCrmSettings("quotations", { validityDays })} />
          <TextInput label="Default payment schedule" value={crmSettings.quotations.defaultPaymentSchedule} onChange={(defaultPaymentSchedule) => onUpdateCrmSettings("quotations", { defaultPaymentSchedule })} />
          <TextArea className="xl:col-span-2" label="Terms & conditions" value={crmSettings.quotations.termsConditions} onChange={(termsConditions) => onUpdateCrmSettings("quotations", { termsConditions })} />
          <TextArea className="xl:col-span-2" label="Warranty text" value={crmSettings.quotations.warrantyText} onChange={(warrantyText) => onUpdateCrmSettings("quotations", { warrantyText })} />
        </SettingsCard>

        <SettingsCard title="WhatsApp Templates" icon={MessageSquareWarning}>
          <TextArea label="Job created" value={crmSettings.whatsappTemplates.jobCreated} onChange={(jobCreated) => onUpdateCrmSettings("whatsappTemplates", { jobCreated })} />
          <TextArea label="Technician assigned" value={crmSettings.whatsappTemplates.technicianAssigned} onChange={(technicianAssigned) => onUpdateCrmSettings("whatsappTemplates", { technicianAssigned })} />
          <TextArea label="Technician on the way" value={crmSettings.whatsappTemplates.technicianOnTheWay} onChange={(technicianOnTheWay) => onUpdateCrmSettings("whatsappTemplates", { technicianOnTheWay })} />
          <TextArea label="Job completed" value={crmSettings.whatsappTemplates.jobCompleted} onChange={(jobCompleted) => onUpdateCrmSettings("whatsappTemplates", { jobCompleted })} />
          <TextArea label="Invoice sent" value={crmSettings.whatsappTemplates.invoiceSent} onChange={(invoiceSent) => onUpdateCrmSettings("whatsappTemplates", { invoiceSent })} />
          <TextArea label="AMC renewal reminder" value={crmSettings.whatsappTemplates.amcRenewalReminder} onChange={(amcRenewalReminder) => onUpdateCrmSettings("whatsappTemplates", { amcRenewalReminder })} />
        </SettingsCard>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className={`flex items-center gap-3 rounded-t-lg px-5 py-4 ${sectionHeaderTone}`}>
          <span className={`grid h-9 w-9 place-items-center rounded-md ${sectionIconTone}`}>
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-black">Area, Community & Phase Settings</h3>
            <p className="mt-1 text-xs font-bold text-white/80">
              Click an area to see its communities, then click a community to see its phases.
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 xl:grid-cols-3">
          <LocationColumn
            title="Areas"
            value={areaInput}
            search={areaSearch}
            items={filteredAreas.map((area) => area.name)}
            selected={selectedAreaRecord?.name || ""}
            placeholder="Add area, e.g. Wadi Al Safa 5"
            onChange={setAreaInput}
            onSearch={setAreaSearch}
            onAdd={() => onAddArea(areaInput)}
            onSelect={(areaName) => {
              const nextArea = locationAreas.find((area) => area.name === areaName);
              setSelectedArea(areaName);
              setSelectedCommunity(nextArea?.communities[0]?.name || "");
            }}
            onRemove={onRemoveArea}
          />
          <LocationColumn
            title={`${selectedAreaRecord?.name || "Area"} Communities`}
            value={communityInput}
            search={communitySearch}
            items={filteredCommunities.map((community) => community.name)}
            selected={selectedCommunityRecord?.name || ""}
            placeholder="Add community, e.g. Villanova"
            onChange={setCommunityInput}
            onSearch={setCommunitySearch}
            onAdd={() => onAddCommunity(selectedAreaRecord?.name || "", communityInput)}
            onSelect={setSelectedCommunity}
            onRemove={(communityName) => onRemoveCommunity(selectedAreaRecord?.name || "", communityName)}
            disabled={!selectedAreaRecord}
          />
          <LocationColumn
            title={`${selectedCommunityRecord?.name || "Community"} Phases`}
            value={phaseInput}
            search=""
            items={selectedCommunityRecord?.phases || []}
            selected=""
            placeholder="Add phase, e.g. La Rosa 1"
            onChange={setPhaseInput}
            onSearch={() => undefined}
            onAdd={() =>
              onAddPhase(
                selectedAreaRecord?.name || "",
                selectedCommunityRecord?.name || "",
                phaseInput
              )
            }
            onSelect={() => undefined}
            onRemove={(phaseName) =>
              onRemovePhase(
                selectedAreaRecord?.name || "",
                selectedCommunityRecord?.name || "",
                phaseName
              )
            }
            disabled={!selectedCommunityRecord}
            hideSearch
          />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <SettingsList
          title="AMC Plans"
          icon={ShieldCheck}
          value={planInput}
          search={planSearch}
          items={plans}
          placeholder="Add plan, e.g. Diamond"
          onChange={setPlanInput}
          onSearch={setPlanSearch}
          onAdd={() => onAdd("plans", planInput, setPlanInput)}
          onRemove={(value) => onRemove("plans", value)}
        />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className={`flex items-center gap-3 rounded-t-lg px-5 py-4 ${sectionHeaderTone}`}>
          <span className={`grid h-9 w-9 place-items-center rounded-md ${sectionIconTone}`}>
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-black">Plan Service Entitlements</h3>
            <p className="mt-1 text-xs font-bold text-white/80">
              These defaults fill contracts, and each contract can still be
              customized for a special client.
            </p>
          </div>
        </div>
        <DataTable
          headers={[
            "Plan",
            "AC Services / Year",
            "Duct Cleanings / Year",
            "Water Tank / Year",
            "Solar Heater / Year",
          ]}
          rows={plans.map((plan) => {
            const rule =
              planRules.find((item) => item.name === plan) || getPlanRule(plan);

            return [
              plan,
              <InlineNumber key={`${plan}-ac`} value={rule.acServices} onChange={(acServices) => onUpdatePlanRule(plan, { acServices })} />,
              <InlineNumber key={`${plan}-duct`} value={rule.ductCleanings} onChange={(ductCleanings) => onUpdatePlanRule(plan, { ductCleanings })} />,
              <InlineNumber key={`${plan}-tank`} value={rule.waterTankCleanings} onChange={(waterTankCleanings) => onUpdatePlanRule(plan, { waterTankCleanings })} />,
              <InlineNumber key={`${plan}-solar`} value={rule.solarHeaterCleanings} onChange={(solarHeaterCleanings) => onUpdatePlanRule(plan, { solarHeaterCleanings })} />,
            ];
          })}
        />
      </section>
    </section>
  );
}

function SettingsList({
  title,
  icon: Icon,
  value,
  search,
  items,
  placeholder,
  onChange,
  onSearch,
  onAdd,
  onRemove,
}: {
  title: string;
  icon: LucideIcon;
  value: string;
  search: string;
  items: string[];
  placeholder: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onAdd: () => void;
  onRemove: (value: string) => void;
}) {
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`flex items-center gap-3 rounded-t-lg px-5 py-4 ${sectionHeaderTone}`}>
        <span className={`grid h-9 w-9 place-items-center rounded-md ${sectionIconTone}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-black">{title}</h3>
      </div>
      <div className="p-5">
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-md border border-slate-200 px-3 py-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
          />
          <button
            type="button"
            onClick={onAdd}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-500 text-white"
            aria-label={`Add ${title}`}
            title={`Add ${title}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <div className="mt-5 grid gap-2">
          {filteredItems.length === 0 ? (
            <p className="rounded-md bg-slate-50 px-4 py-3 text-sm font-bold text-slate-500">
              No matching items.
            </p>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-3 rounded-md border border-slate-200 px-4 py-3 text-sm font-bold"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => onRemove(item)}
                  className="grid h-8 w-8 place-items-center rounded-md border border-red-200 bg-red-50 text-red-600"
                  aria-label={`Remove ${item}`}
                  title={`Remove ${item}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
}

function LocationColumn({
  title,
  value,
  search,
  items,
  selected,
  placeholder,
  disabled,
  hideSearch,
  onChange,
  onSearch,
  onAdd,
  onSelect,
  onRemove,
}: {
  title: string;
  value: string;
  search: string;
  items: string[];
  selected: string;
  placeholder: string;
  disabled?: boolean;
  hideSearch?: boolean;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  onAdd: () => void;
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <h4 className="font-black text-slate-900">{title}</h4>
      <div className="mt-4 flex gap-2">
        <input
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 disabled:bg-slate-100"
        />
        <button
          type="button"
          disabled={disabled}
          onClick={onAdd}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-500 text-white transition hover:bg-red-600 disabled:bg-slate-300"
          aria-label={`Add ${title}`}
          title={`Add ${title}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {!hideSearch && (
        <div className="mt-3 flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={search}
            disabled={disabled}
            onChange={(event) => onSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}`}
            className="w-full bg-transparent text-sm font-semibold outline-none disabled:bg-slate-100"
          />
        </div>
      )}
      <div className="mt-4 max-h-72 space-y-2 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-200 bg-white px-3 py-4 text-sm font-bold text-slate-500">
            No records found.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item}
              className={`flex items-center justify-between gap-2 rounded-md border px-3 py-2 ${
                selected === item
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="min-w-0 flex-1 truncate text-left text-sm font-black"
              >
                {item}
              </button>
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-red-100 hover:text-red-600"
                aria-label={`Remove ${item}`}
                title={`Remove ${item}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </article>
  );
}

function SettingsCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`flex items-center gap-3 rounded-t-lg px-5 py-4 ${sectionHeaderTone}`}>
        <span className={`grid h-9 w-9 place-items-center rounded-md ${sectionIconTone}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="font-black">{title}</h3>
      </div>
      <div className="grid gap-4 p-5 xl:grid-cols-2">{children}</div>
    </article>
  );
}

function ClientProfileModal({
  client,
  store,
  onClose,
  propertyName,
  technicianName,
}: {
  client: ClientRecord | undefined;
  store: AmcStore;
  onClose: () => void;
  propertyName: (id: string) => string;
  technicianName: (id: string) => string;
}) {
  if (!client) {
    return null;
  }

  const properties = store.properties.filter(
    (property) => property.clientId === client.id
  );
  const contracts = store.contracts.filter(
    (contract) => contract.clientId === client.id
  );
  const jobs = store.jobs.filter((job) => job.clientId === client.id);
  const quotations = store.quotations.filter(
    (quote) => quote.clientId === client.id
  );
  const invoices = store.invoices.filter(
    (invoice) => invoice.clientId === client.id
  );
  const invoiceTotal = invoices.reduce(
    (sum, invoice) => sum + totalWithVat(invoice.subtotal, invoice.vatRate),
    0
  );
  const paidTotal = invoices.reduce(
    (sum, invoice) => sum + invoice.paidAmount,
    0
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
              Client Profile
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-black">{client.name}</h3>
              <StatusPill label={client.clientType} tone={clientTypeTone(client.clientType)} />
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {client.phone || "No phone"} / {client.email || "No email"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-600"
            aria-label="Close client profile"
            title="Close client profile"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(92vh-96px)] overflow-y-auto p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <ReportCard label="Properties" value={String(properties.length)} />
            <ReportCard label="Contracts" value={String(contracts.length)} />
            <ReportCard label="Jobs" value={String(jobs.length)} />
            <ReportCard label="Invoice Total" value={money(invoiceTotal)} />
            <ReportCard label="Outstanding" value={money(Math.max(invoiceTotal - paidTotal, 0))} />
          </div>

          <div className="mt-6 grid gap-6">
            <ProfileSection title="Linked Properties">
              <DataTable
                headers={["Property", "Villa / Building", "Area", "Community", "Phase", "Rooms", "AC Units", "Access Notes", "Gate Access"]}
                rows={properties.map((property) => [
                  property.title,
                  property.villaNumber || "-",
                  property.area || "-",
                  property.community || "-",
                  property.phase || "-",
                  property.rooms || 0,
                  property.acUnits || 0,
                  property.accessNotes || "-",
                  property.gateAccess || "-",
                ])}
              />
            </ProfileSection>

            <ProfileSection title="AMC Contracts" icon={ShieldCheck}>
              <DataTable
                headers={["Plan", "Service", "Visits", "Property", "Next Due", "Countdown", "Status"]}
                rows={contracts.flatMap((contract) =>
                  contractServiceRows({ ...contractBlank, ...contract }).map(
                    (serviceRow) => [
                      contract.plan || "Silver",
                      serviceRow.label,
                      `${serviceRow.visits} / year`,
                      propertyName(contract.propertyId),
                      serviceRow.dueDate || "-",
                      <StatusPill key={`${contract.id}-${serviceRow.service}-profile-due`} label={serviceRow.status.label} tone={serviceRow.status.tone} />,
                      contract.status,
                    ]
                  )
                )}
              />
            </ProfileSection>

            <ProfileSection title="Service Jobs" icon={Wrench}>
              <DataTable
                headers={["Job", "Property", "Technician", "Date", "Priority", "Status"]}
                rows={jobs.map((job) => [
                  job.title,
                  propertyName(job.propertyId),
                  technicianName(job.technicianId),
                  `${job.scheduledDate || "-"} ${job.scheduledTime || ""}`,
                  job.priority,
                  job.status,
                ])}
              />
            </ProfileSection>

            <ProfileSection title="Quotations" icon={FileText}>
              <DataTable
                headers={["Template", "Property", "Scope", "Total", "Status"]}
                rows={quotations.map((quote) => [
                  quote.template,
                  propertyName(quote.propertyId),
                  quote.items || "-",
                  money(totalWithVat(quote.labor + quote.materials, quote.vatRate)),
                  quote.status,
                ])}
              />
            </ProfileSection>

            <ProfileSection title="Invoices & Payments" icon={Banknote}>
              <DataTable
                headers={["Description", "Total", "Paid", "Outstanding", "Due", "Status"]}
                rows={invoices.map((invoice) => {
                  const total = totalWithVat(invoice.subtotal, invoice.vatRate);

                  return [
                    invoice.description || "-",
                    money(total),
                    money(invoice.paidAmount),
                    money(Math.max(total - invoice.paidAmount, 0)),
                    invoice.dueDate || "-",
                    invoice.status,
                  ];
                })}
              />
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  const Icon = icon || panelIcons[title] || ClipboardList;

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`rounded-t-lg px-5 py-4 ${sectionHeaderTone}`}>
        <h4 className="flex items-center gap-2 font-black">
          <span className={`grid h-8 w-8 place-items-center rounded-md ${sectionIconTone}`}>
            <Icon className="h-4 w-4" />
          </span>
          {title}
        </h4>
      </div>
      {children}
    </section>
  );
}

function ModulePanel({
  title,
  subtitle,
  addLabel,
  formOpen,
  formMode,
  onAdd,
  onClose,
  recordHeaderActions,
  form,
  children,
}: {
  title: string;
  subtitle: string;
  addLabel: string;
  formOpen: boolean;
  formMode: FormMode;
  onAdd: () => void;
  onClose: () => void;
  recordHeaderActions?: React.ReactNode;
  form: React.ReactNode;
  children: React.ReactNode;
}) {
  const Icon = panelIcons[title] || ClipboardList;

  return (
    <section className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                Records
              </p>
              <h2 className="mt-2 text-2xl font-black">{title}</h2>
              <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
                {subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-red-500 px-5 text-sm font-black uppercase text-white transition hover:bg-red-600"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        </div>
      </div>

      <div className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className={`flex flex-col gap-3 rounded-t-lg px-5 py-4 md:flex-row md:items-center md:justify-between ${sectionHeaderTone}`}>
          <h2 className="flex items-center gap-2 font-black">
            <span className={`grid h-8 w-8 place-items-center rounded-md ${sectionIconTone}`}>
              <Icon className="h-4 w-4" />
            </span>
            {title} Records
          </h2>
          {recordHeaderActions}
        </div>
        {children}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-7xl overflow-visible rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-red-500">
                  {formMode === "edit" ? "Edit Record" : "New Record"}
                </p>
                <h3 className="mt-1 flex items-center gap-2 text-2xl font-black">
                  <Icon className="h-6 w-6 text-red-500" />
                  {formMode === "edit" ? `Edit ${title}` : addLabel}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-600"
                aria-label="Close popup"
                title="Close popup"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[calc(92vh-92px)] overflow-y-auto p-5">
              {form}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
      />
    </label>
  );
}

function CheckboxInput({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex min-h-20 items-center gap-3 rounded-md border border-slate-200 px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-red-500"
      />
      <span className="text-sm font-black text-slate-700">{label}</span>
    </label>
  );
}

function InlineNumber({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      min={0}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="w-24 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
    />
  );
}

function TextArea({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-black text-slate-700">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        className="mt-2 w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[][];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 w-full rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
      >
        <option value="">Select</option>
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}

function SearchableListInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <label className="block">
        <span className="text-sm font-black text-slate-700">{label}</span>
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setOpen(true);
          }}
          className="mt-2 flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
        >
          <span className={value ? "text-slate-950" : "text-slate-400"}>
            {value || `Select ${label.toLowerCase()}`}
          </span>
          <Search className="h-4 w-4 text-slate-400" />
        </button>
      </label>

      {open && (
        <div className="absolute left-0 right-0 top-full z-[70] mt-2 overflow-hidden rounded-md border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setOpen(false);
                }
              }}
              placeholder={`Search ${label.toLowerCase()}`}
              className="w-full bg-transparent py-1 text-sm font-semibold outline-none"
            />
          </div>
          <div className="max-h-60 overflow-y-auto py-1">
            {filteredOptions.length === 0 ? (
              <button
                type="button"
                onMouseDown={(event) => {
                  event.preventDefault();
                  onChange(query.trim());
                  setOpen(false);
                }}
                className="block w-full px-3 py-3 text-left text-sm font-bold text-slate-500 hover:bg-slate-50"
              >
                Use &quot;{query.trim()}&quot;
              </button>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onChange(option);
                    setQuery(option);
                    setOpen(false);
                  }}
                  className={`block w-full px-3 py-3 text-left text-sm font-bold transition hover:bg-red-50 hover:text-red-600 ${
                    option === value ? "bg-red-50 text-red-600" : "text-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FormActions({
  mode,
  onCancel,
}: {
  mode: FormMode;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-2 pt-2 lg:col-span-3">
      <button
        type="submit"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-3 text-sm font-black uppercase text-white transition hover:bg-red-600"
      >
        {mode === "edit" ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {mode === "edit" ? "Save" : "Add"}
      </button>
      {mode === "edit" && (
        <button
          type="button"
          onClick={onCancel}
          className="grid h-12 w-12 place-items-center rounded-md border border-slate-200 text-slate-600"
          aria-label="Cancel edit"
          title="Cancel edit"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function RowActions({
  onView,
  onEdit,
  onDelete,
}: {
  onView?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex gap-2">
      {onView && (
        <button
          type="button"
          onClick={onView}
          className="grid h-9 w-9 place-items-center rounded-md border border-blue-200 bg-blue-50 text-blue-600"
          aria-label="View record"
          title="View record"
        >
          <Eye className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={onEdit}
        className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 text-slate-600"
        aria-label="Edit record"
        title="Edit record"
      >
        <Edit3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="grid h-9 w-9 place-items-center rounded-md border border-red-200 bg-red-50 text-red-600"
        aria-label="Delete record"
        title="Delete record"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function PdfButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700"
      aria-label="Open PDF view"
      title="Open PDF view"
    >
      <FileDown className="h-4 w-4" />
    </button>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 ? (
            <tr>
              <td className="px-5 py-8 text-center font-bold text-slate-500" colSpan={headers.length}>
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="max-w-[280px] px-5 py-4 align-top font-semibold text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function SummaryTable({
  title,
  icon,
  tone = "slate",
  headers,
  rows,
  customContent,
}: {
  title: string;
  icon?: LucideIcon;
  tone?: "slate" | "blue" | "green" | "amber" | "red";
  headers?: string[];
  rows?: React.ReactNode[][];
  customContent?: React.ReactNode;
}) {
  const Icon = icon || ClipboardList;
  const tones = {
    slate: "bg-slate-950 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-emerald-600 text-white",
    amber: "bg-amber-500 text-white",
    red: "bg-red-500 text-white",
  };
  const iconTones = {
    slate: "bg-white/15 text-white",
    blue: "bg-white/15 text-white",
    green: "bg-white/15 text-white",
    amber: "bg-white/20 text-white",
    red: "bg-white/15 text-white",
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className={`rounded-t-lg px-5 py-4 ${tones[tone]}`}>
        <h2 className="flex items-center gap-2 font-black">
          <span className={`grid h-8 w-8 place-items-center rounded-md ${iconTones[tone]}`}>
            <Icon className="h-4 w-4" />
          </span>
          {title}
        </h2>
      </div>
      {customContent || <DataTable headers={headers || []} rows={rows || []} />}
    </div>
  );
}

function ReportCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
}) {
  const Icon = icon || reportIcons[label] || CheckCircle2;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <strong className="mt-3 block text-2xl font-black">{value}</strong>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-50 text-red-500 ring-1 ring-red-100">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function StatusPill({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-black ring-1 ${tone}`}
    >
      {label}
    </span>
  );
}

function openPrintDocument(title: string, html: string) {
  const printWindow = window.open("", "_blank", "width=960,height=720");

  if (!printWindow) {
    window.alert("Please allow popups to open the PDF preview.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 400);
  printWindow.document.title = title;
}

function buildBusinessDocumentHtml({
  title,
  documentNo,
  clientName,
  clientPhone,
  clientEmail,
  property,
  status,
  rows,
}: {
  title: string;
  documentNo: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  property: string;
  status: string;
  rows: string[][];
}) {
  const date = new Date().toLocaleDateString("en-AE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <style>
      @page { size: A4; margin: 18mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #0f172a;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        line-height: 1.5;
      }
      .header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
        border-bottom: 3px solid #ef233c;
        padding-bottom: 18px;
      }
      .brand { font-size: 28px; font-weight: 900; letter-spacing: 3px; text-transform: uppercase; }
      .brand span { color: #ef233c; }
      .muted { color: #64748b; font-weight: 700; }
      .title { text-align: right; }
      .title h1 { margin: 0; font-size: 34px; text-transform: uppercase; }
      .badge {
        display: inline-block;
        margin-top: 8px;
        border-radius: 999px;
        background: #fee2e2;
        color: #b91c1c;
        padding: 5px 12px;
        font-weight: 800;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        margin-top: 26px;
      }
      .box {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
      }
      .box h2 {
        margin: 0 0 10px;
        color: #ef233c;
        font-size: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 26px;
      }
      th {
        background: #0f172a;
        color: white;
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 11px;
      }
      th, td {
        border: 1px solid #e2e8f0;
        padding: 12px;
        vertical-align: top;
      }
      td:first-child { width: 34%; font-weight: 800; background: #f8fafc; }
      .footer {
        margin-top: 34px;
        display: flex;
        justify-content: space-between;
        gap: 24px;
        color: #64748b;
        font-size: 12px;
      }
      .sign {
        margin-top: 44px;
        border-top: 1px solid #94a3b8;
        width: 220px;
        padding-top: 8px;
        color: #0f172a;
        font-weight: 800;
      }
      @media print {
        .no-print { display: none; }
      }
    </style>
  </head>
  <body>
    <button class="no-print" onclick="window.print()" style="position:fixed;right:16px;top:16px;padding:10px 14px;border:0;border-radius:6px;background:#ef233c;color:white;font-weight:800;cursor:pointer;">Print / Save PDF</button>
    <section class="header">
      <div>
        <div class="brand"><span>3</span>Sixty</div>
        <div class="muted">Renovations / AMC Maintenance Dubai</div>
        <div class="muted">Villas / Buildings / Technical Services</div>
      </div>
      <div class="title">
        <h1>${escapeHtml(title)}</h1>
        <div class="muted">No: ${escapeHtml(documentNo)}</div>
        <div class="muted">Date: ${escapeHtml(date)}</div>
        <span class="badge">${escapeHtml(status)}</span>
      </div>
    </section>

    <section class="grid">
      <div class="box">
        <h2>Bill To</h2>
        <strong>${escapeHtml(clientName)}</strong><br />
        ${escapeHtml(clientPhone)}<br />
        ${escapeHtml(clientEmail)}
      </div>
      <div class="box">
        <h2>Property / Scope Location</h2>
        ${escapeHtml(property)}
      </div>
    </section>

    <table>
      <thead>
        <tr><th>Item</th><th>Details</th></tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </tbody>
    </table>

    <section class="footer">
      <div>
        <strong>Notes</strong><br />
        This document is generated from the AMC operations portal.
      </div>
      <div class="sign">Authorized Signature</div>
    </section>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function matchesSearch(search: string, record: unknown) {
  if (!search.trim()) return true;
  return JSON.stringify(record).toLowerCase().includes(search.toLowerCase());
}
