-- 001_init.sql — Dar ElMashrq content schema
-- Conventions (supabase-postgres-best-practices):
--   bigint identity PKs, timestamptz, text + CHECK instead of varchar/enum,
--   lowercase snake_case identifiers, every FK column indexed,
--   partial indexes on the published-content hot path.
-- No company content is inserted here: schema only.

create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Keeps published_at consistent with status (set on publish, cleared on unpublish).
create or replace function sync_published_at() returns trigger
language plpgsql as $$
begin
  if new.status = 'published' then
    if tg_op = 'INSERT' or old.status is distinct from 'published' or new.published_at is null then
      new.published_at = coalesce(new.published_at, now());
    end if;
  else
    new.published_at = null;
  end if;
  return new;
end $$;

-- ---------------------------------------------------------------- admin_users
create table admin_users (
  id            bigint generated always as identity primary key,
  email         text not null,
  password_hash text not null,
  display_name  text,
  role          text not null default 'editor',
  is_active     boolean not null default true,
  last_login_at timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint admin_users_role_check check (role in ('admin', 'editor')),
  constraint admin_users_email_lowercase check (email = lower(email)),
  constraint admin_users_email_format check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);
create unique index admin_users_email_key on admin_users (email);
create trigger admin_users_set_updated_at before update on admin_users
  for each row execute function set_updated_at();

-- --------------------------------------------------------------- media_assets
-- Only metadata lives in the DB; binaries live in object storage (Phase 07).
create table media_assets (
  id            bigint generated always as identity primary key,
  storage_key   text not null,
  filename      text not null,
  mime_type     text not null,
  size_bytes    bigint not null,
  width         integer,
  height        integer,
  alt_text      text,
  alt_text_ar   text,
  category      text not null default 'general',
  is_public     boolean not null default false,  -- private by default (IBAN-style docs)
  uploaded_by   bigint references admin_users (id) on delete set null,
  created_at    timestamptz not null default now(),
  constraint media_assets_size_check check (size_bytes > 0),
  constraint media_assets_dimensions_check check (
    (width is null or width > 0) and (height is null or height > 0)
  ),
  constraint media_assets_category_check check (
    category in ('projects', 'services', 'certificates', 'branding', 'general')
  )
);
create unique index media_assets_storage_key_key on media_assets (storage_key);
create index media_assets_uploaded_by_idx on media_assets (uploaded_by);
create index media_assets_category_idx on media_assets (category);

-- ------------------------------------------------------------------- services
create table services (
  id             bigint generated always as identity primary key,
  slug           text not null,
  name           text not null,
  name_ar        text,
  description    text,
  description_ar text,
  icon           text,
  display_order  integer not null default 0,
  status         text not null default 'draft',
  image_id       bigint references media_assets (id) on delete restrict,
  published_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint services_status_check check (status in ('draft', 'published')),
  constraint services_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
create unique index services_slug_key on services (slug);
create index services_image_id_idx on services (image_id);
create index services_published_order_idx on services (display_order) where status = 'published';
create trigger services_set_updated_at before update on services
  for each row execute function set_updated_at();
create trigger services_sync_published_at before insert or update on services
  for each row execute function sync_published_at();

-- ------------------------------------------------------------------- projects
create table projects (
  id              bigint generated always as identity primary key,
  slug            text not null,
  name            text not null,
  name_ar         text,
  country         text not null,
  location        text,
  location_ar     text,
  category        text not null,
  year            smallint,
  description     text,
  description_ar  text,
  scope           text,
  scope_ar        text,
  source_reference text,          -- e.g. "PDF p.34"; never invented
  client_name     text,
  is_featured     boolean not null default false,
  display_order   integer not null default 0,
  status          text not null default 'draft',
  cover_image_id  bigint references media_assets (id) on delete restrict,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  constraint projects_status_check check (status in ('draft', 'published')),
  constraint projects_country_check check (country in ('saudi-arabia', 'egypt', 'qatar')),
  constraint projects_category_check check (category in (
    'residential', 'commercial', 'government-institutional',
    'healthcare', 'infrastructure', 'hospitality'
  )),
  constraint projects_year_check check (year is null or year between 1900 and 2100),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
create unique index projects_slug_key on projects (slug);
create index projects_cover_image_id_idx on projects (cover_image_id);
-- Public listing: published only, filtered by country, ordered.
create index projects_published_country_order_idx
  on projects (country, display_order, id) where status = 'published';
create index projects_published_order_idx
  on projects (display_order, id) where status = 'published';
create index projects_featured_idx
  on projects (display_order) where status = 'published' and is_featured;
create trigger projects_set_updated_at before update on projects
  for each row execute function set_updated_at();
create trigger projects_sync_published_at before insert or update on projects
  for each row execute function sync_published_at();

-- Project <-> services (many-to-many). Deleting a referenced service is blocked.
create table project_services (
  project_id bigint not null references projects (id) on delete cascade,
  service_id bigint not null references services (id) on delete restrict,
  primary key (project_id, service_id)
);
create index project_services_service_id_idx on project_services (service_id);

-- Project gallery. Deleting media still used by a project is blocked.
create table project_images (
  project_id bigint not null references projects (id) on delete cascade,
  media_id   bigint not null references media_assets (id) on delete restrict,
  sort_order integer not null default 0,
  primary key (project_id, media_id)
);
create index project_images_media_id_idx on project_images (media_id);

-- ----------------------------------------------------------- content_documents
-- Singleton page documents (home / about / contact / settings) stored as jsonb.
-- Shape is validated in the application layer (zod), per-key.
create table content_documents (
  key          text primary key,
  data         jsonb not null,
  status       text not null default 'draft',
  updated_by   bigint references admin_users (id) on delete set null,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  constraint content_documents_key_check check (key in ('home', 'about', 'contact', 'settings')),
  constraint content_documents_status_check check (status in ('draft', 'published')),
  constraint content_documents_data_object check (jsonb_typeof(data) = 'object')
);
create index content_documents_updated_by_idx on content_documents (updated_by);
create trigger content_documents_set_updated_at before update on content_documents
  for each row execute function set_updated_at();
create trigger content_documents_sync_published_at before insert or update on content_documents
  for each row execute function sync_published_at();

-- ---------------------------------------------------------------- seo_metadata
create table seo_metadata (
  page_key       text primary key,
  title          text,
  title_ar       text,
  description    text,
  description_ar text,
  og_image_id    bigint references media_assets (id) on delete set null,
  updated_at     timestamptz not null default now(),
  constraint seo_metadata_page_key_check check (page_key ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint seo_metadata_title_length check (title is null or char_length(title) <= 70),
  constraint seo_metadata_description_length check (description is null or char_length(description) <= 320)
);
create index seo_metadata_og_image_id_idx on seo_metadata (og_image_id);
create trigger seo_metadata_set_updated_at before update on seo_metadata
  for each row execute function set_updated_at();
