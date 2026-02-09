"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { images } from "@/images/images";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

const CONSENT_KEY = "consent";
const CONSENT_EXPIRES_KEY = "consent-expires";
const CONSENT_DURATION_DAYS = 1;

const ConsentAsk = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);

    if (isPending) return;

    try {
      if (session) {
        setOpen(false);
        return;
      }

      const consent = localStorage.getItem(CONSENT_KEY);

      if (!consent) {
        setOpen(true);
        return;
      }

      const expires = localStorage.getItem(CONSENT_EXPIRES_KEY);
      if (expires && new Date(expires) < new Date()) {
        localStorage.removeItem(CONSENT_KEY);
        localStorage.removeItem(CONSENT_EXPIRES_KEY);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setOpen(true);
    }
  }, [session, isPending]);

  const handleConsent = () => {
    try {
      localStorage.setItem(CONSENT_KEY, "true");
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + CONSENT_DURATION_DAYS);
      localStorage.setItem(CONSENT_EXPIRES_KEY, expiryDate.toISOString());
      setOpen(false);
    } catch (error) {
      console.error("Error saving consent:", error);
    }
  };

  const handleDecline = () => {
    window.location.href = "about:blank";
  };

  if (!mounted || isPending) return null;
  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4",
        "animate-in fade-in duration-200"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      <Card className="max-w-lg w-full bg-zinc-200 shadow-2xl">
        <CardHeader className="flex flex-col justify-center items-center gap-2 md:gap-4">
          <Image
            src={images.logo}
            alt="Logo"
            // width={250}
            // height={250}
            className="h-auto w-32 md:w-36"
            priority
          />

          <p id="consent-title" className="text-lg font-bold text-center">
            <span className={cn("text-destructive", "text-sm md:text-base")}>
              WARNING:
            </span>{" "}
            <br />
            This website contains explicit adult material.
          </p>
        </CardHeader>

        <CardContent className="space-y-2 md:space-y-4">
          <p className="text-center text-xs md:text-sm font-semibold">
            You may only enter this website if you are at least 18 years old (or
            the age of majority in the country you live in). If you are
            accessing this website from a country which prohibits access to
            adult content or any associated activities, you do so at your own
            risk.
          </p>

          <div className="flex items-center justify-center gap-2 md:gap-4 pt-2">
            <Button
              size="lg"
              onClick={handleDecline}
              className="text-xs md:text-sm"
              variant="destructive"
            >
              NO - LEAVE
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleConsent}
              className="bg-green-600 text-white hover:bg-green-700 hover:text-white text-xs md:text-sm"
            >
              YES - ENTER
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 border-t">
          <p className="text-xs text-center font-semibold text-muted-foreground">
            This website serves solely as a platform where adults may
            independently present their time and companionship to other adults.
            We do not facilitate bookings, arrange meetings, or act as an
            intermediary.
          </p>
          <p className="text-xs text-center font-semibold italic text-muted-foreground">
            This site uses cookies. By continuing to browse the site, you are
            agreeing to our use of cookies.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConsentAsk;
