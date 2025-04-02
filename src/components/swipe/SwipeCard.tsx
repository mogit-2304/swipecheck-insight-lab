
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface SwipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  onSwipe: (id: string, direction: "left" | "right") => void;
}

const SwipeCard = ({
  id,
  title,
  description,
  image,
  category,
  onSwipe
}: SwipeCardProps) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    setDragStart({ x: clientX, y: 0 });
  };

  // Handle drag move
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const offsetX = clientX - dragStart.x;
    setDragOffset({ x: offsetX, y: 0 });
    
    // Determine swipe direction based on offset
    if (offsetX > 50) {
      setSwipeDirection("right");
    } else if (offsetX < -50) {
      setSwipeDirection("left");
    } else {
      setSwipeDirection(null);
    }
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // If the card is dragged far enough, trigger the swipe
    if (dragOffset.x > 150 && swipeDirection === "right") {
      onSwipe(id, "right");
    } else if (dragOffset.x < -150 && swipeDirection === "left") {
      onSwipe(id, "left");
    } else {
      // Reset position if not swiped far enough
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => handleDragMove(e as unknown as React.MouseEvent);
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e as unknown as React.TouchEvent);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchEnd = () => handleDragEnd();
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div 
      ref={cardRef}
      className={`feedback-card ${swipeDirection === "right" ? "animate-slide-right" : ""} ${swipeDirection === "left" ? "animate-slide-left" : ""}`}
      style={{ 
        transform: isDragging ? `translateX(${dragOffset.x}px) rotate(${dragOffset.x * 0.05}deg)` : undefined,
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
    >
      {/* Swipe indicators */}
      <div 
        className={`swipe-indicator swipe-indicator-like ${swipeDirection === "right" ? "opacity-100" : "opacity-0"}`}
      >
        <ThumbsUp className="h-6 w-6" />
      </div>
      <div 
        className={`swipe-indicator swipe-indicator-dislike ${swipeDirection === "left" ? "opacity-100" : "opacity-0"}`}
      >
        <ThumbsDown className="h-6 w-6" />
      </div>
      
      {/* Card content */}
      <Card className="w-full h-full border-0 flex flex-col">
        <CardHeader className="p-4">
          <Badge className="w-fit">{category}</Badge>
          <h3 className="text-xl font-bold mt-2">{title}</h3>
        </CardHeader>
        <div className="relative flex-1 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-4">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          Swipe right to approve, left to reject
        </CardFooter>
      </Card>
    </div>
  );
};

export default SwipeCard;
