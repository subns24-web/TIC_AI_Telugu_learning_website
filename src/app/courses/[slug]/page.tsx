import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";
import { CourseDetail } from "@/components/course/CourseDetail";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: course.title,
    description: course.tagline,
    openGraph: { title: `${course.title} — TIC AI`, description: course.tagline },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
