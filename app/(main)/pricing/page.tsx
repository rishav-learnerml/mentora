import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Pricing from "@/components/Pricing";

export default async function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex justify-start mb-2">
        <Link
          href="/"
          className="flex items-center text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-full mx-auto mb-12 text-center">
        <Badge
          variant="outline"
          className="bg-cyan-900/30 border-cyan-700/30 px-4 py-1 text-cyan-400 text-sm font-medium mb-4"
        >
          Affordable Mentorships
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold gradient-title mb-4">
          Simple, Transparent Pricing
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect mentorship package that fits your career
          needs with no hidden fees or long-term commitments
        </p>
      </div>

      {/* Pricing Table Section */}
      <Pricing />

      <div className="max-w-3xl mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Questions? We're Here to Help
        </h2>
        <p className="text-muted-foreground mb-4">
          Contact our support team at support@mentora.com
        </p>
      </div>
    </div>
  );
}