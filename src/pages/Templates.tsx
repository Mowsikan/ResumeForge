
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech and business roles",
      features: ["ATS Optimized", "Clean Layout", "Professional"],
      popular: true,
      color: "from-blue-50 to-indigo-100"
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals and designers",
      features: ["Creative Layout", "Color Accents", "Portfolio Friendly"],
      popular: false,
      color: "from-purple-50 to-pink-100"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated template for senior-level positions",
      features: ["Executive Style", "Professional", "Leadership Focus"],
      popular: false,
      color: "from-gray-50 to-slate-100"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design that focuses on content",
      features: ["Minimal Design", "Easy to Read", "ATS Friendly"],
      popular: false,
      color: "from-green-50 to-emerald-100"
    },
    {
      id: "academic",
      name: "Academic",
      description: "Perfect for academic positions and research roles",
      features: ["Research Focus", "Publication Ready", "Academic Style"],
      popular: false,
      color: "from-amber-50 to-yellow-100"
    },
    {
      id: "startup",
      name: "Startup",
      description: "Dynamic template for startup and entrepreneurial roles",
      features: ["Dynamic Layout", "Innovation Focus", "Modern"],
      popular: false,
      color: "from-cyan-50 to-blue-100"
    },
    {
      id: "technical",
      name: "Technical",
      description: "Optimized for software developers and engineers",
      features: ["Code Friendly", "Skills Focus", "Tech Optimized"],
      popular: false,
      color: "from-violet-50 to-purple-100"
    },
    {
      id: "sales",
      name: "Sales & Marketing",
      description: "Perfect for sales professionals and marketers",
      features: ["Results Driven", "Achievement Focus", "Impact Oriented"],
      popular: false,
      color: "from-orange-50 to-red-100"
    },
    {
      id: "consulting",
      name: "Consulting",
      description: "Professional template for consultants and analysts",
      features: ["Strategic Focus", "Problem Solving", "Professional"],
      popular: false,
      color: "from-teal-50 to-cyan-100"
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Designed for medical and healthcare professionals",
      features: ["Medical Focus", "Clean Design", "Professional"],
      popular: false,
      color: "from-red-50 to-rose-100"
    },
    {
      id: "finance",
      name: "Finance & Banking",
      description: "Conservative design for financial sector professionals",
      features: ["Conservative Style", "Numbers Focus", "Traditional"],
      popular: false,
      color: "from-emerald-50 to-green-100"
    },
    {
      id: "education",
      name: "Education",
      description: "Perfect for teachers and educational professionals",
      features: ["Educational Focus", "Clear Structure", "Professional"],
      popular: false,
      color: "from-blue-50 to-sky-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
                <CardHeader>
                  <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg mb-4 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 mx-auto">
                        <span className="text-2xl font-bold text-gradient">CV</span>
                      </div>
                      <div className="text-sm text-gray-600">{template.name}</div>
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
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
                  <Link to={`/builder?template=${template.id}`} className="block">
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
                <Zap className="w-6 h-6 text-purple-600" />
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
