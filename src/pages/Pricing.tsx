
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Check, Download, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
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

  const faqs = [
    {
      question: "What formats can I download?",
      answer: "You can download your resume as a high-quality PDF file that's ready for job applications."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Yes, all our templates are designed to be ATS (Applicant Tracking System) compatible."
    },
    {
      question: "Can I edit my resume after purchase?",
      answer: "Yes, you can edit your resume anytime and re-download as long as your plan is active."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, and net banking through Razorpay."
    },
    {
      question: "How long are the downloads valid?",
      answer: "Single download is valid for 24 hours, Small pack for 30 days, and Unlimited pack for 1 year."
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start for free, upgrade when you're ready to download
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600">4.9/5 from 2,000+ users</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      {plan.savings}
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <plan.icon className="w-5 h-5 text-blue-500" />
                    {plan.name}
                  </CardTitle>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{plan.price}</div>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/builder" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've upgraded their careers
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
