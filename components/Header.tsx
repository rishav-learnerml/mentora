'use client';

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-transparent.png"
            width={250}
            height={20}
            className="h-15 w-auto object-contain"
            alt="mentora-logo"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton>
              <Button variant="secondary">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
            {user && (
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                Welcome, <br />{user.username || user.firstName || user.emailAddresses[0]?.emailAddress}
              </span>
            )}
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
