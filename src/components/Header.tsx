"use client";

import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";

export function Header() {
    const { user } = useUser();

    return (
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
    );
}
