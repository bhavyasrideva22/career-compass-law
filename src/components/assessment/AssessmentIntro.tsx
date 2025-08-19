import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, CheckCircle, TrendingUp } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            Career Assessment
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Should I Learn to Become an Employment Law Advisor?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if you have the right personality, skills, and motivation for a successful career in employment law advisory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                What is Employment Law Advisory?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Employment Law Advisors provide expert guidance on labor regulations, employee rights, contracts, workplace disputes, and compliance with government labor policies.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Typical Career Paths:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Employment Law Advisor</li>
                  <li>• Labor Relations Consultant</li>
                  <li>• HR Compliance Specialist</li>
                  <li>• Legal Counsel (Employment Focus)</li>
                  <li>• Employee Relations Manager</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Skills That Lead to Success
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Strong analytical & legal reasoning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Detail orientation & ethical integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Clear communication & negotiation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Problem-solving & conflict resolution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm">Comfort with legal frameworks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-card border-0 shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              This comprehensive assessment evaluates your fit across multiple dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Psychometric Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Personality traits, motivation, and cognitive style assessment
                </p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Technical Readiness</h3>
                <p className="text-sm text-muted-foreground">
                  Employment law knowledge and practical application skills
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <h3 className="font-semibold mb-2">WISCAR Framework</h3>
                <p className="text-sm text-muted-foreground">
                  Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-8 p-4 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Estimated completion time: <strong>20-30 minutes</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={onStart} 
            variant="hero" 
            size="lg"
            className="text-lg px-12 py-6 h-auto"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            All responses are confidential and used only for your personalized career guidance
          </p>
        </div>
      </div>
    </div>
  );
};