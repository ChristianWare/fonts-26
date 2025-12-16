/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/AdminEditPostForm.tsx
"use client";

import { useRef, useState } from "react";
import TiptapEditor, { TiptapEditorHandle } from "../TiptapEditor/TiptapEditor";

type Props = {
  initialTitle: string;
  initialSlug: string;
  initialExcerpt: string;
  initialHTML: string;
  initialPublished: boolean;
  updateAction: (
    formData: FormData
  ) => Promise<{ slug: string; published: boolean }>;
  deleteAction: (formData: FormData) => Promise<{ ok: boolean }>;
};

export default function AdminEditPostForm({
  initialTitle,
  initialSlug,
  initialExcerpt,
  initialHTML,
  initialPublished,
  updateAction,
  deleteAction,
}: Props) {
  const editorRef = useRef<TiptapEditorHandle>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSave(formData: FormData) {
    try {
      setPending(true);
      setError(null);
      const html = editorRef.current?.getHTML() ?? "";
      formData.set("content", html);
      const res = await updateAction(formData);
      window.location.href = res.published
        ? `/blog/${res.slug}`
        : "/admin/blog";
    } catch (e: any) {
      setError(e?.message ?? "Failed to save changes");
    } finally {
      setPending(false);
    }
  }

  async function onDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      setPending(true);
      setError(null);
      await deleteAction(new FormData());
      window.location.href = "/admin/blog";
    } catch (e: any) {
      setError(e?.message ?? "Failed to delete post");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className='mx-auto max-w-2xl p-6'>
      <h1 className='text-2xl font-bold mb-4'>Edit Post</h1>

      {error && (
        <div className='mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700'>
          {error}
        </div>
      )}

      {/* SAVE FORM */}
      <form action={onSave} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            name='title'
            type='text'
            required
            defaultValue={initialTitle}
            className='mt-1 w-full rounded-md border px-3 py-2'
          />
        </div>

        <div>
          <label className='block text-sm font-medium'>Slug (optional)</label>
          <input
            name='slug'
            type='text'
            placeholder={initialSlug}
            className='mt-1 w-full rounded-md border px-3 py-2'
          />
          <p className='text-xs text-neutral-500 mt-1'>
            Leave blank to keep <code>{initialSlug}</code>. Enter a new slug to
            change the URL.
          </p>
        </div>

        <div>
          <label className='block text-sm font-medium'>
            Excerpt (optional)
          </label>
          <textarea
            name='excerpt'
            defaultValue={initialExcerpt}
            className='mt-1 w-full rounded-md border px-3 py-2'
            rows={2}
          />
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Content</label>
          <TiptapEditor ref={editorRef} initialHTML={initialHTML} />
        </div>

        <input type='hidden' name='content' />

        <label className='inline-flex items-center gap-2'>
          <input
            name='publish'
            type='checkbox'
            defaultChecked={initialPublished}
          />
          <span>Published</span>
        </label>

        <div className='flex items-center gap-3'>
          <button
            type='submit'
            disabled={pending}
            className='rounded-md bg-black px-4 py-2 text-white disabled:opacity-60'
          >
            {pending ? "Saving…" : "Save Changes"}
          </button>

          <a
            href='/admin/blog'
            className='text-sm underline underline-offset-4'
          >
            Cancel
          </a>
        </div>
      </form>

      {/* DELETE FORM */}
      <form onSubmit={onDelete} className='mt-6'>
        <button
          type='submit'
          disabled={pending}
          className='rounded-md border border-red-500 text-red-600 px-4 py-2 disabled:opacity-60'
        >
          Delete Post
        </button>
      </form>
    </div>
  );
}
