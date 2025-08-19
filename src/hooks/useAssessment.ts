import { useState, useCallback } from 'react';
import { AssessmentState, AssessmentResponse, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';
import { calculateAssessmentResults } from '@/utils/assessmentScoring';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
  startTime: new Date(),
  sectionProgress: {
    psychometric: 0,
    technical: 0,
    wiscar: 0,
  },
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const startAssessment = useCallback(() => {
    setState({
      ...initialState,
      currentSection: 'psychometric',
      startTime: new Date(),
    });
  }, []);

  const addResponse = useCallback((response: Omit<AssessmentResponse, 'timestamp'>) => {
    const newResponse: AssessmentResponse = {
      ...response,
      timestamp: new Date(),
    };

    setState(prevState => ({
      ...prevState,
      responses: [...prevState.responses, newResponse],
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prevState => {
      const currentSectionQuestions = getCurrentSectionQuestions(prevState.currentSection);
      const isLastQuestion = prevState.currentQuestionIndex >= currentSectionQuestions.length - 1;

      if (isLastQuestion) {
        // Move to next section
        const nextSection = getNextSection(prevState.currentSection);
        return {
          ...prevState,
          currentSection: nextSection,
          currentQuestionIndex: 0,
          sectionProgress: {
            ...prevState.sectionProgress,
            [prevState.currentSection]: 100,
          },
        };
      } else {
        // Move to next question in current section
        const progress = ((prevState.currentQuestionIndex + 1) / currentSectionQuestions.length) * 100;
        return {
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          sectionProgress: {
            ...prevState.sectionProgress,
            [prevState.currentSection]: Math.round(progress),
          },
        };
      }
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prevState => {
      if (prevState.currentQuestionIndex > 0) {
        const currentSectionQuestions = getCurrentSectionQuestions(prevState.currentSection);
        const progress = ((prevState.currentQuestionIndex - 1) / currentSectionQuestions.length) * 100;
        return {
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
          sectionProgress: {
            ...prevState.sectionProgress,
            [prevState.currentSection]: Math.round(progress),
          },
        };
      }
      return prevState;
    });
  }, []);

  const goToResults = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      currentSection: 'results',
      sectionProgress: {
        psychometric: 100,
        technical: 100,
        wiscar: 100,
      },
    }));
  }, []);

  const resetAssessment = useCallback(() => {
    setState(initialState);
  }, []);

  const getCurrentQuestion = useCallback(() => {
    const currentSectionQuestions = getCurrentSectionQuestions(state.currentSection);
    return currentSectionQuestions[state.currentQuestionIndex];
  }, [state.currentSection, state.currentQuestionIndex]);

  const getResults = useCallback((): AssessmentResults | null => {
    if (state.responses.length === 0) return null;
    return calculateAssessmentResults(state.responses);
  }, [state.responses]);

  const getTotalProgress = useCallback(() => {
    const { psychometric, technical, wiscar } = state.sectionProgress;
    return Math.round((psychometric + technical + wiscar) / 3);
  }, [state.sectionProgress]);

  return {
    state,
    startAssessment,
    addResponse,
    nextQuestion,
    previousQuestion,
    goToResults,
    resetAssessment,
    getCurrentQuestion,
    getResults,
    getTotalProgress,
  };
};

// Helper functions
const getCurrentSectionQuestions = (section: string) => {
  switch (section) {
    case 'psychometric':
      return assessmentQuestions.filter(q => q.category === 'psychometric');
    case 'technical':
      return assessmentQuestions.filter(q => q.category === 'technical');
    case 'wiscar':
      return assessmentQuestions.filter(q => q.category === 'wiscar');
    default:
      return [];
  }
};

const getNextSection = (currentSection: string) => {
  switch (currentSection) {
    case 'intro':
      return 'psychometric';
    case 'psychometric':
      return 'technical';
    case 'technical':
      return 'wiscar';
    case 'wiscar':
      return 'results';
    default:
      return 'results';
  }
};