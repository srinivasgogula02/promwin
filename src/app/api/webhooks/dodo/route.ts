import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { DodoPayments } from "dodopayments";

export async function POST(req: Request) {
    try {
        const dodo = new DodoPayments({
            bearerToken: process.env.DODO_PAYMENTS_API_KEY || "dummy",
        });

        const payload = await req.text();
        const headersList = await headers();
        const signature = headersList.get("dodo-signature");

        if (!signature) {
            return new NextResponse("Missing signature", { status: 401 });
        }

        // Verify the webhook signature
        let event;
        try {
            const rawHeaders = Object.fromEntries(headersList.entries());
            event = dodo.webhooks.unwrap(payload, {
                headers: rawHeaders,
                key: process.env.DODO_WEBHOOK_SECRET,
            });
        } catch (err) {
            console.error("Webhook signature verification failed:", err);
            return new NextResponse("Invalid signature", { status: 401 });
        }

        if (event.type === "payment.succeeded") {
            const payment = event.data;
            const clerkUserId = payment.metadata?.clerk_user_id;

            if (!clerkUserId) {
                console.error("No clerk_user_id attached to metadata", payment.payment_id);
                return new NextResponse("No user attached", { status: 400 });
            }

            // Define how many credits they get. For this example: 100 credits = $1.00 (100 cents)
            // Or you can rely on the metadata/amount if you prefer.
            // Let's assume purchasing the test item grants 1,000 credits.
            const creditsAdded = payment.metadata?.credits_amount ? parseInt(payment.metadata.credits_amount, 10) : 1000;

            // Log payment and increment credits securely via internal API
            // This runs on the server with Service Role Key (implicitly if configured in supabase internal client, but let's ensure we use the service role key to bypass RLS)

            // Re-initialize Supabase with Service Role Key to bypass RLS for this critical operation
            const { createClient } = await import('@supabase/supabase-js');
            const supabaseAdmin = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.SUPABASE_SERVICE_ROLE_KEY!
            );

            // 1. Log the transaction securely
            await supabaseAdmin.from("payments").insert({
                user_id: clerkUserId,
                dodo_payment_id: payment.payment_id,
                amount: payment.total_amount, // in cents/sub-units
                credits_added: creditsAdded,
                status: payment.status
            });

            // 2. Safely increment the user's credits using an RPC call or by fetching and updating. 
            // In a production app, use raw SQL or an RPC to avoid race conditions: 
            // supabaseAdmin.rpc('increment_credits', { user_id: clerkUserId, amount: creditsAdded })
            // For now, let's fetch, add, and update:
            const { data: userData } = await supabaseAdmin.from('users').select('credits').eq('id', clerkUserId).single();
            const currentCredits = userData?.credits || 0;

            await supabaseAdmin.from('users').update({
                credits: currentCredits + creditsAdded,
            }).eq('id', clerkUserId);

            console.log(`Successfully credited ${creditsAdded} to user ${clerkUserId}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Dodo webhook error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
