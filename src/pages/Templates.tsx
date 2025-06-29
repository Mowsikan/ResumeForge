import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Crown, Zap } from "lucide-react";
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
      premium: false,
      color: "from-blue-50 to-indigo-100"
    },
    {
      id: "professional",
      name: "Professional Elite",
      description: "Two-column layout with achievements sidebar, inspired by executive resumes",
      image: "/placeholder.svg",
      features: ["Two-Column Layout", "Achievement Sidebar", "Executive Style"],
      popular: false,
      premium: true,
      color: "from-blue-50 to-slate-100"
    },
    {
      id: "sidebar",
      name: "Sidebar Professional",
      description: "Dark sidebar design with contact info and skills highlighting",
      image: "/placeholder.svg",
      features: ["Dark Sidebar", "Contact Focused", "Skills Highlight"],
      popular: false,
      premium: true,
      color: "from-blue-900 to-slate-800"
    },
    {
      id: "recruiter",
      name: "Recruiter Focused",
      description: "Clean three-column layout optimized for HR professionals",
      image: "/placeholder.svg",
      features: ["HR Optimized", "Three-Column", "Clean Layout"],
      popular: false,
      premium: true,
      color: "from-blue-50 to-gray-100"
    },
    {
      id: "creative",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals and designers",
      image: "/placeholder.svg",
      features: ["Creative Layout", "Color Accents", "Portfolio Friendly"],
      popular: false,
      premium: true,
      color: "from-purple-50 to-pink-100"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated template for senior-level positions",
      image: "/placeholder.svg",
      features: ["Executive Style", "Professional", "Leadership Focus"],
      popular: false,
      premium: true,
      color: "from-gray-50 to-slate-100"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean design that focuses on content",
      image: "/placeholder.svg",
      features: ["Minimal Design", "Easy to Read", "ATS Friendly"],
      popular: false,
      premium: false,
      color: "from-green-50 to-emerald-100"
    },
    {
      id: "technical",
      name: "Technical",
      description: "Optimized for software developers and engineers",
      image: "/placeholder.svg",
      features: ["Code Friendly", "Skills Focus", "Tech Optimized"],
      popular: false,
      premium: false,
      color: "from-violet-50 to-purple-100"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Professional Resume Templates
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            Choose from our collection of ATS-optimized templates designed to help you land your dream job
          </p>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm sm:text-base text-gray-600">Used by 10,000+ job seekers</span>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {templates.map((template) => (
              <Card key={template.id} className={`relative border-2 hover:shadow-lg transition-shadow ${template.popular ? 'border-blue-500' : 'border-gray-200'}`}>
                {template.popular && (
                  <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                {template.premium && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  </div>
                )}
                <CardHeader className="p-3 sm:p-6">
                  <div className={`aspect-[3/4] bg-gradient-to-br ${template.color} rounded-lg mb-3 sm:mb-4 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-2 mx-auto">
                        <span className="text-lg sm:text-2xl font-bold text-gradient">CV</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">{template.name}</div>
                    </div>
                  </div>
                  <CardTitle className="flex items-center justify-between text-sm sm:text-base">
                    <span className="truncate">{template.name}</span>
                    {template.premium && (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                        Premium
                      </span>
                    )}
                  </CardTitle>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-6 pt-0">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
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
                      className={`w-full text-xs sm:text-sm ${template.popular ? 'bg-gradient-primary' : ''}`}
                      variant={template.popular ? 'default' : 'outline'}
                      size="sm"
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Templates?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">ATS Optimized</h3>
              <p className="text-sm sm:text-base text-gray-600">All templates are designed to pass through Applicant Tracking Systems</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Professional Design</h3>
              <p className="text-sm sm:text-base text-gray-600">Created by professional designers with years of experience</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">Easy Customization</h3>
              <p className="text-sm sm:text-base text-gray-600">Customize colors, fonts, and layouts to match your style</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Start building your professional resume today with our easy-to-use builder
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Templates;