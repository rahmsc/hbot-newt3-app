"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

import type { Database } from "../../../../types/database";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/profile");
      } else {
        setLoading(false);
      }
    };

    void checkAuth();
  }, [router, supabase]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error:", error.message);
      setLoading(false);
    } else {
      router.push("/profile");
    }
  };

  const handleOAuthLogin = async (
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <Card className="w-full max-w-md overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" size="lg">
              Sign in with Email
            </Button>
          </form>

          <div className="my-4 flex w-full items-center">
            <Separator className="flex-grow" />
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <Separator className="flex-grow" />
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => handleOAuthLogin("google")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaGoogle className="mr-2" /> Sign in with Google
            </Button>
            <Button
              onClick={() => handleOAuthLogin("github")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaGithub className="mr-2" /> Sign in with GitHub
            </Button>
            <Button
              onClick={() => handleOAuthLogin("twitter")}
              className="w-full"
              variant="outline"
              size="lg"
            >
              <FaTwitter className="mr-2" /> Sign in with Twitter
            </Button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
