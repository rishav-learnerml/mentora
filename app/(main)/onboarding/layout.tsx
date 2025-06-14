import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Onboarding - Mentora",
  description:
    "Onboarding page for new users - Complte your profile to get started with Your Mentora Journey",
};

const OnboardingLayout = async ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  const user = await getCurrentUser();
  if (user) {
    if (user.role === "MENTEE") {
      redirect("/mentors");
    } else if (user.role === "MENTOR") {
      if (user.VerificationStatus === "VERIFIED") {
        redirect("/mentor");
      } else {
        redirect("/mentor/verification");
      }
    } else if (user.role === "ADMIN") {
      redirect("/admin");
    }
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 gradient-title">
            Welcome to Mentora
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell us how you want to use the platform
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default OnboardingLayout;
