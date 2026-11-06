import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allLessons, courses, getCourse } from "@/lib/courses";
import { LessonPlayer } from "@/components/course/LessonPlayer";
import { RequireLogin } from "@/components/auth/RequireLogin";

export function generateStaticParams() {
  return courses.flatMap((c) =>
    allLessons(c).map((l) => ({ slug: c.slug, lessonId: l.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const course = getCourse(slug);
  const lesson = course && allLessons(course).find((l) => l.id === lessonId);
  if (!course || !lesson) return { title: "Lesson not found" };
  return { title: `${lesson.title} — ${course.title}` };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  if (!allLessons(course).some((l) => l.id === lessonId)) notFound();
  return (
    <RequireLogin>
      <LessonPlayer course={course} lessonId={lessonId} />
    </RequireLogin>
  );
}
