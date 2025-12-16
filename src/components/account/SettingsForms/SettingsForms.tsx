// components/account/SettingsForms/SettingsForms.tsx
"use client";

import { useRef, useState } from "react";
import styles from "./SettingsForms.module.css";
import Modal from "@/components/shared/Modal/Modal";

type ModalType = "name" | "email" | "password" | "billing" | null;

export default function SettingsForms() {
  // Form refs
  const nameFormRef = useRef<HTMLFormElement>(null);
  const emailFormRef = useRef<HTMLFormElement>(null);
  const passwordFormRef = useRef<HTMLFormElement>(null);
  const billingFormRef = useRef<HTMLFormElement>(null);

  // Input refs (for preview)
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Modal state
  const [modalType, setModalType] = useState<ModalType>(null);
  const [pending, setPending] = useState(false);
  const [preview, setPreview] = useState<{ name?: string; email?: string }>({});

  function openNameModal(e: React.FormEvent) {
    e.preventDefault();
    setPreview({ name: nameInputRef.current?.value?.trim() || "" });
    setModalType("name");
  }

  function openEmailModal(e: React.FormEvent) {
    e.preventDefault();
    setPreview({ email: emailInputRef.current?.value?.trim() || "" });
    setModalType("email");
  }

  function openPasswordModal(e: React.FormEvent) {
    e.preventDefault();
    setPreview({});
    setModalType("password");
  }

  function openBillingModal(e: React.FormEvent) {
    e.preventDefault();
    setPreview({});
    setModalType("billing");
  }

  function onCancel() {
    if (pending) return;
    setModalType(null);
  }

  function onConfirm() {
    if (pending || !modalType) return;
    setPending(true);

    switch (modalType) {
      case "name":
        nameFormRef.current?.submit();
        break;
      case "email":
        emailFormRef.current?.submit();
        break;
      case "password":
        passwordFormRef.current?.submit();
        break;
      case "billing":
        billingFormRef.current?.submit();
        break;
    }
  }

  return (
    <section className={styles.grid}>
      <form
        ref={nameFormRef}
        method='POST'
        action='/account/settings/actions'
        className={styles.card}
        onSubmit={openNameModal}
      >
        <h3 className={styles.heading}>Display name</h3>
        <input type='hidden' name='action' value='update_name' />
        <label className={styles.label} htmlFor='settings-name'>
          Name
        </label>
        <input
          ref={nameInputRef}
          id='settings-name'
          className={styles.input}
          name='name'
          placeholder='Your name'
          required
        />
        <button className={styles.primaryBtn} type='submit' disabled={pending}>
          {pending && modalType === "name" ? "Saving…" : "Save"}
        </button>
      </form>

      {/* Email */}
      <form
        ref={emailFormRef}
        method='POST'
        action='/account/settings/actions'
        className={styles.card}
        onSubmit={openEmailModal}
      >
        <h3 className={styles.heading}>Email</h3>
        <input type='hidden' name='action' value='update_email' />
        <label className={styles.label} htmlFor='settings-email'>
          Email
        </label>
        <input
          ref={emailInputRef}
          id='settings-email'
          className={styles.input}
          type='email'
          name='email'
          placeholder='you@example.com'
          required
        />
        <button className={styles.primaryBtn} type='submit' disabled={pending}>
          {pending && modalType === "email" ? "Saving…" : "Save"}
        </button>
      </form>

      {/* Password */}
      <form
        ref={passwordFormRef}
        method='POST'
        action='/account/settings/actions'
        className={styles.card}
        onSubmit={openPasswordModal}
      >
        <h3 className={styles.heading}>Password</h3>
        <input type='hidden' name='action' value='change_password' />
        <label className={styles.label} htmlFor='current'>
          Current password
        </label>
        <input
          className={styles.input}
          id='current'
          type='password'
          name='current'
        />
        <label className={styles.label} htmlFor='next'>
          New password
        </label>
        <input
          className={styles.input}
          id='next'
          type='password'
          name='next'
          required
        />
        <label className={styles.label} htmlFor='confirm'>
          Confirm new password
        </label>
        <input
          className={styles.input}
          id='confirm'
          type='password'
          name='confirm'
          required
        />
        <button className={styles.warnBtn} type='submit' disabled={pending}>
          {pending && modalType === "password"
            ? "Updating…"
            : "Update Password"}
        </button>
      </form>

      {/* Billing / Payment Method (Stripe Portal) */}
      <form
        ref={billingFormRef}
        method='POST'
        action='/account/billing/portal'
        className={styles.card}
        onSubmit={openBillingModal}
      >
        <h3 className={styles.heading}>Payment method</h3>
        <p className={styles.help}>
          Securely update your card on file through Stripe.
        </p>
        <input type='hidden' name='flow' value='payment_method_update' />
        <button
          className={styles.secondaryBtn}
          type='submit'
          disabled={pending}
        >
          {pending && modalType === "billing"
            ? "Opening…"
            : "Manage payment method"}
        </button>
      </form>

      {/* Shared confirm modal */}
      <Modal isOpen={modalType !== null} onClose={onCancel}>
        <div style={{ display: "grid", gap: 12 }}>
          <h2 style={{ margin: 0 }}>
            {modalType === "name" && "Confirm name change"}
            {modalType === "email" && "Confirm email change"}
            {modalType === "password" && "Confirm password change"}
            {modalType === "billing" && "Open Stripe Billing?"}
          </h2>

          {modalType === "name" && (
            <p style={{ margin: 0 }}>
              Update display name to{" "}
              <strong>{preview.name || "(empty)"}</strong>?
            </p>
          )}

          {modalType === "email" && (
            <p style={{ margin: 0 }}>
              Change login email to{" "}
              <strong>{preview.email || "(empty)"}</strong>? You might need to
              re-verify and sign in again.
            </p>
          )}

          {modalType === "password" && (
            <p style={{ margin: 0 }}>
              You’re about to change your password. You’ll need to sign in
              again.
            </p>
          )}

          {modalType === "billing" && (
            <p style={{ margin: 0 }}>
              We’ll open Stripe’s secure Billing Portal to manage your payment
              method.
            </p>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              type='button'
              onClick={onCancel}
              className={styles.secondaryBtn}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={onConfirm}
              className={
                modalType === "password" ? styles.warnBtn : styles.primaryBtn
              }
              disabled={pending}
            >
              {pending
                ? "Submitting…"
                : modalType === "billing"
                  ? "Open Stripe"
                  : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
