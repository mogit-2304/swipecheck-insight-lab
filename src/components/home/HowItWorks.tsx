
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Project",
    description: "Set up your validation project and define what you want to test."
  },
  {
    number: "02",
    title: "Design Cards",
    description: "Create cards with your product concepts, designs, or feature ideas."
  },
  {
    number: "03",
    title: "Invite Participants",
    description: "Share with stakeholders or your target audience to collect feedback."
  },
  {
    number: "04",
    title: "Analyze Results",
    description: "Review the feedback data and make informed product decisions."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            How SwipeCheck Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple four-step process to validate your product ideas quickly and effectively.
          </p>
        </div>
        <div className="mt-16 relative">
          {/* Progress line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-muted transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 bg-background rounded-lg p-6 border shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-swipecheck-blue text-white font-bold">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-4 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
