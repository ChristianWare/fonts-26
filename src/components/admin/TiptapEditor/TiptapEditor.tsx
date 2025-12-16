/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "./TiptapEditor.module.css";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Listing from "@/components/icons/Listing/Listing";
import ListOrdered from "@/components/icons/ListOrdered/ListOrdered";
import ImageIcon from "@/components/icons/ImageIcon/ImageIcon";
import LinkIcon from "@/components/icons/LinkIcon/LinkIcon";
import UndoIcon from "@/components/icons/UndoIcon/UndoIcon";
import RedoIcon from "@/components/icons/RedoIcon/RedoIcon";

export type TiptapEditorHandle = {
  getHTML: () => string;
  setHTML: (html: string) => void;
};

function Toolbar({ editor }: { editor: any }) {
  if (!editor) return null;

  // const btn = (active: boolean) =>
  //   `${styles.toolbarButton} ${active ? styles.toolbarButtonActive : ""}`;

  const addImage = () => {
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = window.prompt("Link URL");
    if (!url) return editor.chain().focus().unsetLink().run();
    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarRight}>
        <button
          type='button'
          onClick={() => editor.chain().focus().undo().run()}
          className={styles.toolbarButton}
        >
          <UndoIcon className={styles.listingIconii} />
        </button>
        <button
          type='button'
          onClick={() => editor.chain().focus().redo().run()}
          className={styles.toolbarButton}
        >
          <RedoIcon className={styles.listingIconii} />
        </button>
      </div>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={styles.toolbarButton}
      >
        B
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={styles.toolbarButton}
      >
        <i>I</i>
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={styles.toolbarButton}
      >
        <u>U</u>
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={styles.toolbarButton}
      >
        H2
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={styles.toolbarButton}
      >
        H3
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={styles.toolbarButton}
      >
        {/* List */}
        <Listing className={styles.listingIcon} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={styles.toolbarButton}
      >
        <ListOrdered className={styles.listingIconii} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={styles.toolbarButton}
      >
        “ ”
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={styles.toolbarButton}
      >
        {"</>"}
      </button>
      <button type='button' onClick={addLink} className={styles.toolbarButton}>
        <LinkIcon className={styles.listingIconii} />
      </button>
      <button type='button' onClick={addImage} className={styles.toolbarButton}>
        <ImageIcon className={styles.listingIconii} />
      </button>
    </div>
  );
}

const TiptapEditor = forwardRef<TiptapEditorHandle, { initialHTML?: string }>(
  ({ initialHTML = "<p></p>" }, ref) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
        Image,
      ],
      content: "",
      editorProps: {
        attributes: {
          class: styles.editorContent,
        },
      },
      immediatelyRender: false,
    });

    useEffect(() => {
      if (mounted && editor) {
        editor.commands.setContent(initialHTML);
      }
    }, [mounted, editor, initialHTML]);

    useImperativeHandle(
      ref,
      () => ({
        getHTML: () => editor?.getHTML() ?? "",
        setHTML: (html) => editor?.commands.setContent(html),
      }),
      [editor]
    );

    if (!mounted || !editor) return null;

    return (
      <div className={styles.editorRoot}>
        <Toolbar editor={editor} />
        <div className={styles.editorFrame}>
          <EditorContent editor={editor} className={styles.editorWrapper} />
        </div>
      </div>
    );
  }
);

TiptapEditor.displayName = "TiptapEditor";
export default TiptapEditor;
