"use client";

import { useState } from "react";
import { createDodoCheckout } from "@/app/actions";
import { Zap, Loader2 } from "lucide-react";

export function CheckoutButton({ credits, priceInCents, priceStr, recommended }: { credits: number, priceInCents: number, priceStr: string, recommended?: boolean }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const res = await createDodoCheckout(credits, priceInCents);

            if (!res.success) {
                alert(`Error: ${res.error}`);
                setIsLoading(false);
                return;
            }

            if (res.url) {
                // Redirect user to Dodo Payments Checkout UI
                window.location.href = res.url;
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${recommended
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-900"
                }`}
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
            ) : (
                <>
                    Buy for {priceStr}
                </>
            )}
        </button>
    );
}
