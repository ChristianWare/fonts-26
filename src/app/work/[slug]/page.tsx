// app/work/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import WorkDetailsClient from "./components/WorkDetailsClient/WorkDetailsClient";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pjct = projects.find((p) => p.slug === slug);
  return { title: pjct ? pjct.title : "404 — Project not found" };
}

export default async function WorkDetailsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const pjct = projects.find((p) => p.slug === slug);

  if (!pjct) {
    // renders the nearest not-found.tsx and sets HTTP 404
    notFound();
  }

  return (
    <div>
      <Nav />
      <WorkDetailsClient project={pjct} />
      <FinalCTAMain />
    </div>
  );
}
