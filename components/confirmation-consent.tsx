"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { images } from "@/images/images";

const ConsentAsk = () => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  return (
    <div
      className={cn(
        "fixed z-70 top-0 left-0 w-full h-screen bg-black/90 backdrop-blur  flex items-start pt-30 justify-center",
        ``,
        open ? "" : "hidden"
      )}
    >
      <Card className="max-w-lg w-full bg-zinc-200">
        <CardHeader className="flex flex-col justify-center items-center">
          <Link href="/" className="flex items-center gap-1">
            <Image src={images.logo} alt="Logo" width={250} height={250} />
          </Link>
          <p>
            <b>WARNING:</b> This website contains explicit adult material.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm font-semibold">
            You may only enter this website if you are at least 18 years old (or
            the age of majority in the country you live in). If you are
            accessing this website from a country which prohibits access to
            adult content or any associated activities, you do so at your own
            risk.
          </p>

          <div className="mt-4 flex items-center justify-center gap-4">
            <Button size={"lg"} onClick={() => router.back()}>
              NO - LEAVE
            </Button>
            <Button
              variant={"outline"}
              size={"lg"}
              onClick={() => setOpen(false)}
            >
              YES - ENTER
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xs text-center font-semibold">
            This website serves solely as a platform where adults may
            independently present their time and companionship to other adults.
            We do not facilitate bookings, arrange meetings, or act as an
            intermediary.
          </p>
          <p className="text-xs text-center font-semibold italic">
            This site uses cookies. By continuing to browse the site, you are
            agreeing to our use of cookies.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsentAsk;
