import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'conscientiousness',
    question: 'I prefer tasks that require careful attention to detail and precision.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'openness',
    question: 'I enjoy understanding complex rules and applying them to real-life situations.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'psych_3',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'agreeableness',
    question: 'I am driven by helping others resolve disputes fairly and ethically.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'structure',
    question: 'I like working within well-defined guidelines and legal frameworks.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'psych_5',
    type: 'situational-judgment',
    category: 'psychometric',
    subCategory: 'ethics',
    question: 'You discover that your employer is not following proper termination procedures.',
    scenarios: {
      situation: 'You discover that your employer is not following proper termination procedures. How would you handle this situation?',
      options: [
        {
          id: 'a',
          text: 'Immediately report the issue to regulatory authorities',
          score: 3
        },
        {
          id: 'b',
          text: 'Document the issue and discuss with your supervisor first',
          score: 5
        },
        {
          id: 'c',
          text: 'Ignore it as it\'s not your direct responsibility',
          score: 1
        },
        {
          id: 'd',
          text: 'Advise the affected employees about their rights',
          score: 4
        }
      ]
    },
    required: true
  },

  // Technical Questions
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'employment_law',
    question: 'Which law primarily governs employee termination procedures in most jurisdictions?',
    options: [
      'At-will employment doctrine',
      'Employment standards legislation',
      'Civil rights legislation',
      'Corporate governance rules'
    ],
    required: true
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'workplace_rights',
    question: 'What is the first step when handling a workplace harassment complaint?',
    options: [
      'Immediately terminate the accused employee',
      'Document the complaint and ensure confidentiality',
      'Ignore minor complaints to avoid escalation',
      'Have the complainant confront the accused directly'
    ],
    required: true
  },
  {
    id: 'tech_3',
    type: 'situational-judgment',
    category: 'technical',
    subCategory: 'case_analysis',
    question: 'An employee claims discrimination based on protected characteristics.',
    scenarios: {
      situation: 'An employee claims they were passed over for promotion due to discrimination based on protected characteristics. How would you approach this case?',
      options: [
        {
          id: 'a',
          text: 'Conduct a thorough investigation gathering all relevant evidence',
          score: 5
        },
        {
          id: 'b',
          text: 'Dismiss the claim as unfounded without investigation',
          score: 1
        },
        {
          id: 'c',
          text: 'Immediately promote the employee to avoid legal issues',
          score: 2
        },
        {
          id: 'd',
          text: 'Focus only on the employee\'s performance metrics',
          score: 3
        }
      ]
    },
    required: true
  },

  // WISCAR Framework Questions
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'will',
    question: 'I am committed to pursuing a long-term career in employment law advisory.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'interest',
    question: 'I find workplace law and employee rights genuinely fascinating.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'wiscar_skill_1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'skill',
    question: 'I have strong communication and negotiation skills.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'cognitive_readiness',
    question: 'I excel at analyzing complex problems and finding practical solutions.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'wiscar_learn_1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'ability_to_learn',
    question: 'I actively seek feedback and continuously work to improve my skills.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    },
    required: true
  },
  {
    id: 'wiscar_real_world_1',
    type: 'situational-judgment',
    category: 'wiscar',
    subCategory: 'real_world_alignment',
    question: 'Managing conflicting priorities in employment law advisory.',
    scenarios: {
      situation: 'You have multiple urgent cases: a harassment complaint, a contract dispute, and a compliance audit. How do you prioritize?',
      options: [
        {
          id: 'a',
          text: 'Address the harassment complaint first due to potential harm',
          score: 5
        },
        {
          id: 'b',
          text: 'Handle the contract dispute as it has financial implications',
          score: 3
        },
        {
          id: 'c',
          text: 'Focus on the compliance audit as it affects the whole organization',
          score: 4
        },
        {
          id: 'd',
          text: 'Work on whichever case has the earliest deadline',
          score: 2
        }
      ]
    },
    required: true
  }
];

export const getQuestionsByCategory = (category: string) => {
  return assessmentQuestions.filter(q => q.category === category);
};

export const getQuestionsBySubCategory = (subCategory: string) => {
  return assessmentQuestions.filter(q => q.subCategory === subCategory);
};