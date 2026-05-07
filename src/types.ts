
import React from 'react';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
}

export type JobStatus = 'Applied' | 'Interviewing' | 'Offer' | 'Rejected' | 'Pending';

export interface JobApplication {
  id: string;
  companyName: string;
  jobTitle: string;
  dateApplied: string;
  status: JobStatus;
}

export interface SectionBreakdown {
  score: number;
  label: string;
  findings: string[];
  recommendation: string;
}

export interface ATSAnalysis {
  overallScore: number;
  lostEarnings: number;
  pillars: {
    impact: number;
    brevity: number;
    style: number;
    keywords: number;
  };
  sections: {
    header: SectionBreakdown;
    summary: SectionBreakdown;
    experience: SectionBreakdown;
    education: SectionBreakdown;
  };
  redFlags: string[];
  missingKeywords: string[];
  summary: string;
  documentType: 'Resume' | 'CV' | 'Cover Letter' | 'Other';
  verificationHash: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  salaryIncrease?: string;
}

export interface ServicePillar {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

export interface Comment {
  user: string;
  text: string;
  date: string;
}

export interface BlogSection {
  heading?: string;
  text: string;
  imagePrompt?: string; // For nano-banana simulation
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Educational' | 'Motivational' | 'Insightful' | 'Informational';
  date: string;
  author: string;
  image: string;
  excerpt: string;
  sections: BlogSection[];
  comments: Comment[];
}
