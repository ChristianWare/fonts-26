import styles from "./PaymentSettingsPage.module.css";

export const runtime = "nodejs";
export default function PaymentSettingsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment method</h1>
      <p className={styles.sub}>
        Securely update your card on file through Stripe.
      </p>
      <form
        method='POST'
        action='/account/billing/portal'
        className={styles.form}
      >
        <input type='hidden' name='flow' value='payment_method_update' />
        <button
          className={styles.secondaryBtn}
          type='submit'
          onClick={(e) => {
            if (!confirm("Open Stripe Billing to update your payment method?"))
              e.preventDefault();
          }}
        >
          Manage payment method
        </button>
      </form>
    </div>
  );
}
