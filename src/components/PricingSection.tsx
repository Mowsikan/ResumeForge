import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = ({ showTitle = true }: { showTitle?: boolean }) => {
  const plans = [
    {
      name: "Free Preview",
      price: "₹0",
      description: "Build and preview your resume",
      features: [
        "Live preview",
        "Basic template",
        "Online sharing",
        "Limited customization"
      ],
      cta: "Get Started",
      popular: false,
      icon: Star
    },
    {
      name: "Single Download",
      price: "₹1",
      description: "One-time PDF download",
      features: [
        "Everything in Free",
        "1 PDF download",
        "Premium templates",
        "ATS optimization",
        "Valid for 24 hours"
      ],
      cta: "Download - ₹1",
      popular: false,
      icon: Download
    },
    {
      name: "Small Pack",
      price: "₹5",
      description: "10 High-quality resume downloads",
      features: [
        "Everything in Single",
        "10 PDF downloads",
        "All premium templates",
        "ATS optimization",
        "Custom colors & fonts",
        "Priority support",
        "Valid for 30 days"
      ],
      cta: "Buy Pack - ₹5",
      popular: true,
      savings: "Best Value",
      icon: Zap
    },
    {
      name: "Unlimited Pack",
      price: "₹100",
      description: "Unlimited resume downloads",
      features: [
        "Everything in Small Pack",
        "Unlimited PDF downloads",
        "All premium templates",
        "Custom colors & fonts",
        "Premium support",
        "Valid for 1 year"
      ],
      cta: "Go Premium - ₹100",
      popular: false,
      icon: Crown
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Start for free, upgrade when you're ready to download
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border-2 ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {plan.savings}
                  </span>
                </div>
              )}
              <CardHeader className="text-center p-4 sm:p-6">
                <CardTitle className="flex items-center justify-center gap-2 text-base sm:text-lg">
                  <plan.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="text-sm sm:text-base">{plan.name}</span>
                </CardTitle>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{plan.price}</div>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/builder" className="block">
                  <Button 
                    className={`w-full text-xs sm:text-sm ${plan.popular ? 'bg-gradient-primary' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="sm"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};