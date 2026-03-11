import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
    title: "Payment Successful | Promwin",
};

export default function BuyCreditsSuccessPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-8">
                <CheckCircle size={48} className="text-green-500" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                Payment Successful!
            </h1>

            <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10 font-medium leading-relaxed">
                Thank you for your purchase. Your credits are being securely provisioned to your account. It may take a few seconds for them to reflect in your balance.
            </p>

            <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-black hover:text-white text-black font-bold uppercase tracking-widest rounded-xl transition-all duration-300"
            >
                Return Home
            </Link>
        </div>
    );
}
