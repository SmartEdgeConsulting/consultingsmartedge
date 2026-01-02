"use client";

import { useEffect, useState } from "react";
import { useSignUp, useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VerificationStatus = "loading" | "success" | "error";

const VerifyEmailPage = () => {
  const { isLoaded: signUpLoaded, signUp, setActive } = useSignUp();
  const { isLoaded: userLoaded, isSignedIn } = useUser();
  const { client } = useClerk();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showResendForm, setShowResendForm] = useState(false);
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const addDebug = (message: string) => {
    console.log(message);
    setDebugInfo((prev) => [...prev, message]);
  };

  // resend email verification link 
  const handleResendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResending(true);
    try {
      // Create a new sign-up attempt with the email
      const newSignUp = await client.signUp.create({
        emailAddress: email,
      });

      // Send the verification email
      await newSignUp.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: `${window.location.origin}/sign-up/verify`,
      });

      toast.success("Verification email sent! Please check your inbox.");
      setShowResendForm(false);
    } catch (err) {
      console.error("Resend error:", err);
      const clerkError = err as {
        errors?: Array<{
          message: string;
          code?: string;
        }>;
      };

      const errorCode = clerkError.errors?.[0]?.code;
      const errorMsg = clerkError.errors?.[0]?.message || "Failed to resend email";

      if (errorCode === "form_identifier_exists") {
        toast.info("Account already exists. Try logging in instead.");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (!signUpLoaded || !userLoaded) {
      return;
    }

    if (signUp) {
      addDebug(`Sign-up status: ${signUp.status}`);
      addDebug(
        `Verification status: ${signUp.verifications?.emailAddress?.status}`
      );
      // Pre-fill email if available
      if (signUp.emailAddress) {
        setEmail(signUp.emailAddress);
      }
    }

    const handleVerification = async () => {
      try {
        // Case 1: user is already signed in
        if (isSignedIn) {
          setVerificationStatus("success");
          toast.success("Email verified successfully!");

          setTimeout(() => {
            router.push("/");
          }, 1500);
          return;
        }

        // Case 2: No sign-up session exists
        if (!signUp) {
          setVerificationStatus("error");
          toast.error("Session not found. Please sign up again.");
          return;
        }

        // Case 3: Check current verification status
        const emailVerification = signUp.verifications?.emailAddress;

        // If already verified, just create session
        if (emailVerification?.status === "verified") {
          if (signUp.createdSessionId) {
            await setActive({ session: signUp.createdSessionId });
            setVerificationStatus("success");
            toast.success("Email verified successfully!");

            setTimeout(() => {
              router.push("/");
            }, 1500);
          } else {
            setVerificationStatus("error");
            toast.warning("Could not create session. Please try logging in.");
          }
          return;
        }

        // Case 4: Need to complete verification
        if (
          signUp.status === "missing_requirements" ||
          signUp.status === "abandoned"
        ) {
          try {
            const result = await signUp.attemptEmailAddressVerification({
              code: "",
            });

            if (result.status === "complete") {
              if (result.createdSessionId) {
                await setActive({ session: result.createdSessionId });

                setVerificationStatus("success");
                toast.success("Email verified successfully!");

                setTimeout(() => {
                  router.push("/");
                }, 1500);
              } else {
                setVerificationStatus("error");
                toast.warning(
                  "Verification completed but session creation failed. Please try logging in."
                );
              }
            } else {
              setVerificationStatus("error");
              toast.error(
                `Verification status: ${result.status}. Please try again.`
              );
            }
          } catch (verifyError) {
            addDebug(`❌ Verification error: ${JSON.stringify(verifyError)}`);
            throw verifyError;
          }
          return;
        }

        // Case 5: Sign-up already complete
        if (signUp.status === "complete") {
          if (signUp.createdSessionId) {
            await setActive({ session: signUp.createdSessionId });
            setVerificationStatus("success");
            toast.success("Already verified! Redirecting...");

            setTimeout(() => {
              router.push("/");
            }, 1500);
          } else {
            setVerificationStatus("error");
            toast.warning("Please try logging in with your credentials.");
          }
          return;
        }

        // Case 6: Unexpected status
        addDebug(`⚠️ Unexpected sign-up status: ${signUp.status}`);
        setVerificationStatus("error");
        setErrorMessage(
          `Unexpected status: ${signUp.status}. Please contact support.`
        );
      } catch (err) {
        addDebug(`❌ Error caught: ${JSON.stringify(err)}`);
        console.error("Verification error:", err);

        const clerkError = err as {
          errors?: Array<{
            message: string;
            code?: string;
            longMessage?: string;
          }>;
        };

        const errorCode = clerkError.errors?.[0]?.code;
        const errorMsg =
          clerkError.errors?.[0]?.message || "Verification failed";

        addDebug(`Error code: ${errorCode}`);
        addDebug(`Error message: ${errorMsg}`);

        if (
          errorCode === "form_identifier_exists" ||
          errorMsg.includes("exists")
        ) {
          setVerificationStatus("success");
          toast.success("Account already exists! Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else if (errorCode === "verification_expired") {
          setVerificationStatus("error");
          setErrorMessage(
            "Verification link expired. Please request a new one."
          );
          toast.error("Link expired");
        } else {
          setVerificationStatus("error");
          setErrorMessage(errorMsg);
          toast.error(errorMsg);
        }
      }
    };

    handleVerification();
  }, [signUpLoaded, userLoaded, isSignedIn, signUp, setActive, router, client]);

  const isDev = process.env.NODE_ENV === "development";

  if (!signUpLoaded || !userLoaded || verificationStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying your email
            </CardTitle>
            <CardDescription>
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
          {isDev && debugInfo.length > 0 && (
            <CardContent>
              <div className="bg-muted p-3 rounded-md">
                <p className="text-xs font-semibold mb-2">Debug Info:</p>
                <div className="space-y-1 text-xs font-mono">
                  {debugInfo.map((info, idx) => (
                    <div key={idx}>{info}</div>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    );
  }

  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
              Email verified!
            </CardTitle>
            <CardDescription>
              Your account has been successfully created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            Verification failed
          </CardTitle>
          <CardDescription>
            We couldn&apos;t verify your email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showResendForm ? (
            <>
              <p className="text-sm text-muted-foreground">
                {errorMessage ||
                  "The verification link may have expired or is invalid."}
              </p>

              <div className="space-y-2">
                <Button
                  onClick={() => setShowResendForm(true)}
                  className="w-full"
                  variant="default"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Resend Verification Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-up")}
                  className="w-full"
                >
                  Back to Sign Up
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/login")}
                  className="w-full"
                >
                  Try Logging In
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isResending}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the email you used to sign up
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleResendVerification}
                  className="w-full"
                  disabled={isResending}
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Verification Email
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowResendForm(false)}
                  className="w-full"
                  disabled={isResending}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;