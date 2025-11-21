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
      <div className="flex items-center p-4 gap-2">
        <Link href="/" className="hover:font-semibold transition-all">
          Home
        </Link>
        {Links.map((link) => (
          <div key={link.href} className="flex items-center gap-2">
            <span>|</span>
            <Link
              href={link.href}
              key={link.href}
              className="hover:font-semibold transition-all"
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>
      <div className=" px-4 pb-4">
        <p className="text-sm font-semibold">
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
      <div className="text-xs border-t border-primary/50 p-4 font-semibold">
        <p>
          Copyright © {new Date().getFullYear()} Escorts | JohnMorris. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
