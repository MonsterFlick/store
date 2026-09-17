# Digital Product Platform — Implementation Plan

## 1. Technical Direction

Recommended initial stack:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Razorpay
- Zod
- Server-side Route Handlers / Server Actions where appropriate

Infrastructure starts with Supabase only for backend services and storage.

Do not introduce unnecessary infrastructure until the platform needs it.

---

## 2. Repository Structure

Recommended storefront:

```text
store/
├── app/
│   ├── page.tsx
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── library/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── checkout/
│   ├── account/
│   ├── auth/
│   └── ...
│
├── products/
│   ├── _templates/
│   │   ├── ebook/
│   │   ├── guide/
│   │   ├── video/
│   │   └── ...
│   │
│   ├── product-one/
│   │   ├── product.ts
│   │   ├── Product.tsx
│   │   ├── content.ts
│   │   ├── components/
│   │   └── assets/
│   │
│   └── product-two/
│       ├── product.ts
│       ├── Product.tsx
│       └── ...
│
├── components/
│   ├── commerce/
│   ├── auth/
│   ├── product/
│   ├── reviews/
│   ├── library/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── razorpay/
│   ├── entitlements/
│   ├── products/
│   ├── security/
│   ├── analytics/
│   ├── licensing/
│   └── validation/
│
├── scripts/
│   └── product-sync/
│
└── ...
```

There is no admin repository in v1.

---

## 3. Product Registry

The platform needs a deterministic mapping between a database product and its code implementation.

Conceptually:

```text
Supabase
product.slug
     ↓
product implementation
     ↓
products/{slug}/
```

The implementation should expose product metadata and a React experience.

Avoid requiring manual edits in multiple places.

Prefer a build-time product discovery/registry mechanism where practical.

---

## 4. Product Definition

A product code definition can contain configuration such as:

```ts
export const product = {
  slug: "javascript-handbook",
  template: "ebook",
  capabilities: {
    view: true,
    download: false,
    stream: false,
    watermark: true,
  },
};
```

The database remains the authoritative source for commercial state such as:

- Price
- Publication status
- Product ID
- Entitlement state
- Pricing plans
- Coupon applicability

The code remains the authoritative source for the custom experience.

Avoid duplicating mutable commercial values unnecessarily.

---

## 5. Database Model

Recommended logical tables:

```text
profiles
products
product_categories
categories
product_tags
tags
product_content
product_assets
product_plans
coupons
coupon_products
orders
order_items
payments
entitlements
user_devices
reviews
analytics_events
licenses
```

Potential supporting tables can be added only when justified.

---

## 6. Products

Core fields:

```text
id
slug
name
short_description
description
product_type
status
thumbnail_asset_id
created_at
updated_at
```

`slug` must be unique.

Suggested statuses:

```text
draft
published
archived
unlisted
```

---

## 7. Categories

Categories are database-driven.

```text
categories
├── id
├── name
├── slug
├── description
├── parent_id
└── created_at
```

`parent_id` permits future nested categories without requiring a schema rewrite.

---

## 8. Tags

Tags are arbitrary and database-driven.

```text
tags
├── id
├── name
└── slug
```

Many-to-many relationship:

```text
product_tags
├── product_id
└── tag_id
```

---

## 9. Product Content

For structured text-heavy products:

```text
product_content
├── id
├── product_id
├── content_ciphertext
├── content_version
├── created_at
└── updated_at
```

Do not store raw book/guide text in plaintext production database columns.

Use structured content serialized to JSON before encryption.

Example source:

```json
{
  "chapters": [
    {
      "id": "intro",
      "title": "Introduction",
      "sections": []
    }
  ]
}
```

---

## 10. Encryption Architecture

Important rule:

**The master encryption key must not be stored in Supabase tables.**

Use deployment environment secrets.

Recommended flow:

```text
Product source content
        ↓
Validate schema
        ↓
Serialize
        ↓
Encrypt server-side
        ↓
Store ciphertext in Supabase
```

For reads:

```text
Authenticated request
        ↓
Verify entitlement
        ↓
Server retrieves ciphertext
        ↓
Server decrypts
        ↓
Return only authorized content
        ↓
Client renders experience
```

The encryption key must never be exposed to client-side JavaScript.

Encryption protects database/storage compromise and unauthorized direct access; it cannot make content impossible to copy after authorized rendering.

---

## 11. Content Sync

Create a developer workflow such as:

```bash
npm run product:sync
```

The process should:

1. Discover product definitions.
2. Validate product metadata.
3. Validate structured content.
4. Validate referenced assets.
5. Encrypt eligible content.
6. Upsert the corresponding Supabase records.
7. Verify successful synchronization.
8. Never publish a malformed product.

The source files remain the developer-friendly source of truth.

Supabase contains the encrypted production representation.

---

## 12. Product Assets

Do not put large binary files in PostgreSQL.

Use private Supabase Storage for:

- Videos
- Audio
- ZIPs
- Large images
- Downloadable files
- Other binary assets

Database references should use asset IDs rather than permanent public URLs.

Example:

```text
product_assets
├── id
├── product_id
├── storage_path
├── asset_type
├── filename
├── size
├── checksum
└── metadata
```

Storage buckets should remain private.

---

## 13. Authentication

Supabase Auth should support:

- Google OAuth
- Email/password
- OTP/magic link
- Password reset

The application should use Supabase's established authentication/session mechanisms rather than implementing custom password storage.

---

## 14. Authorization

Authentication is not sufficient.

Every protected product request must verify:

```text
User authenticated?
        ↓
Product exists?
        ↓
Product published/available?
        ↓
User has entitlement?
        ↓
Entitlement active?
        ↓
Device/session valid?
        ↓
Allow
```

Never rely on hiding UI elements as an authorization mechanism.

---

## 15. Entitlements

The entitlement is the central access-control object.

Conceptual fields:

```text
id
user_id
product_id
order_id
plan_id
license_id
status
starts_at
expires_at
created_at
```

For lifetime access:

```text
expires_at = null
```

For time-limited access:

```text
expires_at = timestamp
```

---

## 16. Orders

An order should contain:

```text
id
user_id
status
currency
subtotal
discount
total
razorpay_order_id
created_at
```

Order items contain:

```text
order_id
product_id
plan_id
unit_price
discount
final_price
```

Never calculate historical order totals from current product prices.

---

## 17. Razorpay Payment Flow

Recommended flow:

```text
User clicks Buy
       ↓
Server validates product/plan
       ↓
Server calculates price/coupon
       ↓
Server creates internal pending order
       ↓
Server creates Razorpay order
       ↓
Client opens Razorpay Checkout
       ↓
Payment completed
       ↓
Razorpay webhook reaches server
       ↓
Server verifies signature/event
       ↓
Payment recorded
       ↓
Order marked paid
       ↓
Entitlement created
       ↓
Product appears in Library
```

The frontend success callback is not the final source of truth.

Webhook processing must be idempotent.

A repeated webhook must not create duplicate entitlements.

---

## 18. Payment Failure

If payment fails:

```text
payment = failed
order = failed/pending according to flow
entitlement = none
```

The customer can retry.

If payment is successful but webhook processing is delayed, the application should not falsely report a permanent failure. The payment state should be reconciled server-side.

---

## 19. Coupons

Coupon validation must happen on the server.

Potential fields:

```text
code
discount_type
discount_value
starts_at
expires_at
usage_limit
per_user_limit
minimum_order_value
active
```

Never trust a discount amount supplied by the browser.

Razorpay order amount must be generated from the validated server calculation.

---

## 20. Subscriptions

Create a plan abstraction:

```text
product_plans
├── id
├── product_id
├── billing_type
├── price
├── currency
├── duration
└── configuration
```

`billing_type` can support:

```text
one_time
subscription
```

The initial catalog can mostly use `one_time`.

Subscription-specific Razorpay integration can be expanded when needed.

---

## 21. Device Management

Maximum active devices per user/product should default to 2.

Model:

```text
user_devices
├── id
├── user_id
├── device_identifier
├── device_name
├── last_seen_at
├── created_at
└── revoked_at
```

Avoid relying on browser fingerprinting alone.

Use a secure application-generated device/session identifier combined with authenticated session information.

When the limit is reached:

```text
New device
   ↓
Limit reached
   ↓
Show active devices
   ↓
User can revoke an old device
   ↓
New device can continue
```

Do not permanently lock legitimate users because of a device change.

---

## 22. Local Progress

Do not create a Supabase progress table for v1.

Use:

```text
localStorage
```

for simple progress and:

```text
IndexedDB
```

when product state becomes larger or more structured.

Product code owns the exact progress format.

Examples:

```text
ebook:
chapter + section + scroll position

video:
timestamp

interactive product:
local state
```

---

## 23. Protected Content

Public product pages should never expose paid content.

For protected content:

```text
Client
 ↓
Authenticated server request
 ↓
Entitlement check
 ↓
Server retrieves private content
 ↓
Authorized response
```

For downloadable files:

```text
Entitlement check
 ↓
Short-lived signed URL
 ↓
Download
 ↓
Log event
```

Do not return permanent Supabase Storage URLs.

---

## 24. Video

Where feasible, video should be delivered through controlled streaming rather than exposing a permanent MP4 URL.

Initial architecture can use private storage and signed access.

If the catalog later requires stronger DRM, a dedicated video/DRM service can be introduced without changing the product/entitlement model.

Do not promise browser-level recording prevention.

---

## 25. Watermarking

Watermark information should be generated from trusted server-side identity/order data.

Example:

```text
Licensed to: {name}
Email: {email}
Order: {order_id}
```

For custom product experiences, provide a reusable watermark component.

Example:

```text
<ProtectedWatermark />
```

Products can place it appropriately.

Do not make watermarking destroy usability.

---

## 26. Screenshot/Recording Detection

Only use browser capabilities that are reliable and non-disruptive.

Possible signals may include:

- Visibility changes
- Focus changes
- Fullscreen state
- Supported browser/platform events

Do not black out content based on unreliable heuristics.

Do not claim universal screenshot detection.

A future native/mobile application could provide stronger OS-level protections, but that is outside v1.

---

## 27. Reviews

Only verified purchasers can create reviews.

Recommended fields:

```text
id
product_id
user_id
order_id
rating
title
content
created_at
updated_at
```

Enforce verified purchase server-side.

Users can edit/delete their own reviews.

No fake reviews.

---

## 28. Licensing

Create reusable license records.

Possible fields:

```text
id
product_id
name
terms
created_at
```

The entitlement can reference the license applicable at purchase time.

This avoids silently changing old purchase terms.

---

## 29. Analytics

Use a real event table:

```text
analytics_events
├── id
├── user_id nullable
├── product_id nullable
├── event_type
├── session_id
├── metadata
└── created_at
```

Do not store sensitive data unnecessarily.

Possible event types:

```text
product_view
preview_open
checkout_start
payment_success
product_open
download_start
video_start
```

Product-specific events can use controlled names.

Avoid fake counters and artificial popularity.

---

## 30. SEO

Every public product page should generate:

- Unique title
- Meta description
- Canonical URL
- Open Graph metadata
- Social image
- JSON-LD
- Breadcrumb data
- FAQ schema only when genuine FAQ content exists
- Sitemap entry

Product SEO data should be database-driven where appropriate.

Example:

```text
product_seo
├── product_id
├── title
├── description
├── canonical_url
├── og_image
└── noindex
```

The product's code can provide additional structured metadata when needed.

---

## 31. Public Product Page

Route:

```text
/products/[slug]
```

Universal shell can provide:

- Product identity
- Pricing
- Purchase
- Reviews
- License
- Preview
- SEO

The product can customize presentation within this system.

---

## 32. Protected Product Page

Route:

```text
/library/[slug]
```

Flow:

```text
Resolve slug
 ↓
Load product implementation
 ↓
Authenticate
 ↓
Check entitlement
 ↓
Check device/session
 ↓
Load authorized content
 ↓
Render Product.tsx
```

A user without access should never receive the paid content payload.

---

## 33. Product Template System

Create reusable primitives rather than giant templates.

Example:

```text
templates/
├── ebook/
│   ├── EbookShell
│   ├── ChapterNavigation
│   ├── ContentRenderer
│   ├── CodeBlock
│   └── ReadingProgress
│
├── video/
│   ├── VideoShell
│   ├── Player
│   └── LessonNavigation
│
└── guide/
    ├── GuideShell
    └── SectionNavigation
```

Products can compose or replace these primitives.

This avoids a rigid template system.

---

## 34. Structured Content Renderer

For content-driven products, use a typed content schema.

Example block types:

```text
text
heading
image
code
video
callout
quote
list
table
quiz
embed
custom
```

Validate content with Zod before storing/syncing it.

The renderer maps content blocks to React components.

This creates a powerful reusable content engine.

---

## 35. Custom Product Experience

A product can bypass the standard content renderer completely.

Example:

```text
products/hiring-organizations/Product.tsx
```

can implement:

- Search
- Filters
- Organization cards
- Sorting
- Custom data views
- Interactive tools

The only required connection to the platform is the access/commerce contract.

---

## 36. Product Sync Validation

Before deployment, validate:

- Unique slug
- Database product exists or can be created
- Product type is supported
- Content schema is valid
- Referenced assets exist
- Required SEO fields exist
- Product configuration is valid
- No broken product imports
- No duplicate registrations

A failed validation must stop deployment/sync.

---

## 37. Draft and Publishing

Without an admin panel, publishing remains developer-controlled.

A product can be:

```text
draft
published
archived
unlisted
```

The database status should control public availability.

Recommended workflow:

```text
Build product
 ↓
Sync
 ↓
Test locally
 ↓
Set published
 ↓
Deploy
```

---

## 38. Basic Invoice/Receipt

Create a basic purchase record/receipt system without GST-specific accounting.

Store:

- Order ID
- Customer identity
- Product
- Amount
- Currency
- Payment ID
- Purchase date

Do not implement GST calculation or GSTIN handling in v1.

---

## 39. Account Deletion

No in-app deletion workflow is required initially.

User can contact the support email.

When processing deletion later, carefully distinguish between:

- Account/profile data
- Access/entitlement data
- Order/payment records
- Legal/accounting records

Some transaction records may need retention even after account deletion.

---

## 40. Support

Support is intentionally simple.

Provide a support email in:

- Footer
- Account area
- Purchase/help areas
- Relevant error states

No ticketing system or chat system is required for v1.

---

## 41. Security Rules

Core rules:

1. Never trust the browser for payment status.
2. Never trust the browser for entitlement status.
3. Never expose permanent private asset URLs.
4. Never expose master encryption keys.
5. Use Supabase Row Level Security.
6. Perform sensitive checks server-side.
7. Validate all product/content input.
8. Verify Razorpay webhooks.
9. Make payment processing idempotent.
10. Keep private content out of public product responses.
11. Do not use fake analytics.
12. Do not use fake reviews.
13. Do not rely on screenshot detection for security.
14. Do not rely on client-side route protection alone.

---

## 42. Supabase RLS Concept

Public:

```text
Published product metadata → readable
Categories/tags → readable
Public reviews → readable
```

Authenticated user:

```text
Own profile → readable
Own orders → readable
Own entitlements → readable
Own devices → readable/manageable
```

Paid user:

```text
Protected product content → only through authorized server flow
```

Admin/service operations:

```text
Product sync
Payment webhook
Secure content operations
```

Use server-side privileged operations only where necessary and keep service-role credentials server-only.

---

## 43. Development Phases

### Phase 1 — Foundation

- Create Next.js application
- Configure TypeScript/Tailwind
- Configure Supabase
- Create environment configuration
- Establish project structure
- Establish database migrations
- Establish RLS

### Phase 2 — Authentication

- Google login
- Email/password
- OTP/magic link
- Session handling
- Account page

### Phase 3 — Product Engine

- Product schema
- Product registry
- Product loader
- `/products/[slug]`
- `/library/[slug]`
- Product templates
- Custom product loading

### Phase 4 — Commerce

- Product pricing
- Razorpay integration
- Internal orders
- Razorpay orders
- Webhook verification
- Payment records
- Entitlements

### Phase 5 — Access Protection

- Device management
- Two-device limit
- Private storage
- Signed URLs
- Protected content retrieval
- Encryption/decryption service
- Watermark system

### Phase 6 — Store Features

- Homepage
- Categories
- Tags
- Search/discovery
- Product previews
- Coupons
- Reviews
- Licensing
- User library

### Phase 7 — SEO

- Metadata
- Product structured data
- Sitemap
- Robots
- Canonicals
- Open Graph
- Product-specific SEO

### Phase 8 — Analytics

- Event tracking
- Product analytics
- Commerce analytics
- Real view/purchase metrics

### Phase 9 — Product Templates

Build initial reusable templates:

- Ebook
- Guide
- Video
- Downloadable asset/code
- Bundle

Then use those templates to create real products.

### Phase 10 — Hardening

- Security testing
- Payment replay testing
- RLS testing
- Entitlement bypass testing
- Signed URL expiration testing
- Device-limit testing
- Encryption testing
- Mobile testing
- Performance testing
- SEO validation

---

## 44. Testing Requirements

Test at minimum:

### Authentication

- Login
- Logout
- Expired sessions
- OAuth failure
- OTP failure

### Payments

- Successful payment
- Failed payment
- Duplicate webhook
- Delayed webhook
- Invalid webhook
- Incorrect amount
- Coupon abuse

### Entitlements

- Paid user
- Unpaid user
- Expired user
- Cancelled subscription
- Bundle access
- Revoked access

### Devices

- One device
- Two devices
- Third device
- Device removal
- Session expiration

### Content

- Unauthorized request
- Expired signed URL
- Invalid content ID
- Invalid product slug
- Encrypted content retrieval
- Asset authorization

### Product engine

- Standard template
- Custom product
- Missing product
- Draft product
- Archived product
- Unlisted product

---

## 45. Performance

Custom product experiences must not slow the entire storefront.

Use:

- Server rendering where appropriate
- Static generation for public product information where safe
- Dynamic imports for heavy components
- Lazy loading
- Image optimization
- Code splitting
- Streaming where useful
- Minimal client-side JavaScript on public pages

Heavy features such as:

- WebGL
- Code editors
- Video
- Complex animations

should load only when required by the product.

---

## 46. Deployment

The storefront can be deployed normally as a Next.js application.

Environment secrets should include at minimum:

```text
Supabase URL
Supabase publishable/anon key
Supabase server/service key
Razorpay key ID
Razorpay secret
Razorpay webhook secret
Content encryption key
```

Only safe public keys belong in client-side configuration.

Server secrets must never be exposed.

---

## 47. Future Expansion Without Rebuilding

The architecture should leave room for:

- Admin dashboard
- More payment methods
- Stronger video DRM
- Native mobile app
- Email marketing
- Product update notifications
- Advanced subscriptions
- Gift purchases
- Affiliate system
- Referral codes
- More currencies
- Advanced invoices/GST
- Product recommendations
- More sophisticated analytics

None of these should be required for v1.

---

## 48. Definition of Done for V1

The platform is ready when:

- A user can register/login.
- A public product can be discovered and indexed.
- A product can have a custom coded experience.
- Product content can be stored as encrypted structured data.
- Private assets are protected.
- A customer can purchase through Razorpay.
- Payment is verified server-side.
- A successful purchase creates an entitlement.
- Only entitled users can open protected products.
- Users are limited to two active devices.
- Downloadable products use controlled downloads.
- Watermarks identify the purchaser.
- Reviews require verified purchases.
- Coupons work server-side.
- Product-specific search can exist where useful.
- Progress remains local.
- Basic purchase records/receipts exist.
- SEO is implemented.
- Analytics reflect real events.
- No fake views, users, purchases, reviews, or scarcity exist.
- A new coded product can be added without rewriting the commerce platform.

---

## 49. Final Architecture

```text
                         CUSTOMER
                             │
                             ▼
                    ┌─────────────────┐
                    │    NEXT.JS      │
                    │   STOREFRONT    │
                    └────────┬────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
        Product Pages     Auth/Library     Checkout
             │               │                │
             │               ▼                ▼
             │          Entitlements       Razorpay
             │               │                │
             └───────────────┼────────────────┘
                             │
                             ▼
                       ┌───────────┐
                       │ SUPABASE  │
                       ├───────────┤
                       │ Auth      │
                       │ Postgres  │
                       │ Storage   │
                       └─────┬─────┘
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
          Encrypted Content       Private Assets
                  │                     │
                  └──────────┬──────────┘
                             ▼
                    CUSTOM PRODUCT ENGINE
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
            Ebook          Video         Custom App
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                       PAID EXPERIENCE
```

The central contract is:

**Commerce tells us who bought what.**

**Entitlements tell us who may access it.**

**Encrypted content contains what they bought.**

**Product code determines how they experience it.**

This separation is the foundation that allows the platform to scale from a simple ebook into arbitrary interactive digital products without redesigning the store.
