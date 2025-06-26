import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">CV</span>
              </div>
              <span className="font-semibold text-lg sm:text-xl text-gray-900 hidden sm:block">ResumeBuilder</span>
              <span className="font-semibold text-base text-gray-900 sm:hidden">Resume</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/templates"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Templates
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            {user && (
              <>
                <Link
                  to="/resumes"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  My Resumes
                </Link>
                <Link
                  to="/downloaded"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Downloaded
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80">
                <SheetHeader className="text-left">
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the app.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-6">
                  <Link
                    to="/templates"
                    className="text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors block border-b border-gray-100"
                    onClick={closeMobileMenu}
                  >
                    Templates
                  </Link>
                  <Link
                    to="/pricing"
                    className="text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors block border-b border-gray-100"
                    onClick={closeMobileMenu}
                  >
                    Pricing
                  </Link>
                  {user && (
                    <>
                      <Link
                        to="/resumes"
                        className="text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors block border-b border-gray-100"
                        onClick={closeMobileMenu}
                      >
                        My Resumes
                      </Link>
                      <Link
                        to="/downloaded"
                        className="text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-colors block border-b border-gray-100"
                        onClick={closeMobileMenu}
                      >
                        Downloaded
                      </Link>
                    </>
                  )}
                  <div className="pt-4">
                    {user ? (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          handleSignOut();
                          closeMobileMenu();
                        }}
                        className="w-full"
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <Link to="/login" onClick={closeMobileMenu}>
                        <Button className="w-full">Sign In / Sign Up</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <Button variant="outline" onClick={handleSignOut} size="sm">
                Sign Out
              </Button>
            ) : (
              <Link to="/login">
                <Button size="sm">Sign In / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;