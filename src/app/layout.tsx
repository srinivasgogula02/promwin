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
              colorBackground: "#000000", // Pure black for the page background
              colorInputBackground: "#0a0a0a", // Very dark grey for inputs/cards
              colorInputText: "#ffffff", // Pure white text
            },
            elements: {
              card: "shadow-[0_0_40px_rgba(250,204,21,0.05)] border border-white/10 rounded-2xl bg-[#0a0a0a]", // Subtle yellow glow + sharp border
              headerTitle: "font-bold text-2xl text-white tracking-tight",
              headerSubtitle: "text-slate-400",
              formButtonPrimary:
                "bg-yellow-400 hover:bg-white text-black font-bold uppercase tracking-wider transition-colors border-none", // Hovering to white feels premium
              socialButtonsBlockButton: "border-white/10 bg-transparent text-white hover:bg-white/5 font-medium transition-colors",
              dividerLine: "bg-white/10",
              dividerText: "text-slate-500",
              formFieldInput: "border-white/10 bg-[#000000] focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 rounded-xl text-white", // Pitch black inputs
              formFieldLabel: "text-slate-300 font-medium",
              footerActionLink: "text-yellow-400 hover:text-yellow-300 font-semibold transition-colors",
              userPreviewMainIdentifier: "text-white font-semibold",
              userPreviewSecondaryIdentifier: "text-slate-400",
              profileSectionTitleText: "text-white font-semibold",
              profileSectionContent: "border-white/10",
              navbarButton: "text-slate-400 hover:text-white transition-colors",
              breadcrumbsItem: "text-slate-400 hover:text-white transition-colors",
              badge: "bg-white/10 text-white border-white/10",
              scrollBox: "bg-[#0a0a0a]",
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
