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
import { useRouter } from "next/navigation";
import { getClerkErrorMessage } from "@/types/clerk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpData, signUpSchema } from "@/src/zod/schema";
import Verification from "@/components/Verification";

const SignUpPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [emailForVerification, setEmailForVerification] = useState(""); 


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const onSubmit = async (data: SignUpData) => {
    if (!isLoaded || !signUp) {
      toast.error("Authentication service not ready");
      return;
    }

    try {
      console.log("Form submitted:", data);
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
          phoneNo: data.phoneNo,
        },
      });

      console.log("Sign-up created, status:", signUp.status);

      // Prepare email verification with CODE strategy
      if (signUp.status === "missing_requirements") {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setEmailForVerification(data.email); // Store email for verification

        setVerifying(true);
        toast.success("Verification code sent to your email");
      } else if (signUp.status === "complete") {
        toast.success("Registration completed!");
        await setActive({ session: signUp.createdSessionId });
        router.push("/");
      } else {
        console.warn("Unexpected sign-up status:", signUp.status);
        toast.warning("Please complete the verification process");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = getClerkErrorMessage(err);
      toast.error(errorMessage);
    }
  };

  if (verifying) {
    return (
      <Verification
        email={emailForVerification}
        onBack={() => setVerifying(false)}
      />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="m@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="phoneNo">Phone Number</FieldLabel>
                <Input
                  id="phoneNo"
                  type="tel"
                  {...register("phoneNo")}
                  disabled={isSubmitting}
                  placeholder="+ (234) *** *** ***"
                />
                {errors.phoneNo && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phoneNo.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    disabled={isSubmitting}
                    className="pr-10"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    className="pr-10"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>

              {/* CAPTCHA container */}
              <div id="clerk-captcha"></div>

              <FieldGroup>
                <Field>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
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
