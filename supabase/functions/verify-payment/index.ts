
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Function to verify Razorpay signature
function verifyRazorpaySignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string,
  secret: string
): boolean {
  const text = razorpayOrderId + "|" + razorpayPaymentId
  const expectedSignature = btoa(
    String.fromCharCode(
      ...new Uint8Array(
        Array.from(
          new TextEncoder().encode(secret),
          (byte, i) => byte ^ new TextEncoder().encode(text)[i % text.length]
        )
      )
    )
  )
  
  // For production, use proper HMAC verification
  // This is a simplified version - in production you should use crypto.subtle
  return razorpaySignature === expectedSignature
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, purchase_id } = await req.json()
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')
    if (!razorpayKeySecret) {
      throw new Error('Razorpay key secret not configured')
    }

    console.log('Verifying payment:', { razorpay_payment_id, razorpay_order_id })

    // In production, you should verify the signature properly using crypto.subtle
    // For now, we'll fetch the payment details from Razorpay to verify
    const razorpayKeyId = 'rzp_live_RbZjUu8cORJ4Pw'
    
    try {
      const paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${razorpayKeyId}:${razorpayKeySecret}`)}`,
          'Content-Type': 'application/json',
        },
      })

      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text()
        console.error('Razorpay payment verification failed:', errorText)
        throw new Error('Payment verification failed with Razorpay')
      }

      const paymentDetails = await paymentResponse.json()
      console.log('Payment verified with Razorpay:', paymentDetails.status)

      if (paymentDetails.status !== 'captured' && paymentDetails.status !== 'authorized') {
        throw new Error('Payment not successful')
      }

    } catch (verificationError) {
      console.error('Payment verification error:', verificationError)
      throw new Error('Failed to verify payment with Razorpay')
    }

    // Update purchase record
    const { data: purchase, error: updateError } = await supabaseClient
      .from('purchases')
      .update({
        razorpay_payment_id,
        status: 'completed'
      })
      .eq('id', purchase_id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Purchase update error:', updateError)
      throw new Error(`Failed to update purchase: ${updateError.message}`)
    }

    console.log('Purchase updated successfully:', purchase.id)

    return new Response(
      JSON.stringify({ success: true, purchase }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Verify payment error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
