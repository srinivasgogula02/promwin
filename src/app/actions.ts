"use server"

import { currentUser } from "@clerk/nextjs/server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export async function updateBio(newBio: string) {
    const user = await currentUser();

    if (!user || (!user.username)) {
        throw new Error("You must be logged in with a valid username to update your bio.");
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    if (!supabaseUrl || !supabaseServiceKey) {
        throw new Error("Server is missing Supabase configuration");
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Update the user's bio in Supabase
    const { error } = await supabaseAdmin
        .from('users')
        .update({ bio: newBio })
        .eq('id', user.id); // Securely restrict to the logged in user

    if (error) {
        console.error("Error updating bio:", error);
        throw new Error(`Failed to update bio: ${error.message}`);
    }

    // Tell Next.js to re-render the profile page so the changes show up immediately
    revalidatePath(`/${user.username}`);

    return { success: true };
}

export async function joinWaitlist(formData: FormData) {
    const email = formData.get('email');

    if (!email || typeof email !== 'string') {
        return { success: false, error: 'Valid email is required.' };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { error } = await supabase
            .from('waitlist')
            .insert([{ email }]);

        if (error) {
            // if unique violation, consider it a success
            if (error.code === '23505') {
                return { success: true };
            }
            return { success: false, error: 'Database error occurred.' };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: 'An unexpected error occurred.' };
    }
}

export async function createDodoCheckout(creditsAmount: number, priceInCents: number) {
    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to purchase credits.");
    }

    if (!process.env.DODO_PAYMENTS_API_KEY) {
        throw new Error("Dodo Payments API key is not configured");
    }

    const { DodoPayments } = await import('dodopayments');
    const dodo = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    });

    try {
        // Create a Dodo Payments payment session
        const session = await dodo.payments.create({
            billing: {
                city: "",
                country: "US", // Defaulting, they will fill it in
                state: "",
                street: "",
                zipcode: "",
            },
            customer: {
                email: user.emailAddresses[0]?.emailAddress || "",
                name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username || "",
            },
            product_cart: [
                {
                    product_id: "prd_credits", // We can use a generic product or just pass price/amount directly if supported.
                    quantity: 1,
                    amount: priceInCents
                }
            ],
            // Embed the clerk user ID in metadata so the webhook knows who to give credits to
            metadata: {
                clerk_user_id: user.id,
                credits_amount: creditsAmount.toString()
            },
            return_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/buy-credits/success`,
        });

        // The Dodo API returns a checkout URL we can redirect the user to
        if (!session.payment_link) {
            throw new Error("Failed to generate checkout link");
        }

        return { success: true, url: session.payment_link };
    } catch (error: any) {
        console.error("Dodo Checkout Error:", error);
        return { success: false, error: error.message || "An unexpected error occurred generating checkout" };
    }
}
