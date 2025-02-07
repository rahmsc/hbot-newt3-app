"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type React from "react"; // Added import for React
import { useState } from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

import type { Database } from "../../../../types/database";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error:", error.message);
    } else {
      router.push("/auth/check-email");
    }
    setLoading(false);
  };

  const handleOAuthSignUp = async (
    provider: "google" | "github" | "twitter",
  ) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up with Email"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => handleOAuthSignUp("google")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaGoogle className="mr-2" /> Sign up with Google
            </Button>
            <Button
              onClick={() => handleOAuthSignUp("github")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaGithub className="mr-2" /> Sign up with GitHub
            </Button>
            <Button
              onClick={() => handleOAuthSignUp("twitter")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaTwitter className="mr-2" /> Sign up with Twitter
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
