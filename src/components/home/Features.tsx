
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ScrollText, 
  BarChart3, 
  Shuffle, 
  Users, 
  Clock, 
  FileStack 
} from "lucide-react";

const features = [
  {
    icon: <ScrollText className="h-10 w-10 text-swipecheck-blue" />,
    title: "Card Creation",
    description: "Create engaging cards with images, text, and mockups to present your product concepts."
  },
  {
    icon: <Shuffle className="h-10 w-10 text-swipecheck-blue" />,
    title: "Intuitive Swiping",
    description: "Simple right/left swipe interactions for intuitive approval or rejection feedback."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-swipecheck-blue" />,
    title: "Real-time Analytics",
    description: "Track feedback instantly with visual charts and detailed analytics."
  },
  {
    icon: <Users className="h-10 w-10 text-swipecheck-blue" />,
    title: "Participant Management",
    description: "Easily invite testers and manage feedback sessions with your target audience."
  },
  {
    icon: <Clock className="h-10 w-10 text-swipecheck-blue" />,
    title: "Time Efficiency",
    description: "Reduce validation time by 30% compared to traditional methods."
  },
  {
    icon: <FileStack className="h-10 w-10 text-swipecheck-blue" />,
    title: "Export Results",
    description: "Download comprehensive reports and share insights with your team."
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Powerful Features for Product Validation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to collect and analyze feedback on your product ideas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
