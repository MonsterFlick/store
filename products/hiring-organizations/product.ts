import { ProductDefinition } from "@/lib/products/types";

export const product: ProductDefinition = {
  slug: "hiring-organizations",
  name: "Companies That Hire Without Whiteboards: Verified Directory",
  tagline:
    "144 top engineering organizations hiring on real-world practical skills, take-home projects, and pairing.",
  description:
    "Skip the generic LeetCode grind. An interactive directory of 144 verified companies across India and remote hiring on real-world engineering skills, pairing sessions, and take-home problems.",
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
    "Instant digital directory access with live search and personal bookmarks",
    "Continuous lifetime access with freshly verified hiring stages",
  ],
  license: {
    name: "Single-User Lifetime Directory License",
    terms:
      "Grants personal, non-commercial, perpetual access to search, browse, and utilize this verified hiring directory.",
  },
  faq: [
    {
      question: "What makes these companies different from typical tech employers?",
      answer:
        "Every company in this directory has replaced high-stress whiteboard quizzes (LeetCode/DSA puzzles) with humane, realistic assessments: take-home projects, codebase discussions, or collaborative pair programming.",
    },
    {
      question: "Are India-based and Remote roles included?",
      answer:
        "Yes! The directory categorizes organizations into Worldwide Remote (113+), India Tech (17+), and India + Remote (14+), with filterable tags.",
    },
    {
      question: "How does access work after payment?",
      answer:
        "Once your payment is complete, you receive instant lifetime digital access in your personal SoWeBuild Store library, complete with search, filtering, and bookmarking.",
    },
    {
      question: "Is this a static PDF or an interactive app?",
      answer:
        "This is an interactive web application built specifically for this directory. You can search in real time, filter by hiring format, click into company cards, and save bookmarks.",
    },
  ],
};
