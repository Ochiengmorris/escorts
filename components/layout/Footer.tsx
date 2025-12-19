import Facebook from "@/images/icons/facebook";
import Instagram from "@/images/icons/instagram";
import Whatsapp from "@/images/icons/whatsapp";
import XTwitter from "@/images/icons/x-twitter";
import { images } from "@/images/images";
import Image from "next/image";
import Link from "next/link";

const Links = [
  { href: "/post-ad", label: "Post an Ad" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact-us", label: "Contact Us" },
];

const Footer = () => {
  return (
    <footer className="h-fit w-full">
      <div className="flex flex-col justify-center items-center p-4 gap-4">
        <div className="flex items-center gap-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <Image src={images.logo} alt="Logo" width={250} height={250} />
          </Link>
        </div>
        <div className="flex gap-10">
          <Link href="/" className="hover:font-semibold transition-all">
            Home
          </Link>
          <Link href="/post-ad" className="hover:font-semibold transition-all">
            Post an Ad
          </Link>
          <Link href="/reviews" className="hover:font-semibold transition-all">
            Reviews
          </Link>
          <Link href="/about" className="hover:font-semibold transition-all">
            About
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:font-semibold transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:font-semibold transition-all"
          >
            Terms of Service
          </Link>
          <Link
            href="/disclaimer"
            className="hover:font-semibold transition-all"
          >
            Disclaimer
          </Link>
          <Link
            href="/contact-us"
            className="hover:font-semibold transition-all"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://www.facebook.com/escorts">
            <Facebook size={40} color="var(--foreground)" />
          </Link>
          <Link href="https://www.instagram.com/escorts">
            <Instagram size={40} color="var(--foreground)" />
          </Link>
          <Link href="https://www.twitter.com/escorts">
            <XTwitter size={40} color="var(--foreground)" />
          </Link>
          <Link href="https://www.whatsapp.com/escorts">
            <Whatsapp size={40} color="var(--foreground)" />
          </Link>
        </div>
      </div>
      <div className=" px-4 pb-4">
        <p className="text-sm font-semibold text-center">
          This website serves solely as a platform where adults may
          independently present their time and companionship to other adults. We
          do not facilitate bookings, arrange meetings, or act as an
          intermediary. Any listed rates refer strictly to the value of time and
          nothing beyond that. Any additional interactions or services that may
          occur are entirely the personal decisions of consenting adults and
          remain a private matter between them. Laws vary by country, and in
          some regions individuals may not have the legal ability to make such
          choices. It is your responsibility to understand and comply with the
          laws applicable in your location.
        </p>
      </div>
      <div className="text-sm border-t text-center border-primary/50 p-4 font-semibold">
        <p>
          Copyright © {new Date().getFullYear()} Escorts | JohnMorris. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
