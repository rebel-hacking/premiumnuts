# PREMIUM NUTS — Seasonal Offers Management Guide

This guide explains how to manage, add, edit, schedule, activate, and deactivate seasonal promotional offers on the PREMIUM NUTS website without editing any code or React components.

All offers are configured in a single JSON file:
`src/data/offers.json`

---

## 1. How the Offers System Works

- The website automatically reads `src/data/offers.json`.
- It **only** displays offers where `"active": true` AND the current date is between `"startDate"` and `"endDate"`.
- **Automatic Hiding**: If no offers are active or valid today, the entire seasonal offers section is **automatically hidden** on the homepage with zero empty spaces or layout gaps.

---

## 2. Structure of an Offer Entry

Each offer in `src/data/offers.json` looks like this:

```json
{
  "id": "festive-celebration-2026",
  "title": "Grand Festive Celebration Offer",
  "description": "Complimentary personalized gold-embossed ribbon & wax-sealed calligraphy card with every Medium or Large hamper order.",
  "badge": "Festive Special",
  "image": "/images/offers/festive-offer.jpg",
  "active": true,
  "startDate": "2026-10-01",
  "endDate": "2026-12-31",
  "discountHighlight": "Complimentary Luxury Customization",
  "ctaText": "Explore Our Hamper",
  "ctaLink": "/our-hamper"
}
```

---

## 3. Step-by-Step Instructions

### Step 1: How to Add a New Offer
1. Open `src/data/offers.json`.
2. Add a comma `,` after the last offer inside the square brackets `[...]`.
3. Paste a new offer object with a unique `"id"`.
4. Place your offer banner image in `public/images/offers/` (e.g., `new-year-special.jpg`).
5. Set `"image": "/images/offers/new-year-special.jpg"`.
6. Save the file.

### Step 2: How to Change an Offer Title or Description
1. Locate the offer in `src/data/offers.json`.
2. Change the `"title"` text (e.g., `"Diwali Royal Keepsake Offer"`).
3. Change the `"description"` text.
4. Save the file.

### Step 3: How to Change an Offer Image
1. Save your new image in `public/images/offers/` (e.g., `spring-hamper.jpg`).
2. In `src/data/offers.json`, update the `"image"` field:
   ```json
   "image": "/images/offers/spring-hamper.jpg"
   ```
3. Save the file.

### Step 4: How to Change the CTA (Call to Action)
- Change `"ctaText"` to what you want on the button (e.g., `"Curate Hamper"`, `"Claim Offer"`).
- Change `"ctaLink"` to the destination page:
  - `"/our-hamper"` for the hamper customizer.
  - `"/corporate-gifting"` for bulk corporate quotes.
  - `"/cart"` for direct checkout.

### Step 5: How to Activate an Offer
Set `"active": true`:
```json
"active": true
```

### Step 6: How to Deactivate an Offer
Set `"active": false`:
```json
"active": false
```
The offer will instantly disappear from the website.

### Step 7: How to Set Start and Expiry Dates
Use standard `YYYY-MM-DD` date format:
```json
"startDate": "2026-11-01",
"endDate": "2026-11-30"
```
- The offer will automatically become visible on November 1, 2026.
- The offer will automatically expire and hide at midnight on November 30, 2026.

### Step 8: How to Remove an Offer Completely
1. Open `src/data/offers.json`.
2. Delete the entire `{ ... }` block for that offer.
3. Make sure the remaining commas `,` between objects are valid JSON syntax.
4. Save the file.

---

## 4. Troubleshooting
- **Website doesn't show your offer?**
  - Check that `"active"` is set to `true`.
  - Check that today's date falls between `"startDate"` and `"endDate"`.
  - Ensure the JSON file has no syntax errors (missing quotes or commas).

