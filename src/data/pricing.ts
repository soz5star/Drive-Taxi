// Single source of truth for all route pricing shown across the site.
//
// These are the fixed one-way fares advertised on the dedicated route pages
// (e.g. "St Andrews to Edinburgh Airport — £120"). The Pricing page and the
// Quick Price Estimate calculator both derive their numbers from this table so
// a customer sees the same price wherever they land. If a fare changes, change
// it here only.

export interface RoutePrice {
  from: string;
  to: string;
  /** Fixed one-way fare in GBP. */
  price: number;
  /** Typical journey time in minutes. */
  minutes: number;
}

export const ROUTE_PRICES: RoutePrice[] = [
  // St Andrews ↔ Edinburgh Airport
  { from: 'St Andrews', to: 'Edinburgh Airport', price: 140, minutes: 80 },
  { from: 'Edinburgh Airport', to: 'St Andrews', price: 150, minutes: 80 },
  // St Andrews ↔ Glasgow Airport
  { from: 'St Andrews', to: 'Glasgow Airport', price: 190, minutes: 120 },
  { from: 'Glasgow Airport', to: 'St Andrews', price: 170, minutes: 120 },
  // St Andrews ↔ Dundee Airport
  { from: 'St Andrews', to: 'Dundee Airport', price: 50, minutes: 30 },
  { from: 'Dundee Airport', to: 'St Andrews', price: 50, minutes: 30 },
  // St Andrews ↔ Dundee (city)
  { from: 'St Andrews', to: 'Dundee', price: 40, minutes: 25 },
  { from: 'Dundee', to: 'St Andrews', price: 40, minutes: 25 },
  // St Andrews ↔ Edinburgh (city)
  { from: 'St Andrews', to: 'Edinburgh', price: 110, minutes: 75 },
  { from: 'Edinburgh', to: 'St Andrews', price: 120, minutes: 75 },
  // Dundee ↔ Edinburgh Airport
  { from: 'Dundee', to: 'Edinburgh Airport', price: 140, minutes: 80 },
  { from: 'Edinburgh Airport', to: 'Dundee', price: 150, minutes: 80 },
  // Dundee ↔ Glasgow Airport
  { from: 'Dundee', to: 'Glasgow Airport', price: 170, minutes: 120 },
  { from: 'Glasgow Airport', to: 'Dundee', price: 190, minutes: 120 },
  // Leuchars Station
  { from: 'Leuchars Station', to: 'St Andrews', price: 15, minutes: 10 },
  { from: 'Leuchars Station', to: 'Dundee', price: 35, minutes: 20 },
  { from: 'Leuchars Station', to: 'Edinburgh Airport', price: 110, minutes: 75 },
  { from: 'Leuchars Station', to: 'Glasgow Airport', price: 180, minutes: 110 },
];

/** Round up to the nearest £5. */
const roundTo5 = (n: number) => Math.ceil(n / 5) * 5;

/** Look up the fixed fare for a directional route, or the reverse direction. */
export function getRoutePrice(from: string, to: string): RoutePrice | undefined {
  return (
    ROUTE_PRICES.find((r) => r.from === from && r.to === to) ||
    ROUTE_PRICES.find((r) => r.from === to && r.to === from)
  );
}

export interface PriceEstimate {
  min: number;
  max: number;
  known: boolean;
}

/**
 * Produce a price range for the calculator. The lower bound is the advertised
 * fixed fare so it never contradicts the route pages; the upper bound adds a
 * buffer for surcharges (peak time, extra stops, waiting), plus adjustments for
 * large groups / excess luggage and an optional student discount.
 */
export function estimatePrice(
  from: string,
  to: string,
  opts: { passengers?: number; luggage?: number; isStudent?: boolean } = {}
): PriceEstimate {
  const { passengers = 1, luggage = 1, isStudent = false } = opts;

  const route = getRoutePrice(from, to);
  const base = route ? route.price : 100; // generic fallback for unlisted routes
  const known = !!route;

  let min = base;
  let max = roundTo5(base * 1.15);

  // Larger groups need a bigger vehicle
  if (passengers > 4) {
    min += 10;
    max += 15;
  }

  // Excess luggage beyond the standard allowance
  if (luggage > 3) {
    min += 5 * (luggage - 3);
    max += 8 * (luggage - 3);
  }

  if (isStudent) {
    min = Math.round(min * 0.9);
    max = Math.round(max * 0.9);
  }

  return { min, max, known };
}
