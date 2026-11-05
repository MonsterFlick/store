import { ProductDefinition } from "@/lib/products/types";

export const product: ProductDefinition = {
  slug: "the-job-search-book",
  name: "The Job Search Book: The Practical Playbook for Getting a Tech Job",
  tagline:
    "The practical engineering playbook for landing top tech roles — with verified hiring directory included free.",
  description:
    "A complete 30-chapter digital playbook covering ATS resume algorithms, proof-of-competence GitHub audits, cold sniper outreach, and salary negotiation — plus the verified directory of 144 companies hiring without whiteboard puzzles.",
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
    "30 structured chapters spanning the entire tech hiring lifecycle",
    "The 8-second recruiter scan breakdown and ATS parsing optimization",
    "Action-Context-Result (ACR) framework for developer project bullet points",
    "GitHub profile and repository audit playbook that hooks engineering leads",
    "Naukri Resdex algorithm dominance guide + real purchase case study",
    "Sniper cold outreach scripts for recruiters and engineering leads",
    "Engineering STAR framework for behavioral and ownership rounds",
    "Salary negotiation playbooks, timing tactics, and scripts",
    "Includes 30-day daily action calendar and 13-column metrics tracker",
    "Instant digital reader & directory access across desktop, tablet, and mobile",
    "Dual lifetime access: Both products unlocked automatically in your private library",
  ],
  license: {
    name: "Single-User Lifetime Bundle License",
    terms:
      "Grants personal, non-commercial, perpetual access to read, study, and utilize both the digital book and the verified hiring directory across authorized devices.",
  },
  faq: [
    {
      question: "Is the Verified Directory really included free with this book?",
      answer:
        "Yes! When you purchase this bundle for ₹199, you get instant lifetime access to BOTH The Job Search Book (30 chapters) AND the complete verified directory of 144+ companies that hire without whiteboards (a ₹99 standalone value) in your personal library.",
    },
    {
      question: "Can I buy just the book without the directory?",
      answer:
        "The book is exclusively offered as part of this complete bundle. We include the directory for free so you have both the strategy (the 30-chapter playbook) and the actionable target list (144+ verified companies).",
    },
    {
      question: "Who is this bundle engineered for?",
      answer:
        "Engineered for software engineers, tech students, and developers struggling to get interview calls despite writing good code. It demystifies the actual recruitment machinery behind modern tech hiring.",
    },
    {
      question: "How do I access both products after purchasing?",
      answer:
        "Instant digital reader access is unlocked for both products in your personal SoWeBuild Store library (/library) on desktop, tablet, or mobile.",
    },
    {
      question: "Can I preview the book before buying?",
      answer:
        "Yes! Chapter 0 ('The Reality of Modern Tech Hiring') is completely free to read in the interactive preview drawer before purchasing.",
    },
  ],
};
