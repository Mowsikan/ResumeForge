
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, CreditCard, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

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

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      console.log('Razorpay already loaded');
      resolve(true);
      return;
    }

    console.log('Loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const PaymentModal = ({ isOpen, onClose, plan }: PaymentModalProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
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
    console.log('Payment initiated for plan:', plan);
    
    if (!user) {
      console.log('User not authenticated');
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue with payment.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('Loading Razorpay script...');
      // Load Razorpay script first
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        console.error('Razorpay script failed to load');
        throw new Error('Failed to load Razorpay SDK');
      }

      console.log('Creating order via edge function...');
      // Create order using Edge Function
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-order', {
        body: {
          plan_type: plan,
          amount: selectedPlan.price
        }
      });

      console.log('Order creation response:', { orderData, orderError });

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error(`Order creation failed: ${orderError.message}`);
      }

      if (!orderData) {
        console.error('No order data received');
        throw new Error('No order data received from server');
      }

      console.log('Initializing Razorpay with options:', {
        amount: orderData.amount,
        order_id: orderData.order_id
      });

      // Close our modal before opening Razorpay to prevent conflicts
      onClose();

      // Add a small delay to ensure our modal is fully closed
      setTimeout(() => {
        const options = {
          key: 'rzp_live_RbZjUu8cORJ4Pw',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'ResumeForge',
          description: selectedPlan.description,
          image: '/logo.png',
          order_id: orderData.order_id,
          handler: async function (response: any) {
            console.log('Payment successful, response:', response);
            try {
              console.log('Verifying payment...');
              // Verify payment using Edge Function
              const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment', {
                body: {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  purchase_id: orderData.purchase_id
                }
              });

              console.log('Payment verification response:', { verifyData, verifyError });

              if (verifyError) {
                console.error('Payment verification error:', verifyError);
                throw new Error(`Payment verification failed: ${verifyError.message}`);
              }

              toast({
                title: "Payment Successful!",
                description: `Your ${selectedPlan.name} has been activated. You can now download your resume.`,
              });
              console.log('Payment process completed successfully');
            } catch (error) {
              console.error('Payment verification error:', error);
              toast({
                title: "Payment Verification Failed",
                description: "Please contact support if money was deducted.",
                variant: "destructive"
              });
            }
          },
          prefill: {
            name: user.user_metadata?.full_name || '',
            email: user.email || '',
            contact: ''
          },
          notes: {
            plan: plan,
            user_id: user.id,
            timestamp: new Date().toISOString()
          },
          theme: {
            color: '#667eea'
          },
          modal: {
            ondismiss: function() {
              console.log('Payment modal dismissed by user');
              setIsProcessing(false);
            },
            escape: true,
            backdropclose: true
          }
        };

        console.log('Creating Razorpay instance...');
        const razorpay = new window.Razorpay(options);
        
        // Add error handler for razorpay
        razorpay.on('payment.failed', function (response: any) {
          console.error('Payment failed:', response.error);
          setIsProcessing(false);
          toast({
            title: "Payment Failed",
            description: response.error.description || "Payment failed. Please try again.",
            variant: "destructive"
          });
        });

        console.log('Opening Razorpay checkout...');
        razorpay.open();
      }, 100); // Small delay to ensure modal closure
      
    } catch (error) {
      console.error('Payment Error:', error);
      const errorMessage = error instanceof Error ? error.message : "There was an error processing your payment. Please try again.";
      console.error('Showing error toast:', errorMessage);
      
      toast({
        title: "Payment Failed",
        description: errorMessage,
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
