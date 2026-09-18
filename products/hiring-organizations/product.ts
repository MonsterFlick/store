import { ProductDefinition } from "@/lib/products/types";

export const product: ProductDefinition = {
  slug: "hiring-organizations",
  name: "Companies That Hire Without Whiteboards: Verified Directory",
  tagline:
    "140+ top engineering organizations hiring on real-world practical skills, take-home projects, and pairing.",
  description:
    "Skip the generic LeetCode grind. This curated, verified interactive directory details 144 companies across India, worldwide remote, and global tech hubs that assess software engineers based on practical system problem-solving, take-home projects, and collaborative pair programming rather than memorized algorithmic whiteboard trivia. Includes exact interview stages, evaluation formats, verified careers links, and location eligibility.",
  type: "app",
  template: "custom",
  capabilities: {
    view: true,
    download: false,
    stream: false,
    watermark: true,
    access: "lifetime",
    device_limit: 2,
  },
  price: 99, // ₹99 INR
  originalPrice: 499, // ₹499 INR
  currency: "INR",
  categories: ["Engineering", "Careers", "Remote Work"],
  tags: [
    "Hiring",
    "Interviews",
    "Remote Work",
    "India Tech",
    "Engineering Careers",
    "Take-Home Projects",
    "Pair Programming",
  ],
  previewChapterId: "preview-companies",
  features: [
    "144 verified engineering companies hiring without algorithmic whiteboards",
    "Interactive directory with live search, category tabs, and format filters",
    "Detailed breakdown of exact interview rounds, take-homes, and pairing sessions",
    "Direct verified careers links for every cataloged organization",
    "Interactive company modals with interview notes & preparation checklists",
    "Local bookmarking to shortlist companies and track applications",
    "Cryptographically watermarked digital access on up to 2 active devices",
    "Continuous lifetime access with freshly verified hiring stages",
  ],
  license: {
    name: "Single-User Lifetime Directory License",
    terms:
      "Grants personal, non-commercial, perpetual access to search, browse, and utilize this verified hiring directory. Bulk automated scraping, public redistribution, or commercial reselling is strictly prohibited.",
  },
  faq: [
    {
      question: "What makes these companies different from typical tech employers?",
      answer:
        "Every company in this directory has replaced high-stress, algorithmic whiteboard quizzes (LeetCode/DSA puzzles) with humane, realistic assessments: take-home projects, practical codebase discussions, or real-world pair programming on day-to-day problems.",
    },
    {
      question: "Are India-based and Remote roles included?",
      answer:
        "Yes! The directory categorizes organizations into Worldwide Remote (113+), India Tech (17+), and India + Remote (14+), with filterable tags to match your preferred work style.",
    },
    {
      question: "How does access work after payment?",
      answer:
        "Once your ₹99 payment is complete, you receive instant lifetime digital access in your personal SoWeBuild Store library, complete with search, filtering, and bookmarking.",
    },
    {
      question: "Is this a static PDF or an interactive app?",
      answer:
        "This is an interactive web application built specifically for this directory. You can search in real time, filter by hiring format, click into interactive company cards for deep-dive interview stages, and save bookmarks.",
    },
  ],
};
