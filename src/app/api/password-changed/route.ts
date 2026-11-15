import nodemailer from "nodemailer";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase-config";

/* Sends the "TIC-AI password changed successfully" email after a student changes their
 * password (Supabase's own notification isn't available on this project).
 *
 * Only for the signed-in student, only to their own address, and only if their account was
 * updated in the last 10 minutes — so it can't be used to email anyone else.
 *
 * Needs two Vercel environment variables (Settings → Environment Variables):
 *   GMAIL_USER          the Gmail address that sends it, e.g. subns24@gmail.com
 *   GMAIL_APP_PASSWORD  a Google App Password for that account (never commit it)
 * Without them it does nothing and the password change still works. */

export const runtime = "nodejs";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(email: string) {
  const e = escape(email);
  return `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;color:#0b1020">
  <h2 style="margin:0 0 4px">TIC AI — AI for Business</h2>
  <p style="color:#555;margin:0 0 20px">Password changed / Password మారింది</p>
  <p>The password for <b>${e}</b> was changed successfully. Log in with your new password:</p>
  <p>మీ TIC AI account password విజయవంతంగా మారింది. కొత్త password తో login అవ్వండి:</p>
  <p style="text-align:center;margin:28px 0">
    <a href="https://tic-ai-academy.vercel.app/login"
       style="background:#c9a23a;color:#0b1020;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold">
      Log in / Login అవ్వండి
    </a>
  </p>
  <p style="color:#555;font-size:13px">Didn't change it? Use "Forgot password?" on the login page right away, or reply to this email.</p>
  <p style="color:#555;font-size:13px">మీరు మార్చకపోతే, వెంటనే login page లో "Password మర్చిపోయారా?" నొక్కండి.</p>
  <p style="color:#999;font-size:12px;margin-top:24px">TIC AI Academy · https://tic-ai-academy.vercel.app</p>
</div>`;
}

export async function POST(request: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return Response.json({ sent: false, reason: "email not configured" }, { status: 503 });

  const token = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ sent: false, reason: "not signed in" }, { status: 401 });

  // Who is this? Supabase checks the token; we only ever email that account's own address.
  let res: Response;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return Response.json({ sent: false, reason: "could not reach Supabase" }, { status: 502 });
  }
  if (!res.ok) return Response.json({ sent: false, reason: "not signed in" }, { status: 401 });
  const account = (await res.json()) as { email?: string; updated_at?: string };
  if (!account.email) return Response.json({ sent: false, reason: "no email" }, { status: 400 });
  const updated = Date.parse(account.updated_at || "");
  if (!(Date.now() - updated < 10 * 60 * 1000)) {
    return Response.json({ sent: false, reason: "no recent password change" }, { status: 409 });
  }

  try {
    await nodemailer
      .createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } })
      .sendMail({
        from: `"TIC AI" <${user}>`,
        to: account.email,
        subject: "TIC-AI password changed successfully",
        text:
          `The password for ${account.email} was changed successfully. ` +
          "Log in with your new password: https://tic-ai-academy.vercel.app/login\n\n" +
          "Didn't change it? Use \"Forgot password?\" on the login page right away.",
        html: html(account.email),
      });
  } catch (err) {
    console.error("password-changed email failed:", err);
    return Response.json({ sent: false, reason: "send failed" }, { status: 502 });
  }
  return Response.json({ sent: true });
}
