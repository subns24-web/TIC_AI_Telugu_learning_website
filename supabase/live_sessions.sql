-- TIC-AI: Live session recordings.
-- Run ONCE in Supabase → SQL Editor → New query → paste all of this → Run.
-- Safe to run again (it only creates what is missing).

create table if not exists public.live_sessions (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,                       -- e.g. "Website Building & AI SEO Session"
  title_te      text,                                -- Telugu title (optional)
  kind          text not null default 'live'
                check (kind in ('live', 'qna')),     -- Live session or Q&A session
  session_date  timestamptz not null,                -- when it happened / will happen
  video_url     text,                                -- YouTube / Google Drive / Vimeo / MP4 link; empty = upcoming
  join_url      text,                                -- Zoho / Zoom join link for an upcoming session (optional)
  duration_min  integer,
  created_at    timestamptz not null default now(),
  created_by    text default (auth.jwt() ->> 'email')
);

create index if not exists live_sessions_date_idx on public.live_sessions (session_date desc);

alter table public.live_sessions enable row level security;

-- Who can WATCH: TICAI Mastermind members (plan = course) and admins.
drop policy if exists "live sessions: mastermind can read" on public.live_sessions;
create policy "live sessions: mastermind can read" on public.live_sessions
  for select to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'plan') = 'course'
    or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- Who can ADD / EDIT / DELETE: admins only (app_metadata.role = 'admin').
drop policy if exists "live sessions: admins manage" on public.live_sessions;
create policy "live sessions: admins manage" on public.live_sessions
  for all to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

grant select, insert, update, delete on public.live_sessions to authenticated;
