# Verdant Urban Farms — E-Store & CSA Market

A modern, full-stack Next.js e-commerce platform built specifically for urban vertical farms, featuring **Weekly/Bi-Weekly CSA Harvest Subscriptions**, an **A-La-Carte Produce Market**, **Local Electric Cargo Delivery & Hub Pickup**, and a **Customer Subscription Management Portal**.

---

## 🌿 Key Features

1. **CSA Harvest Subscription Boxes (Weekly / Bi-Weekly / One-Time)**
   - **4 Curated Box Tiers**: *Urban Sprout Box* (1-2 people), *City Harvest Family Box* (3-4 people), *Chef's Botanical & Herb Box*, and *Vitality Juicing Box*.
   - **Cadence Discounts**: Dynamic 15% discount for weekly subscribers, 10% for bi-weekly subscribers.
   - **Interactive Harvest Customizer ("What's in the Box")**: Customers can swap included crops (e.g. swap Kale for Extra Spinach) and add farm pantry extras (Rooftop Raw Honey, Pesto, Heritage Eggs, Living Trays).

2. **A-La-Carte Daily Harvest Market**
   - Individual seasonal crops categorized by Microgreens, Salad Greens, Culinary Living Herbs, Specialty Fungi, and Farm Pantry.
   - Growth method badges (*Hydroponic*, *Aeroponic*, *Vertical Tower*, *Rooftop Soil*).
   - Real-time stock counters and search filtering.

3. **Zero-Emission Local Fulfillment**
   - **Postal Zip Code Checker**: Validates local electric cargo bike delivery zones with free delivery thresholds ($40+).
   - **3 Urban Farm Pickup Hubs**: Downtown Greenhouse Hub, East River Hydroponic Facility, and Skyline Rooftop Station.
   - Scheduled harvest day picker (Tuesday & Friday mornings).

4. **Slide-Over Basket & Checkout Flow**
   - Live delivery progress meter.
   - Simulated checkout with contact info, gate delivery instructions, and payment demo.
   - Automatic registration of recurring CSA plans directly into the customer portal upon order placement.

5. **Customer Harvest Portal ("My Subscription")**
   - Self-service dashboard: skip upcoming harvests, toggle cadence (Weekly <-> Bi-Weekly), pause/resume subscription, and review included crops.

6. **Farm Operations / Admin Dashboard**
   - Live subscriber metrics and weekly recurring revenue (MRR) tracker.
   - Inventory stock matrix: 1-click toggling between Available and Sold Out, or restocking.
   - Form to introduce and publish new harvested crops directly to the store.

7. **Urban Agriculture Sustainability Hub**
   - Educational proof points: 95% water reduction, zero chemical pesticides, and 1.4-mile average food radius.

---

## 🚀 Getting Started

From the `urban-farms/` directory:

```bash
# Navigate into the project folder
cd urban-farms

# Start development server
npm run dev

# Or build for production
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context (`StoreContext`)
