export interface HiringCompany {
  id: string;
  name: string;
  url: string;
  location: string;
  interviewProcess: string;
  interviewType: string;
  isIndia: boolean;
  isRemote: boolean;
  category: "Worldwide Remote" | "India Tech" | "India + Remote" | string;
  isLive: boolean;
  httpStatus: number | null;
  checkNote: string;
}

export interface HiringDirectoryContent {
  title: string;
  description: string;
  version: string;
  totalCompanies: number;
  lastVerified: string;
  companies: HiringCompany[];
}
