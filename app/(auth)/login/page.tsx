import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import { images } from "@/images/images";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const LoginFormSkeleton = () => {
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
    <div className="grid grid-cols-2 pt-16 border min-h-[calc(100vh-200px)] w-full px-4">
      <Card className="mx-auto w-full max-w-lg h-fit p-6">
        <CardHeader>
          <CardTitle className="">
            <div className="pt-4">
              <div className="text-black font-[950] text-2xl uppercase">
                Sign In
              </div>
            </div>
          </CardTitle>
          <CardDescription className="">
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
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
      <Card className="mx-auto w-full max-w-lg h-fit p-6 border-none bg-transparent shadow-none">
        <CardHeader>
          <CardTitle className="">
            <div className="pt-4">
              <div className="text-black font-[950] text-2xl uppercase text-center">
                Don't have an account yet?
              </div>
              <p className="mt-2 text-center">Register Now it's Free!</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <div className="h-72">
                <Image
                  src={images.mansilhoute}
                  alt="normal user"
                  className="h-full"
                />
              </div>

              <span className="text-center mt-4">
                Create a free user account Now!
              </span>

              <Link href={"/register"} className="mt-4 w-full">
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
              <span className="text-center mt-4">
                Create and get listed as an Escort today!
              </span>
              <Link href={"/register"} className="mt-4 w-full">
                <Button className="w-full">Register as Escort</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
