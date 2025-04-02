
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-swipecheck-blue text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
          Ready to Validate Your Product Ideas?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-white/80">
          Join thousands of product teams who are making better product decisions with SwipeCheck.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/signup">Get Started Free</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10" asChild>
            <Link to="/demo">See Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
