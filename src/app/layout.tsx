import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/Header";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promwin | Coming Soon",
  description: "The premium marketplace for creators to monetize AI prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#facc15", // tailwind yellow-400
              colorTextOnPrimaryBackground: "#000000",
              colorBackground: "#ffffff",
              colorText: "#0f172a", // slate-900
              colorInputBackground: "#f8fafc", // slate-50
              colorInputText: "#0f172a",
              colorShimmer: "#facc15",
            },
            elements: {
              formButtonPrimary:
                "bg-yellow-400 hover:bg-black hover:text-white text-black font-bold uppercase tracking-wider transition-colors border-none",
              card: "shadow-xl border border-slate-100 rounded-2xl",
              headerTitle: "font-bold text-2xl text-slate-900",
              headerSubtitle: "text-slate-500",
              socialButtonsBlockButton: "border-slate-200 text-slate-700 hover:bg-slate-50 font-medium",
              dividerLine: "bg-slate-200",
              dividerText: "text-slate-400",
              formFieldInput: "border-slate-200 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl",
              formFieldLabel: "text-slate-700 font-semibold",
              footerActionLink: "text-yellow-500 hover:text-yellow-600 font-semibold",
            }
          }}
        >
          <Header />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
