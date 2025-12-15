/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/blog/[slug]/BlogPostPage.module.css";

type Tag = { _id: string; name: string; slug?: { current?: string } };

export default function BlogPostSidebarCategories({
  tags,
  initialSlug = "all",
}: {
  tags: Tag[];
  initialSlug?: string;
}) {
  const router = useRouter();

  const cleanTags = useMemo(() => tags.filter((t) => t.slug?.current), [tags]);

  const tagOptions = useMemo(
    () => [{ _id: "all", name: "All", slug: { current: "all" } }, ...cleanTags],
    [cleanTags]
  );

  const safeInitial =
    initialSlug === "all" ||
    cleanTags.some((t) => t.slug?.current === initialSlug)
      ? initialSlug
      : "all";

  const [selectedSlug, setSelectedSlug] = useState<string>(safeInitial);

//   function selectTag(slug: string) {
//     setSelectedSlug(slug);
//     if (slug === "all") router.push("/blog");
//     else router.push(`/blog?tag=${encodeURIComponent(slug)}`);
//   }

  return (
    <div className={styles.tagsSelectWrap}>
      <label htmlFor='tag-select' className='sr-only'>
        Categories
      </label>
      <ul className={styles.tags}>
        {tagOptions.map((t) => (
          <li key={t._id} className={styles.tagItem}>
            <a
              href={
                t.slug?.current === "all"
                  ? "/blog"
                  : `/blog?tag=${t.slug?.current}`
              }
              className={styles.tagLink}
            >
              {t.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
