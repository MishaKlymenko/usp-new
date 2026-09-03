export const SITE_URL = "https://usp-ukraine.com";
export const INTERNSHIPS_PDF = "/Ukraine_Internships.pdf";

export const PHONES = [
  { href: "tel:+447747754121", label: "+44 7747 754121" },
  { href: "tel:+380507299123", label: "+380 50 7299123" },
] as const;

export const EMAIL = {
  href: "mailto:info@usp-ukraine.com",
  label: "info@usp-ukraine.com",
} as const;

export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/services", label: "Our Services" },
  { href: "/internships", label: "Internships" },
  { href: "/contacts", label: "Contact" },
] as const;

export const FOOTER_NAV = [
  { href: "/about-us", label: "About Us" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/services", label: "Our Services" },
  { href: "/internships", label: "Internships" },
  { href: "/contacts", label: "Contact" },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
