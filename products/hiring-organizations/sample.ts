import { StructuredBookContent } from "@/lib/products/types";
import { HiringCompany } from "./types";

export const sampleCompanies: HiringCompany[] = [
  {
    id: "basecamp",
    name: "Basecamp",
    url: "https://basecamp.com/about/jobs",
    location: "Chicago, IL / Remote",
    interviewProcess: "Practical discussion and real-world system problem-solving. No artificial algorithms, no timed leetcode tests. Focuses on pragmatic software craftsmanship and clear written communication.",
    interviewType: "Practical Discussion",
    isIndia: false,
    isRemote: true,
    category: "Worldwide Remote",
    isLive: true,
    httpStatus: 200,
    checkNote: "OK",
  },
  {
    id: "automattic",
    name: "Automattic",
    url: "https://automattic.com/work-with-us/",
    location: "Remote",
    interviewProcess: "Short take-home code test, then a part-time, fully paid project on real code before an offer is made. Evaluate how you actually write and collaborate in an asynchronous environment.",
    interviewType: "Take-Home Project",
    isIndia: false,
    isRemote: true,
    category: "Worldwide Remote",
    isLive: true,
    httpStatus: 200,
    checkNote: "OK",
  },
  {
    id: "acko",
    name: "Acko",
    url: "https://www.acko.com/careers",
    location: "Mumbai, India",
    interviewProcess: "Phone interview, followed by a small practical take-home problem. Finally a face-to-face or video pair-programming session walking through real-world architectural tradeoffs.",
    interviewType: "Take-Home Project",
    isIndia: true,
    isRemote: false,
    category: "India Tech",
    isLive: true,
    httpStatus: 200,
    checkNote: "OK",
  },
  {
    id: "airtable",
    name: "Airtable",
    url: "https://airtable.com/careers",
    location: "San Francisco, CA / Remote",
    interviewProcess: "Take-home project that resembles an actual problem Airtable solves for. On-site includes discussion of the project, UI design, discussing architectural tradeoffs, and collaborative code debugging.",
    interviewType: "Take-Home Project",
    isIndia: false,
    isRemote: true,
    category: "Worldwide Remote",
    isLive: true,
    httpStatus: 200,
    checkNote: "OK",
  },
];

export const sampleContent: StructuredBookContent = {
  title: "Companies That Hire Without Whiteboards: Sample Excerpt",
  author: "Om Store Curated Research",
  version: "1.0.0",
  chapters: [
    {
      id: "preview-companies",
      title: "Sample Preview: 4 Featured Organizations",
      description:
        "A preview of the structured hiring process intelligence provided for all 144 companies in the complete directory.",
      isFreePreview: true,
      sections: [
        {
          type: "callout",
          variant: "tip",
          title: "About this Directory",
          text: "The full directory contains 144 verified companies categorized by Worldwide Remote, India Tech, and India + Remote. Below is a sample preview of 4 organizations illustrating how their interview processes differ from conventional whiteboard interviews.",
        },
        {
          type: "heading",
          level: 3,
          text: "1. Basecamp (37signals)",
        },
        {
          type: "callout",
          variant: "info",
          title: "Location: Chicago, IL / Worldwide Remote · Practical Discussion",
          text: "Interview Process: Practical discussion and real-world system problem-solving. No artificial algorithms, no timed leetcode tests. Focuses on pragmatic software craftsmanship and clear written communication.",
        },
        {
          type: "heading",
          level: 3,
          text: "2. Automattic (WordPress.com, Tumblr)",
        },
        {
          type: "callout",
          variant: "info",
          title: "Location: Worldwide Remote · Take-Home & Paid Trial",
          text: "Interview Process: Short take-home code test, then a part-time, fully paid project on real code before an offer is made. Evaluate how you actually write and collaborate in an asynchronous environment.",
        },
        {
          type: "heading",
          level: 3,
          text: "3. Acko",
        },
        {
          type: "callout",
          variant: "info",
          title: "Location: Mumbai, India · Take-Home Project",
          text: "Interview Process: Phone interview, followed by a small practical take-home problem. Finally a face-to-face or video pair-programming session walking through real-world architectural tradeoffs.",
        },
        {
          type: "heading",
          level: 3,
          text: "4. Airtable",
        },
        {
          type: "callout",
          variant: "info",
          title: "Location: San Francisco / Remote · Take-Home Project",
          text: "Interview Process: Take-home project that resembles an actual problem Airtable solves for. On-site includes discussion of the project, UI design, discussing architectural tradeoffs, and collaborative code debugging.",
        },
        {
          type: "callout",
          variant: "important",
          title: "140 More Companies Locked",
          text: "Unlock all 144 companies, complete with interactive search, filters (India Tech, Remote, Worldwide), instant links to verified careers pages, and personalized bookmarking for just ₹99.",
        },
      ],
    },
  ],
};
