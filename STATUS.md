# Project Status & Handoff Guide

## 1. Current State Summary

### A. The Job Search Book Recovery (100% Complete)
- **Extracted Content:** All **30 chapters (Chapters 0–29)** containing **148 rich blocks** were successfully decrypted from legacy vault SQL (`old.book/seed_encrypted_vault.sql`).
- **Data Integrity:** Epigraphs, subtitles, reading times, ACR frameworks, Naukri invoices, ASCII diagrams, and recruiter scripts fully recovered with zero data loss.
- **Privacy & Storage Isolation:**
  - **Private Repo (`preq.store`):** Holds the raw clean book (`raw-data/the-job-search-book/book.json`), the extraction scripts, and the newly encrypted Supabase seed (`supabase/005_seed_job_search_book.sql`).
  - **Public Storefront (`om.store`):** Strictly contains product metadata and **Chapter 0 only** as a public preview excerpt (`products/the-job-search-book/sample.ts`). Chapters 1–29 full content are strictly absent from the public codebase and delivered on-demand via encrypted Supabase storage when purchased.
- **Cryptographic Keys:**
  - Legacy decryption key (`1b7fea30...`) was used **strictly** to unlock the old archive and is not stored or reused in the platform.
  - The book payload in `005_seed_job_search_book.sql` has been re-encrypted with the platform's fresh master key (`CONTENT_ENCRYPTION_KEY = f3b9c7e2...`).

### B. Security, Architecture & Payment Hardening (Audit Resolved)
- **Payment Verification:** Removed signature bypass logic in `app/api/checkout/verify/route.ts`. Mock prefixes (`order_mock_`) are blocked in production. Verified timing-safe buffer comparison in `lib/razorpay/client.ts`.
- **Database Architecture:** Fixed Postgres UUID primary key generation and foreign key constraints across `purchases`, `entitlements`, `reviews`, `devices`, `analytics_events`, and `product_content`.
- **Modular Database Seeds:** Separated monolithic seed files into isolated, product-specific scripts:
  - `003_seed_platform.sql`: Base categories, tags, and coupons.
  - `004_seed_hiring_organizations.sql`: "Companies That Hire Without Whiteboards" directory.
  - `005_seed_job_search_book.sql`: "The Job Search Book" product and AES-256-GCM ciphertext payload.

---

## 2. What Needs To Be Done Next

### Step 1: Execute Database Seeds in Supabase
Run the following SQL files in your Supabase SQL Editor (`https://supabase.com/dashboard/project/zmghgjsafxaldohyfkhb/sql/new`) in this order:
1. `preq.store/supabase/001_initial_schema.sql` (if starting fresh)
2. `preq.store/supabase/002_security_policies.sql` (Row Level Security)
3. `preq.store/supabase/003_seed_platform.sql` (Categories & Tags)
4. `preq.store/supabase/004_seed_hiring_organizations.sql` (Hiring Directory Product)
5. `preq.store/supabase/005_seed_job_search_book.sql` (The Job Search Book Product & Encrypted Content)

### Step 2: Test Reader & Storefront Locally
1. In `om.store`, start development server:
   ```bash
   npm run dev
   ```
2. Navigate to:
   - **Book Product Page:** `http://localhost:3000/products/the-job-search-book`
   - **Free Preview Drawer:** Click "Preview Chapter 0" to read the introduction excerpt.
   - **Directory Product Page:** `http://localhost:3000/products/hiring-organizations`
   - **Authenticated Reader:** `http://localhost:3000/library/the-job-search-book`

### Step 3: Enhance eBook ContentRenderer (Optional Polish)
- In `om.store/products/_templates/ebook/ContentRenderer.tsx`, verify custom visual components for rich blocks (`lead-paragraph`, `diagram`, `do-dont`, `invoice-case-study`, and `script`).

---

## 3. Repository Remotes
- **Storefront (Public):** `https://github.com/MonsterFlick/store.git` (`main`)
- **Admin & Private Data:** `https://github.com/MonsterFlick/preq.store.git` (`main`)
