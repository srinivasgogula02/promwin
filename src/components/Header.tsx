"use client";

import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

import Link from "next/link";

export function Header() {
    const { user } = useUser();

    return (
        <header className="flex justify-between items-center p-6 absolute top-0 w-full z-10">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
                Promwin
            </Link>

            <div className="flex items-center gap-4">
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
            </div>
        </header>
    );
}
