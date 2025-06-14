"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Loader2, User } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SPECIALTIES } from "@/lib/specialities";

const mentorFormSchema = z.object({
  linkedinUrl: z
    .string()
    .url("Invalid LinkedIn URL")
    .min(1, "LinkedIn URL is required"),
  description: z
    .string()
    .min(20, "Description is required")
    .max(1000, "Description cannot exceed 500 characters"),
  speciality: z.string().min(1, "Minimum 1 Speciality is required"),
  experience: z
    .number()
    .min(0, "Experience must be a positive number")
    .max(70, "Experience cannot exceed 50 years"),
});

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");

  const { data, fn: submitUserRole, loading } = useFetch(setUserRole);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      speciality: "",
      experience: undefined,
      linkedinUrl: "",
      description: "",
    },
  });

  const specialityValue = watch("speciality");

  const handleMenteeSelection = async () => {
    if (loading) return;

    const formData: FormData = new FormData();
    formData.append("role", "MENTEE");

    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && (data as any).success) {
      toast.success("Role Selected");
      router.push((data as any).redirect);
    }
  }, [data]);

  // Added missing onDoctorSubmit function
  const onMentorSubmit = async (data: any) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "MENTOR");
    formData.append("speciality", data.speciality);
    formData.append("experience", data.experience.toString());
    formData.append("linkedinUrl", data.linkedinUrl);
    formData.append("description", data.description);

    await submitUserRole(formData);
  };

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="border-cyan-900/20 hover:border-cyan-700/40 cursor-pointer transition-all"
          onClick={() => !loading && handleMenteeSelection()}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-cyan-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-cyan-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Mentee
            </CardTitle>
            <CardDescription className="mb-4">
              Book appointments with your mentors, get guidance and achieve your
              career goals
            </CardDescription>
            <Button
              className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue as Mentee"
              )}
            </Button>
          </CardContent>
        </Card>
        <Card
          onClick={() => !loading && setStep("mentor-form")}
          className="border-cyan-900/20 hover:border-cyan-700/40 cursor-pointer transition-all"
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-cyan-900/20 rounded-full mb-4">
              <Award className="h-8 w-8 text-cyan-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Mentor
            </CardTitle>
            <CardDescription className="mb-4">
              Become the mentor you once needed. Help others grow with every
              session.
            </CardDescription>
            <Button
              className="w-full mt-2 bg-cyan-600 hover:bg-cyan-700"
              disabled={loading}
            >
              Continue as a Mentor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "mentor-form") {
    return (
      <Card className="border-cyan-900/20">
        <CardContent className="pt-6">
          <div className="mb-6">
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Complete Your Mentor Profile
            </CardTitle>
            <CardDescription>
              Please provide your professional details for verification
            </CardDescription>
          </div>

          <form onSubmit={handleSubmit(onMentorSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="speciality">Mentor speciality</Label>
              <Select
                value={specialityValue}
                onValueChange={(value) => setValue("speciality", value)}
              >
                <SelectTrigger id="speciality">
                  <SelectValue placeholder="Select your speciality" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => (
                    <SelectItem
                      key={spec.name}
                      value={spec.name}
                      className="flex items-center gap-2"
                    >
                      <span className="text-cyan-400">{spec.icon}</span>
                      {spec.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.speciality && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.speciality.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g. 5"
                {...register("experience", { valueAsNumber: true })}
              />
              {errors.experience && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Url</Label>
              <Input
                id="linkedinUrl"
                type="url"
                placeholder="https://www.linkedin.com/your-username"
                {...register("linkedinUrl")}
              />
              {errors.linkedinUrl && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.linkedinUrl.message}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Please provide a link to your Linkedin Profile for verification
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Your Services</Label>
              <Textarea
                id="description"
                placeholder="Describe your expertise, services, and approach to mentees..."
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm font-medium text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose-role")}
                className="border-cyan-900/30"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return <div></div>;
};

export default OnboardingPage;
