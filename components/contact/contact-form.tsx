"use client";

import { useState, type FormEvent } from "react";
import { FormButton } from "../buttons/form-button";

/**
 * ContactForm
 *
 * Source: Framer project "aiir-salon-claude", the Contact page's Desktop
 * node (nodeId afN_GnEcN), the "Wrapper" card inside "FormSection"
 * (nodeId zmosUM2I2), read via getSelectedNodesXml.
 *
 * CONFIRMED:
 * - Card: backgroundColor "/Secondary BG" (-> `bg-secondary-bg`),
 *   border 3px solid "/Secondary text color" (-> `border-secondary-text`),
 *   borderRadius 14px, padding 24px, gap 64px between the title and the
 *   form itself.
 * - Title: "Curate My Experience", "/Headings/H4" (-> `text-h4`).
 * - Form: gap 20px between rows. Row1 (gap 32px): First Name, Last
 *   Name. Row2 (gap 32px): Email, Phone Number. Row3: Services. Then
 *   Message. Each field's label uses "/Paragraph/Eyebrow text" (->
 *   `text-eyebrow`), gap 8px between label and (missing) input.
 * - Submit uses the already-built `FormButton` (componentId rc7N9gTiL),
 *   width 1fr, height 50px.
 *
 * INFERRED:
 * - This is the single biggest gap in this component: Framer's readable
 *   node tree only ever exposed each field's *label* text
 *   ("First Name", "Last Name", ...) — every attempt to read further
 *   (direct, via parent, nodeId concatenation) came back with the label
 *   as the label's only child, no input/textarea/select sibling at all.
 *   Framer's native form-input elements apparently aren't exposed by
 *   this reading tool the way Frame/Text/SVG nodes are. So every actual
 *   `<input>`/`<select>`/`<textarea>` here — sizing, border, radius,
 *   padding, placeholder styling — is built from scratch to match this
 *   project's visual language (the `/Primary BG` info-tile style seen in
 *   ContactDetails), not confirmed against real Framer data. Worth a
 *   visual check once this is live.
 * - "Services" reads as a selector (its label implies picking a service
 *   type) rather than free text — built as a `<select>` with this
 *   project's already-established service categories (Beauty, Nails,
 *   Grooming, Hair — the same set as BlogTabs/CoreValues) as options,
 *   since no real options list exists in Framer's data.
 * - No submit endpoint or validation exists in Framer's (static) data —
 *   this wires `FormButton`'s existing idle/loading/success/error
 *   states to a local `onSubmit` handler with placeholder timing (no
 *   real request is sent). Replace `handleSubmit`'s body with a real
 *   API call/action once one exists; the surrounding UI won't need to
 *   change.
 *
 * UPDATE (per your instruction — Resend wired up, send from
 * info@digitalfry.in to hello@aiir.salon via NEXT_PUBLIC_RESEND_API_KEY):
 * `handleSubmit` now actually posts JSON to `app/api/contact/route.ts`
 * (same pattern already used for the Booleans Cricket project's contact
 * form) instead of the placeholder timeout. On failure, the API's error
 * message is passed into `FormButton`'s `errorLabel` so the real reason
 * shows instead of a generic label; the form only resets on a confirmed
 * success.
 *
 * UPDATE (bug fixes, reported after comparing against the live Framer
 * preview — not from Framer node data, since it never exposed the actual
 * inputs):
 * - Inputs had no `placeholder` at all, so every field looked empty/blank
 *   instead of showing the hint text visible in your screenshot ("Your
 *   first name", "Your email", etc.) — added them, matching your
 *   screenshot's copy as closely as text-only Framer data allows (still
 *   unconfirmed against real node data, same caveat as the rest of this
 *   file).
 * - The `<select>` had no `appearance-none` reset, so every browser drew
 *   its own native dropdown chrome (visible as a mismatched OS-style
 *   spinner/arrow in your screenshot) instead of this project's look —
 *   reset it and added a custom chevron icon overlay to match the other
 *   fields.
 * - The card's actual color was wrong, not this file — see globals.css's
 *   UPDATE note on the `--secondary-bg` token, which this card's
 *   `bg-secondary-bg` class reads from.
 */

const SERVICE_OPTIONS = ["Beauty", "Nails", "Grooming", "Hair"];

const fieldClassName =
  "w-full rounded-lg border border-primary-text/15 bg-white px-4 py-3 text-body-16 text-primary-text placeholder:text-primary-text/40 focus:border-primary focus:outline-none";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex w-full flex-col items-start gap-2">
      <span className="text-eyebrow text-primary-text/70">{label}</span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
      service: data.get("service"),
      message: data.get("message"),
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <div className="border-secondary-text bg-secondary-bg flex w-full flex-col gap-16 rounded-[14px]  p-6">
      <h4 className="text-h4 text-primary-text">Curate My Experience</h4>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <Field label="First Name">
            <input
              type="text"
              name="firstName"
              placeholder="Your first name"
              required
              className={fieldClassName}
            />
          </Field>
          <Field label="Last Name">
            <input
              type="text"
              name="lastName"
              placeholder="Your last name"
              required
              className={fieldClassName}
            />
          </Field>
        </div>
        <div className="flex w-full flex-col gap-8 sm:flex-row">
          <Field label="Email">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className={fieldClassName}
            />
          </Field>
          <Field label="Phone Number">
            <input
              type="tel"
              name="phone"
              placeholder="Your number"
              required
              className={fieldClassName}
            />
          </Field>
        </div>
        <Field label="Services">
          <div className="relative w-full">
            <select
              name="service"
              required
              defaultValue=""
              className={[fieldClassName, "appearance-none pr-10"].join(" ")}
            >
              <option value="" disabled>
                Select services
              </option>
              {SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-primary-text/60 pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Field>
        <Field label="Message">
          <textarea
            name="message"
            rows={4}
            placeholder="Type your message here..."
            required
            className={[fieldClassName, "resize-none"].join(" ")}
          />
        </Field>
        <FormButton
          type="submit"
          status={status}
          errorLabel={errorMessage || "Something went wrong"}
          className="h-[50px] w-full"
        />
      </form>
    </div>
  );
}
