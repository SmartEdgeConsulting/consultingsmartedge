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

import React from "react";

const LoginPage = () => {
  return (
    <main className="min-h-screen flex justify-center items-center mt-16 py-20">
      <Card className="w-full max-w-sm px-2.5">
        <CardHeader>
          <CardTitle className="text-primary">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-primary">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-primary">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-xs text-blue-600 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required placeholder="********" />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="darkoutline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="sign-up" className="text-blue-600">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
