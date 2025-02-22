"use client";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "~/utils/supabase/client";
import { signout } from "~/app/(auth)/auth/login/action";

interface LoginButtonProps {
  className?: string;
}

const LoginButton = ({ className }: LoginButtonProps) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, [supabase.auth]);

  if (user) {
    return (
      <Button
        className={className}
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => {
        router.push("/auth/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
