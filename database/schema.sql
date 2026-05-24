-- AMC CRM Supabase/Postgres schema
-- Run in Supabase SQL editor after enabling auth. User rows link to auth.users.

create extension if not exists "pgcrypto";

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references roles(id),
  full_name text not null,
  phone text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists communities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  area text,
  emirate text not null default 'Dubai',
  created_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  whatsapp text,
  email text,
  company_name text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists client_properties (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  community_id uuid references communities(id),
  title text not null,
  villa_number text,
  area text,
  map_link text,
  access_notes text,
  parking_notes text,
  gate_access text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists amc_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  annual_price numeric(12,2) not null default 0,
  ac_services_per_year integer not null default 1,
  duct_cleanings_per_year integer not null default 1,
  water_tank_cleanings_per_year integer not null default 1,
  solar_heater_cleanings_per_year integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists amc_services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null,
  default_frequency_per_year integer not null default 1,
  checklist_template text,
  created_at timestamptz not null default now()
);

create table if not exists amc_contracts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  property_id uuid not null references client_properties(id) on delete cascade,
  plan_id uuid references amc_plans(id),
  contract_number text unique,
  start_date date not null,
  end_date date not null,
  annual_value numeric(12,2) not null default 0,
  status text not null default 'active',
  custom_plan_notes text,
  emergency_support text,
  sla_response_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists amc_contract_services (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references amc_contracts(id) on delete cascade,
  service_id uuid not null references amc_services(id),
  included_frequency_per_year integer not null default 1,
  last_service_date date,
  unique (contract_id, service_id)
);

create table if not exists amc_renewals (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references amc_contracts(id) on delete cascade,
  previous_end_date date,
  new_start_date date,
  new_end_date date,
  renewal_value numeric(12,2) not null default 0,
  status text not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists ppm_schedules (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid not null references amc_contracts(id) on delete cascade,
  service_id uuid not null references amc_services(id),
  due_date date not null,
  status text not null default 'due',
  created_at timestamptz not null default now()
);

create table if not exists ppm_visits (
  id uuid primary key default gen_random_uuid(),
  schedule_id uuid not null references ppm_schedules(id) on delete cascade,
  technician_id uuid,
  visit_date date,
  clock_in time,
  clock_out time,
  status text not null default 'scheduled',
  remarks text,
  customer_signature_url text,
  created_at timestamptz not null default now()
);

create table if not exists ppm_checklists (
  id uuid primary key default gen_random_uuid(),
  visit_id uuid not null references ppm_visits(id) on delete cascade,
  item text not null,
  is_done boolean not null default false,
  remarks text
);

create table if not exists service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

create table if not exists technicians (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  name text not null,
  phone text,
  status text not null default 'available',
  daily_capacity integer not null default 4,
  created_at timestamptz not null default now()
);

create table if not exists technician_skills (
  id uuid primary key default gen_random_uuid(),
  technician_id uuid not null references technicians(id) on delete cascade,
  skill text not null,
  unique (technician_id, skill)
);

create table if not exists service_jobs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  property_id uuid references client_properties(id),
  category_id uuid references service_categories(id),
  title text not null,
  priority text not null default 'normal',
  status text not null default 'pending',
  scheduled_at timestamptz,
  clock_in timestamptz,
  clock_out timestamptz,
  navigation_link text,
  checklist text,
  remarks text,
  before_photos text[],
  after_photos text[],
  customer_signature_url text,
  convert_to_amc_lead boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists service_job_items (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references service_jobs(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0
);

create table if not exists technician_assignments (
  id uuid primary key default gen_random_uuid(),
  technician_id uuid not null references technicians(id) on delete cascade,
  job_id uuid references service_jobs(id) on delete cascade,
  ppm_visit_id uuid references ppm_visits(id) on delete cascade,
  assigned_at timestamptz not null default now(),
  status text not null default 'assigned',
  check (job_id is not null or ppm_visit_id is not null)
);

create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  property_id uuid references client_properties(id),
  job_id uuid references service_jobs(id),
  type text not null default 'complaint',
  subject text not null,
  description text,
  priority text not null default 'normal',
  status text not null default 'open',
  opened_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists ticket_comments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  user_id uuid references users(id),
  comment text not null,
  created_at timestamptz not null default now()
);

create table if not exists ticket_attachments (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references tickets(id) on delete cascade,
  file_url text not null,
  file_type text,
  created_at timestamptz not null default now()
);

create table if not exists quotations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  property_id uuid references client_properties(id),
  job_id uuid references service_jobs(id),
  quote_number text unique,
  template text,
  status text not null default 'draft',
  subtotal numeric(12,2) not null default 0,
  vat_rate numeric(5,2) not null default 5,
  warranty text,
  payment_terms text,
  approval_name text,
  approval_date date,
  created_at timestamptz not null default now()
);

create table if not exists quotation_items (
  id uuid primary key default gen_random_uuid(),
  quotation_id uuid not null references quotations(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  quotation_id uuid references quotations(id),
  invoice_number text unique,
  description text,
  subtotal numeric(12,2) not null default 0,
  vat_rate numeric(5,2) not null default 5,
  trn text,
  due_date date,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  amount numeric(12,2) not null,
  payment_date date not null default current_date,
  method text,
  reference text,
  notes text
);

create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  address text
);

create table if not exists inventory_items (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid references suppliers(id),
  name text not null,
  category text not null,
  stock numeric(12,2) not null default 0,
  unit text not null default 'pcs',
  reorder_level numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists material_usage (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references inventory_items(id),
  job_id uuid references service_jobs(id),
  ppm_visit_id uuid references ppm_visits(id),
  quantity numeric(12,2) not null,
  used_at timestamptz not null default now(),
  check (job_id is not null or ppm_visit_id is not null)
);

create table if not exists renovation_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id),
  property_id uuid references client_properties(id),
  quotation_id uuid references quotations(id),
  title text not null,
  status text not null default 'active',
  start_date date,
  end_date date,
  budget numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references renovation_projects(id) on delete cascade,
  title text not null,
  status text not null default 'pending',
  assigned_to uuid references users(id),
  due_date date
);

create table if not exists project_payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references renovation_projects(id) on delete cascade,
  amount numeric(12,2) not null,
  due_date date,
  paid_date date,
  status text not null default 'pending'
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  related_table text not null,
  related_id uuid not null,
  document_type text not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  action text not null,
  entity_table text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table if not exists notification_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  channel text not null,
  trigger_key text,
  body text not null,
  is_active boolean not null default true
);

create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_client_properties_client on client_properties(client_id);
create index if not exists idx_amc_contracts_client on amc_contracts(client_id);
create index if not exists idx_ppm_schedules_due on ppm_schedules(due_date, status);
create index if not exists idx_service_jobs_status on service_jobs(status, priority);
create index if not exists idx_tickets_status on tickets(status, priority);
create index if not exists idx_invoices_status on invoices(status, due_date);

insert into roles (name, description)
values
  ('Admin', 'Full access to all AMC CRM modules.'),
  ('Manager', 'Manage clients, contracts, jobs, quotations, and reports.'),
  ('Dispatcher', 'Create jobs, assign technicians, and update schedules.'),
  ('Technician', 'View assigned jobs, upload photos, complete checklists.'),
  ('Accountant', 'Manage invoices, payments, and reports.'),
  ('Sales', 'Manage leads, quotations, and AMC renewals.')
on conflict (name) do update set description = excluded.description;

insert into permissions (code, description)
values
  ('all.manage', 'Full system access.'),
  ('clients.manage', 'Create, update, and view clients and client properties.'),
  ('contracts.manage', 'Create, update, renew, and view AMC contracts.'),
  ('ppm.manage', 'Manage PPM schedules, visits, and checklists.'),
  ('jobs.manage', 'Create, assign, update, and view service jobs.'),
  ('jobs.assigned.view', 'View only jobs assigned to the current technician.'),
  ('jobs.checklist.complete', 'Complete job checklists and remarks.'),
  ('jobs.photos.upload', 'Upload job before/after photos.'),
  ('technicians.assign', 'Assign technicians to jobs and PPM visits.'),
  ('schedules.manage', 'Update schedules and technician calendar.'),
  ('quotations.manage', 'Create, update, send, and approve quotations.'),
  ('invoices.manage', 'Create, update, and view invoices.'),
  ('payments.manage', 'Create and update payment records.'),
  ('reports.view', 'View reports and dashboards.'),
  ('renewals.manage', 'Manage AMC renewals.'),
  ('settings.manage', 'Manage company settings and templates.')
on conflict (code) do update set description = excluded.description;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
cross join permissions p
where r.name = 'Admin'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.code in (
  'clients.manage',
  'contracts.manage',
  'ppm.manage',
  'jobs.manage',
  'quotations.manage',
  'reports.view',
  'renewals.manage'
)
where r.name = 'Manager'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.code in (
  'jobs.manage',
  'technicians.assign',
  'schedules.manage',
  'ppm.manage'
)
where r.name = 'Dispatcher'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.code in (
  'jobs.assigned.view',
  'jobs.checklist.complete',
  'jobs.photos.upload'
)
where r.name = 'Technician'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.code in (
  'invoices.manage',
  'payments.manage',
  'reports.view'
)
where r.name = 'Accountant'
on conflict do nothing;

insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
join permissions p on p.code in (
  'clients.manage',
  'quotations.manage',
  'renewals.manage',
  'reports.view'
)
where r.name = 'Sales'
on conflict do nothing;
