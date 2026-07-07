export interface Certification {
  id: string;
  name: string;
  category: string;
  issuing_org: string;
  exam_fee: number;
  prep_weeks: number;
  pass_rate: number;
  difficulty: number; // 1~5
  target_job: string[];
  description: string | null;
  verified: boolean;
  created_at?: string;
}

export interface CommunityPost {
  id: string;
  cert_id: string | null;
  author_name: string;
  title: string;
  content: string;
  post_type: "general" | "study_group" | "question";
  created_at?: string;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at?: string;
}

export interface QuizQuestion {
  id: string;
  cert_id: string;
  question: string;
  choices: string[];
  answer_index: number;
  explanation: string | null;
  year: number | null;
  created_at?: string;
}
