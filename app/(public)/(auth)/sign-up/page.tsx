"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { toast } from "sonner";
import Link from "next/link";
import { getClerkErrorMessage } from "@/types/clerk"; 

interface SignUpFormData {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const { isLoaded, signUp } = useSignUp();

  // Form State
  const [userData, setUserData] = useState<SignUpFormData>({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded || !signUp) {
      toast.error("Authentication service not ready");
      setLoading(false);
      return;
    }

    // Client-side validations
    if (userData.password !== userData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (userData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      // Split name into first and last name
      const nameParts = userData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Create sign-up with Clerk
      await signUp.create({
        emailAddress: userData.email,
        password: userData.password,
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
          phoneNo: userData.phoneNo,
        },
      });

      console.log("Sign-up created, status:", signUp.status);

      // Prepare email verification
      if (signUp.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: `${window.location.origin}/sign-up/verify`,
        });

        setVerifying(true);
        toast.success("Check your email for the verification link");
      } else if (signUp.status === "complete") {
        toast.success("Registration completed!");
        // Handle immediate completion if needed
      } else {
        console.warn("Unexpected sign-up status:", signUp.status);
        toast.warning("Please complete the verification process");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = getClerkErrorMessage(err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  if (verifying) {
    return (
      <main className="min-h-screen flex justify-center items-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification link to{" "}
              <strong>{userData.email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Click the link in the email to verify your account. The link
              expires in 10 mins.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setVerifying(false)}
            >
              Back to Sign Up
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex justify-center items-center mt-16 py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm px-2.5">
        <CardHeader>
          <CardTitle className="text-primary">Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                  value={userData.name}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  disabled={loading}
                  value={userData.email}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phoneNo">Phone Number</FieldLabel>
                <Input
                  id="phoneNo"
                  type="tel"
                  name="phoneNo"
                  required
                  disabled={loading}
                  placeholder="+ (234) *** *** ***"
                  value={userData.phoneNo}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={loading}
                    className="pr-10"
                    placeholder="Min. 8 characters"
                    value={userData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    disabled={loading}
                    className="pr-10"
                    placeholder="Re-enter password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              {/* CAPTCHA container */}
              <div id="clerk-captcha"></div>

              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  <FieldDescription className="px-6 text-center mt-4">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default SignUpPage;