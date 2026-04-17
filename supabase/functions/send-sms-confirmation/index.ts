import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SMSData {
  phone: string;
  name: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const data: SMSData = await req.json();

    const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

    if (!twilioAccountSid || !twilioAuthToken || !twilioPhoneNumber) {
      console.error("Twilio not configured");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "SMS not configured. Please add Twilio credentials in Supabase secrets." 
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

    // Create SMS message
    const message = `Hi ${data.name}, your taxi booking is confirmed! Pickup: ${data.pickupLocation} on ${data.pickupDate} at ${data.pickupTime}. We'll contact you shortly. - Drive Taxi`;

    // Send SMS via Twilio
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
    const auth = btoa(`${twilioAccountSid}:${twilioAuthToken}`);

    const smsResponse = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: twilioPhoneNumber,
        To: formattedPhone,
        Body: message,
      }).toString(),
    });

    if (!smsResponse.ok) {
      const error = await smsResponse.text();
      console.error("Twilio error:", error);
      throw new Error(`Failed to send SMS: ${error}`);
    }

    const result = await smsResponse.json();
    console.log("SMS sent successfully:", result.sid);

    return new Response(
      JSON.stringify({ success: true, messageSid: result.sid }),
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
