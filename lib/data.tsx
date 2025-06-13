import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { FeatureType } from "./types";

// JSON data for features
export const features: FeatureType[] = [
  {
    icon: <User className="h-6 w-6 text-cyan-400" />,
    title: "Build Your Profile",
    description:
      "Sign up and showcase your career interests, skills, and goals to connect with the right mentors.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-cyan-400" />,
    title: "Schedule Sessions",
    description:
      "Browse mentor profiles, check availability, and schedule 1:1 sessions that fit your timeline.",
  },
  {
    icon: <Video className="h-6 w-6 text-cyan-400" />,
    title: "1:1 Video Mentorship",
    description:
      "Get personalized career guidance through live video calls with industry experts and professionals.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-cyan-400" />,
    title: "Flexible Credits",
    description:
      "Use credits to book sessions. Choose a plan that fits your goals and upgrade whenever you grow.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
    title: "Verified Mentors",
    description:
      "Every mentor is vetted based on their industry experience, expertise, and passion to guide.",
  },
  {
    icon: <FileText className="h-6 w-6 text-cyan-400" />,
    title: "Session Notes & Roadmaps",
    description:
      "Access notes, resources, and personalized roadmaps after every mentorship session.",
  },
];

// JSON data for testimonials
export const testimonials = [
  {
    initials: "AK",
    name: "Ananya K.",
    role: "Aspiring Product Manager",
    quote:
      "Mentora helped me connect with a mentor from Google. I finally know what to focus on and how to approach interviews!",
  },
  {
    initials: "RM",
    name: "Rohit M.",
    role: "Mentor, Engineering Manager",
    quote:
      "I love mentoring on Mentora. It’s rewarding to share my journey and help others break into tech.",
  },
  {
    initials: "LS",
    name: "Lalit S.",
    role: "Software Developer",
    quote:
      "Mentora’s credit system makes it so easy. I just book sessions when I need them — no long-term commitments.",
  },
];

// JSON data for credit system benefits
export const creditBenefits = [
  "Each mentorship session costs <strong class='text-cyan-400'>2 credits</strong> — simple and transparent",
  "Credits <strong class='text-cyan-400'>never expire</strong> — use them whenever you're ready to grow",
  "Monthly plans give you <strong class='text-cyan-400'>fresh credits every month</strong>",
  "Pause, cancel, or change your plan <strong class='text-cyan-400'>anytime</strong> — no questions asked",
];
