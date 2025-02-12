import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function SubmitPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden sm:h-[350px] md:h-[400px]">
        <Image
          src="/wellness-product-images/provider-banner.png"
          alt="Hyperbaric Oxygen Therapy Providers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Content container with margins */}
        <div className="container relative flex h-full flex-col justify-end p-6">
          <div className="mb-4 flex gap-2">
            <Badge
              variant="default"
              className="bg-emerald-700 backdrop-blur-sm"
            >
              Providers
            </Badge>
            <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
              HBOT
            </Badge>
          </div>
          <h1 className="mb-2 font-['Raleway'] text-2xl font-bold tracking-wider text-white sm:text-3xl md:text-4xl">
            SUBMIT YOUR BUSINESS
          </h1>
          <p className="line-clamp-2 text-sm text-gray-200 sm:text-base md:text-lg">
            Join our network of verified hyperbaric oxygen therapy providers.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-8">
        <Card className="border-0 shadow-none">
          <CardHeader className="space-y-2 text-center">
            {/* You can replace this with your actual logo */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-lg bg-black">
              <span className="text-lg font-bold text-white">Logo</span>
            </div>
            <h2 className="text-2xl font-bold">Add My Business</h2>
            <p className="text-muted-foreground">
              Complete the form to submit your business for approval
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              <div className="space-y-4">
                <Label>Type of Business</Label>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {[
                    "Wellness Centre",
                    "Hospital",
                    "Medical Practice",
                    "Chiropractor",
                    "Physiotherapist",
                    "Gym",
                    "Other",
                  ].map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      className="h-auto justify-start px-4 py-4"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Business Name</Label>
                    <Input
                      id="legalName"
                      placeholder="Enter legal business name"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Your Role</Label>
                <RadioGroup defaultValue="owner" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="owner" />
                    <Label htmlFor="owner">Owner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="employee" />
                    <Label htmlFor="employee">Employee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="agency" id="agency" />
                    <Label htmlFor="agency">Agency</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="authorization"
                    className="mt-1"
                    required
                  />
                  <Label
                    htmlFor="authorization"
                    className="text-sm leading-none"
                  >
                    I have the legal authorisation to represent this business
                    and provide the verification documents if requested.
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2B5741] hover:bg-[#1e3d2d]"
                size="lg"
              >
                Submit Application
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4">
                  Terms of Use
                </Link>{" "}
                and our{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="space-y-6 rounded-lg border p-4">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">Verify Business</h3>
                    <p className="text-sm text-muted-foreground">
                      Once your application is approved, you will be contacted
                      to verify your business and identification.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium">2</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium">
                      Assessment & Scoring
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your business will be assessed, scored and listed. On
                      approval representatives may be sent to assess your
                      equipment safety, protocols and support which will also
                      reflect in rating assessment.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
