import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Boxes, Server, Headphones, ArrowRight } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Boxes,
      title: "Premium Modules",
      description: "Access exclusive, high-quality modules crafted by professional developers",
    },
    {
      icon: Server,
      title: "Server Rental",
      description: "Reliable, high-performance servers for your projects and applications",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock technical support for all your needs",
    },
  ];

  return (
    <section className="py-20 night-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold night-text mb-6">Our Services</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover our premium offerings designed for the modern digital landscape
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="night-secondary hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 night-border border"
            >
              <CardContent className="p-8">
                <div className="text-4xl mb-4" style={{ color: 'var(--night-accent)' }}>
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold night-text mb-4">{feature.title}</h3>
                <p className="text-slate-400 mb-6">{feature.description}</p>
                <Button 
                  variant="link" 
                  className="p-0 font-semibold hover:text-indigo-400"
                  style={{ color: 'var(--night-accent)' }}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
