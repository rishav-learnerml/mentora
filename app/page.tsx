import Pricing from "@/components/Pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { ArrowRight, Check, CirclePoundSterling } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-cyan-700/30 border-cyan-500/30 px-4 py-2 text-cyan-300 font-md text-sm"
              >
                <Link href="/pricing">One Click Mentorship</Link>
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white">
                Connect with mentors <br />{" "}
                <span className="gradient-title">anytime, anywhere</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Cut the noise — learn from people who’ve actually made it. No
                vague advice, just real talk to help you grow, land the role,
                and level up with clarity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-cyan-700/30 hover:bg-muted/80"
                >
                  <Link href="/doctors">Find Mentors</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/banner-transparent.png"
                alt="mentor-image"
                fill
                priority
                className="object-contain md:pt-14"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes Mentorship accessible with just a few clicks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index: number) => (
              <Card
                key={index}
                className="bg-cyan-900/20 hover:bg-cyan-800/40 transition-all duration-300"
              >
                <CardHeader className="pb-2">
                  <div className="bg-cyan-900/20 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-700/30 border-cyan-700/30 px-4 py-1 text-cyan-400 text-sm font-medium mb-4">
              Affordable Mentorships
            </Badge>
            <h2 className="text-3xl md:4xl font-bold text-white mb-4">
              Mentorship Plans
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the mentorship plan that aligns perfectly with your growth
              journey.
            </p>
          </div>

          <div>
            {/* Pricing Table */}

            <Pricing />

            <Card className="mt-12 bg-muted/20 border-cyan-900/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <CirclePoundSterling className="h-5 w-5 mr-2 text-cyan-400" />
                  How Mentokens Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {creditBenefits.map((benefit, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 bg-cyan-900/20 p-1 rounded-full">
                        <Check className="h-4 w-4 text-cyan-400" />
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="bg-cyan-700/30 border-cyan-700/30 px-4 py-1 text-cyan-400 text-sm font-medium mb-4"
            >
              Success Stories
            </Badge>
            <h2 className="text-3xl md:4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from Mentors and Mentees who use our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index: number) => (
              <Card
                key={index}
                className="bg-cyan-900/20 hover:bg-cyan-800/40 transition-all duration-300"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-900/20 flex items-center justify-center mr-4">
                      <span className="text-cyan-400 font-bold">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-cyan-900/30 to-cyan-950/20 border-cyan-800/20">
            <CardContent className="p-8 md:p-12 lg:p-14 relative overflow-hidden">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-6">
                  <h2>Ready to take control of your career?</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-8">
                  Unlock guidance from top industry professionals, gain
                  real-world insights, and move one step closer to your dream
                  role — all with personalized mentorship that fits your goals.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-cyan-600 text-white hover:bg-cyan-700"
                >
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-cyan-700/30 hover:bg-muted/80"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
