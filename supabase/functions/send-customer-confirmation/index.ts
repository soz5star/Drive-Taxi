import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const booking: BookingData = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f9fafb;
            padding: 20px;
          }
          .email-wrapper {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #000000 0%, #1f1f1f 50%, #000000 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header p {
            font-size: 16px;
            color: #fcd34d;
            font-weight: 500;
          }
          .checkmark {
            width: 60px;
            height: 60px;
            background: #fcd34d;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 30px;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #111827;
          }
          .message {
            font-size: 15px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
          }
          .section-title {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #fcd34d;
          }
          .journey-card {
            background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 24px;
            margin-bottom: 24px;
          }
          .location-row {
            display: flex;
            align-items: start;
            margin-bottom: 20px;
            position: relative;
          }
          .location-row:last-child {
            margin-bottom: 0;
          }
          .location-icon {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            flex-shrink: 0;
            margin-right: 16px;
          }
          .icon-pickup {
            background: #dcfce7;
            color: #166534;
          }
          .icon-dropoff {
            background: #fee2e2;
            color: #991b1b;
          }
          .location-details h4 {
            font-size: 12px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
          }
          .location-details p {
            font-size: 16px;
            color: #111827;
            font-weight: 600;
          }
          .detail-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 24px;
          }
          .detail-item {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
          }
          .detail-label {
            font-size: 11px;
            text-transform: uppercase;
            color: #6b7280;
            font-weight: 600;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
          }
          .detail-value {
            font-size: 16px;
            color: #111827;
            font-weight: 600;
          }
          .student-badge {
            background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
            color: #000;
            padding: 16px 20px;
            border-radius: 10px;
            text-align: center;
            font-weight: 700;
            font-size: 15px;
            margin: 24px 0;
            box-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
          }
          .notes-box {
            background: #fffbeb;
            border-left: 4px solid #fcd34d;
            padding: 16px 20px;
            border-radius: 6px;
            margin: 24px 0;
          }
          .notes-box strong {
            display: block;
            color: #92400e;
            font-size: 13px;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .notes-box p {
            color: #78350f;
            font-size: 15px;
            line-height: 1.6;
          }
          .cta-box {
            background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%);
            color: white;
            padding: 24px;
            border-radius: 10px;
            text-align: center;
            margin: 30px 0;
          }
          .cta-box p {
            font-size: 15px;
            margin-bottom: 16px;
            color: #e5e7eb;
          }
          .cta-box strong {
            display: block;
            font-size: 20px;
            color: #fcd34d;
            margin-bottom: 8px;
          }
          .contact-button {
            display: inline-block;
            background: #fcd34d;
            color: #000;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 700;
            font-size: 15px;
            margin-top: 12px;
            transition: background 0.3s;
          }
          .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer-logo {
            font-size: 22px;
            font-weight: 800;
            color: #111827;
            margin-bottom: 12px;
          }
          .footer-contact {
            font-size: 14px;
            color: #6b7280;
            margin: 6px 0;
          }
          .footer-contact a {
            color: #000;
            text-decoration: none;
            font-weight: 600;
          }
          .footer-tagline {
            font-size: 13px;
            color: #9ca3af;
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px solid #e5e7eb;
          }
          @media only screen and (max-width: 600px) {
            .email-wrapper { border-radius: 0; }
            .header { padding: 30px 20px; }
            .content { padding: 30px 20px; }
            .detail-grid { grid-template-columns: 1fr; }
            .header h1 { font-size: 24px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="checkmark">✓</div>
            <h1>Booking Request Received!</h1>
            <p>Reference: #${booking.phone.slice(-4)}-${new Date().getTime().toString().slice(-4)}</p>
          </div>

          <div class="content">
            <div class="greeting">Hi ${booking.name},</div>
            <div class="message">
              Thank you for choosing Drive Taxi. We've received your booking request. Please note this is an estimated price based on the details provided. Our team will contact you to confirm all details and provide your final quote.
            </div>

            <div class="section-title">Your Journey</div>
            <div class="journey-card">
              <div class="location-row">
                <div class="location-icon icon-pickup">📍</div>
                <div class="location-details">
                  <h4>Pickup Location</h4>
                  <p>${booking.pickupLocation}</p>
                </div>
              </div>
              <div class="location-row">
                <div class="location-icon icon-dropoff">🎯</div>
                <div class="location-details">
                  <h4>Drop-off Location</h4>
                  <p>${booking.dropoffLocation}</p>
                </div>
              </div>
            </div>

            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">📅 Pickup Date</div>
                <div class="detail-value">${booking.pickupDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">🕐 Pickup Time</div>
                <div class="detail-value">${booking.pickupTime}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">👥 Passengers</div>
                <div class="detail-value">${booking.passengers} ${booking.passengers === 1 ? 'person' : 'people'}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">🧳 Luggage</div>
                <div class="detail-value">${booking.luggage} ${booking.luggage === 1 ? 'item' : 'items'}</div>
              </div>
            </div>

            ${booking.flightNumber ? `
            <div class="detail-item" style="margin-bottom: 20px;">
              <div class="detail-label">✈️ Flight Number</div>
              <div class="detail-value">${booking.flightNumber}</div>
            </div>
            ` : ''}

            ${booking.isStudent ? `
            <div class="student-badge">
              🎓 Student Discount Applied - 10% OFF
            </div>
            ` : ''}

            ${booking.notes ? `
            <div class="notes-box">
              <strong>💬 Your Special Requests</strong>
              <p>${booking.notes}</p>
            </div>
            ` : ''}

            <div class="cta-box">
              <p>We'll contact you shortly on:</p>
              <strong>📞 ${booking.phone}</strong>
              <p style="font-size: 13px; margin-top: 12px;">Need to reach us first?</p>
              <a href="tel:07470856699" class="contact-button">Call Us: 07470 856699</a>
            </div>

            <div class="message" style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              💡 <strong>Tip:</strong> We also use WhatsApp for quick communication. Save our number and message us if you need anything!
            </div>
          </div>

          <div class="footer">
            <div class="footer-logo">Drive Taxi</div>
            <div class="footer-contact">
              📞 Phone: <a href="tel:07470856699">07470 856699</a>
            </div>
            <div class="footer-contact">
              💬 WhatsApp Available
            </div>
            <div class="footer-tagline">
              Professional, reliable taxi service in St Andrews<br>
              Your journey, our priority
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "St Andrews Taxis <bookings@drivetaxi.co.uk>",
        to: booking.email,
        subject: "Booking Confirmation - St Andrews Taxis",
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
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});