-- Migration: Add credits to users and create payments table

-- 1. Add credits column to existing users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS credits INTEGER NOT NULL DEFAULT 0;

-- 2. Create payments table to track Dodo transactions securely
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    dodo_payment_id TEXT UNIQUE NOT NULL,
    amount INTEGER NOT NULL,
    credits_added INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own payments
CREATE POLICY "Users can view own payments" 
    ON public.payments 
    FOR SELECT 
    USING (auth.uid()::text = user_id);

-- (Inserts/Updates to the payments table will only be done via the Service Role Key in our Webhook, which bypasses RLS)
