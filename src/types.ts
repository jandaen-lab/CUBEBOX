export type ApplicationStatus = '신규' | '상담중' | '계약진행' | '완료';

export interface CounselApplication {
  id?: string;
  createdAt: number; // timestamp
  dateString: string; // e.g., 2026.06.18
  name: string;
  phone: string;
  region: string;
  timing: string;
  investment: string;
  content: string;
  agreePrivacy: boolean;
  status: ApplicationStatus;
  preferredDateTime?: string; // e.g., "2026-06-20 14:00"
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
}
