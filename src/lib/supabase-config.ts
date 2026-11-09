/* The academy's Supabase project. Both values are public (every browser sees them), so they
 * live in the code: the live site then needs no Vercel settings, and stale Vercel variables
 * from the old, expired project cannot override them. Never put the sb_secret_ key here.
 * Plain module (no "use client") so server routes can import it too. */
export const SUPABASE_URL = "https://xexcztrlcnqptlhjxqjg.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1S606vRN1TYFhI7IkbcGwA_uQWnJ1nN";
