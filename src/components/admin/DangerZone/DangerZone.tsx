"use client";

import { useState } from "react";
import styles from "./DangerZone.module.css";

type Plan = "SOLO" | "TEAM" | "RENTAL_FLEET" | "MULTI_LOCATION" | "CUSTOM";

export default function DangerZone({
  userId,
  currentPlan,
  hasActiveSub,
}: {
  userId: string;
  currentPlan: Plan | null | undefined;
  hasActiveSub: boolean;
}) {
  const [plan, setPlan] = useState<Plan>(currentPlan ?? "SOLO");
  const actionUrl = `/admin/users/${userId}/actions`;

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Danger Zone</h2>
      <p className={styles.note}>
        These actions make permanent changes in your database and Stripe.
        Proceed carefully.
      </p>

      <div className={styles.grid}>
        <form
          method='POST'
          action={actionUrl}
          className={styles.block}
          onSubmit={(e) => {
            if (
              !window.confirm(
                "Switch this user’s plan in Stripe and the database?"
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <input type='hidden' name='action' value='change_plan' />
          <label className={styles.label}>Change Plan</label>
          <select
            name='plan'
            className={styles.select}
            value={plan}
            onChange={(e) => setPlan(e.target.value as Plan)}
          >
            <option value='SOLO'>Solo</option>
            <option value='TEAM'>Team</option>
            <option value='RENTAL_FLEET'>Rental/Fleet</option>
            <option value='MULTI_LOCATION'>Multi-Location</option>
            <option value='CUSTOM'>Custom</option>
          </select>
          <button className={styles.btn} type='submit'>
            Update Plan
          </button>
          <p className={styles.help}>
            Updates the active Stripe subscription’s price item and your DB row.
            Proration is off.
          </p>
        </form>

        {hasActiveSub ? (
          <>
            <form
              method='POST'
              action={actionUrl}
              className={styles.block}
              onSubmit={(e) => {
                if (!window.confirm("Cancel at period end in Stripe?")) {
                  e.preventDefault();
                }
              }}
            >
              <input type='hidden' name='action' value='cancel_at_period_end' />
              <button className={styles.warnBtn} type='submit'>
                Cancel at period end
              </button>
              <p className={styles.help}>
                Sets <code>cancel_at_period_end=true</code> in Stripe and
                updates your DB flag.
              </p>
            </form>

            <form
              method='POST'
              action={actionUrl}
              className={styles.block}
              onSubmit={(e) => {
                if (
                  !window.confirm(
                    "Resume (unset cancel at period end) in Stripe?"
                  )
                ) {
                  e.preventDefault();
                }
              }}
            >
              <input type='hidden' name='action' value='resume' />
              <button className={styles.okBtn} type='submit'>
                Resume (unset cancel)
              </button>
              <p className={styles.help}>
                Clears <code>cancel_at_period_end</code> in Stripe and your DB.
              </p>
            </form>
          </>
        ) : null}

        <form
          method='POST'
          action={actionUrl}
          className={styles.block}
          onSubmit={(e) => {
            const v = prompt("Type DELETE to permanently remove this user.");
            if (v !== "DELETE") e.preventDefault();
          }}
        >
          <input type='hidden' name='action' value='delete_user' />
          <button className={styles.dangerBtn} type='submit'>
            Delete user
          </button>
          <p className={styles.help}>
            Permanently deletes the user, accounts, subscriptions in your DB,
            and attempts to delete the Stripe customer. Irreversible.
          </p>
        </form>
      </div>
    </section>
  );
}
