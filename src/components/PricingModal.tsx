
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, Star, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const { toast } = useToast();

  const handlePurchase = (plan: string) => {
    // This would integrate with Stripe/payment processor
    toast({
      title: "Purchase Initiated",
      description: `Starting purchase for ${plan} plan. This would redirect to payment processor.`,
    });
    onClose();
  };

  const features = {
    free: [
      "Live preview",
      "Basic template",
      "Online sharing",
      "Limited customization"
    ],
    pro: [
      "Everything in Free",
      "High-quality PDF download",
      "Premium templates",
      "ATS optimization",
      "Custom colors & fonts",
      "Priority support"
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Choose Your Plan</DialogTitle>
          <p className="text-center text-gray-600">Unlock professional resume features</p>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Free Preview
              </CardTitle>
              <div className="text-3xl font-bold text-gray-900">$0</div>
              <p className="text-gray-600">Perfect for exploring</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={onClose}
              >
                Continue Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-blue-500 shadow-lg relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Professional
              </CardTitle>
              <div className="text-3xl font-bold text-gray-900">$9.99</div>
              <p className="text-gray-600">One-time payment</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90"
                onClick={() => handlePurchase('Professional')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF - $9.99
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            By purchasing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
