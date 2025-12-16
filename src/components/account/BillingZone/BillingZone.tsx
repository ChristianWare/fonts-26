// components/account/BillingZone/BillingZone.tsx
"use client";

import { useRef, useState } from "react";
import styles from "./BillingZone.module.css";
import Modal from "@/components/shared/Modal/Modal";

type Plan = "SOLO" | "TEAM" | "RENTAL_FLEET" | "MULTI_LOCATION";
// | "CUSTOM"
type ModalType = "change_plan" | "cancel" | null;

export default function BillingZone({
  currentPlan,
  hasActiveSub,
}: {
  currentPlan: Plan | null | undefined;
  hasActiveSub: boolean;
}) {
  const [plan, setPlan] = useState<Plan>(currentPlan ?? "SOLO");
  const [modalType, setModalType] = useState<ModalType>(null);
  const [pending, setPending] = useState(false);

  const changeFormRef = useRef<HTMLFormElement>(null);
  const cancelFormRef = useRef<HTMLFormElement>(null);

  const actionUrl = `/account/actions`;

  function readablePlan(p: Plan) {
    switch (p) {
      case "SOLO":
        return "Solo";
      case "TEAM":
        return "Team";
      case "RENTAL_FLEET":
        return "Rental/Fleet";
      case "MULTI_LOCATION":
        return "Multi-Location";
      // case "CUSTOM":
      //   return "Custom";
    }
  }

  function openChangeModal(e: React.FormEvent) {
    e.preventDefault();
    setModalType("change_plan");
  }

  function openCancelModal(e: React.FormEvent) {
    e.preventDefault();
    setModalType("cancel");
  }

  function onCancel() {
    if (pending) return;
    setModalType(null);
  }

  function onConfirm() {
    if (pending || !modalType) return;
    setPending(true);
    if (modalType === "change_plan") {
      changeFormRef.current?.submit();
    } else if (modalType === "cancel") {
      cancelFormRef.current?.submit();
    }
  }

  return (
    <div>
      <h2 className={styles.title}>Manage your subscription</h2>
      <p className={styles.note}>
        Update your plan or cancel renewal at period end. These actions
        immediately affect your subscription.
      </p>
      <br />
      <br />
      <section className={styles.card}>
        {/* Change plan */}
        <form
          ref={changeFormRef}
          method='POST'
          action={actionUrl}
          className={styles.block}
          onSubmit={openChangeModal}
        >
          <input type='hidden' name='action' value='change_plan' />
          <label className={styles.label}>Select Plan:</label>
          <select
            name='plan'
            className={styles.select}
            value={plan}
            onChange={(e) => setPlan(e.target.value as Plan)}
            disabled={pending}
          >
            <option value='SOLO'>Solo</option>
            <option value='TEAM'>Team</option>
            <option value='RENTAL_FLEET'>Rental/Fleet</option>
            <option value='MULTI_LOCATION'>Multi-Location</option>
            {/* <option value='CUSTOM'>Custom</option> */}
          </select>
          <button className={styles.btn} type='submit' disabled={pending}>
            {pending && modalType === "change_plan"
              ? "Updating…"
              : "Update Plan"}
          </button>
        </form>
      </section>
      <br />
      <br />
      <h2 className={styles.title}>Danger Zone</h2>
      <br />

      {hasActiveSub ? (
        <section className={styles.cardDanger}>
          <div className={styles.cardLeft}>
            <div className={styles.subHeading}>Cancel your subscription</div>
            <p className={styles.note}>
              Once you cancel your subscription, you will lose access at the end
              of the billing period. Please be certain.
            </p>
          </div>
          <div className={styles.cardRight}>
            <form
              ref={cancelFormRef}
              method='POST'
              action={actionUrl}
              // className={styles.block}
              onSubmit={openCancelModal}
            >
              <input type='hidden' name='action' value='cancel_at_period_end' />
              <button
                className={styles.warnBtn}
                type='submit'
                disabled={pending}
              >
                {pending && modalType === "cancel"
                  ? "Cancelling…"
                  : "Cancel Account"}
              </button>
            </form>
          </div>
        </section>
      ) : null}

      <Modal isOpen={modalType !== null} onClose={onCancel}>
        <div style={{ display: "grid", gap: 12 }}>
          <h3 className='modalHeading'>
            {modalType === "change_plan"
              ? "Confirm plan change"
              : "Confirm cancellation"}
          </h3>

          {modalType === "change_plan" ? (
            <p style={{ marginTop: "10px", width: "90%" }}>
              Switch your subscription to <strong>{readablePlan(plan)}</strong>?
              This updates the active Stripe subscription and your account
              immediately.
            </p>
          ) : (
            <p style={{ margin: 0 }}>
              Set <code>cancel_at_period_end</code> for your subscription?
              You’ll continue to have access until the current period ends.
            </p>
          )}

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button
              type='button'
              onClick={onCancel}
              className={styles.btn}
              disabled={pending}
              style={{
                background: "transparent",
                border: "1px solid var(--gray)",
                color: "inherit",
              }}
            >
              Never mind
            </button>
            <button
              type='button'
              onClick={onConfirm}
              className={modalType === "cancel" ? styles.warnBtn : styles.btn}
              disabled={pending}
            >
              {pending
                ? "Submitting…"
                : modalType === "cancel"
                  ? "Confirm cancel"
                  : "Confirm change"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
