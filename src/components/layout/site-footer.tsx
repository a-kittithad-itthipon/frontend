"use client";

import Link from "next/link";

interface SocialLink {
  href: string;
  label: string;
  iconClass: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=a.kittithad.ittipon@gmail.com",
    label: "Send email via Gmail",
    iconClass: "bx bxl-gmail",
  },
  {
    href: "https://www.facebook.com/a.kittihad",
    label: "Facebook profile",
    iconClass: "bx bxl-facebook-circle",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-12 flex flex-col items-center gap-4">
      {/* Social links */}
      <nav className="flex gap-6">
        {SOCIAL_LINKS.map(({ href, label, iconClass }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-2xl hover:text-cyan-400 transition-colors duration-200"
          >
            <i className={iconClass} aria-hidden="true" />
          </Link>
        ))}
      </nav>

      {/* Footer text */}
      <div className="text-center text-xs md:text-sm space-y-1">
        <p>© {new Date().getFullYear()} Adocs Deployment Platform.</p>
        <p>Built with Docker, Next.js & Flask.</p>
      </div>
    </footer>
  );
}
