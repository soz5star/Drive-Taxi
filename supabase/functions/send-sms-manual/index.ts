import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ManualSMSData {
  phone: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: ManualSMSData = await req.json();

    const clickSendUsername = Deno.env.get("CLICKSEND_USERNAME");
    const clickSendApiKey = Deno.env.get("CLICKSEND_API_KEY");
    const clickSendFrom = Deno.env.get("CLICKSEND_FROM") || "DriveTaxi";

    if (!clickSendUsername || !clickSendApiKey) {
      console.error("ClickSend not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "SMS not configured. Please add ClickSend credentials in Supabase secrets." 
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
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
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending SMS:", error);
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
