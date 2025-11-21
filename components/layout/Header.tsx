import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import NavlinksComponent from "../navlinks";
import { BookUserIcon, LucideArrowRightFromLine, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex h-16 w-full items-center px-4 justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <Image src="/lipslogo.png" alt="Logo" width={50} height={50} />
        <h1 className="text-4xl font-black font-cookie uppercase">Escorts</h1>
      </Link>
      {/* Navlinks */}
      <div className="flex items-center gap-4">
        {Navlinks.map((link) => (
          <NavlinksComponent key={link.href} {...link} />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Link href={"/auth/login"}>
          <Button className="hidden uppercase cursor-pointer">Login</Button>
        </Link>
        <Button variant="outline" className="hidden uppercase cursor-pointer">
          Register
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={cn(
                buttonVariants({ variant: "outline" }),
                " uppercase cursor-pointer"
              )}
            >
              <User />
              <span>Anonymus</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <DropdownMenuItem className="font-semibold">
              <Link href="/profile" className="flex items-center gap-2">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-semibold">
              <Link href="/account" className="flex items-center gap-2">
                <BookUserIcon />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="font-semibold">
              <Link href="/logout" className="flex items-center gap-2">
                <LucideArrowRightFromLine />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
