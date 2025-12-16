"use client";

import { useRef, useState } from "react";
import TiptapEditor, { TiptapEditorHandle } from "../TiptapEditor/TiptapEditor";
import styles from "./AdminNewPostForm.module.css";
import Button from "@/components/shared/Button/Button";

type Props = {
  action: (formData: FormData) => Promise<{ slug: string; published: boolean }>;
};

export default function AdminNewPostForm({ action }: Props) {
  const editorRef = useRef<TiptapEditorHandle>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    try {
      setPending(true);
      setError(null);
      const html = editorRef.current?.getHTML() ?? "";
      formData.set("content", html);
      const res = await action(formData);
      window.location.href = res.published
        ? `/blog/${res.slug}`
        : "/admin/blog";
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to save post";
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Create Blog Post</h1>

      {error && <div className={styles.alert}>{error}</div>}

      <form action={onSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Title</label>
          <input
            name='title'
            type='text'
            required
            className={styles.input}
            placeholder='Post title'
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Excerpt (optional)</label>
          <textarea
            name='excerpt'
            className={styles.textarea}
            placeholder='Short summary…'
            rows={2}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Content</label>
          <div className={styles.editor}>
            <TiptapEditor ref={editorRef} />
          </div>
        </div>

        <input type='hidden' name='content' />

        <label className={styles.checkboxRow}>
          <input name='publish' type='checkbox' />
          <span>Publish immediately</span>
        </label>
        <div className={styles.actions}>
          <Button
            btnType='accent'
            type='submit'
            disabled={pending}
            text={pending ? "Saving…" : "Save"}
          />
          <Button href='/admin' btnType='blackOutline' text='Cancel' />
        </div>
      </form>
    </section>
  );
}
