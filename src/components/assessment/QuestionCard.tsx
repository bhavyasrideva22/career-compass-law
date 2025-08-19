import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  sectionName: string;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canGoBack?: boolean;
}

export const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  sectionName,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack = false,
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    if (question.type === 'likert') {
      onAnswer(parseInt(value));
    } else if (question.type === 'multiple-choice') {
      onAnswer(value);
    } else if (question.type === 'situational-judgment' && question.scenarios) {
      onAnswer(value);
    }
  };

  const handleNext = () => {
    if (selectedValue) {
      onNext();
      setSelectedValue(''); // Reset for next question
    }
  };

  const renderLikertScale = () => {
    if (!question.likertScale) return null;

    const { min, max, minLabel, maxLabel } = question.likertScale;
    const options = [];
    
    for (let i = min; i <= max; i++) {
      options.push(
        <div key={i} className="flex items-center space-x-2">
          <RadioGroupItem value={i.toString()} id={`option-${i}`} />
          <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{i}</span>
              {i === min && <span className="text-xs text-muted-foreground">{minLabel}</span>}
              {i === max && <span className="text-xs text-muted-foreground">{maxLabel}</span>}
            </div>
          </Label>
        </div>
      );
    }

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-3">
        {options}
      </RadioGroup>
    );
  };

  const renderMultipleChoice = () => {
    if (!question.options) return null;

    return (
      <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-3">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  };

  const renderSituationalJudgment = () => {
    if (!question.scenarios) return null;

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium text-muted-foreground mb-2">Situation:</p>
          <p className="text-sm">{question.scenarios.situation}</p>
        </div>
        
        <RadioGroup value={selectedValue} onValueChange={handleAnswer} className="space-y-3">
          {question.scenarios.options.map((option) => (
            <div key={option.id} className="flex items-start space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem value={option.id} id={`option-${option.id}`} className="mt-1" />
              <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'likert':
        return renderLikertScale();
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'situational-judgment':
        return renderSituationalJudgment();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-sm">
              {sectionName} Section
            </Badge>
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            {question.description && (
              <CardDescription className="text-base">
                {question.description}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderQuestionContent()}
            
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!canGoBack}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!selectedValue}
                variant="professional"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};