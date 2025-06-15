
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and business roles",
      image: "/placeholder.svg",
      features: ["ATS Optimized", "Clean Layout", "Professional"],
      popular: true,
      premium: false
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals and designers",
      image: "/placeholder.svg",
      features: ["Creative Layout", "Color Accents", "Portfolio Friendly"],
      popular: false,
      premium: true
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated template for senior-level positions",
      image: "/placeholder.svg",
      features: ["Executive Style", "Professional", "Leadership Focus"],
      popular: false,
      premium: true
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design that focuses on content",
      image: "/placeholder.svg",
      features: ["Minimal Design", "Easy to Read", "ATS Friendly"],
      popular: false,
      premium: false
    },
    {
      id: "academic",
      name: "Academic",
      description: "Perfect for academic positions and research roles",
      image: "/placeholder.svg",
      features: ["Research Focus", "Publication Ready", "Academic Style"],
      popular: false,
      premium: true
    },
    {
      id: "startup",
      name: "Startup",
      description: "Dynamic template for startup and entrepreneurial roles",
      image: "/placeholder.svg",
      features: ["Dynamic Layout", "Innovation Focus", "Modern"],
      popular: false,
      premium: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="text-xl font-bold text-gray-900">ResumeForge</span>
              </div>
            </div>
            <Link to="/builder">
              <Button className="bg-gradient-primary hover:opacity-90">
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose from our collection of ATS-optimized templates designed to help you land your dream job
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600">Used by 10,000+ job seekers</span>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className={`relative border-2 hover:shadow-lg transition-shadow ${template.popular ? 'border-blue-500' : 'border-gray-200'}`}>
                {template.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {template.premium && (
                  <div className="absolute top-4 right-4">
                    <Crown className="w-5 h-5 text-yellow-500" />
                  </div>
                )}
                <CardHeader>
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                      <div className="text-sm">Template Preview</div>
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    {template.premium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                        Premium
                      </span>
                    )}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link to="/builder" className="block">
                    <Button 
                      className={`w-full ${template.popular ? 'bg-gradient-primary' : ''}`}
                      variant={template.popular ? 'default' : 'outline'}
                    >
                      Use Template
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Templates?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ATS Optimized</h3>
              <p className="text-gray-600">All templates are designed to pass through Applicant Tracking Systems</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Design</h3>
              <p className="text-gray-600">Created by professional designers with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Customization</h3>
              <p className="text-gray-600">Customize colors, fonts, and layouts to match your style</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start building your professional resume today with our easy-to-use builder
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

export default Templates;
