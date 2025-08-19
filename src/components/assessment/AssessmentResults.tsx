import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { CheckCircle, AlertCircle, XCircle, TrendingUp, BookOpen, Users, RefreshCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
  onReturnHome: () => void;
}

export const AssessmentResultsComponent = ({ results, onRestart, onReturnHome }: AssessmentResultsProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'Maybe':
        return <AlertCircle className="h-6 w-6 text-warning" />;
      case 'No':
        return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'bg-success/10 border-success/20';
      case 'Maybe':
        return 'bg-warning/10 border-warning/20';
      case 'No':
        return 'bg-destructive/10 border-destructive/20';
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'Yes':
        return {
          title: 'Strong Fit for Employment Law Advisory',
          description: 'You demonstrate excellent alignment with the requirements and characteristics needed for success in this field.'
        };
      case 'Maybe':
        return {
          title: 'Moderate Fit with Development Opportunities',
          description: 'You show good potential but would benefit from developing certain skills and knowledge areas.'
        };
      case 'No':
        return {
          title: 'Consider Alternative Career Paths',
          description: 'Your profile suggests other career options might be a better fit for your strengths and interests.'
        };
    }
  };

  const wiscarData = [
    { name: 'Will', value: results.wiscar_scores.will, description: 'Motivation & commitment' },
    { name: 'Interest', value: results.wiscar_scores.interest, description: 'Curiosity & engagement' },
    { name: 'Skill', value: results.wiscar_scores.skill, description: 'Current capabilities' },
    { name: 'Cognitive Readiness', value: results.wiscar_scores.cognitive_readiness, description: 'Problem-solving ability' },
    { name: 'Ability to Learn', value: results.wiscar_scores.ability_to_learn, description: 'Growth mindset' },
    { name: 'Real-world Alignment', value: results.wiscar_scores.real_world_alignment, description: 'Practical fit' }
  ];

  const recommendationInfo = getRecommendationText();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Your Employment Law Advisor Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your career fit and development opportunities
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`mb-8 border-2 ${getRecommendationColor()}`}>
          <CardHeader>
            <div className="flex items-center gap-3">
              {getRecommendationIcon()}
              <div>
                <CardTitle className="text-xl">{recommendationInfo.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {recommendationInfo.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {results.overall_confidence_score}%
                </div>
                <div className="text-sm text-muted-foreground">Overall Confidence</div>
              </div>
              <div className="flex-1">
                <Progress value={results.overall_confidence_score} className="h-3" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Core Scores */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Core Assessment Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className="text-sm font-bold">{results.psychometric_fit}%</span>
                </div>
                <Progress value={results.psychometric_fit} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Personality traits and cognitive style alignment
                </p>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="text-sm font-bold">{results.technical_readiness}%</span>
                </div>
                <Progress value={results.technical_readiness} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Employment law knowledge and application skills
                </p>
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Framework */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                WISCAR Framework Analysis
              </CardTitle>
              <CardDescription>
                Detailed breakdown of your career readiness across six dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {wiscarData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium text-sm">{item.name}</span>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="text-sm font-bold">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Insights and Recommendations */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              Personalized Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="text-sm leading-relaxed">{results.personalized_insights}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-success">
                  {results.recommendation === 'Yes' ? 'Next Steps to Excel' : 'If You Choose This Path'}
                </h4>
                <ul className="space-y-2">
                  {results.next_steps_yes.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-primary">Alternative Career Paths</h4>
                <ul className="space-y-2">
                  {results.next_steps_no.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Alignment */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Career Role Alignment</CardTitle>
            <CardDescription>
              How well you match with related career opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.career_alignment.map((career, index) => (
                <div key={career.role} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{career.role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={career.match_score} className="w-24 h-2" />
                    <span className="text-sm font-medium w-12">{career.match_score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onRestart} 
            variant="outline" 
            size="lg"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retake Assessment
          </Button>
          <Button 
            onClick={onReturnHome} 
            variant="hero" 
            size="lg"
          >
            Explore More Careers
          </Button>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Want to discuss these results? Consider scheduling a career counseling session.</p>
        </div>
      </div>
    </div>
  );
};