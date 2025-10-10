export type ProposalStatus = 'draft' | 'sent' | 'approved';

export interface ProposalSection {
  id: string;
  title: string;
  body: string;
  backgroundImage?: string;
}

export interface ProposalRecord {
  id: string;
  slug: string;
  title: string;
  client: string;
  status: ProposalStatus;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
  hero?: {
    headline: string;
    subheadline?: string;
    ctaLabel?: string;
  };
  sections: ProposalSection[];
  metadata?: Record<string, string | number | boolean>;
}
