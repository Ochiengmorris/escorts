"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import NavlinksComponent from "../navlinks";
import { BookUserIcon, Loader2, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { images } from "@/images/images";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navlinks = [
  { href: "/", label: "Home" },
  { href: "/escorts", label: "Escorts" },
  { href: "/about", label: "About" },
  { href: "/videos", label: "Videos" },
  { href: "/reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
];

const Header = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  return (
    <div className="flex h-16 w-full items-center px-4 justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <Image src={images.logo} alt="Logo" width={150} height={150} />
      </Link>
      {/* Navlinks */}
      <div className="items-center gap-4 hidden md:flex">
        {Navlinks.map((link) => (
          <NavlinksComponent key={link.href} {...link} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        {isPending ? (
          <Loader2 className="animate-spin size-4" />
        ) : (
          <>
            {session && session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      " uppercase cursor-pointer"
                    )}
                  >
                    <User className="size-3 md:size-4" />
                    {session?.user && (
                      <span className="text-xs md:text-sm">
                        {session?.user?.name || session?.user?.email || "Guest"}
                      </span>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-0">
                  <DropdownMenuItem className="font-semibold">
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="size-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold">
                    <Link href="/account" className="flex items-center gap-2">
                      <BookUserIcon className="size-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-semibold ">
                    {/* <LogoutButton /> */}
                    <button
                      onClick={() =>
                        authClient
                          .signOut()
                          .then(() => {
                            toast.success("Logged out successfully!");
                          })
                          .finally(() => {
                            router.refresh();
                          })
                      }
                      className="cursor-pointer w-full border-none flex items-center gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={"/login"}>
                <Button className=" uppercase cursor-pointer text-xs font-semibold">
                  Login
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
