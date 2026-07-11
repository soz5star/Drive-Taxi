// Shared helpers for the edge functions: origin-restricted CORS and HTML escaping.

// Origins allowed to call these functions. Add your production + preview
// domains here. Requests from other origins get no CORS headers (browsers
// block the response) and non-browser callers are handled per-function.
const ALLOWED_ORIGINS = [
  "https://drivetaxi.co.uk",
  "https://www.drivetaxi.co.uk",
  "http://localhost:5173",
  "http://localhost:4173",
];

/**
 * Build CORS headers for a given request, echoing the Origin back only when it
 * is on the allowlist. Falls back to the primary production origin.
 */
export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
    "Vary": "Origin",
  };
}

/** Escape a value for safe interpolation into HTML email bodies. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
