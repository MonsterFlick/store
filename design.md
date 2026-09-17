# Digital Product Platform — Design System

## 1. Design Direction

The storefront should feel like a **new generation digital product platform**, not a generic ecommerce store.

The target quality bar is:

- Apple-level attention to detail
- Editorial design quality
- Modern software-product polish
- Neo-inspired experimentation where useful
- Strong typography
- Intentional motion
- Excellent mobile experience
- Clear hierarchy
- Distinct brand identity

Do not copy Apple, Linear, Stripe, Vercel, Arc, or any other existing brand.

Study what makes premium products feel premium, then create an original visual language.

The design should feel like:

> **A premium digital library built for products that are experiences, not files.**

---

# 2. Core Design Philosophy

## Less UI. More experience.

Avoid filling the screen with:

- Cards everywhere
- Excessive borders
- Random gradients
- Generic dashboard components
- Huge button collections
- Stock illustrations
- Decorative elements without purpose

Every visual element should have a reason to exist.

Use whitespace aggressively.

Use typography and composition as primary design tools.

---

# 3. Brand Identity

The platform needs its own identity.

The visual identity should be based around:

### Precision + Curiosity + Digital Craft

It should feel:

- Intelligent
- Premium
- Experimental
- Calm
- Modern
- Technical
- Creative

Avoid making it:

- Corporate
- Overly futuristic
- Cyberpunk
- Generic SaaS
- "AI generated"
- Excessively glassy

---

# 4. Visual Personality

The default storefront should have a restrained foundation with occasional moments of visual surprise.

Think:

```text
90% refined
10% unexpected
```

The unexpected part can come from:

- Product-specific animations
- Unusual typography
- Scroll transitions
- Interactive previews
- Asymmetric layouts
- Editorial compositions
- Experimental navigation
- Micro-interactions

The foundation stays consistent while individual products can become much more expressive.

---

# 5. Color System

Do not lock the entire brand into one loud gradient.

Use a neutral foundation.

### Primary foundation

- Near-black
- Soft white
- Warm off-white
- Neutral gray

### Accent

Use a restrained brand accent that can evolve.

Suggested direction:

- Electric violet / indigo as a subtle signature
- Occasional secondary accent colors depending on product

The accent should not dominate every screen.

Example conceptual palette:

```text
Ink       #0A0A0B
Soft Ink  #171719
White     #FAFAF8
Muted     #71717A
Border    #E7E7E3
Accent    #6D5DF5
Accent 2  #A78BFA
```

These are starting values, not immutable brand colors.

Products may use their own accent palette inside their protected experience.

---

# 6. Light and Dark Modes

Support both.

### Light mode

Should feel:

- Editorial
- Clean
- Paper-like
- Premium

### Dark mode

Should feel:

- Cinematic
- Technical
- Immersive
- High contrast

Do not simply invert colors.

Dark mode needs its own surface hierarchy.

Example:

```text
Background
      ↓
Elevated surface
      ↓
Card
      ↓
Interactive surface
      ↓
Focused state
```

---

# 7. Typography

Typography should be one of the strongest parts of the identity.

Avoid defaulting to Inter everywhere.

Use a modern display typeface paired with a highly readable sans-serif.

Recommended direction:

### Display

Choose a distinctive contemporary grotesk or neo-grotesk.

Potential families to evaluate:

- Geist
- Inter Tight
- Satoshi
- Manrope
- Plus Jakarta Sans
- Instrument Sans

### Body

Prioritize readability:

- Geist
- Inter
- IBM Plex Sans
- DM Sans

### Editorial / special moments

A serif can occasionally be used for books/editorial products:

- Instrument Serif
- Source Serif
- Newsreader

Do not use a serif simply to make something "luxury."

Typography must match the product.

---

# 8. Type Scale

Use a deliberate scale.

Example:

```text
Display XL    72–96px
Display L     56–72px
Display M     44–56px
Heading XL    36–44px
Heading L     30–36px
Heading M     24–30px
Heading S     20–24px
Body L        18px
Body M        16px
Body S        14px
Caption       12px
```

Responsive typography should scale down intelligently.

Do not use giant 100px headings simply because they look impressive on desktop.

---

# 9. Typography Rules

Use:

- Tight tracking for large headings
- Comfortable line-height for body text
- Short line lengths for reading
- Strong contrast between heading and supporting text
- Sentence case by default

Avoid:

- ALL CAPS everywhere
- Excessive bold text
- Tiny gray text
- Long paragraphs at full viewport width

---

# 10. Layout System

Use a consistent grid.

Desktop:

```text
┌─────────────────────────────────────────────┐
│                 max-width                   │
│                                             │
│  content                                    │
│                                             │
└─────────────────────────────────────────────┘
```

Recommended maximum content width:

```text
1200–1440px
```

Depending on section.

Use generous horizontal margins.

For editorial/product experiences, allow narrower reading widths:

```text
640–760px
```

---

# 11. Spacing

Use a spacing scale instead of arbitrary values.

Example:

```text
4
8
12
16
24
32
48
64
80
96
128
160
```

Large sections should breathe.

The interface should never feel cramped.

---

# 12. Navigation

The main navigation should be minimal.

Concept:

```text
Logo

Products
Categories
Search

                         Login
                         Library
```

Use a floating or slightly detached navigation treatment where appropriate.

Possible visual direction:

- Rounded navigation container
- Subtle translucent surface
- Thin border
- Soft shadow
- Background blur

But avoid turning the entire website into glassmorphism.

Glass is an occasional material, not the identity.

---

# 13. Hero Design

The homepage hero should not simply say:

```text
The best digital products
[Buy now]
```

Instead, create a visual statement around the concept of **digital experiences**.

Example direction:

```text
              DIGITAL PRODUCTS,
              REIMAGINED.

     Books. Guides. Tools. Courses.
        Built to be experienced.

                 ↓ Explore
```

Behind or around the typography, use subtle motion:

- Product fragments
- Floating chapters
- UI snippets
- Code
- Shapes
- Editorial elements

Keep the hero lightweight.

---

# 14. Product Discovery

Do not use a wall of identical cards.

Mix formats.

Example:

```text
FEATURED
┌─────────────────────────────────────────────┐
│                                             │
│         Large editorial product             │
│                                             │
└─────────────────────────────────────────────┘


LATEST

┌────────────┐  ┌────────────────────┐
│ Product    │  │ Product            │
│            │  │                    │
└────────────┘  └────────────────────┘

┌──────────────────────────┐
│ Product                  │
└──────────────────────────┘
```

The grid can vary based on product importance.

---

# 15. Product Cards

Cards should be quiet.

A product card should communicate:

- Product image/visual
- Name
- Short descriptor
- Type
- Price

Optional:

- New
- Bundle
- Featured

Avoid:

- Fake "1,234 sold"
- Fake views
- Fake ratings
- Fake urgency
- Excessive badges

---

# 16. Product Page

Public product pages are sales experiences.

Suggested structure:

```text
Product type
Product name
Short value proposition

[Visual / Interactive Preview]

Price
Purchase CTA

What you get

Product experience preview

Details

Who it's for

License

Reviews

FAQ

Related products
```

The actual composition should adapt to the product.

A book can look editorial.

A code template can look like a developer product.

A video course can look cinematic.

---

# 17. Product Hero

Do not force every product into the same hero.

The product itself should determine the visual presentation.

### Ebook

Large cover + typography + interactive chapter preview.

### Video

Large cinematic video preview.

### Code template

Interactive UI preview + code snippets.

### Organization database

Search interface preview.

### Image pack

Large visual collage.

### Audio

Waveform / player visualization.

### Bundle

Multiple products composed into one visual system.

---

# 18. Interactive Preview

Whenever possible, let customers experience a small part of the product before purchasing.

Examples:

### Ebook

Read a chapter excerpt.

### Directory

Search a small sample.

### Code

Interact with the component.

### Video

Watch a short preview.

### Tool

Use a limited version.

The preview should sell the **experience**, not just list features.

---

# 19. Protected Product Experience

Once purchased, the design can become more immersive.

The public site and product application should feel related but not identical.

Example:

```text
Public
    ↓
Minimal premium storefront

Purchased
    ↓
Immersive product application
```

This creates a feeling that the customer has entered something rather than merely unlocked a webpage.

---

# 20. Ebook Experience

A premium ebook should not look like a PDF viewer.

Possible structure:

```text
┌──────────────────────────────────────────────┐
│ Book title                  42%     ☰       │
├───────────────┬──────────────────────────────┤
│ Chapters      │                              │
│               │ Chapter 04                   │
│ 01 Intro      │                              │
│ 02 Basics     │ Server Components             │
│ 03 Runtime    │                              │
│ 04 Components │ Text...                      │
│               │                              │
│               │ [Interactive Example]        │
│               │                              │
└───────────────┴──────────────────────────────┘
```

On mobile, navigation becomes an elegant bottom/top sheet.

---

# 21. Content Renderer

For structured products, visual content blocks should have a consistent design language.

Examples:

### Text

Readable editorial typography.

### Code

Dedicated code surface with:

- Syntax highlighting
- Copy action
- Language label

### Callout

Subtle visual emphasis.

### Image

Large, high-quality media with controlled captions.

### Quote

Editorial treatment.

### Interactive

Product-specific visual component.

---

# 22. Mobile Design

Mobile is not a reduced desktop.

It is a first-class experience.

Priorities:

1. Touch
2. Reading
3. Navigation
4. Performance
5. Visual hierarchy

Use:

- Large touch targets
- Sticky contextual controls
- Bottom sheets
- Swipe where meaningful
- Horizontal scrolling only when intentional
- Minimal persistent chrome

Avoid:

- Tiny buttons
- Desktop sidebars squeezed into mobile
- Hover-dependent functionality
- Excessive sticky elements

---

# 23. Motion

Motion should communicate hierarchy and state.

Use:

- Entrance transitions
- Scroll reveals
- Shared-element transitions
- Soft scale changes
- Opacity transitions
- Layout transitions
- Micro-interactions

Avoid:

- Everything flying around
- Long loading animations
- Constant parallax
- Excessive bouncing
- Animation for decoration alone

Default motion should feel:

> precise, soft, fast.

---

# 24. Motion Timing

Suggested ranges:

```text
Micro interaction    120–180ms
UI transition        180–300ms
Panel transition     250–400ms
Hero animation       500–900ms
Major transition     400–700ms
```

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled, remove unnecessary animation without breaking functionality.

---

# 25. Page Transitions

Use subtle transitions between:

```text
Store
   ↓
Product
   ↓
Checkout
   ↓
Library
   ↓
Product Experience
```

Where technically practical, use shared visual elements:

```text
Product thumbnail
       ↓
expands
       ↓
Product page
```

This can make the platform feel cohesive and premium.

---

# 26. Buttons

Buttons should be simple and tactile.

Primary:

```text
Buy now →
```

Secondary:

```text
Preview
```

Tertiary:

```text
Learn more
```

Avoid:

- Five competing primary buttons
- Giant pill buttons everywhere
- Excessive gradients

Use rounded corners consistently but don't make every element a capsule.

---

# 27. Forms

Forms should be:

- Minimal
- Clearly labeled
- Accessible
- Fast
- Forgiving

Use clear states:

```text
Default
Focus
Error
Success
Disabled
Loading
```

Never rely solely on color for validation.

---

# 28. Checkout

Checkout should be extremely focused.

```text
Product
Price
Discount
Final total

Payment method

[Pay ₹499]

Secure payment
```

Avoid unnecessary navigation and distractions.

Coupon entry should be available without dominating the interface.

---

# 29. Library

The library should feel like a personal collection.

Instead of a generic dashboard:

```text
Dashboard
Statistics
Widgets
Charts
```

use:

```text
Your Library

Continue
Recently opened
Your products

[Product]
[Product]
[Product]
```

The focus is on consuming purchased products.

---

# 30. Account

Keep account UI simple:

```text
Profile
Purchases
Devices
Security
Support
Delete account request
```

Do not build a complex SaaS settings dashboard.

---

# 31. Device Management

Present devices clearly:

```text
Your devices

● Chrome · Windows
  Last active: Now

● Chrome · Android
  Last active: Yesterday

[Remove device]
```

If a new device is blocked because two devices are active, explain exactly why and provide a straightforward recovery path.

---

# 32. Reviews

Reviews should feel editorial, not like a marketplace rating wall.

Use:

```text
★★★★★

"Short customer review..."

Verified purchase
Name
```

Don't exaggerate ratings or display fake volume.

---

# 33. Search

Global store search should be available if the catalog needs it.

Product-specific search should remain inside the product.

Example:

```text
Global:
Search products...

Inside organization directory:
Search organizations...
```

Do not combine unrelated search systems into one confusing interface.

---

# 34. Loading States

Avoid generic spinners whenever possible.

Use skeletons or contextual loading:

```text
Product content
████████████
████████
██████████████
```

For product applications, loading should reflect what is actually loading.

---

# 35. Empty States

Empty states should be useful and minimal.

Example:

```text
Your library is empty.

Find something worth learning.

[Explore products]
```

No cartoon illustrations unless the product identity specifically calls for them.

---

# 36. Error States

Errors should be human-readable.

Bad:

```text
Error 403
```

Better:

```text
This product isn't available to your account.

If you purchased it, check your account or contact support.
```

Never expose internal stack traces or sensitive information.

---

# 37. Accessibility

Accessibility is part of the design system.

Include:

- Keyboard navigation
- Focus indicators
- Semantic HTML
- Accessible labels
- Proper contrast
- Reduced motion
- Screen-reader support
- Touch-friendly controls

Do not sacrifice accessibility for visual effects.

---

# 38. Responsive Breakpoints

Use behavior-driven breakpoints rather than designing separately for arbitrary device models.

Suggested baseline:

```text
Mobile       < 640px
Tablet       640–1024px
Desktop      1024–1440px
Large        > 1440px
```

Components should adapt fluidly between them.

---

# 39. Border Radius

Use a restrained radius system.

Example:

```text
Small       8px
Medium      12px
Large       18px
XL          24px
```

Use larger radii for:

- Large product surfaces
- Modal/sheet containers
- Hero visuals

Don't round everything equally.

---

# 40. Shadows

Shadows should be subtle.

Prefer:

- Soft ambient shadows
- Small elevation differences
- Borders combined with very light shadow

Avoid heavy drop shadows.

Dark mode should use surface contrast more than black shadows.

---

# 41. Glass / Blur

Use glass selectively.

Good uses:

- Floating navigation
- Sticky controls
- Video controls
- Modal overlays
- Product reader controls

Bad use:

- Every card
- Every section
- Entire background
- Text containers everywhere

The site should not look like a glassmorphism template.

---

# 42. Visual Texture

Subtle texture can help create identity.

Potential elements:

- Fine grain
- Soft noise
- Very subtle gradients
- Paper texture for editorial products
- Technical grid for developer products

Use at very low intensity.

Never make texture reduce readability.

---

# 43. Product Identity System

Each product can have a mini visual identity.

Global platform:

```text
Typography
Spacing
Navigation
Commerce
Accessibility
Motion principles
```

Product:

```text
Accent color
Typography variation
Background treatment
Illustrations
Animations
Custom components
Content style
```

This allows:

```text
Book A
→ Editorial

Book B
→ Technical

Course A
→ Cinematic

Directory
→ Data-heavy

Code template
→ Developer-centric
```

without making the platform feel disconnected.

---

# 44. Product Templates

Templates should be starting points, not prisons.

Example:

```text
_ templates/
├── ebook/
├── guide/
├── video/
├── directory/
├── asset-pack/
└── bundle/
```

A product can:

1. Use a template unchanged.
2. Extend a template.
3. Replace individual components.
4. Build a completely custom experience.

---

# 45. Design Tokens

Create a centralized design-token layer.

Example categories:

```text
colors
typography
spacing
radius
shadows
motion
z-index
container widths
```

Components should consume tokens rather than scattering arbitrary values across product code.

Product-specific tokens can override selected values without changing the global system.

---

# 46. Component Philosophy

Build a small set of excellent primitives.

Examples:

```text
Button
Input
Badge
Modal
Sheet
Tooltip
Dropdown
Tabs
Card
Toast
Dialog
Avatar
Progress
Skeleton
```

Then build commerce components:

```text
ProductCard
Price
PurchaseButton
CouponInput
Review
License
LibraryItem
DeviceItem
```

Avoid building dozens of components before they are needed.

---

# 47. Brand Logo

The logo should be simple and recognizable.

Do not rely on a complicated icon.

Potential direction:

- Wordmark
- Minimal geometric symbol
- Typographic mark
- Abstract "product/experience" symbol

The mark should work at:

```text
favicon
mobile header
desktop navigation
social preview
```

---

# 48. Imagery

Product imagery should be intentional.

Avoid generic stock photography.

Prefer:

- Product screenshots
- Custom artwork
- Typography
- Abstract compositions
- Generated visual assets where appropriate
- Actual product UI
- Editorial imagery when relevant

For digital products, **show the product itself**.

---

# 49. SEO and Design

SEO must not destroy visual quality.

Public product pages should use semantic content even when the visual design is highly experimental.

Important:

```text
H1
H2
semantic sections
descriptive links
image alt text
structured data
```

Interactive content must have accessible/SEO-friendly fallbacks where appropriate.

---

# 50. Performance as Design

Visual quality includes performance.

Targets:

- Fast initial load
- Minimal blocking JavaScript
- Optimized images
- Lazy-loaded heavy product components
- Efficient fonts
- No unnecessary animation libraries
- No huge background videos on mobile

A beautiful loading screen is not a substitute for a fast website.

---

# 51. Design Anti-Patterns

Do not allow the AI coding tool to automatically introduce:

- Purple gradients everywhere
- Excessive glassmorphism
- Huge glowing text
- Random floating blobs
- Excessive rounded cards
- Generic SaaS dashboards
- Fake 3D objects
- Stock AI illustrations
- Excessive shadows
- Infinite scrolling for no reason
- Motion everywhere
- Giant hero sections that hide the actual product
- Fake social proof
- Fake counters
- Fake scarcity

The system should remain intentional.

---

# 52. AI Coding Rules

When using AI coding tools, provide the design system as a constraint.

AI-generated UI should:

1. Reuse existing components.
2. Reuse design tokens.
3. Follow typography rules.
4. Follow spacing rules.
5. Avoid introducing arbitrary colors.
6. Avoid introducing random gradients.
7. Avoid unnecessary libraries.
8. Preserve responsive behavior.
9. Preserve accessibility.
10. Respect reduced-motion preferences.
11. Optimize images and heavy assets.
12. Match the existing visual language.
13. Build custom visuals only when they add meaning.
14. Never fabricate product information or social proof.

The AI should extend the design system rather than replace it.

---

# 53. Product Creation Design Workflow

When creating a new product:

```text
1. Define product purpose
        ↓
2. Choose closest template
        ↓
3. Define product visual identity
        ↓
4. Define content structure
        ↓
5. Build product experience
        ↓
6. Build mobile experience
        ↓
7. Add interaction/motion
        ↓
8. Add preview
        ↓
9. Connect commerce/access
        ↓
10. Test
```

The product should be designed around what the customer actually needs to do.

---

# 54. Overall Experience

The storefront should feel like entering a curated digital space.

The experience should progress naturally:

```text
DISCOVER
   ↓
UNDERSTAND
   ↓
PREVIEW
   ↓
PURCHASE
   ↓
ENTER
   ↓
EXPERIENCE
   ↓
RETURN
```

The last step matters.

A good digital product should make the customer want to come back and continue where they stopped.

---

# 55. Design North Star

The platform should ultimately communicate:

> **Digital products, built as experiences.**

Not:

> Download our PDFs.

Not:

> Buy our files.

Not:

> Another digital marketplace.

The visual system should make that distinction obvious before the customer even understands the architecture.

---

# 56. Final Visual Rule

When deciding between:

```text
More effects
```

and:

```text
Better composition
```

choose better composition.

When deciding between:

```text
More features
```

and:

```text
Clearer experience
```

choose clearer experience.

When deciding between:

```text
Generic modern UI
```

and:

```text
Distinctive design
```

choose distinctive design.

The goal is not to make the platform look "fancy."

The goal is to make it **recognizable, desirable, usable, and memorable.**
