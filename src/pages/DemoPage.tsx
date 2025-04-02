
import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<Record<string, "left" | "right">>({});
  
  const handleComplete = (swipeResults: Record<string, "left" | "right">) => {
    setResults(swipeResults);
    setShowResults(true);
  };
  
  // Process results for the chart
  const chartData = demoCards.map(card => {
    return {
      name: card.title.split(':')[0],
      likes: results[card.id] === "right" ? 1 : 0,
      dislikes: results[card.id] === "left" ? 1 : 0
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">SwipeCheck Demo</h1>
          <p className="text-muted-foreground">
            Try out our card swiping interface to see how easy it is to collect feedback
          </p>
        </div>
        
        <Card className="mb-8 border shadow-md">
          <CardHeader>
            <CardTitle>Product Concept Validation</CardTitle>
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
                <div className="flex justify-center">
                  <Button onClick={() => setShowResults(false)}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="mb-4">Ready to create your own validation projects?</p>
          <Button size="lg" asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
