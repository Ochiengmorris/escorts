import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import RegisterForm from "@/app/auth/register/RegisterForm";
import Image from "next/image";
import { images } from "@/images/images";
import { Button } from "@/components/ui/button";

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
    <div className="grid grid-cols-2 pt-16 border min-h-[calc(100vh-200px)] w-full px-4 h-full">
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
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div> */}
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
          {/* <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <div className="h-72">
                <Image
                  src={images.mansilhoute}
                  alt="normal user"
                  className="h-full"
                />
              </div>

              <span className="text-center mt-4">Login as User</span>

              <Link href={"/auth/register"} className="mt-4 w-full">
                <Button variant={"outline"} className="w-full">
                  Register as User
                </Button>
              </Link>
            </div>
            <div className="flex flex-col">
              <div className="h-72">
                <Image
                  src={images.Silhoute1}
                  alt="advertiser user"
                  className="h-full"
                />
              </div>
              <span className="text-center mt-4">Login as Escort</span>
              <Link href={"/auth/register"} className="mt-4 w-full">
                <Button className="w-full">Register as Escort</Button>
              </Link>
            </div>
          </div> */}
          <div className="mt-4">
            <Link href="/auth/login" className="mt-4 w-full">
              <Button variant={"outline"} className="w-full">
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
