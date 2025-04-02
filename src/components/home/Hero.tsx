
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Validate Your Product <span className="text-swipecheck-blue">Ideas Faster</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-8">
          Collect intuitive feedback through an engaging swipe interface. Make data-driven product decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/demo">See Demo</Link>
          </Button>
        </div>
        <div className="mt-16 max-w-5xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
          <img 
            src="https://placehold.co/1200x675/f8fafc/1e293b?text=SwipeCheck+Demo+Image" 
            alt="SwipeCheck platform preview" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
