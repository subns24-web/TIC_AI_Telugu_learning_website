/* Who may open which page.
 *  - Logged out: only the public pages; everything else sends them to /login.
 *  - ₹99 workshop students (plan "academy"): Vyapar GPT, Community and their account.
 *  - ₹4999 students (plan "course"): everything. */
import type { Plan } from "./auth";

export const PUBLIC_PATHS = ["/login", "/reset-password", "/app", "/offline"];
export const ACADEMY_PATHS = ["/vyapar-gpt", "/community", "/account"];

const under = (path: string, base: string) => path === base || path.startsWith(base + "/");

export const isPublicPath = (path: string) => PUBLIC_PATHS.some((p) => under(path, p));

/** Can someone with this plan open this link? (Also used to hide nav and footer links.) */
export const canOpen = (href: string, loggedIn: boolean, plan: Plan) => {
  const path = href.split(/[?#]/)[0] || "/";
  if (isPublicPath(path)) return true;
  if (!loggedIn) return false;
  if (plan === "course") return true;
  return ACADEMY_PATHS.some((p) => under(path, p));
};

/** Where each plan lands after logging in. */
export const homeFor = (plan: Plan) => (plan === "course" ? "/courses/ai-for-business-foundations" : "/vyapar-gpt");
