import { NextResponse } from "next/server";
import { Resend } from "resend";

/*
 * Server-side handler for the /contact page's form
 * (components/contact/contact-form.tsx). Runs only on the server, so even
 * though the API key's env var is NEXT_PUBLIC_-prefixed (per your
 * instruction), referencing it exclusively here means Next.js never
 * inlines it into the client bundle -- it stays server-only in practice.
 * Flagging this because NEXT_PUBLIC_ vars are otherwise meant for values
 * that are fine to expose to the browser, which a Resend secret key is
 * not. Same pattern already used for the Booleans Cricket project's
 * contact route.
 *
 * Sends from info@digitalfry.in to hello@aiir.salon per your explicit
 * instruction. Note: the "from" address's domain (digitalfry.in) must be
 * verified in the Resend dashboard for sending to actually succeed --
 * that's a Resend account setup step outside this codebase.
 *
 * UPDATE (found via live verification -- an actual submit crashed with an
 * empty 500 instead of a JSON error): the Resend client was originally
 * constructed at module scope (`new Resend(...)`, same as the Booleans
 * Cricket project's route). The Resend SDK throws synchronously in its
 * constructor when the API key is missing/undefined -- and since no
 * `.env` exists in this repo yet, that's exactly what happened. A
 * module-scope throw happens during route compilation, outside this
 * file's own try/catch, so Next.js can't format it as a normal JSON
 * error response -- the request just gets a blank 500. Moved the client
 * construction inside the handler's try block so a missing/invalid key
 * now returns the same clean `{ error }` JSON shape as every other
 * failure case here, instead of crashing the module.
 */

export async function POST(request: Request) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form error: NEXT_PUBLIC_RESEND_API_KEY is not set.");
      return NextResponse.json(
        { error: "Email sending isn't configured yet. Please try again later." },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);

    const { firstName, lastName, email, phone, service, message } =
      await request.json();

    if (
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string" ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !service.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill in every field." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Aiir Salon <info@digitalfry.in>",
      to: "hello@aiir.salon",
      replyTo: email,
      subject: `New contact inquiry from ${firstName} ${lastName}`,
      text: `New inquiry from the Aiir Salon contact form.\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
