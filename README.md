# Konark Computers — Official Web Platform & IT Solutions Portal

![Next.js 15](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Firestore](https://img.shields.io/badge/Database-Firebase_Firestore-orange?style=for-the-badge&logo=firebase)
![Vitest](https://img.shields.io/badge/Tested_with-Vitest-yellow?style=for-the-badge&logo=vitest)

The official web platform and digital customer portal for **Konark Computers** — Rajkot's trusted IT hardware, laptop repair, and computer solutions provider established in 1999 (27+ years of service).

---

## 🚀 Key Modules

### 1. Production Web Platform & Service Portal
- **Service & Product Showcase**: Dedicated hubs for desktop/laptop repair, hardware upgrades (SSD, RAM, screens, batteries, chargers), networking, and troubleshooting.
- **Programmatic Local SEO Engine**: High-conversion landing pages optimized for regional search dominance in Rajkot (`/services/*`, `/products/*`) embedded with structured Schema.org (`LocalBusiness`, `BreadcrumbList`) JSON-LD microdata.
- **Inquiry & Omnichannel Dispatch**: Direct WhatsApp chat integration and TLS SMTP automated email pipelines (`src/lib/mailer.ts` over Gmail port 465) with rate limiting and honeypot protection.
- **Precision Workshop Design System**: Responsive, high-contrast dark theme built with modular CSS, fluid typography, and Framer Motion micro-interactions.

### 2. Admin Backoffice (`/admin`)
- **Protected Role-Based Access (RBAC)**: Secure multi-tier authentication (`admin` and `staff`) validated server-side using Firebase Admin SDK and Firebase Custom Claims.
- **Catalog & Inventory Control**: Full CRUD for products, repair services, categories, and brands with dynamic specification fields and inline price/stock adjustments.
- **Audit Trail (`/admin/audit`)**: Immutable log recording product modifications, price variations, and operational status histories with before/after state diffs.
- **Tax & Business Configuration**: Live toggle between GST-inclusive and GST-exclusive display modes, store warranty policies, and company banking details.
- **Vercel Blob Media Pipeline**: Asset upload infrastructure configured behind the `NEXT_PUBLIC_ENABLE_PRODUCT_IMAGES` feature flag.

### 3. Smart Quotation Engine (`/quote`) — *[In Active Development]*
> **Note**: An upcoming feature currently in active development to automate client estimates and eliminate hardware part mismatches.
- **Device Context Discovery**: Auto-detects device type (Desktop PC vs Laptop) and narrows down OEM brand and model compatibility.
- **3-Layer Compatibility Engine**:
  - **Layer 1 (Generic Spec Matching)**: Auto-evaluates attributes flagged as `compatKey` (e.g. `memoryType`, `memoryFormFactor`, `connectorType`, `wattage`, `screenPin`, `screenSize`).
  - **Layer 2 (Explicit Rules in Firestore)**: Configurable rules with `sourceField`, `targetField`, operator (`eq`, `in`, `intersects`, `lte`, `gte`), and severity (`block` or `warn`).
  - **Layer 3 (Brand & Model Specifics)**: Normalizes OEM tokens to verify model-level compatibility for laptops.
  - **Status Categories**: `COMPATIBLE` (highlighted & sorted first), `INCOMPATIBLE` (dimmed with explanation; toggleable), `NEUTRAL` (unrelated items remain accessible), `CHECK` (needs workshop confirmation).
- **Deterministic & High Performance**: Evaluates 2,000+ candidate items in under 50ms.
- **Server-Authoritative Pricing**: Money is stored strictly as integer **PAISE** (eliminating floating-point drift). Computes taxable base, intra-state CGST+SGST (Gujarat state code 24) or inter-state IGST, and whole-rupee round-off.
- **Digital Quote Delivery (`/quote/[token]`)**: Unguessable tokenized URLs with strict noindex privacy, zero-DOM serverless PDF generation (`pdf-lib`), and instant WhatsApp/Email dispatch.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router with Server Components & ISR) |
| **Language** | TypeScript 5 (Strict Mode) |
| **Styling** | Vanilla CSS Modules & Precision Workshop Design Tokens |
| **Database** | Google Cloud Firestore (via `firebase-admin` server SDK) |
| **Authentication** | Firebase Authentication (Custom Claims for Admin/Staff) |
| **PDF Generation** | `pdf-lib` (Serverless-compatible, zero-DOM PDF generation) |
| **Email Service** | Node.js TLS SMTP (`src/lib/mailer.ts` over Gmail port 465) |
| **Validation** | Zod (End-to-end type validation for DB & APIs) |
| **Unit Testing** | Vitest (Full suite for pricing calculations and compat rules) |

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and configure your credentials:
```bash
cp .env.example .env.local
```

### 3. Seed Database
Populate Firestore with initial categories, spec attributes, compatibility rules, and sample products:
```bash
npm run seed
# or
npx tsx scripts/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```
Open:
- Main Platform: [http://localhost:3000](http://localhost:3000)
- Admin Backoffice: [http://localhost:3000/admin](http://localhost:3000/admin)
- Quotation Builder *(Beta / In Development)*: [http://localhost:3000/quote](http://localhost:3000/quote)

---

## 🧪 Automated Tests

Run the complete test suite (Pricing calculations + Compatibility scenarios):
```bash
npm test
```

### Test Coverage Highlights
- **GST Calculations**: Verified for inclusive vs exclusive pricing, Gujarat intra-state 9%+9% CGST/SGST split, inter-state 18% IGST, odd paise division, quantity multiplication, and round-off adjustments.
- **Compatibility Scenarios**:
  - Selecting DDR4 DIMM Desktop RAM correctly dims DDR3/DDR5/SODIMM and flags laptop-only chargers.
  - Laptop RAM selection automatically infers laptop context and dims 3.5" desktop HDDs.
  - Form factor and interface conflict validation between 2.5" SATA SSD, M.2 NVMe, and 3.5" HDDs.
  - OEM charger brand matching (HP chargers highlight HP batteries; flag Dell/Lenovo).
  - Mixed RAM cart conflict detection and resolution.
  - Micro-benchmark: 2,000 compatibility evaluations executed in <50ms.

---

## 🔒 Security & Firestore Rules

- **Client Reads**: Public read-only access to active catalog collections (`categories`, `brands`, `attributeDefinitions`, `products`, `services`).
- **Client Writes**: **Completely blocked** across all Firestore collections. All updates are handled server-authoritative by Next.js route handlers verified with `firebase-admin`.
- **Quotations**: Private. Quotes can only be retrieved server-side via unguessable public tokens or by authenticated staff.
- **Admin Audit**: Every product modification, price edit, and tax change is timestamped and audited with before/after state diffs.
- **Anti-Bot Protection**: Rate limiting per IP on inquiries and quote creation, complemented by hidden honeypot fields.

---

## 📄 Quotation Document Notice
All quotes generated via the platform are officially marked as **"Quotation / Estimate"**, not a tax invoice. Prices reflect physical stock availability and carry valid manufacturer warranties backed by Konark Computers at Rajkot, Gujarat.
