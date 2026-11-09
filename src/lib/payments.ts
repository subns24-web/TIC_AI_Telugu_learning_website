/* The workshop's Google Apps Script web app (same URL as success.html on the landing page).
 * Posting { type: "paid", payment_id } asks it to check that payment with Razorpay right away,
 * instead of waiting for its 5-minute timer. Razorpay's answer is the only thing it trusts, so a
 * fake call records nothing. */
export const PAYMENT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz5Gvw4CEixHth_OxcBA1hldM53qrc6G2hmb2JP60GnzN1g2zbvRbX1wDu7Pnl6JTzsEw/exec";

/* After paying ₹4999 on Razorpay, buyers are sent back to /courses?razorpay_payment_id=…
 * (set as the payment page's redirect URL in Razorpay). */
export const AFTER_COURSE_PAYMENT = "/courses";
