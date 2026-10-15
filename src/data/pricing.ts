// Single source of truth for all route pricing shown across the site.
//
// These are the fixed one-way fares advertised on the dedicated route pages
// (e.g. "St Andrews to Edinburgh Airport — £135"). The Pricing page and the
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
  // St Andrews → airports (1 pickup, drop-off at the airport)
  { from: 'St Andrews', to: 'Edinburgh Airport', price: 135, minutes: 80 },
  { from: 'St Andrews', to: 'Glasgow Airport', price: 210, minutes: 120 },
  { from: 'St Andrews', to: 'Aberdeen Airport', price: 210, minutes: 150 },
  { from: 'St Andrews', to: 'Dundee Airport', price: 50, minutes: 30 },

  // Airports → St Andrews (airport pickup, 1 drop-off, parking included)
  { from: 'Edinburgh Airport', to: 'St Andrews', price: 135, minutes: 80 },
  { from: 'Edinburgh', to: 'St Andrews', price: 150, minutes: 75 },
  { from: 'Glasgow Airport', to: 'St Andrews', price: 210, minutes: 120 },
  { from: 'Aberdeen Airport', to: 'St Andrews', price: 210, minutes: 150 },
  { from: 'Dundee Airport', to: 'St Andrews', price: 60, minutes: 30 },
  { from: 'Edinburgh Airport', to: 'Fairmont Hotel', price: 145, minutes: 80 },
  { from: 'Edinburgh Airport', to: 'Old Course Hotel', price: 135, minutes: 80 },

  // St Andrews to... (advance booking only, before 22:00)
  { from: 'St Andrews', to: 'Waverley Station', price: 150, minutes: 75 },
  { from: 'St Andrews', to: 'Crail', price: 25, minutes: 25 },
  { from: 'St Andrews', to: 'Cupar', price: 35, minutes: 20 },
  { from: 'St Andrews', to: 'Pittenweem', price: 40, minutes: 30 },
  { from: 'St Andrews', to: 'Dundee', price: 40, minutes: 25 },
  { from: 'St Andrews', to: 'Kingsbarns', price: 25, minutes: 15 },
  { from: 'St Andrews', to: 'Leuchars Station', price: 15, minutes: 10 },
  { from: 'St Andrews', to: 'Carnoustie Golf Courses', price: 90, minutes: 45 },
  { from: 'St Andrews', to: 'Gleneagles', price: 190, minutes: 75 },

  // Leuchars Train Station to... (advance booking only, before 22:00)
  { from: 'Leuchars Station', to: 'St Andrews', price: 16, minutes: 10 },
  { from: 'Leuchars Station', to: 'Anstruther', price: 50, minutes: 30 },
  { from: 'Leuchars Station', to: 'Crail', price: 50, minutes: 30 },
  { from: 'Leuchars Station', to: 'Kingsbarns', price: 40, minutes: 25 },
  { from: 'Leuchars Station', to: 'Cupar', price: 30, minutes: 25 },
  { from: 'Leuchars Station', to: 'Dundee', price: 35, minutes: 20 },
  { from: 'Leuchars Station', to: 'Dundee Airport', price: 40, minutes: 25 },
  { from: 'Leuchars Station', to: 'Edinburgh Airport', price: 135, minutes: 75 },
  { from: 'Leuchars Station', to: 'Glasgow Airport', price: 180, minutes: 110 },

  // Dundee ↔ airports
  { from: 'Dundee', to: 'Edinburgh Airport', price: 140, minutes: 80 },
  { from: 'Edinburgh Airport', to: 'Dundee', price: 150, minutes: 80 },
  { from: 'Dundee', to: 'Glasgow Airport', price: 170, minutes: 120 },
  { from: 'Glasgow Airport', to: 'Dundee', price: 190, minutes: 120 },
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
 * large groups and excess luggage.
 */
export function estimatePrice(
  from: string,
  to: string,
  opts: { passengers?: number; luggage?: number } = {}
): PriceEstimate {
  const { passengers = 1, luggage = 1 } = opts;

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

  return { min, max, known };
}
