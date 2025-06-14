"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

const PLAN_CREDITS = {
  free_user: 0,
  standard: 10,
  premium: 30,
};

const APPPOINTMENT_CREDIT_COST = 2;

export const checkAndAllocateCredits = async (user: any) => {
  try {
    if (!user) {
      console.error("No user found");
      return null;
    }

    if (user.role !== "MENTEE") {
      console.error("User is not a Mentee");
      return user;
    }

    const { has } = await auth();

    console.log(has, "has");

    const hasBasic = has({ plan: "free_user" });
    const hasStandard = has({ plan: "achiever" });
    const hasPremium = has({ plan: "super" });

    let currentPlan = null;
    let creditsToAllocate = 0;

    if (hasPremium) {
      currentPlan = "premium";
      creditsToAllocate = PLAN_CREDITS.premium;
    } else if (hasStandard) {
      currentPlan = "standard";
      creditsToAllocate = PLAN_CREDITS.standard;
    } else if (hasBasic) {
      currentPlan = "free_user";
      creditsToAllocate = PLAN_CREDITS.free_user;
    }

    if (!currentPlan) {
      console.error("User does not have a valid plan");
      return user;
    }
    // Check if the user already has credits allocated for this month
    const currentMonth = format(new Date(), "yyyy-MM");
    if (user.transactions.length > 0) {
      const lastTransaction = user.transactions[0];
      const lastTransactionMonth = format(
        new Date(lastTransaction.createdAt),
        "yyyy-MM"
      );
      const transactionPlan = lastTransaction.packageId;

      if (
        lastTransactionMonth === currentMonth &&
        transactionPlan === currentPlan
      ) {
        console.log("Credits already allocated for this month");
        return user;
      }

      const updatedUser = await db.$transaction(async (tx: any) => {
        await tx.creditTransaction.create({
          data: {
            userId: user.id,
            type: "CREDIT_PURCHASE",
            packageId: currentPlan,
            amount: creditsToAllocate,
          },
        });

        const updatedUser = await tx.user.update({
          where: { id: user.id },
          data: {
            credits: {
              increment: creditsToAllocate,
            },
          },
        });
        return updatedUser;
      });

      revalidatePath("/mentors");
      revalidatePath("/appointments");

      return updatedUser;
    }
  } catch (error) {
    console.error("Error checking or allocating credits:", error);
  }
};
