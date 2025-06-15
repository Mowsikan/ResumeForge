
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'single' | 'professional';
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const planDetails = {
    single: {
      name: "Single Download",
      price: 5,
      currency: "INR",
      description: "1 PDF download with premium features"
    },
    professional: {
      name: "Professional Pack",
      price: 20,
      currency: "INR", 
      description: "10 PDF downloads with all premium features"
    }
  };

  const selectedPlan = planDetails[plan];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Note: In production, order creation should happen on backend
      const options = {
        key: 'rzp_live_RbZjUu8cORJ4Pw', // Your Razorpay key
        amount: selectedPlan.price * 100, // Amount in paise
        currency: selectedPlan.currency,
        name: 'ResumeForge',
        description: selectedPlan.description,
        image: '/logo.png',
        order_id: `order_${Date.now()}`, // This should come from backend
        handler: function (response: any) {
          toast({
            title: "Payment Successful!",
            description: `Your ${selectedPlan.name} has been activated. You can now download your resume.`,
          });
          console.log('Payment Success:', response);
          onClose();
        },
        prefill: {
          name: 'John Doe',
          email: 'john@example.com',
          contact: '9999999999'
        },
        notes: {
          plan: plan,
          timestamp: new Date().toISOString()
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment Error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <Zap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">{selectedPlan.name}</h3>
              <div className="text-3xl font-bold text-gray-900 mt-2">
                ₹{selectedPlan.price}
              </div>
              <p className="text-gray-600 mt-2">{selectedPlan.description}</p>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">High-quality PDF download</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">ATS-optimized templates</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Custom formatting options</span>
              </li>
              {plan === 'professional' && (
                <>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">10 downloads included</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">30-day validity</span>
                  </li>
                </>
              )}
            </ul>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-gradient-primary hover:opacity-90 mb-4"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : `Pay ₹${selectedPlan.price}`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secured by Razorpay • 256-bit SSL encryption</span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-gray-500 mt-4">
          By purchasing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};
