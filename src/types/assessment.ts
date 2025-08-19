export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'situational-judgment' | 'ranking';
  category: 'psychometric' | 'technical' | 'wiscar';
  subCategory?: string;
  question: string;
  description?: string;
  options?: string[];
  scenarios?: {
    situation: string;
    options: Array<{
      id: string;
      text: string;
      score: number;
    }>;
  };
  likertScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  required: boolean;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string | string[];
  timestamp: Date;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive_readiness: number;
  ability_to_learn: number;
  real_world_alignment: number;
}

export interface AssessmentResults {
  psychometric_fit: number;
  technical_readiness: number;
  wiscar_scores: WISCARScores;
  overall_confidence_score: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  personalized_insights: string;
  next_steps_yes: string[];
  next_steps_no: string[];
  career_alignment: Array<{
    role: string;
    match_score: number;
  }>;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  startTime: Date;
  sectionProgress: {
    psychometric: number;
    technical: number;
    wiscar: number;
  };
}