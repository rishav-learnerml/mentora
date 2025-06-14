"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function setUserRole(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // find user in db
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found in Database");
  }

  const role = formData.get("role") as string;
  if (!role || (role !== "MENTOR" && role !== "MENTEE")) {
    throw new Error("Invalid role selected");
  }

  try {
    if (role === "MENTEE") {
      // Update user role to MENTOR
      await db.user.update({
        where: { clerkUserId: userId },
        data: { role: "MENTEE" },
      });
      revalidatePath("/");
      return {
        success: true,
        redirect: "/mentors",
      };
    }
    if (role === "MENTOR") {
      const speciality = formData.get("speciality") as string;
      const experience = parseInt(formData.get("experience") as string, 10);
      const linkedinUrl = formData.get("linkedinUrl") as string;
      const description = formData.get("description") as string;

      if (!speciality || !experience || !linkedinUrl || !description) {
        throw new Error("All fields are required for MENTOR role");
      }

      await db.user.update({
        where: { clerkUserId: userId },
        data: {
          role: "MENTOR",
          speciality,
          experience,
          linkedinUrl,
          description,
          verificationStatus: "PENDING",
        },
      });
      revalidatePath("/");
      return {
        success: true,
        redirect: "/mentor/verification",
      };
    }
  } catch (error) {
    console.error("Error setting user role:", error);
    throw new Error("Failed to set user role");
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
