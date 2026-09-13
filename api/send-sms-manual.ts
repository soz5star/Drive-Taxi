import { createRemoteJWKSet, jwtVerify } from "jose";
import { corsHeaders } from "./_shared/cors.js";

interface ManualSMSData {
  phone: string;
  message: string;
}

const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
const jwks = jwksUrl ? createRemoteJWKSet(new URL(jwksUrl)) : null;

/** Confirm the caller holds a valid Neon Auth session token. */
async function requireAuthenticatedUser(req: Request): Promise<boolean> {
  const token = req.headers.get("Authorization")?.replace(/^Bearer /i, "");
  if (!token || !jwks) return false;
  try {
    const { payload } = await jwtVerify(token, jwks);
    return !!payload.sub && payload.role !== "anonymous";
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: cors,
    });
  }

  // Manual SMS is an admin-only action. Reject anything that isn't an
  // authenticated user session — the public anon key is not enough.
  if (!(await requireAuthenticatedUser(req))) {
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { ...cors, "Content-Type": "application/json" } }
    );
  }

  try {
    const data: ManualSMSData = await req.json();

    if (!data.phone || !data.message) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone and message are required." }),
        { status: 400, headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    const clickSendUsername = process.env.CLICKSEND_USERNAME;
    const clickSendApiKey = process.env.CLICKSEND_API_KEY;
    const clickSendFrom = process.env.CLICKSEND_FROM || "DriveTaxi";

    if (!clickSendUsername || !clickSendApiKey) {
      console.error("ClickSend not configured");
      return new Response(
        JSON.stringify({
          success: false,
          error: "SMS not configured. Please add ClickSend credentials to the deployment environment."
        }),
        {
          status: 500,
          headers: {
            ...cors,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Format phone number - ensure it has country code
    let formattedPhone = data.phone.replace(/\s/g, "");
    if (!formattedPhone.startsWith("+")) {
      // Assume UK number if no country code
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "+44" + formattedPhone.substring(1);
      } else {
        formattedPhone = "+" + formattedPhone;
      }
    }

    // Send SMS via ClickSend
    const clickSendUrl = "https://rest.clicksend.com/v3/sms/send";
    const auth = btoa(`${clickSendUsername}:${clickSendApiKey}`);

    const smsResponse = await fetch(clickSendUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            to: formattedPhone,
            body: data.message,
            from: clickSendFrom,
          }
        ]
      }),
    });

    if (!smsResponse.ok) {
      const error = await smsResponse.text();
      console.error("ClickSend error:", error);
      throw new Error(`Failed to send SMS: ${error}`);
    }

    const result = await smsResponse.json();
    console.log("SMS sent successfully:", result.data?.messages?.[0]?.message_id || "unknown");

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.data?.messages?.[0]?.message_id || "unknown",
        status: result.data?.messages?.[0]?.status 
      }),
      {
        headers: {
          ...cors,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : String(error) }),
      {
        status: 500,
        headers: {
          ...cors,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
