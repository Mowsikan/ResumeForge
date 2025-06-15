
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
    const { plan_type, amount } = await req.json()
    
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

    // Create order ID (in production, you'd use Razorpay API)
    const order_id = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Calculate expiry date
    const expires_at = plan_type === 'professional' 
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      : new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create purchase record
    const { data: purchase, error: purchaseError } = await supabaseClient
      .from('purchases')
      .insert({
        user_id: user.id,
        plan_type,
        amount,
        currency: 'INR',
        razorpay_order_id: order_id,
        status: 'pending',
        downloads_remaining: plan_type === 'professional' ? 10 : 1,
        expires_at: expires_at.toISOString(),
      })
      .select()
      .single()

    if (purchaseError) {
      throw new Error(`Failed to create purchase: ${purchaseError.message}`)
    }

    return new Response(
      JSON.stringify({
        order_id,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        purchase_id: purchase.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
