import { ProductDefinition } from "@/lib/products/types";

export const product: ProductDefinition = {
  slug: "the-job-search-book",
  name: "The Job Search Book: The Practical Playbook for Getting a Tech Job",
  tagline:
    "The practical, zero-fluff playbook for landing modern tech jobs: ATS optimization, GitHub proof, Naukri & LinkedIn dominance, and offer negotiation.",
  description:
    "A comprehensive 30-chapter digital playbook engineered specifically for software developers, engineering students, and career switchers. Covers the entire hiring funnel end-to-end: beating ATS resume screening algorithms, building undeniable GitHub proof of competence, optimizing recruiter search profiles on LinkedIn and Naukri, securing internal referrals, mastering technical and behavioral STAR interviews, and negotiating compensation.",
  type: "ebook",
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
  originalPrice: 599, // ₹599 INR
  currency: "INR",
  categories: ["Careers", "Engineering", "Remote Work"],
  tags: [
    "Hiring",
    "Interviews",
    "Remote Work",
    "India Tech",
    "Resume Optimization",
    "Job Search",
    "Career Growth",
  ],
  previewChapterId: "chapter-0",
  features: [
    "30 structured, zero-fluff chapters spanning the entire tech hiring lifecycle",
    "The 8-second recruiter scan breakdown and ATS parsing optimization",
    "Concrete Action-Context-Result (ACR) framework for developer project bullet points",
    "Step-by-step GitHub profile and repository audit playbook that hooks tech leads",
    "Naukri Resdex algorithm dominance guide + real FastForward purchase invoice case study",
    "Sniper cold outreach scripts for recruiters and engineering leads that get replies",
    "Engineering STAR method framework for high-stakes behavioral and ownership rounds",
    "Salary negotiation playbooks, timing tactics, and scripts for the Indian tech market",
    "Includes complete 30-day daily action calendar and 13-column metrics application tracker",
    "Cryptographically watermarked digital reader access across your authorized devices",
  ],
  license: {
    name: "Single-User Lifetime eBook License",
    terms:
      "Grants personal, non-commercial, perpetual access to read and study this digital book across authorized devices. Public redistribution, unauthorized copying, or commercial reselling is strictly prohibited.",
  },
  faq: [
    {
      question: "Who is this playbook for?",
      answer:
        "This book is engineered for junior-to-mid software engineers, final-year tech students, bootcamp graduates, and developers struggling to get interview calls despite writing good code. It demystifies the actual recruitment machinery behind modern tech hiring.",
    },
    {
      question: "How is this different from generic career advice?",
      answer:
        "Zero fluff, zero vague platitudes. You get exact cold outreach email templates, resume line-by-line formulas, ATS breakdown tests, GitHub commit strategies, a real invoice analysis of Naukri FastForward, and negotiation scripts with counter-offer math.",
    },
    {
      question: "How do I read the book after purchasing?",
      answer:
        "Instant digital reader access is unlocked in your personal Om Store library. You can read comfortably on desktop, tablet, or mobile with adjustable typography, reading progress tracking, and chapter bookmarking.",
    },
    {
      question: "Can I preview the book before buying?",
      answer:
        "Yes! Chapter 0 ('The Reality of Modern Tech Hiring') is completely free to read in the interactive preview drawer before purchasing.",
    },
  ],
};
