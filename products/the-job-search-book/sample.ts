import { StructuredBookContent } from "@/lib/products/types";

/**
 * THE JOB SEARCH BOOK - PUBLIC PREVIEW SAMPLE
 * 
 * NOTE: For digital rights management (DRM) and anti-piracy protection,
 * full chapter body blocks for Chapters 1-29 are NOT stored in this repository.
 * Content blocks are securely stored in Supabase Postgres and delivered on-demand
 * only to verified purchasers with active cryptographic entitlements.
 * 
 * Chapter 0 is provided as a free public preview.
 */
export const sampleContent: StructuredBookContent = {
  "title": "THE JOB SEARCH BOOK",
  "author": "Om Thakur",
  "version": "1.0.0",
  "chapters": [
    {
      "id": "chapter-0",
      "title": "The Reality of Modern Tech Hiring",
      "description": "Why writing code and getting hired to write code are two distinct skill sets",
      "readingTime": "7 min read",
      "isFreePreview": true,
      "sections": [
        {
          "type": "lead-paragraph",
          "dropCap": "L",
          "leadText": "et us begin with a truth that most career advice deliberately ignores: you can be an exceptional engineer, build complex full-stack applications, understand data structures, and still struggle for months to get an interview callback.",
          "text": "Writing clean code and navigating the hiring market are two entirely distinct skill sets. The developer who gets the job is rarely the person who is mathematically the best programmer in the city. The developer who gets the job is the person who understands the hiring funnel, positions their experience correctly, builds undeniable proof of competence, and applies systematically."
        },
        {
          "type": "paragraph",
          "text": "When a technology company posts an open software engineering position on LinkedIn, Naukri, or their career page, they typically receive between 500 and 1,500 applications within the first 72 hours. Ninety percent of those applicants are completely unqualified or blasting identical resumes indiscriminately. To survive this volume, talent acquisition teams rely on automated parsing filters and rapid human scanning."
        },
        {
          "type": "diagram",
          "title": "THE RECRUITMENT FILTER FUNNEL",
          "text": "STAGE 1: 1,000 Resumes Submitted    ---> Automated filter by keywords, notice period & location\nSTAGE 2:    50 Resumes Shortlisted   ---> 8-second human scan by Recruiter\nSTAGE 3:    10 Phone Screenings      ---> Salary alignment, notice period & communication check\nSTAGE 4:     5 Technical Rounds      ---> Live coding, DSA & architecture deep dive\nSTAGE 5:     2 Final Rounds          ---> Engineering leadership & culture alignment\nSTAGE 6:     1 Job Offer Given       ---> Offer negotiation & onboarding"
        },
        {
          "type": "paragraph",
          "text": "Most job seekers treat their search like a casino slot machine. They assemble one generic resume, click \"Easy Apply\" 300 times without tracking a single metric, and wonder why their inbox remains silent. When you treat the job search as random chance, you experience immense anxiety. When you treat it as an engineered pipeline, every rejection becomes diagnostic telemetry that tells you exactly which stage of your funnel needs optimization."
        },
        {
          "type": "do-dont",
          "dontTitle": "THE LOTTERY MINDSET",
          "dontText": "Blasting 500 identical resumes with no role specialization, ignoring recruiter keywords, and hoping sheer volume produces a job.",
          "doTitle": "THE SYSTEMATIC PIPELINE",
          "doText": "Building targeted proof of competence, optimizing key search portals like Naukri and LinkedIn, securing internal referrals, and measuring conversion at every stage."
        },
        {
          "type": "quote-card",
          "quote": "Your goal is not to apply everywhere. Your goal is to become an obvious candidate somewhere.",
          "author": "The Job Search Book"
        },
        {
          "type": "heading",
          "title": "The Core Promise of This Playbook"
        },
        {
          "type": "paragraph",
          "text": "This book does not make fake promises of effortless 50 LPA salaries or overnight miracles. What it gives you is a practical, repeatable, and transparent playbook. You will learn exactly how recruiters scan resumes in under 8 seconds, how to make your GitHub repositories speak for you, how to dominate search algorithms on portals like Naukri, and how to negotiate your compensation with confidence."
        },
        {
          "type": "checklist",
          "title": "FOUNDATIONAL RULES BEFORE YOU PROCEED",
          "items": [
            "Never pay anyone who promises a guaranteed tech job.",
            "Never lie about technical skills or past experience on your resume.",
            "Do not use identical resumes for completely different types of roles.",
            "Treat your job search metrics as engineering telemetry: track what works and fix what fails."
          ]
        }
      ]
    },
    {
      "id": "chapter-1",
      "title": "How the Modern Tech Job Search Works",
      "description": "Understanding the incentives and fears of recruiters, tech leads, and hiring managers",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-2",
      "title": "Choosing the Right Tech Role",
      "description": "Why extreme specialization beats the generic full-stack trap",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-3",
      "title": "Finding Your Target Job Titles",
      "description": "Decoding industry job titles to unlock hidden opportunities across job portals",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-4",
      "title": "Building a Strong Tech Resume",
      "description": "Structuring a high-converting one-page resume with Rxresu.me",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-5",
      "title": "Making Your Resume ATS-Friendly",
      "description": "Demystifying Applicant Tracking Systems and eliminating parsing errors",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-6",
      "title": "Writing Better Project Descriptions",
      "description": "Using the Action-Context-Result (ACR) formula to prove real engineering value",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-7",
      "title": "Building Strong Developer Projects",
      "description": "Moving past basic tutorial clones to build software that impresses tech leads",
      "readingTime": "11 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-8",
      "title": "GitHub Optimization",
      "description": "Turning your GitHub profile into concrete proof of engineering competence",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-9",
      "title": "LinkedIn Optimization for Tech Candidates",
      "description": "Transforming your profile into an inbound recruiter magnet",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-10",
      "title": "Naukri Optimization: Dominating India's Premier Tech Portal",
      "description": "How to rank at the top of recruiter searches on Naukri Resdex",
      "readingTime": "12 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-11",
      "title": "Real Example: What I Paid for Naukri FastForward",
      "description": "A complete transparent breakdown of a real purchase invoice from Info Edge (India) Ltd.",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-12",
      "title": "Finding Jobs Beyond One Job Board",
      "description": "Building a multi-channel discovery pipeline to find unlisted and startup openings",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-13",
      "title": "Remote Work Mastery",
      "description": "Navigating global remote opportunities, timezone overlap, and tax structures",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-14",
      "title": "Four-Day Workweeks and Modern Work Styles",
      "description": "Exploring alternative workweek models and asynchronous high-output teams",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-15",
      "title": "Targeted Applications: The Sniper Approach",
      "description": "How 5 highly tailored applications can outperform 100 mass submissions",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-16",
      "title": "Speed Up Applications With Automation",
      "description": "Using automation responsibly to eliminate repetitive form filling without spamming",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-17",
      "title": "Recruiter Outreach That Actually Gets Responses",
      "description": "Concise, high-converting cold message templates for LinkedIn and email",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-18",
      "title": "Referral Strategy: Getting Engineers to Recommend You",
      "description": "The 4-step framework to secure employee referrals without awkwardness",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-19",
      "title": "Genuine Tech Networking Without Being Awkward",
      "description": "Building authentic relationships with developers and tech leads",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-20",
      "title": "The Art of Professional Follow-Ups",
      "description": "How and when to follow up on applications and interviews to stay top of mind",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-21",
      "title": "Technical Interview Preparation",
      "description": "Mastering coding rounds, core language fundamentals, and live problem solving",
      "readingTime": "12 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-22",
      "title": "Behavioral Interviews: The Engineering STAR Method",
      "description": "Structuring compelling answers for leadership, conflict, and ownership questions",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-23",
      "title": "Project Explanation: Explaining Your Code Under Pressure",
      "description": "The 90-second project pitch formula that hooks senior engineering interviewers",
      "readingTime": "9 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-24",
      "title": "Salary Discussions and Offer Negotiation",
      "description": "Scripts and strategies for negotiating total compensation in the Indian tech market",
      "readingTime": "11 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-25",
      "title": "Handling Rejection and Maintaining Momentum",
      "description": "Turning rejections into diagnostic data and future hiring pipeline",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-26",
      "title": "Diagnosing Why Applications Are Failing",
      "description": "A systematic diagnostic framework to pinpoint your exact funnel bottleneck",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-27",
      "title": "The 30-Day Job Search Action Plan",
      "description": "A day-by-day execution calendar from foundation building to offer negotiation",
      "readingTime": "12 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-28",
      "title": "Master Job Application Tracker",
      "description": "The 13-column metrics spreadsheet schema to measure and optimize your pipeline",
      "readingTime": "8 min read",
      "isFreePreview": false,
      "sections": []
    },
    {
      "id": "chapter-29",
      "title": "The Complete Copy-Paste Toolkit & Final Checklist",
      "description": "Mandatory resource directory, copy-paste templates, and final action launchpad",
      "readingTime": "10 min read",
      "isFreePreview": false,
      "sections": []
    }
  ]
};
