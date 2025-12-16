/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { db } from "@/lib/db";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";
import sanitizeHtml, { IOptions } from "sanitize-html";

/** small helper */
function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function ensureUniqueSlug(title: string) {
  const base = slugify(title) || "post";
  let slug = base;
  let i = 1;
  // keep trying until we find a free slug
  while (true) {
    const existing = await db.post.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${base}-${i++}`;
  }
}

const SANITIZE_OPTIONS: IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "pre",
    "code",
    "u",
  ],
  allowedAttributes: {
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", {
      rel: "nofollow noopener noreferrer",
      target: "_blank",
    }),
  },
};

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session || role !== "ADMIN") throw new Error("Unauthorized");
  return session;
}

/** CREATE */
export async function createPostAction(formData: FormData) {
  const session = await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const contentRaw = (formData.get("content") as string) || "";
  const publishNow = formData.get("publish") === "on";

  if (!title) throw new Error("Title is required");
  if (!contentRaw) throw new Error("Content is required");

  const content = sanitizeHtml(contentRaw, SANITIZE_OPTIONS);
  const slug = await ensureUniqueSlug(title);

  const post = await db.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      published: publishNow,
      publishedAt: publishNow ? new Date() : null,
      authorId: (session.user as any).userId,
    },
    select: { slug: true, published: true },
  });

  revalidatePath("/blog");
  if (post.published) revalidatePath(`/blog/${post.slug}`);

  return { slug: post.slug, published: post.published };
}

/** UPDATE (bind current slug in the page and pass FormData) */
export async function updatePostAction(
  currentSlug: string,
  formData: FormData
) {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const contentRaw = (formData.get("content") as string) || "";
  const publishNow = formData.get("publish") === "on";
  const manualSlug = (formData.get("slug") as string)?.trim() || "";

  if (!title) throw new Error("Title is required");
  if (!contentRaw) throw new Error("Content is required");

  const post = await db.post.findUnique({ where: { slug: currentSlug } });
  if (!post) throw new Error("Post not found");

  const content = sanitizeHtml(contentRaw, SANITIZE_OPTIONS);

  // compute next slug (optional rename)
  let nextSlug = post.slug;
  if (manualSlug && manualSlug !== post.slug) {
    const desired = slugify(manualSlug) || "post";
    let candidate = desired;
    let i = 1;
    while (true) {
      const clash = await db.post.findUnique({ where: { slug: candidate } });
      if (!clash || clash.id === post.id) break;
      candidate = `${desired}-${i++}`;
    }
    nextSlug = candidate;
  }

  // publishAt logic
  let publishedAt = post.publishedAt;
  if (publishNow && !post.publishedAt) publishedAt = new Date();
  if (!publishNow) publishedAt = null;

  const updated = await db.post.update({
    where: { id: post.id },
    data: {
      title,
      slug: nextSlug,
      excerpt,
      content,
      published: publishNow,
      publishedAt,
    },
    select: { slug: true, published: true },
  });

  // revalidate listing and both old/new detail paths (if changed)
  revalidatePath("/blog");
  revalidatePath(`/blog/${currentSlug}`);
  if (currentSlug !== nextSlug) revalidatePath(`/blog/${nextSlug}`);

  return { slug: updated.slug, published: updated.published };
}

/** DELETE */
export async function deletePostAction(slug: string) {
  await requireAdmin();
  const post = await db.post.findUnique({ where: { slug } });
  if (!post) throw new Error("Post not found");

  await db.post.delete({ where: { id: post.id } });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { ok: true };
}
