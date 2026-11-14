/**
 * Business policies, as set by the owner (2026-09-24). Kept in one place
 * because they appear on the pricing page, in its FAQ schema and in both
 * booking forms, and a policy that reads differently in two places is worse
 * than none.
 */

export const discount = {
  percent: 10,
  who: "veterans, active-duty military, first responders, teachers and healthcare workers",
  /** Shown wherever the discount is. */
  terms: "Mention it when you book. It can't be combined with other offers.",
};

/** One line for the forms, where the customer would claim it. */
export const discountNote = `Veteran, military, first responder, teacher or healthcare worker? Mention it here for ${discount.percent}% off.`;

/** Written as they read mid-sentence, so brand names keep their capitals. */
export const paymentMethods = ["credit and debit cards", "Zelle", "Venmo", "Cash App", "check", "cash"];

/** "credit and debit cards, Zelle, Venmo, Cash App, check and cash" */
export const paymentList = `${paymentMethods.slice(0, -1).join(", ")} and ${paymentMethods[paymentMethods.length - 1]}`;

/**
 * Deliberately no fee. The owner chose to ask for notice rather than charge
 * for late cancellations.
 */
export const cancellation = {
  summary: "No cancellation fee. Please give us 24 hours' notice if you need to cancel or reschedule.",
  detail:
    "Plans change — escrow falls through, sellers move dates. There's no fee to cancel or reschedule; we only ask for 24 hours' notice by phone or email so we can offer the slot to someone else. If you're booking a home you don't control, please make sure we'll be able to get in: access to the attic, crawl space, electrical panel and water heater makes the inspection complete.",
};
