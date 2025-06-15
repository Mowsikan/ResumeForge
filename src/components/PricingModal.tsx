
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, Star, Zap } from "lucide-react";
import { useState } from "react";
import { PaymentModal } from "./PaymentModal";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'professional'>('professional');

  const handlePurchase = (plan: 'single' | 'professional') => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const features = {
    free: [
      "Live preview",
      "Basic template",
      "Online sharing",
      "Limited customization"
    ],
    single: [
      "Everything in Free",
      "1 High-quality PDF download",
      "Premium templates",
      "ATS optimization",
      "Valid for 24 hours"
    ],
    professional: [
      "Everything in Single",
      "10 PDF downloads",
      "All premium templates",
      "Custom colors & fonts",
      "Priority support",
      "Valid for 30 days"
    ]
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Choose Your Plan</DialogTitle>
            <p className="text-center text-gray-600">Unlock professional resume features</p>
          </DialogHeader>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {/* Free Plan */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Free Preview
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900">₹0</div>
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

            {/* Single Download Plan */}
            <Card className="border-2 border-green-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Download className="w-5 h-5 text-green-500" />
                  Single Download
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900">₹5</div>
                <p className="text-gray-600">One-time download</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.single.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handlePurchase('single')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Buy for ₹5
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-2 border-blue-500 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Best Value
                </span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  Professional Pack
                </CardTitle>
                <div className="text-3xl font-bold text-gray-900">₹20</div>
                <div className="text-sm text-gray-500 line-through">₹50</div>
                <p className="text-gray-600">10 downloads • 60% off</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {features.professional.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={() => handlePurchase('professional')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Buy Pack - ₹20
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
                <span>Money Back Guarantee</span>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Secured by Razorpay • By purchasing, you agree to our Terms of Service
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        plan={selectedPlan}
      />
    </>
  );
};
