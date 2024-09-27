"use client";

import type React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "~/hooks/use-toast";

interface GuideDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  guideId: string;
}

export const GuideDialog: React.FC<GuideDialogProps> = ({
  isOpen,
  onOpenChange,
  title,
  guideId,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guideId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send guide");
      }

      toast({
        title: "Success!",
        description: "The guide has been sent to your email.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Guide: {title}</DialogTitle>
          <DialogDescription>
            Enter your email to receive the guide.
          </DialogDescription>
          {/* <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Guide"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
