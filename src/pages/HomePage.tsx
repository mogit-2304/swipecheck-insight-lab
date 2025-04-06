
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, User } from "lucide-react";

const HomePage = () => {
  const { user, toggleAnonymous, isAuthenticated } = useAuth();

  // If the user is authenticated, show them the instruction screen
  if (isAuthenticated && user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to SwipeCheck, {user.isAnonymous ? "Anonymous User" : user.name}!</CardTitle>
              <CardDescription>
                Help validate product ideas by providing your feedback through our simple swiping interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Participate as:</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={user.isAnonymous ? "text-muted-foreground" : "font-medium"}>
                    {user.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="anonymous-mode" 
                      checked={user.isAnonymous}
                      onCheckedChange={toggleAnonymous}
                    />
                    <Label htmlFor="anonymous-mode" className={!user.isAnonymous ? "text-muted-foreground" : "font-medium"}>
                      Anonymous
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">How it works:</h3>
                <ol className="space-y-3 list-decimal pl-5">
                  <li>You'll be presented with product concept cards, one at a time.</li>
                  <li>Swipe right if you like the concept, left if you don't.</li>
                  <li>For rejected ideas, you'll be asked to provide brief feedback.</li>
                  <li>After reviewing all cards, you'll see a summary of your feedback.</li>
                </ol>
              </div>

              <div className="pt-4 flex justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/demo">
                    <ThumbsUp className="h-5 w-5" />
                    Start Swiping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If not authenticated, show the regular marketing homepage
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
