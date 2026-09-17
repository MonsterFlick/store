# Digital Product Platform — Concept

## 1. Vision

Build a modular digital-product platform where the storefront is a reusable commerce and access layer, while every product can have its own custom digital experience.

The platform is not a PDF shop, video shop, or generic marketplace. It is a **digital product engine**.

A product may be:

- Interactive ebook
- Guide/document
- Video experience
- Source-code/template product
- Image/asset pack
- Audio product
- Bundle
- A completely custom application-like experience

The customer should feel that they are buying access to a useful digital product, not merely receiving a file.

---

## 2. Core Principle

The system has three distinct layers:

### Layer 1 — Universal Store / Commerce

Shared by every product:

- Product discovery
- SEO
- Authentication
- Razorpay payments
- Orders
- Entitlements
- Pricing
- Coupons
- Reviews
- Licensing
- Device/session management
- Analytics
- User library
- Access control

### Layer 2 — Product Experience

Implemented in code and reusable through templates.

Examples:

- Ebook reader
- Interactive guide
- Video course
- Code/template showcase
- Searchable organization directory
- Interactive database
- Quiz
- Calculator
- Tool
- Custom application

A product can use a standard template or completely customize its experience.

### Layer 3 — Product Content

The actual product content is separate from the UI.

For text-heavy products, structured content is stored in encrypted form in Supabase.

Large binary assets such as videos and downloadable ZIPs use private object storage.

---

## 3. Product Identity

Every product has a database record and a unique slug.

Example:

`products.slug = javascript-handbook`

The code-side product is:

`products/javascript-handbook/`

The slug connects the commerce record to the product experience.

Public URL:

`/products/javascript-handbook`

Protected product URL:

`/library/javascript-handbook`

---

## 4. Product-as-Code Model

Products live inside the storefront repository.

Example:

```text
products/
├── _templates/
│   ├── ebook/
│   ├── guide/
│   ├── video/
│   └── ...
│
├── javascript-handbook/
│   ├── product.ts
│   ├── Product.tsx
│   ├── content.ts
│   ├── components/
│   └── assets/
│
├── ai-automation-guide/
│   ├── product.ts
│   ├── Product.tsx
│   └── ...
│
└── hiring-organizations/
    ├── product.ts
    ├── Product.tsx
    └── ...
```

A reusable template provides a starting point. A product may override any part of it.

AI coding tools can therefore create or modify products directly in the repository.

---

## 5. Example: Interactive Ebook

A book does not have to be a PDF.

Its content can be represented as structured data:

```json
{
  "chapters": [
    {
      "id": "introduction",
      "title": "Introduction",
      "sections": [
        {
          "type": "text",
          "content": "..."
        },
        {
          "type": "code",
          "language": "typescript",
          "content": "..."
        },
        {
          "type": "image",
          "asset_id": "asset_123"
        }
      ]
    }
  ]
}
```

The production content is encrypted before being stored.

The ebook template renders that content as an interactive reading experience.

Possible features include:

- Chapter navigation
- Reading progress
- Code blocks
- Images
- Callouts
- Interactive examples
- Search when useful
- Bookmarks when enabled
- Custom animations
- Mobile-first reading

---

## 6. Product-Specific Capabilities

Products should be capability-driven rather than hard-coded around file types.

A product can define capabilities such as:

```text
view: true
download: false
stream: false
watermark: true
access: lifetime
device_limit: 2
```

Another product could define:

```text
view: true
download: true
stream: false
watermark: true
access: lifetime
device_limit: 2
```

This allows new product types without changing the core platform.

---

## 7. Public vs Protected Experience

Every product has two conceptual surfaces.

### Public

`/products/{slug}`

Contains:

- Product presentation
- Description
- Preview
- Pricing
- Features
- License information
- FAQ where useful
- Reviews
- Purchase CTA
- SEO metadata

### Protected

`/library/{slug}`

Requires:

1. Authentication
2. Valid entitlement
3. Valid access period
4. Device/session validation

Only then is the actual product experience loaded.

This separation keeps product pages SEO-friendly while keeping paid content behind access control.

---

## 8. User Experience

Primary flow:

```text
Discover product
      ↓
Public product page
      ↓
Preview
      ↓
Buy
      ↓
Razorpay Checkout
      ↓
Server-side payment verification
      ↓
Entitlement created
      ↓
Product appears in Library
      ↓
Open product
```

The storefront should feel premium, fast, mobile-first, and more like a digital library/studio than a generic ecommerce template.

---

## 9. Content Protection Philosophy

The goal is **deterrence without inconveniencing legitimate customers**.

Protection includes:

- Private storage
- Server-side authorization
- Short-lived signed URLs
- Entitlement checks
- Device/session limits
- Dynamic watermarking
- Download logging
- Protected video delivery
- No permanent public content URLs
- Browser-level protections where they do not interfere with normal use

The system must not claim that browser content can be made impossible to copy.

Screenshots and recordings cannot be universally prevented in a normal web browser. The system should therefore focus on traceability, deterrence, and secure delivery rather than destructive anti-user measures.

---

## 10. Watermarking

Paid content can include dynamic identity information such as:

```text
Licensed to: Om Thakur
Email: customer@example.com
Order: #ORD-12345
```

Watermarks should be:

- Persistent where practical
- Faint enough to preserve readability
- Dynamically generated
- Product-aware
- Applied to suitable visual/video content

For video, the watermark may periodically reposition.

For downloadable assets, watermarking depends on the asset type and whether a modified delivery format is practical.

---

## 11. User Library

The authenticated user gets:

```text
/library
```

Containing purchased products.

Example:

```text
My Library

JavaScript Handbook
[Continue Reading]

AI Automation Guide
[Open]

React SaaS Template
[Download]
```

The library should show only products for which the user has a valid entitlement.

---

## 12. Local Progress

Reading and playback progress is intentionally local for v1.

Do not store progress in Supabase.

Possible implementation:

- localStorage for simple state
- IndexedDB when larger/local structured state is useful

Examples:

- Last chapter
- Reading position
- Video timestamp
- Local bookmarks
- Product-specific local preferences

This reduces backend complexity and keeps personal progress local to the device/browser.

---

## 13. Product-Specific Search

Search is not a universal requirement.

Products that benefit from search can implement their own search interface.

Example:

A paid list of organizations:

```text
Search organizations...

[Organization]
[Industry]
[Location]
[Hiring status]
```

The product itself owns the search experience and logic.

The platform only supplies the surrounding commerce/access infrastructure.

---

## 14. Reviews

Reviews are available only to verified purchasers.

The system should record the relationship between:

- User
- Product
- Order/entitlement
- Review

Users may edit or delete their own reviews.

Reviews are not fabricated or artificially inflated.

---

## 15. Licensing

Each product can define its own license.

Examples:

- Personal use
- Commercial use
- Single project
- Multiple projects
- Redistribution prohibited
- Resale prohibited

The purchased entitlement should preserve the applicable license associated with that purchase.

---

## 16. Downloads

Downloadable products use controlled access.

The customer does not receive a permanent public storage URL.

Flow:

```text
Authenticated user
      ↓
Entitlement check
      ↓
Generate short-lived signed URL
      ↓
Download
      ↓
Record download event
```

Whether a product is downloadable is configured independently.

---

## 17. Bundles

A bundle is a product containing other products.

Example:

```text
Ultimate Web Pack
├── JavaScript Handbook
├── React Guide
├── UI Components
└── SaaS Template
```

Buying the bundle creates access to the bundle and its included products.

---

## 18. Product Versions

Technical content versioning should exist for rollback/recovery, but v1 does not need a customer-facing update notification system.

The product source can evolve without requiring a separate customer update workflow.

---

## 19. Homepage

The homepage should use a premium digital-library/storefront approach.

Potential sections:

- Featured products
- Latest products
- Categories
- Product collections
- Selected bundles
- Search/discovery
- Clear value propositions

No fake popularity, sales, views, or scarcity.

---

## 20. Categories and Discovery

Categories and tags are database-driven.

The storefront should support:

- Arbitrary categories
- Product tags
- Product types
- Search/filtering where useful

Adding a category must not require application code changes.

---

## 21. Coupons

Coupons are part of v1.

Support should be designed for:

- Percentage discounts
- Fixed INR discounts
- Product-specific coupons
- Expiration
- Usage limits
- User restrictions where useful

Discount calculation must happen server-side before the Razorpay order is created.

---

## 22. Subscriptions

The platform should support subscription-capable pricing in its architecture, but the initial product catalog is expected to be predominantly one-time purchases in INR.

The payment and entitlement model should not assume every product is one-time forever.

---

## 23. Account

Users can:

- Sign in
- View their library
- View purchases
- Manage devices/sessions
- Access products
- Request account deletion by contacting support

Authentication email flows are handled by Supabase Auth.

No custom email/marketing infrastructure is required for v1.

---

## 24. Legal

The storefront should have:

- Terms & Conditions
- Privacy Policy
- Refund Policy
- Product/license terms
- Intellectual-property/copyright terms

The refund policy should clearly state that purchases are non-refundable, subject to any rights or obligations that cannot legally be excluded.

The policy should be visible before/around checkout.

---

## 25. Analytics

Analytics must represent real activity.

Universal events may include:

- Product view
- Preview opened
- Checkout started
- Payment succeeded
- Payment failed
- Product opened
- Download initiated
- Video started

Products can define additional events:

- Chapter opened
- Search performed
- Quiz completed
- Tool used
- Demo interacted with

Analytics are primarily admin/owner data and are not presented as artificial social proof.

---

## 26. Design Philosophy

The storefront should be:

- Premium
- Modern
- Mobile-first
- Fast
- Highly visual
- Modular
- Product-led

The universal storefront should remain visually coherent while allowing individual products to have dramatically different experiences.

The platform should avoid looking like a generic Shopify/Gumroad clone.

---

## 27. Long-Term Direction

The system should eventually allow:

```text
One platform
      ↓
Many products
      ↓
Many product templates
      ↓
Unlimited custom experiences
```

An interactive book today can become a course, tool, database, calculator, research product, or entirely custom application tomorrow without changing the commerce foundation.

The store is the **delivery platform**.

The product is the **experience**.
