"use client";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const CustomError = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            {error === "CredentialsSignin"
              ? "Invalid credentials. Please try again."
              : "An error occurred during authentication."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/">Back to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const ErrorPage = () => (
  <Suspense
    fallback={
      <div className="text-[#90A3BF] flex justify-center mt-5 bg-[#F6F7F9]">
        Loading...
      </div>
    }
  >
    <CustomError />
  </Suspense>
);

export default ErrorPage;