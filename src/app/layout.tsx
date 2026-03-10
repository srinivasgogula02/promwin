import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
            baseTheme: dark,
            variables: {
              colorPrimary: "#facc15", // yellow-400
              colorTextOnPrimaryBackground: "#000000",
              colorBackground: "#0f172a", // slate-900 (matches app dark vibe)
              colorInputBackground: "#1e293b", // slate-800
              colorInputText: "#f8fafc", // slate-50
            },
            elements: {
              card: "shadow-2xl border border-slate-800 rounded-2xl",
              headerTitle: "font-bold text-2xl text-white",
              headerSubtitle: "text-slate-400",
              formButtonPrimary:
                "bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider transition-colors border-none",
              socialButtonsBlockButton: "border-slate-800 text-slate-300 hover:bg-slate-800 font-medium",
              dividerLine: "bg-slate-800",
              dividerText: "text-slate-500",
              formFieldInput: "border-slate-700 bg-slate-900 focus:border-yellow-400 focus:ring-yellow-400 rounded-xl",
              formFieldLabel: "text-slate-300 font-semibold",
              footerActionLink: "text-yellow-400 hover:text-yellow-500 font-semibold",
              userPreviewMainIdentifier: "text-white font-semibold",
              userPreviewSecondaryIdentifier: "text-slate-400",
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
