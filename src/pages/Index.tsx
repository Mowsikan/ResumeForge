import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Download, Eye, Zap, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PricingSection } from "@/components/PricingSection";

const Index = () => {
  const features = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Live Preview",
      description: "See your resume update in real-time as you type"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Professional Templates",
      description: "Choose from expertly designed, ATS-friendly templates"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export to PDF",
      description: "Download high-quality PDFs ready for job applications"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "Landed my dream job thanks to the professional resume I built here!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Manager",
      content: "The live preview feature saved me hours of formatting. Absolutely brilliant!",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "Design Director",
      content: "Clean, modern templates that actually stand out. Worth every penny.",
      rating: 5
    }
  ];

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and business roles",
      popular: true
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      popular: false
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated template for senior-level positions",
      popular: false
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design that focuses on content",
      popular: false
    },
    {
      id: "academic",
      name: "Academic",
      description: "Perfect for academic positions and research roles",
      popular: false
    },
    {
      id: "startup",
      name: "Startup",
      description: "Dynamic template for startup and entrepreneurial roles",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Build Professional Resumes in
              <span className="text-gradient block mt-2">Minutes, Not Hours</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Create stunning, ATS-friendly resumes with our intuitive builder. Live preview, 
              professional templates, and instant PDF downloads. Get hired faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 py-3 h-12 sm:h-auto">
                  Start Building Free
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link to="/templates" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 h-12 sm:h-auto">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Powerful features designed to help you create the perfect resume
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-scale-in">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section id="templates" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Professional Templates
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Choose from our collection of expertly designed, ATS-friendly templates
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {templates.slice(0, 6).map((template) => (
              <Card key={template.id} className={`group hover:shadow-xl transition-shadow duration-300 cursor-pointer relative ${template.popular ? 'border-2 border-blue-500' : ''}`}>
                {template.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                        <span className="text-lg sm:text-2xl font-bold text-gradient">CV</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{template.name}</p>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{template.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{template.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 sm:mt-8">
            <Link to="/templates">
              <Button variant="outline" size="lg" className="text-sm sm:text-base">
                View All Templates
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trusted by Professionals
            </h2>
            <div className="flex justify-center items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm sm:text-base text-gray-600">4.9/5 from 2,000+ users</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of professionals who've upgraded their careers with ResumeForge
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
              Start Building Now
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">ResumeForge</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Support</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; 2024 ResumeForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;