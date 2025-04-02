
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "SwipeCheck has transformed how we validate our design concepts. We're seeing 40% higher engagement from our stakeholders compared to traditional surveys.",
    name: "Alex Johnson",
    title: "Product Manager at TechCorp",
    avatar: "AJ"
  },
  {
    quote: "The intuitive swiping interface makes gathering quick feedback a breeze. We've cut our validation time in half and made better product decisions.",
    name: "Samantha Lee",
    title: "Lead UX Designer at InnovateCo",
    avatar: "SL"
  },
  {
    quote: "Our team loves the real-time analytics. Being able to see immediate reactions to our concepts has been a game-changer for our agile process.",
    name: "Michael Chen",
    title: "VP of Product at StartupX",
    avatar: "MC"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Product teams are improving their validation process with SwipeCheck.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex justify-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                </div>
              </CardHeader>
              <CardContent className="text-center pt-6">
                <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex flex-col items-center pb-6">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
