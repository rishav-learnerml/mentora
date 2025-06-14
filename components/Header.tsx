import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { checkUser } from "@/lib/checkUser";
import { Calendar, CreditCard, ShieldCheck, Trophy, User } from "lucide-react";
import { checkAndAllocateCredits } from "@/actions/credits";
import { Badge } from "./ui/badge";

const Header = async () => {
  const user = await checkUser();

  if (user?.role === "MENTEE") {
    await checkAndAllocateCredits(user);
  }

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
            {/* Admin Links */}
            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Doctor Links */}
            {user?.role === "MENTOR" && (
              <Link href="/mentors">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Mentor Dashboard
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Badge className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Patient Links */}
            {user?.role === "MENTEE" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* Unassigned Role */}
            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
                <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {(!user || user?.role !== "ADMIN") && (
              <Link href={user?.role === "MENTEE" ? "/pricing" : "/mentors"}>
                <Badge
                  variant="outline"
                  className="h-9 bg-cyan-900/20 border-cyan-700/30 px-3 py-1 flex items-center gap-2"
                >
                  <CreditCard className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-cyan-400">
                    {user && user.role !== "ADMIN" ? (
                      <>
                        {user.credits}{" "}
                        <span className="hidden md:inline">
                          {user?.role === "MENTEE"
                            ? "Mentokens"
                            : "Earned Mentokens"}
                        </span>
                      </>
                    ) : (
                      <>Pricing</>
                    )}
                  </span>
                </Badge>
              </Link>
            )}
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
                Welcome, <br />
                {user.name}
              </span>
            )}
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
