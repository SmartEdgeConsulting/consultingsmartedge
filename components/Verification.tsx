"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getClerkErrorMessage } from "@/types/clerk";
import { useState, useCallback } from "react";

interface EmailVerificationProps {
  email: string;
  onBack: () => void;
}

const Verification = ({ email, onBack }: EmailVerificationProps) => {
  const { signUp, setActive } = useSignUp();
  const router = useRouter();

  const [verificationCode, setVerificationCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);

  const handleVerifyCode = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!verificationCode || verificationCode.length !== 6) {
        toast.error("Please enter a valid 6-digit code");
        return;
      }

      if (!signUp) {
        toast.error("Sign up not available");
        return;
      }

      setVerifyingCode(true);

      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: verificationCode,
        });

        if (completeSignUp.status === "complete") {
          if (completeSignUp.createdSessionId && setActive) {
            await setActive({ session: completeSignUp.createdSessionId });
          }
          toast.success("Email verified successfully!");
          router.push("/");
        } else {
          toast.error("Verification incomplete. Please try again.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        const errorMessage = getClerkErrorMessage(err);
        toast.error(errorMessage);
      } finally {
        setVerifyingCode(false);
      }
    },
    [verificationCode, signUp, setActive, router]
  );

  const handleResendCode = useCallback(async () => {
    if (!signUp) {
      toast.error("Sign up not available");
      return;
    }

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast.success("New verification code sent!");
      setVerificationCode("");
    } catch (err) {
      console.error("Resend error:", err);
      toast.error("Failed to resend code. Please try again.");
    }
  }, [signUp]);

  return (
    <main className="min-h-screen flex justify-center items-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We&apos;ve sent a 6-digit verification code to{" "}
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="code">Verification Code</FieldLabel>
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/\D/g, ""))
                }
                disabled={verifyingCode}
                className="text-center text-2xl tracking-widest"
                autoFocus
              />
              <FieldDescription className="text-center">
                The code expires in 10 minutes
              </FieldDescription>
            </Field>

            <Button
              type="submit"
              className="w-full"
              disabled={verifyingCode || verificationCode.length !== 6}
            >
              {verifyingCode ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 px-4 text-sm font-medium border border-border hover:bg-accent hover:text-foreground/90"
                onClick={handleResendCode}
                disabled={verifyingCode}
              >
                Resend code
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 px-4 text-sm font-medium min-w-[120px]"
                onClick={onBack}
                disabled={verifyingCode}
              >
                Back to Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Verification;
