import { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard";
import RejectionFeedbackDialog from "./RejectionFeedbackDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

interface Card {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface SwipeDeckProps {
  cards: Card[];
  onComplete: (results: Record<string, { direction: "left" | "right", feedback?: string }>) => void;
}

const SwipeDeck = ({ cards, onComplete }: SwipeDeckProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<Record<string, { direction: "left" | "right", feedback?: string }>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);

  const processSwipe = (id: string, direction: "left" | "right", feedback?: string) => {
    setResults(prev => ({
      ...prev,
      [id]: { direction, ...(feedback ? { feedback } : {}) }
    }));
    
    if (currentIndex < cards.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setIsComplete(true);
      }, 300);
    }
  };

  const handleSwipe = (id: string, direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentCardId(id);
      setShowRejectionDialog(true);
      return;
    }
    
    processSwipe(id, direction);
  };

  const handleRejectionFeedbackSubmit = (feedback: string) => {
    if (currentCardId) {
      processSwipe(currentCardId, "left", feedback);
      setShowRejectionDialog(false);
      setCurrentCardId(null);
    }
  };

  const handleRejectionFeedbackCancel = () => {
    setShowRejectionDialog(false);
    setCurrentCardId(null);
  };

  const handleManualSwipe = (direction: "left" | "right") => {
    if (currentIndex < cards.length) {
      handleSwipe(cards[currentIndex].id, direction);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setResults({});
    setIsComplete(false);
  };

  useEffect(() => {
    if (isComplete) {
      onComplete(results);
    }
  }, [isComplete, results, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center">
      {!isComplete ? (
        <>
          <div className="relative w-full max-w-md h-[480px] mb-8">
            {cards.length > 0 && currentIndex < cards.length && (
              <SwipeCard
                key={cards[currentIndex].id}
                id={cards[currentIndex].id}
                title={cards[currentIndex].title}
                description={cards[currentIndex].description}
                image={cards[currentIndex].image}
                category={cards[currentIndex].category}
                onSwipe={handleSwipe}
              />
            )}
          </div>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full p-3" 
              onClick={() => handleManualSwipe("left")}
            >
              <ArrowLeft className="h-6 w-6 text-swipecheck-danger" />
              <span className="sr-only">Reject</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full p-3" 
              onClick={() => handleManualSwipe("right")}
            >
              <ArrowRight className="h-6 w-6 text-swipecheck-success" />
              <span className="sr-only">Approve</span>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>

          {showRejectionDialog && currentCardId && (
            <RejectionFeedbackDialog
              open={showRejectionDialog}
              onClose={handleRejectionFeedbackCancel}
              onSubmit={handleRejectionFeedbackSubmit}
            />
          )}
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Testing Complete!</h3>
          <p className="text-muted-foreground mb-6">
            You've reviewed all the cards. Thank you for your feedback!
          </p>
          <Button onClick={resetDeck} className="mx-auto flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};

export default SwipeDeck;
