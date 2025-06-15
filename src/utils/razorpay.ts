
// Razorpay integration utilities
export const RAZORPAY_KEY_ID = 'rzp_live_RbZjUu8cORJ4Pw';

export interface PaymentOptions {
  amount: number;
  currency: string;
  orderId: string;
  name: string;
  description: string;
  userEmail?: string;
  userPhone?: string;
  userName?: string;
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (options: PaymentOptions) => {
  // Note: In production, this should call your backend to create order
  // For now, we'll simulate order creation
  return {
    id: `order_${Date.now()}`,
    amount: options.amount * 100, // Convert to paise
    currency: options.currency
  };
};

export const initializePayment = async (
  options: PaymentOptions,
  onSuccess: (response: any) => void,
  onFailure: (error: any) => void
) => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    onFailure(new Error('Razorpay SDK failed to load'));
    return;
  }

  const order = await createRazorpayOrder(options);

  const razorpayOptions = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: options.name,
    description: options.description,
    order_id: order.id,
    handler: onSuccess,
    prefill: {
      name: options.userName || '',
      email: options.userEmail || '',
      contact: options.userPhone || ''
    },
    theme: {
      color: '#667eea'
    },
    modal: {
      ondismiss: () => {
        onFailure(new Error('Payment cancelled by user'));
      }
    }
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
};
