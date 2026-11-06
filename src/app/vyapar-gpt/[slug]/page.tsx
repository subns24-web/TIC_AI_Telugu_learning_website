import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPrompt, prompts } from "@/lib/vyapar";
import { PromptBuilder } from "@/components/vyapar/PromptBuilder";

export function generateStaticParams() {
  return prompts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) return { title: "Prompt not found" };
  return {
    title: `${prompt.title} — Vyapar GPT`,
    description: prompt.outcome,
  };
}

export default async function VyaparPromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();
  return <PromptBuilder prompt={prompt} />;
}
