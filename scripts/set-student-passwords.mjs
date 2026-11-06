#!/usr/bin/env node
/* Set one password for every paid student in Supabase Auth.
 *
 * A "paid" student is an account whose app_metadata.plan is "academy" (₹199 workshop) or
 * "course" (₹4999). The payment script sets that field when Razorpay confirms a payment.
 *
 * Needs the project's SERVICE ROLE key (Supabase → Project Settings → API → service_role).
 * That key can do anything to the project: keep it in your terminal only, never in
 * .env.example, the site code, Vercel's NEXT_PUBLIC_ variables or a commit.
 *
 * Usage (Git Bash), from the project folder:
 *   export SUPABASE_URL=https://YOUR-PROJECT.supabase.co
 *   export SUPABASE_SERVICE_ROLE_KEY=...
 *   export NEW_PASSWORD=...
 *   node scripts/set-student-passwords.mjs            # dry run: lists who would change
 *   node scripts/set-student-passwords.mjs --apply    # actually sets the password
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const password = process.env.NEW_PASSWORD;
const apply = process.argv.includes("--apply");

if (!url || !key || !password) {
  console.error("Set SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and NEW_PASSWORD first (see the top of this file).");
  process.exit(1);
}
if (password.length < 6) {
  console.error("NEW_PASSWORD must be at least 6 characters (Supabase's minimum).");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const PAID = new Set(["academy", "course"]);
const paid = [];
let skipped = 0;

for (let page = 1; ; page++) {
  const { data, error } = await sb.auth.admin.listUsers({ page, perPage: 1000 });
  if (error) { console.error("Could not list users:", error.message); process.exit(1); }
  for (const u of data.users) {
    if (PAID.has(u.app_metadata?.plan)) paid.push(u); else skipped++;
  }
  if (data.users.length < 1000) break;
}

console.log(`${paid.length} paid student(s) found, ${skipped} other account(s) left alone.`);
for (const u of paid) console.log(`  ${u.email}  (${u.app_metadata.plan})`);

if (!apply) {
  console.log("\nDry run: nothing changed. Run again with --apply to set the password.");
  process.exit(0);
}

let ok = 0, failed = 0;
for (const u of paid) {
  const { error } = await sb.auth.admin.updateUserById(u.id, { password });
  if (error) { failed++; console.error(`  FAILED ${u.email}: ${error.message}`); }
  else ok++;
}
console.log(`\nDone: ${ok} updated, ${failed} failed.`);
process.exit(failed ? 1 : 0);
