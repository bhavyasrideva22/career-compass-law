import { useAssessment } from '@/hooks/useAssessment';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { AssessmentResultsComponent } from './AssessmentResults';
import { getQuestionsByCategory } from '@/data/questions';

export const AssessmentFlow = () => {
  const {
    state,
    startAssessment,
    addResponse,
    nextQuestion,
    previousQuestion,
    resetAssessment,
    getCurrentQuestion,
    getResults,
  } = useAssessment();

  const handleStartAssessment = () => {
    startAssessment();
  };

  const handleAnswer = (value: number | string) => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      addResponse({
        questionId: currentQuestion.id,
        value,
      });
    }
  };

  const handleNext = () => {
    nextQuestion();
  };

  const handlePrevious = () => {
    previousQuestion();
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  const getSectionName = (section: string) => {
    switch (section) {
      case 'psychometric':
        return 'Psychometric';
      case 'technical':
        return 'Technical';
      case 'wiscar':
        return 'WISCAR';
      default:
        return 'Assessment';
    }
  };

  const getCurrentSectionQuestions = () => {
    return getQuestionsByCategory(state.currentSection);
  };

  // Render intro
  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStart={handleStartAssessment} />;
  }

  // Render results
  if (state.currentSection === 'results') {
    const results = getResults();
    if (!results) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No Results Available</h2>
            <p className="text-muted-foreground mb-6">Please complete the assessment first.</p>
            <button 
              onClick={resetAssessment}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md"
            >
              Start Assessment
            </button>
          </div>
        </div>
      );
    }

    return (
      <AssessmentResultsComponent
        results={results}
        onRestart={resetAssessment}
        onReturnHome={handleReturnHome}
      />
    );
  }

  // Render questions
  const currentQuestion = getCurrentQuestion();
  const sectionQuestions = getCurrentSectionQuestions();
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Assessment Error</h2>
          <p className="text-muted-foreground mb-6">Unable to load the current question.</p>
          <button 
            onClick={resetAssessment}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md"
          >
            Restart Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={state.currentQuestionIndex + 1}
      totalQuestions={sectionQuestions.length}
      sectionName={getSectionName(state.currentSection)}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={state.currentQuestionIndex > 0}
    />
  );
};