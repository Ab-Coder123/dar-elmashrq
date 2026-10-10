-- ----------------------------------------------------------- contact_inquiries
create table if not exists contact_inquiries (
  id                  bigint generated always as identity primary key,
  name                text not null,
  email               text not null,
  phone               text,
  company             text,
  service_of_interest text,
  country             text,
  message             text not null,
  status              text not null default 'unread',
  ip_address          text,
  user_agent          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  constraint contact_inquiries_status_check check (status in ('unread', 'read', 'archived', 'replied'))
);
create index if not exists contact_inquiries_status_created_idx on contact_inquiries (status, created_at desc);
create trigger contact_inquiries_set_updated_at before update on contact_inquiries
  for each row execute function set_updated_at();
