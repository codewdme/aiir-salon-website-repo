"use client";

/**
 * FormButton
 *
 * Source: Framer project "aiir-salon-claude", component "Form button"
 * (nodeId rc7N9gTiL, in the "Buttons" folder), read via
 * getSelectedNodesXml (all 7 states: Default, Hover, Pressed, Loading,
 * Disabled, Success, Error).
 *
 * CONFIRMED:
 * - Shape: 240x40px, borderRadius 10px, text uses "/Paragraph/Eyebrow
 *   text" (-> `text-eyebrow`) for Submit, but Success/Error use a
 *   literal "Inter-SemiBold" font instead of a project text style —
 *   originally stood in with Instrument Sans at weight 600; per your
 *   later instruction to use only Montserrat + the heading font
 *   project-wide, this now uses Montserrat at weight 600 instead
 *   (`font-montserrat font-semibold`, weight 600 added to layout.tsx).
 * - Default: backgroundColor "/Primary color" (-> `bg-primary`).
 * - Hover: backgroundColor rgba(172, 116, 85, 0.8) — a distinct color
 *   not matching any existing project token, used as-is via an arbitrary
 *   value.
 * - Pressed: backgroundColor "/Primary text color" (-> `active:bg-primary-text`).
 * - Disabled: opacity 0.5 on the whole component (-> `disabled:opacity-50`).
 * - Loading: same bg as Default, contains a rotating conic spinner
 *   (20x20, white highlight) — reproduced as a standard CSS spin
 *   (`animate-spin`) ring rather than the exact conic-gradient mechanic,
 *   same visual read.
 * - Success: backgroundColor "/Primary color", label "Thank you".
 * - Error: backgroundColor rgba(255, 34, 68, 0.15) — a red not in the
 *   project's color tokens (differs from the `/Red` token), used as-is
 *   via an arbitrary value since it reads as a functional/state color
 *   rather than a brand color; label "Something went wrong".
 *
 * INFERRED:
 * - No text color was set on Submit/Thank you/Something went wrong in
 *   Framer's data (the same "unset color" pattern seen on TabButton and
 *   Button). Used white for Default/Hover/Pressed/Loading/Success (matches
 *   the screenshot) and the `red` token for Error's text (screenshot
 *   shows a reddish tone close to, but not exactly confirmed against,
 *   that token — worth a visual check).
 * - This is built as a controlled/presentational component — the parent
 *   (whatever form uses it) is expected to drive `status` through
 *   idle -> loading -> success/error; no request logic lives here.
 *
 * UPDATE (once a real usage appeared — the Contact page's form needs
 * this full-width at 50px, not the confirmed instance's fixed 240x40):
 * sizing moved out of the hardcoded base classes and into `className`'s
 * own default value (`"h-10 w-[240px]"`), so passing a different
 * `className` fully replaces the size instead of fighting it — same
 * fix as CoreValuesCard's width, for the same reason (two conflicting
 * Tailwind size utilities in one class list resolve by stylesheet
 * order, not source order, which is unpredictable).
 */

type FormButtonStatus = "idle" | "loading" | "disabled" | "success" | "error";

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
    />
  );
}

type FormButtonProps = {
  status?: FormButtonStatus;
  type?: "button" | "submit";
  onClick?: () => void;
  idleLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  className?: string;
};

export function FormButton({
  status = "idle",
  type = "submit",
  onClick,
  idleLabel = "Submit",
  successLabel = "Thank you",
  errorLabel = "Something went wrong",
  className = "h-10 w-[240px]",
}: FormButtonProps) {
  const isDisabled = status === "disabled" || status === "loading";
  const isErrorOrSuccess = status === "success" || status === "error";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-[10px] transition-colors duration-200",
        isErrorOrSuccess
          ? "font-montserrat font-semibold"
          : "text-eyebrow",
        status === "idle" &&
          "bg-primary text-white hover:bg-[rgba(172,116,85,0.8)] active:bg-primary-text",
        status === "loading" && "bg-primary text-white cursor-wait",
        status === "disabled" &&
          "bg-primary text-white opacity-50 cursor-not-allowed",
        status === "success" && "bg-primary text-white",
        status === "error" && "bg-[rgba(255,34,68,0.15)] text-red",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {status === "loading" ? (
        <Spinner />
      ) : status === "success" ? (
        successLabel
      ) : status === "error" ? (
        errorLabel
      ) : (
        idleLabel
      )}
    </button>
  );
}
