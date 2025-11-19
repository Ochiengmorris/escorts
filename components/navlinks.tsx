"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavlinksComponent = ({
  href,
  label,
}: {
  href: string;
  label: string;
}) => {
  const link = usePathname();

  return (
    <Link
      href={href}
      className={
        link === href
          ? "text-primary font-bold transition-all duration-200 ease-in-out uppercase"
          : "hover:text-primary hover:font-bold transition-all duration-200 ease-in-out uppercase"
      }
    >
      {label}
    </Link>
  );
};

export default NavlinksComponent;
