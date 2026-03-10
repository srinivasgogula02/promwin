import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "lucide-react";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promwin | Coming Soon",
  description: "The premium marketplace for creators to monetize AI prompts.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-end items-center p-4 gap-4 absolute top-0 w-full z-10">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton>
                <UserButton.MenuItems>
                  {user?.username && (
                    <UserButton.Link
                      label="Profile"
                      labelIcon={<User size={16} />}
                      href={`/${user.username}`}
                    />
                  )}
                  <UserButton.Action label="manageAccount" />
                  <UserButton.Action label="signOut" />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
