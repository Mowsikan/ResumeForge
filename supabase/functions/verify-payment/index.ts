
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    console.log('Verifying payment:', { razorpay_payment_id, razorpay_order_id, purchase_id })

    // Verify payment with Razorpay
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

    // First, check if purchase exists and get its current status
    const { data: existingPurchase, error: fetchError } = await supabaseClient
      .from('purchases')
      .select('*')
      .eq('id', purchase_id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !existingPurchase) {
      console.error('Purchase not found:', fetchError)
      throw new Error('Purchase record not found')
    }

    console.log('Found existing purchase:', existingPurchase.id, 'Status:', existingPurchase.status)

    // Check if already completed to avoid duplicate processing
    if (existingPurchase.status === 'completed') {
      console.log('Purchase already completed, returning existing data')
      return new Response(
        JSON.stringify({ success: true, purchase: existingPurchase }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // Update purchase record with payment details - using a more specific approach
    const { data: updatedPurchases, error: updateError } = await supabaseClient
      .from('purchases')
      .update({
        razorpay_payment_id,
        status: 'completed'
      })
      .eq('id', purchase_id)
      .eq('user_id', user.id)
      .eq('status', 'pending')
      .select()

    if (updateError) {
      console.error('Purchase update error:', updateError)
      
      // Check if the purchase was already updated by another request
      const { data: recheckPurchase } = await supabaseClient
        .from('purchases')
        .select('*')
        .eq('id', purchase_id)
        .eq('user_id', user.id)
        .single()
      
      if (recheckPurchase && recheckPurchase.status === 'completed') {
        console.log('Purchase was completed by another request')
        return new Response(
          JSON.stringify({ success: true, purchase: recheckPurchase }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        )
      }
      
      throw new Error(`Failed to update purchase: ${updateError.message}`)
    }

    // Check if any rows were actually updated
    if (!updatedPurchases || updatedPurchases.length === 0) {
      console.log('No rows updated - purchase may have been processed already')
      
      // Get the current state of the purchase
      const { data: currentPurchase } = await supabaseClient
        .from('purchases')
        .select('*')
        .eq('id', purchase_id)
        .eq('user_id', user.id)
        .single()
      
      if (currentPurchase && currentPurchase.status === 'completed') {
        console.log('Purchase is already completed')
        return new Response(
          JSON.stringify({ success: true, purchase: currentPurchase }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          },
        )
      } else {
        throw new Error('Purchase update failed - no rows affected')
      }
    }

    const updatedPurchase = updatedPurchases[0]
    console.log('Purchase updated successfully:', updatedPurchase.id)

    return new Response(
      JSON.stringify({ success: true, purchase: updatedPurchase }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Verify payment error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Payment verification failed. Please contact support if money was deducted.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
