import { ProductDefinition } from "@/lib/products/types";

export const product: ProductDefinition = {
  slug: "the-job-search-book",
  name: "The Job Search Book: The Practical Playbook for Getting a Tech Job",
  tagline:
    "The complete 30-chapter tech hiring playbook — PLUS the verified directory of 144+ companies hiring without whiteboards included 100% free.",
  description:
    "A comprehensive career launchpad bundle engineered specifically for software engineers, tech students, and career switchers. Includes the complete 30-chapter digital playbook covering the entire recruitment funnel (ATS optimization, GitHub proof of competence, Naukri & LinkedIn dominance, cold sniper outreach, and salary negotiation) PLUS perpetual lifetime access to the verified directory of 144+ companies hiring without algorithmic whiteboards (a ₹99 standalone value, included free).",
  type: "bundle",
  template: "ebook",
  capabilities: {
    view: true,
    download: false,
    stream: false,
    watermark: true,
    access: "lifetime",
    device_limit: 2,
  },
  price: 199, // ₹199 INR
  originalPrice: 1098, // ₹599 (Book) + ₹499 (Directory) = ₹1,098 total value
  currency: "INR",
  categories: ["Careers", "Engineering", "Remote Work", "Bundles"],
  tags: [
    "Bundle",
    "Hiring",
    "Interviews",
    "Remote Work",
    "India Tech",
    "Resume Optimization",
    "Job Search",
    "Career Growth",
  ],
  previewChapterId: "chapter-0",
  includedSlugs: ["hiring-organizations"],
  features: [
    "INCLUDED FREE BONUS: Companies That Hire Without Whiteboards Directory (144 Verified Employers, ₹99 Value)",
    "30 structured, zero-fluff chapters spanning the entire tech hiring lifecycle",
    "The 8-second recruiter scan breakdown and ATS parsing optimization",
    "Concrete Action-Context-Result (ACR) framework for developer project bullet points",
    "Step-by-step GitHub profile and repository audit playbook that hooks tech leads",
    "Naukri Resdex algorithm dominance guide + real FastForward purchase invoice case study",
    "Sniper cold outreach scripts for recruiters and engineering leads that get replies",
    "Engineering STAR method framework for high-stakes behavioral and ownership rounds",
    "Salary negotiation playbooks, timing tactics, and scripts for the Indian tech market",
    "Includes complete 30-day daily action calendar and 13-column metrics application tracker",
    "Instant digital reader & directory access across your desktop, tablet, and mobile devices",
    "Dual lifetime access: Both products unlocked automatically in your private library",
  ],
  license: {
    name: "Single-User Lifetime Bundle License",
    terms:
      "Grants personal, non-commercial, perpetual access to read, study, and utilize both the digital book and the verified hiring directory across authorized devices. Public redistribution, unauthorized copying, or commercial reselling is strictly prohibited.",
  },
  faq: [
    {
      question: "Is the Verified Directory really included free with this book?",
      answer:
        "Yes! When you purchase this bundle for ₹199, you get instant lifetime access to BOTH The Job Search Book (30 chapters) AND the complete verified directory of 144+ companies that hire without whiteboards (a ₹99 standalone value) in your personal library. No subscriptions or separate checkouts required.",
    },
    {
      question: "Can I buy just the book without the directory?",
      answer:
        "The book is exclusively offered as part of this complete bundle. We include the directory for free at no extra charge so that you have both the strategy (the 30-chapter playbook) and the actionable target list (144+ verified companies) needed to get hired.",
    },
    {
      question: "Who is this bundle engineered for?",
      answer:
        "This bundle is built for junior-to-mid software engineers, final-year tech students, bootcamp graduates, and developers struggling to get interview calls despite writing good code. It demystifies the actual recruitment machinery behind modern tech hiring.",
    },
    {
      question: "How do I access both products after purchasing?",
      answer:
        "Instant digital reader access is unlocked for both products in your personal SoWeBuild Store library (/library). You can open either the 30-chapter interactive book or the searchable hiring directory anytime on desktop, tablet, or mobile.",
    },
    {
      question: "Can I preview the book before buying?",
      answer:
        "Yes! Chapter 0 ('The Reality of Modern Tech Hiring') is completely free to read in the interactive preview drawer before purchasing.",
    },
  ],
};
