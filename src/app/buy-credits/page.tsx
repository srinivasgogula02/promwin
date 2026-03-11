import { CheckoutButton } from "@/components/CheckoutButton";
import { Zap, ShieldCheck, ZapIcon } from "lucide-react";

export const metadata = {
    title: "Buy Credits | Promwin",
    description: "Purchase credits to unlock premium AI prompts on Promwin.",
};

export default function BuyCreditsPage() {
    const plans = [
        {
            name: "Starter",
            credits: 1000,
            priceCents: 500, // $5.00
            priceStr: "$5",
            description: "Perfect for exploring a few premium prompts.",
        },
        {
            name: "Pro",
            credits: 5000,
            priceCents: 2000, // $20.00
            priceStr: "$20",
            description: "Most popular. Great for active creators.",
            recommended: true,
        },
        {
            name: "Elite",
            credits: 20000,
            priceCents: 5000, // $50.00
            priceStr: "$50",
            description: "For power users executing complex daily logic.",
        }
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold text-sm mb-6">
                    <Zap size={16} className="fill-yellow-500 text-yellow-600" />
                    Power up your prompts
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                    Get more Credits
                </h1>
                <p className="text-lg text-slate-500 max-w-xl mx-auto mb-16">
                    Credits are used to run advanced, hidden AI prompt structures directly in the browser. 1 credit ≈ 1 standard generation.
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col p-8 rounded-3xl border ${plan.recommended
                                    ? "border-yellow-400 shadow-2xl scale-105 bg-white z-10"
                                    : "border-slate-100 bg-slate-50 shadow-sm"
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                    Recommended
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Zap className="text-yellow-500 fill-yellow-500" size={24} />
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {plan.credits.toLocaleString()}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mb-8 h-10">
                                {plan.description}
                            </p>

                            <div className="mt-auto">
                                <CheckoutButton
                                    credits={plan.credits}
                                    priceInCents={plan.priceCents}
                                    priceStr={plan.priceStr}
                                    recommended={plan.recommended}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
                    <ShieldCheck size={16} />
                    <span>Secure payments processed globally by Dodo Payments.</span>
                </div>
            </div>
        </div>
    );
}
