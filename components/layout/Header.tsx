import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavlinksComponent from "../navlinks";

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
        <Button className="uppercase cursor-pointer">Login</Button>
        <Button variant="outline" className="uppercase cursor-pointer">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Header;
