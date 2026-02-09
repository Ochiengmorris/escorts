import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
  const RegisterFormSkeleton = () => {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
    );
  };
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 py-16 border min-h-[calc(100vh-200px)] w-full px-4 h-full">
      <Card className="mx-auto w-full max-w-lg h-fit p-6">
        <CardHeader>
          <CardTitle className="">
            <div className="pt-4">
              <div className="text-black font-[950] text-2xl uppercase">
                Sign Up
              </div>
            </div>
          </CardTitle>
          <CardDescription className="">
            Enter your email and password to sign up your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<RegisterFormSkeleton />}>
            <RegisterForm />
          </Suspense>

          <div className="mt-4 text-center text-xs">
            Developed by{" "}
            <Link
              href="https://mjonline.co.ke"
              target="_blank"
              className="underline"
            >
              JohnMorris
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* right side  */}
      <Card className="mx-auto w-full flex flex-col justify-center border-none max-w-lg h-fit p-6 bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="">
            <div className="pt-4">
              <div className="text-black font-[950] text-2xl uppercase text-center">
                Already have an account?
              </div>
              <p className="mt-2 text-center">Login to your account.</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="mt-4">
            <Link href="/login" className="mt-4 w-full">
              <Button
                variant={"outline"}
                className="w-full font-bold text-xs md:text-sm"
              >
                LOGIN
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
