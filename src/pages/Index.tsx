import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Users, TrendingUp, Clock, CheckCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            AI-Powered Career Assessment
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Discover Your Perfect Career Path in Employment Law
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Take our comprehensive, scientifically-backed assessment to determine if you have what it takes to succeed as an Employment Law Advisor. Get personalized insights, career recommendations, and a clear roadmap for your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={handleStartAssessment}
              variant="hero" 
              size="lg"
              className="text-lg px-8 py-6 h-auto flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>20-30 minutes • Free • No registration required</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-warning" />
              <span>Scientifically validated</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Used by career counselors</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>10,000+ assessments completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Our Assessment Works</h2>
            <p className="text-muted-foreground text-lg">
              Built on proven psychological frameworks and industry expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Psychometric Analysis</CardTitle>
                <CardDescription>
                  Based on the Big Five personality model and Holland Career Codes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Personality trait assessment</li>
                  <li>• Cognitive style evaluation</li>
                  <li>• Motivation and interest analysis</li>
                  <li>• Ethical decision-making patterns</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Technical Readiness</CardTitle>
                <CardDescription>
                  Employment law knowledge and practical application skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Legal reasoning assessment</li>
                  <li>• Case analysis scenarios</li>
                  <li>• Workplace law fundamentals</li>
                  <li>• Compliance understanding</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>WISCAR Framework</CardTitle>
                <CardDescription>
                  Comprehensive career readiness evaluation across six dimensions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Will (commitment & drive)</li>
                  <li>• Interest (genuine curiosity)</li>
                  <li>• Skill (current capabilities)</li>
                  <li>• Cognitive readiness</li>
                  <li>• Ability to learn</li>
                  <li>• Real-world alignment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-primary border-0 shadow-elevated text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Ready to Discover Your Career Potential?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Join thousands who have found clarity about their career path through our assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <Button 
                onClick={handleStartAssessment}
                variant="secondary" 
                size="lg"
                className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-white/90"
              >
                Begin Your Assessment Journey
              </Button>
              <p className="text-white/80 text-sm mt-4">
                Your results will be available immediately upon completion
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
