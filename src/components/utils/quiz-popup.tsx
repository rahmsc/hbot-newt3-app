"use client";

import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function QuizPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"quiz" | "email" | "thanks">("quiz");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 6000); // 30000 milliseconds = 30 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleQuizSubmit = () => {
    if (quizAnswer) {
      setStep("email");
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your server
      console.log("Email submitted:", email);
      setStep("thanks");
    }
  };

  const quizQuestion = "Have you ever tried any wellness services?";
  const quizOptions = ["Hyperbaric Oxygen", "Float Tanks", "Therapy", "Other"];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === "thanks" ? "Thank You!" : "Quick Question"}
          </DialogTitle>
          <DialogDescription>
            {step === "thanks"
              ? "We appreciate your participation."
              : "We'd love to hear from you!"}
          </DialogDescription>
        </DialogHeader>
        {step === "quiz" && (
          <div className="grid gap-4 py-4">
            <Label>{quizQuestion}</Label>
            <RadioGroup value={quizAnswer ?? ""} onValueChange={setQuizAnswer}>
              {quizOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="col-span-4">
                Enter your email to receive our newsletter:
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-4"
                type="email"
                required
              />
            </div>
          </form>
        )}
        {step === "thanks" && (
          <div className="py-4">
            <p>Your response has been recorded. We&apos;ll be in touch soon!</p>
          </div>
        )}
        <DialogFooter>
          {step === "quiz" && (
            <Button onClick={handleQuizSubmit} disabled={!quizAnswer}>
              Next
            </Button>
          )}
          {step === "email" && (
            <Button onClick={handleEmailSubmit} disabled={!email}>
              Subscribe
            </Button>
          )}
          {step === "thanks" && (
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
