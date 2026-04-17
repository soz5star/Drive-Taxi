# Website Improvements Plan

A comprehensive plan to enhance DriveTaxi.co.uk across SEO, features, admin dashboard, and UX/conversion.

---

## Phase 1: SEO & Technical (Quick Wins) ✅ COMPLETED

### 1.1 Add Missing SEO Files ✅
- **sitemap.xml** - Updated with current date
- **robots.txt** - Verified exists and correct
- **og-image.jpg** - User needs to add 1200x630px image to public/ folder and uncomment the meta tags

### 1.2 PWA Support ✅
- ✅ Added `manifest.json` for installable app
- ✅ Added service worker for offline capability
- ✅ Registered service worker in main.tsx
- ✅ Added theme-color and manifest link to index.html

### 1.3 Performance ✅
- ✅ Added font preconnect to index.html
- ⏳ Lazy loading for images (future improvement)
- ⏳ Bundle size analysis (future improvement)

---

## Phase 2: New Features

### 2.1 Price Calculator
- Interactive form on Pricing page
- Input: pickup, dropoff, passengers, luggage
- Output: estimated price range
- Link to booking form with pre-filled data

### 2.2 FAQ Section
- Common questions about airport transfers
- Pricing, luggage, pets, payment methods
- SEO-structured with schema markup

### 2.3 Service Area Map
- Google Maps integration showing coverage area
- Highlight routes to Edinburgh/Glasgow/Dundee airports
- Interactive markers for pickup zones

### 2.4 Live Chat Widget
- WhatsApp Business API or Tawk.to integration
- Floating chat button on all pages
- Auto-messages for common queries

---

## Phase 3: Admin Dashboard Enhancements

### 3.1 Calendar View
- Monthly/weekly calendar showing bookings
- Color-coded by status (pending, confirmed, completed)
- Click to view/edit booking details

### 3.2 Export & Reports
- Export bookings to CSV/Excel
- Revenue reports by date range
- Booking statistics (daily/weekly/monthly)

### 3.3 SMS Notifications
- Twilio integration for SMS alerts
- Customer confirmation SMS
- Driver assignment notifications

### 3.4 Revenue Dashboard
- Total revenue charts
- Revenue by route
- Average booking value

---

## Phase 4: UX & Conversion

### 4.1 Sticky Booking CTA
- Floating "Book Now" button on mobile
- Appears after scrolling past hero
- Non-intrusive, dismissible

### 4.2 Trust Signals
- Add Google Reviews integration
- Display review count and rating
- "Verified Business" badges

### 4.3 Customer Reviews Section
- Pull Google Business reviews
- Display on homepage with carousel
- Schema markup for SEO

---

## Priority Order

✅ 1. **SEO Files** (sitemap, robots.txt) - COMPLETED
✅ 2. **PWA Support** (manifest, service worker) - COMPLETED
2. **Price Calculator** - 2 hours
3. **FAQ Section** - 1 hour
4. **Calendar View** - 3 hours
5. **Export CSV** - 1 hour
6. **Sticky CTA** - 30 min
7. **Service Area Map** - 2 hours
8. **Live Chat Widget** - 30 min
9. **Reviews Integration** - 2 hours
10. **Revenue Dashboard** - 3 hours
11. **SMS Notifications** - 2 hours

---

## Estimated Total: ~14 hours (Phase 1 completed)

Phase 1 (SEO & Technical) completed. Ready to implement Phase 2 (New Features).

## Phase 1 Changes Made:
- ✅ sitemap.xml updated with current date
- ✅ robots.txt verified
- ✅ manifest.json created for PWA
- ✅ sw.js service worker created
- ✅ index.html updated with manifest link, theme-color, font preconnect
- ✅ main.tsx updated with service worker registration
- ✅ og:image meta tags commented out (user needs to add 1200x630px image)
