import { NextResponse } from "next/server";
import { whatsappURL } from "@/lib/site";

/**
 * POST /api/enquiry
 *
 * Accepts: { name, phone, vehicle?, message, consent? }
 *
 * By default this handler just validates, logs the enquiry server-side and
 * returns a `whatsappUrl` so the client can follow up on WhatsApp. To actually
 * deliver enquiries, wire one of the optional integrations below:
 *
 *   - FORMSPREE_ENDPOINT  → set in env, we'll forward JSON
 *   - RESEND_API_KEY / RESEND_TO  → we'll send an email via Resend
 *
 * No third-party SDK is imported unconditionally so the site builds without
 * any of these env vars.
 */
export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const vehicle = String(data.vehicle ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Please include name, phone and a message." },
      { status: 400 }
    );
  }

  if (!/^\+?[0-9\s\-()]{7,}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Phone number looks invalid." },
      { status: 400 }
    );
  }

  // Log for server visibility (Vercel/function logs).
  console.log("[enquiry]", { name, phone, vehicle, message, ts: new Date().toISOString() });

  const formspree = process.env.FORMSPREE_ENDPOINT;
  const resendKey = process.env.RESEND_API_KEY;
  const resendTo = process.env.RESEND_TO;

  try {
    if (formspree) {
      await fetch(formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, phone, vehicle, message }),
      });
    }
    if (resendKey && resendTo) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Alok Automobiles <enquiry@alokautomobiles.com>",
          to: [resendTo],
          subject: `New enquiry from ${name}`,
          text: `Name: ${name}\nPhone: ${phone}\nVehicle: ${vehicle || "-"}\n\n${message}`,
        }),
      });
    }
  } catch (err) {
    console.error("[enquiry] delivery error", err);
    // still return ok=true because the client can follow up on WhatsApp
  }

  const waMessage = [
    `Hi Alok Automobiles — new enquiry from the website.`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    vehicle ? `Vehicle: ${vehicle}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const waURL = whatsappURL(waMessage);

  return NextResponse.json({ ok: true, whatsappUrl: waURL });
}
