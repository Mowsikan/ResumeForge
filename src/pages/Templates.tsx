
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye, Download } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean, minimalist design perfect for corporate roles",
      category: "Professional",
      preview: "/api/placeholder/300/400"
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Bold and creative layout for design professionals",
      category: "Creative",
      preview: "/api/placeholder/300/400"
    },
    {
      id: 3,
      name: "Executive Classic",
      description: "Traditional format for senior executive positions",
      category: "Executive",
      preview: "/api/placeholder/300/400"
    },
    {
      id: 4,
      name: "Tech Specialist",
      description: "Modern layout optimized for technical roles",
      category: "Technology",
      preview: "/api/placeholder/300/400"
    },
    {
      id: 5,
      name: "Academic Scholar",
      description: "Detailed format for academic and research positions",
      category: "Academic",
      preview: "/api/placeholder/300/400"
    },
    {
      id: 6,
      name: "Startup Founder",
      description: "Dynamic layout for entrepreneurs and startup professionals",
      category: "Startup",
      preview: "/api/placeholder/300/400"
    }
  ];

  const categories = ["All", "Professional", "Creative", "Executive", "Technology", "Academic", "Startup"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of expertly designed, ATS-friendly templates
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={category === "All" ? "bg-gradient-primary" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl font-bold text-gradient">CV</span>
                    </div>
                    <p className="text-sm text-gray-600">Template {template.id}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Link to="/builder" className="flex-1">
                      <Button size="sm" className="w-full bg-gradient-primary">
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
