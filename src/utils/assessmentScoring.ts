import { AssessmentResponse, WISCARScores, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateWISCARScores = (responses: AssessmentResponse[]): WISCARScores => {
  const wiscarCategories = {
    will: ['wiscar_will_1'],
    interest: ['wiscar_interest_1'],
    skill: ['wiscar_skill_1'],
    cognitive_readiness: ['wiscar_cognitive_1'],
    ability_to_learn: ['wiscar_learn_1'],
    real_world_alignment: ['wiscar_real_world_1']
  };

  const scores: WISCARScores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive_readiness: 0,
    ability_to_learn: 0,
    real_world_alignment: 0
  };

  Object.entries(wiscarCategories).forEach(([category, questionIds]) => {
    const categoryResponses = responses.filter(r => questionIds.includes(r.questionId));
    if (categoryResponses.length > 0) {
      const averageScore = categoryResponses.reduce((sum, response) => {
        return sum + (typeof response.value === 'number' ? response.value : 0);
      }, 0) / categoryResponses.length;
      
      scores[category as keyof WISCARScores] = Math.round((averageScore / 5) * 100);
    }
  });

  return scores;
};

export const calculatePsychometricFit = (responses: AssessmentResponse[]): number => {
  const psychometricResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'psychometric';
  });

  if (psychometricResponses.length === 0) return 0;

  const totalScore = psychometricResponses.reduce((sum, response) => {
    return sum + (typeof response.value === 'number' ? response.value : 0);
  }, 0);

  const maxPossibleScore = psychometricResponses.length * 5;
  return Math.round((totalScore / maxPossibleScore) * 100);
};

export const calculateTechnicalReadiness = (responses: AssessmentResponse[]): number => {
  const technicalResponses = responses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.category === 'technical';
  });

  if (technicalResponses.length === 0) return 0;

  let totalScore = 0;
  let maxScore = 0;

  technicalResponses.forEach(response => {
    const question = assessmentQuestions.find(q => q.id === response.questionId);
    if (question) {
      if (question.type === 'multiple-choice') {
        // Simplified scoring for multiple choice - assume correct answers are worth 5 points
        const correctAnswers = ['Employment standards legislation', 'Document the complaint and ensure confidentiality'];
        const isCorrect = correctAnswers.includes(response.value as string);
        totalScore += isCorrect ? 5 : 0;
        maxScore += 5;
      } else if (question.type === 'situational-judgment' && question.scenarios) {
        const selectedOption = question.scenarios.options.find(opt => opt.id === response.value);
        totalScore += selectedOption?.score || 0;
        maxScore += 5;
      }
    }
  });

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
};

export const calculateOverallScore = (
  psychometricFit: number,
  technicalReadiness: number,
  wiscarScores: WISCARScores
): number => {
  const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
  
  // Weighted calculation: 30% psychometric, 40% technical, 30% WISCAR
  return Math.round(
    (psychometricFit * 0.3) + 
    (technicalReadiness * 0.4) + 
    (wiscarAverage * 0.3)
  );
};

export const generateRecommendation = (overallScore: number): 'Yes' | 'Maybe' | 'No' => {
  if (overallScore >= 80) return 'Yes';
  if (overallScore >= 60) return 'Maybe';
  return 'No';
};

export const generatePersonalizedInsights = (
  psychometricFit: number,
  technicalReadiness: number,
  wiscarScores: WISCARScores,
  recommendation: string
): string => {
  const insights = [];

  if (psychometricFit < 70) {
    insights.push('Consider developing stronger attention to detail and structured thinking skills.');
  }

  if (technicalReadiness < 70) {
    insights.push('Focus on improving your employment law knowledge and case analysis skills.');
  }

  const lowestWiscarArea = Object.entries(wiscarScores).reduce((lowest, [key, value]) => 
    value < lowest.value ? { key, value } : lowest,
    { key: 'will', value: 100 }
  );

  if (lowestWiscarArea.value < 70) {
    const areaMap: { [key: string]: string } = {
      will: 'commitment and motivation',
      interest: 'genuine interest in employment law',
      skill: 'communication and negotiation abilities',
      cognitive_readiness: 'analytical and problem-solving skills',
      ability_to_learn: 'openness to feedback and continuous learning',
      real_world_alignment: 'practical application of employment law concepts'
    };
    
    insights.push(`Work on strengthening your ${areaMap[lowestWiscarArea.key]}.`);
  }

  if (insights.length === 0) {
    insights.push('You demonstrate strong alignment with employment law advisory requirements.');
  }

  return insights.join(' ');
};

export const generateCareerAlignment = (overallScore: number): Array<{ role: string; match_score: number }> => {
  const baseScore = overallScore;
  
  return [
    { role: 'Employment Law Advisor', match_score: baseScore },
    { role: 'HR Compliance Specialist', match_score: Math.max(baseScore - 5, 0) },
    { role: 'Labor Relations Consultant', match_score: Math.max(baseScore - 8, 0) },
    { role: 'Employee Relations Manager', match_score: Math.max(baseScore - 10, 0) },
    { role: 'Workplace Investigator', match_score: Math.max(baseScore - 12, 0) }
  ].sort((a, b) => b.match_score - a.match_score);
};

export const calculateAssessmentResults = (responses: AssessmentResponse[]): AssessmentResults => {
  const wiscarScores = calculateWISCARScores(responses);
  const psychometricFit = calculatePsychometricFit(responses);
  const technicalReadiness = calculateTechnicalReadiness(responses);
  const overallScore = calculateOverallScore(psychometricFit, technicalReadiness, wiscarScores);
  const recommendation = generateRecommendation(overallScore);
  
  return {
    psychometric_fit: psychometricFit,
    technical_readiness: technicalReadiness,
    wiscar_scores: wiscarScores,
    overall_confidence_score: overallScore,
    recommendation,
    personalized_insights: generatePersonalizedInsights(psychometricFit, technicalReadiness, wiscarScores, recommendation),
    next_steps_yes: [
      'Enroll in employment law certification courses',
      'Gain practical experience through internships or paralegal work',
      'Join professional associations like SHRM or local bar associations',
      'Develop expertise in specific areas like workplace investigations',
      'Practice legal writing and case analysis skills'
    ],
    next_steps_no: [
      'Consider HR generalist or coordinator roles',
      'Explore paralegal positions in employment law firms',
      'Look into workplace mediation certification',
      'Consider corporate compliance roles',
      'Explore employee relations or organizational development positions'
    ],
    career_alignment: generateCareerAlignment(overallScore)
  };
};