create table if not exists public.postulaciones (
  id bigserial primary key,
  fecha timestamptz not null default now(),
  apellidos varchar(100) not null,
  nombres varchar(100) not null,
  dni varchar(8) not null,
  fecha_nacimiento varchar(30) not null,
  correo varchar(150) not null,
  celular varchar(20) not null,
  direccion_actual varchar(200) not null default '',
  carrera varchar(150) not null,
  ciclo varchar(50) not null,
  nivel_capcut smallint not null default 0,
  nivel_premiere smallint not null default 0,
  nivel_insta360 smallint not null default 0,
  nivel_after_effects smallint not null default 0,
  nivel_canva smallint not null default 0,
  nivel_photoshop smallint not null default 0,
  nivel_discord smallint not null default 0,
  nivel_telegram smallint not null default 0,
  nivel_video smallint not null,
  nivel_diseno smallint not null,
  nivel_redes smallint not null,
  nivel_foto smallint not null,
  criterio_1 varchar(200) not null,
  criterio_2 varchar(200) not null,
  criterio_3 varchar(200) not null,
  puntaje_habilidades smallint not null,
  puntaje_criterio smallint not null,
  puntaje_total smallint not null
);

alter table if exists public.postulaciones
  add column if not exists direccion_actual varchar(200) not null default '';

alter table if exists public.postulaciones
  add column if not exists nivel_capcut smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_premiere smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_insta360 smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_after_effects smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_canva smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_photoshop smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_discord smallint not null default 0;

alter table if exists public.postulaciones
  add column if not exists nivel_telegram smallint not null default 0;

create index if not exists idx_postulaciones_puntaje_total
  on public.postulaciones (puntaje_total desc);

create index if not exists idx_postulaciones_fecha
  on public.postulaciones (fecha desc);
