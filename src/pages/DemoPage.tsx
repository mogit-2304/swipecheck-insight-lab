
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import TestResultsChart from "@/components/dashboard/TestResultsChart";

// Sample cards for the demo
const demoCards = [
  {
    id: "card1",
    title: "New Dashboard Layout",
    description: "A redesigned dashboard with improved data visualization and user workflow.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Dashboard+Concept",
    category: "UI Design"
  },
  {
    id: "card2",
    title: "Mobile Navigation",
    description: "Updated mobile navigation with bottom tabs for easier one-handed use.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Mobile+Navigation",
    category: "UX"
  },
  {
    id: "card3",
    title: "New Feature: Dark Mode",
    description: "Implementing a system-wide dark mode to reduce eye strain at night.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Dark+Mode+Feature",
    category: "Feature"
  },
  {
    id: "card4",
    title: "Onboarding Flow",
    description: "Simplified onboarding process to get users to the core experience faster.",
    image: "https://placehold.co/600x400/e2e8f0/475569?text=Onboarding+Flow",
    category: "User Experience"
  }
];

const DemoPage = () => {
  const { user } = useAuth();
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Record<string, { direction: "left" | "right", feedback?: string }>>({});
  
  const handleComplete = (swipeResults: Record<string, { direction: "left" | "right", feedback?: string }>) => {
    setResults(swipeResults);
    setShowResults(true);
  };
  
  // Process results for the chart
  const chartData = demoCards.map(card => {
    const result = results[card.id];
    return {
      name: card.title.split(':')[0],
      likes: result?.direction === "right" ? 1 : 0,
      dislikes: result?.direction === "left" ? 1 : 0
    };
  });

  const participantName = user ? (user.isAnonymous ? "Anonymous User" : user.name) : "Guest";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Product Concept Validation</h1>
          <p className="text-muted-foreground">
            Welcome, {participantName}! Please provide your feedback on these product ideas.
          </p>
        </div>
        
        <Card className="mb-8 border shadow-md">
          <CardHeader>
            <CardTitle>Swipe to Validate</CardTitle>
            <CardDescription>
              Swipe right if you like the concept, left if you don't. You can also use the buttons below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showResults ? (
              <SwipeDeck cards={demoCards} onComplete={handleComplete} />
            ) : (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Your Feedback Results</h3>
                <TestResultsChart data={chartData} />
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                  <Button onClick={() => setShowResults(false)}>
                    Try Again
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {!user && (
          <div className="text-center">
            <p className="mb-4">Ready to create your own validation projects?</p>
            <Button size="lg" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoPage;
