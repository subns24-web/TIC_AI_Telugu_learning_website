/* Vyapar GPT — the prompt builder.
 *
 * The hard part for a shop owner is never the wording of a prompt. It is
 * knowing WHAT TO GIVE the AI, and where that file lives in the app they
 * already use. So a prompt here is not a block of text: it is a task with
 * declared inputs, each one explaining how to produce it in Vyapar, Tally,
 * Excel or by hand.
 */

export type FieldType = "text" | "textarea" | "select" | "number";

export type PromptField = {
  id: string;
  label: string;
  labelTe: string;
  type: FieldType;
  placeholder?: string;
  placeholderTe?: string;
  /** Shown under the field — an example, not an instruction. */
  help?: string;
  helpTe?: string;
  options?: { value: string; label: string; labelTe: string }[];
  required?: boolean;
  /** Pull the saved business profile in so nothing is typed twice. */
  fromProfile?: "businessName" | "businessType" | "city" | "sells" | "tone";
};

/** One step of "open this app, tap here, tap there, you have the file." */
export type HowToGet = {
  source: string;
  sourceTe: string;
  steps: string[];
  stepsTe: string[];
};

export type RequiredFile = {
  id: string;
  name: string;
  nameTe: string;
  /** Plain words: "Excel or CSV", "A photo", "A PDF". */
  format: string;
  formatTe: string;
  /** What the AI does with it, so skipping it is an informed choice. */
  why: string;
  whyTe: string;
  /** The columns or details it should contain. */
  contains?: string[];
  containsTe?: string[];
  howToGet?: HowToGet[];
  optional?: boolean;
};

export type VyaparPrompt = {
  slug: string;
  category: string;
  title: string;
  titleTe: string;
  /** The finished thing they walk away with. */
  outcome: string;
  outcomeTe: string;
  minutes: number;
  /** Which businesses this suits; ["all"] when it suits every one. */
  businessTypes: string[];
  fields: PromptField[];
  files: RequiredFile[];
  /** Placeholders are {{fieldId}}; unfilled ones stay visible as blanks. */
  template: string;
  /** The same prompt in spoken Telugu, used when the site is in Telugu. Same placeholders. */
  templateTe?: string;
  tips: string[];
  tipsTe: string[];
  /** Which assistant handles this best, and why it matters. */
  bestWith: ("chatgpt" | "claude" | "gemini")[];
  featured?: boolean;
};

export type VyaparCategory = {
  id: string;
  title: string;
  titleTe: string;
  blurb: string;
  blurbTe: string;
  /** Inline SVG path data for the category glyph. */
  icon: string;
  accent: string;
};

export type BusinessType = {
  id: string;
  label: string;
  labelTe: string;
  emoji: string;
};
