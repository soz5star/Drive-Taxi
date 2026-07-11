import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { corsHeaders, escapeHtml } from "../_shared/cors.ts";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  flightNumber?: string;
  passengers: number;
  luggage: number;
  isStudent: boolean;
  notes?: string;
}

Deno.serve(async (req: Request) => {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: cors,
    });
  }

  try {
    const booking: BookingData = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const ownerEmail = Deno.env.get("OWNER_EMAIL");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    if (!ownerEmail) {
      throw new Error("OWNER_EMAIL not configured");
    }

    // Escape all customer-supplied values before embedding them in HTML.
    const b = {
      name: escapeHtml(booking.name),
      email: escapeHtml(booking.email),
      phone: escapeHtml(booking.phone),
      phoneRaw: encodeURIComponent(String(booking.phone ?? "").replace(/\s+/g, "")),
      pickupLocation: escapeHtml(booking.pickupLocation),
      dropoffLocation: escapeHtml(booking.dropoffLocation),
      pickupDate: escapeHtml(booking.pickupDate),
      pickupTime: escapeHtml(booking.pickupTime),
      flightNumber: escapeHtml(booking.flightNumber),
      passengers: escapeHtml(booking.passengers),
      luggage: escapeHtml(booking.luggage),
      notes: escapeHtml(booking.notes),
    };

    const now = new Date();
    const pickupDateTime = new Date(`${booking.pickupDate}T${booking.pickupTime}`);
    const hoursUntilPickup = (pickupDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
    const isUrgent = hoursUntilPickup < 6;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; }
          .header { background: ${isUrgent ? 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)' : 'linear-gradient(135deg, #000 0%, #1f1f1f 100%)'}; color: white; padding: 30px; text-align: center; }
          .urgent-badge { background: #dc2626; color: white; padding: 10px 20px; border-radius: 4px; display: inline-block; margin: 10px 0; font-weight: bold; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 12px 0; padding: 12px; background: white; border-radius: 4px; border-left: 4px solid #fcd34d; }
          .label { font-weight: bold; color: #000; display: inline-block; min-width: 150px; }
          .value { color: #555; }
          .student-badge { background: #fcd34d; color: #000; padding: 8px 16px; border-radius: 4px; display: inline-block; margin: 10px 0; font-weight: bold; }
          .actions { background: #000; color: white; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center; }
          .actions a { color: #fcd34d; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚕 New Booking Request</h1>
            ${isUrgent ? '<div class="urgent-badge">⚠️ URGENT - Pickup in less than 6 hours!</div>' : ''}
          </div>
          <div class="content">
            <h2>Customer Details:</h2>
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">${b.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value"><a href="tel:${b.phone}">${b.phone}</a></span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${b.email}">${b.email}</a></span>
            </div>

            <h2>Journey Details:</h2>
            <div class="detail-row">
              <span class="label">Pickup:</span>
              <span class="value">${b.pickupLocation}</span>
            </div>
            <div class="detail-row">
              <span class="label">Drop-off:</span>
              <span class="value">${b.dropoffLocation}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date & Time:</span>
              <span class="value">${b.pickupDate} at ${b.pickupTime}</span>
            </div>
            ${booking.flightNumber ? `
            <div class="detail-row">
              <span class="label">Flight Number:</span>
              <span class="value">${b.flightNumber}</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="label">Passengers:</span>
              <span class="value">${b.passengers}</span>
            </div>
            <div class="detail-row">
              <span class="label">Luggage:</span>
              <span class="value">${b.luggage} items</span>
            </div>

            ${booking.isStudent ? '<div class="student-badge">🎓 Student Discount (10% off)</div>' : ''}

            ${booking.notes ? `
            <div class="detail-row">
              <span class="label">Special Requests:</span><br>
              <span class="value">${b.notes}</span>
            </div>
            ` : ''}

            <div class="actions">
              <h3>Quick Actions:</h3>
              <p><a href="tel:${b.phone}">📞 Call Customer: ${b.phone}</a></p>
              <p><a href="https://wa.me/${b.phoneRaw}">💬 WhatsApp Customer</a></p>
              <p><a href="mailto:${b.email}">✉️ Email Customer</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const subject = isUrgent
      ? `🚨 URGENT BOOKING - ${booking.name} - ${booking.pickupDate} ${booking.pickupTime}`
      : `New Booking Request - ${booking.name} - ${booking.pickupDate}`;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "St Andrews Taxis <bookings@drivetaxi.co.uk>",
        to: ownerEmail,
        subject: subject,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        headers: {
          ...cors,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending owner notification:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...cors,
          "Content-Type": "application/json",
        },
      }
    );
  }
});