
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, Star, Zap, CreditCard, Shield, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const PricingModal = ({ isOpen, onClose }: PricingModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

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

  const handlePayment = async (plan: 'single' | 'professional') => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with payment.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    const selectedPlan = planDetails[plan];
    
    try {
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-order', {
        body: {
          plan_type: plan,
          amount: selectedPlan.price
        }
      });

      if (orderError) {
        throw new Error(`Order creation failed: ${orderError.message}`);
      }

      if (!orderData) {
        throw new Error('No order data received from server');
      }

      // Close the pricing section before opening Razorpay
      onClose();

      const options = {
        key: 'rzp_live_RbZjUu8cORJ4Pw',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ResumeForge',
        description: selectedPlan.description,
        image: '/logo.png',
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                purchase_id: orderData.purchase_id
              }
            });

            if (verifyError) {
              throw new Error(`Payment verification failed: ${verifyError.message}`);
            }

            toast({
              title: "Payment Successful!",
              description: `Your ${selectedPlan.name} has been activated. You can now download your resume.`,
            });
          } catch (error) {
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support if money was deducted.",
              variant: "destructive"
            });
          }
        },
        prefill: {
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
          email: user.email || '',
          contact: user.user_metadata?.phone || ''
        },
        notes: {
          plan: plan,
          user_id: user.id,
          timestamp: new Date().toISOString()
        },
        theme: {
          color: '#667eea'
        },
        config: {
          display: {
            language: 'en'
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          },
          escape: true,
          backdropclose: true,
          confirm_close: true,
          animation: true
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response: any) {
        setIsProcessing(false);
        toast({
          title: "Payment Failed",
          description: response.error.description || "Payment failed. Please try again.",
          variant: "destructive"
        });
      });

      razorpay.open();
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "There was an error processing your payment. Please try again.";
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold">Choose Your Plan</h2>
              <p className="text-gray-600">Unlock professional resume features</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
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
                  onClick={() => handlePayment('single')}
                  disabled={isProcessing}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Buy for ₹5'}
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
                  onClick={() => handlePayment('professional')}
                  disabled={isProcessing}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Buy Pack - ₹20'}
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
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Secured by Razorpay • By purchasing, you agree to our Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
