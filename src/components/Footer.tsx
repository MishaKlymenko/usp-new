import Link from "next/link";
import { EMAIL, FOOTER_NAV, PHONES } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <Link href="/">
              <img
                src="/images/logo_usp_ua_mono.png"
                alt="Ukraine Strategic Partners"
                width={240}
                height={120}
                loading="lazy"
                decoding="async"
              />
            </Link>
          </div>
          <nav className="footer__nav" aria-label="Footer navigation">
            {FOOTER_NAV.map((item) => {
              const external = "external" in item && item.external;
              if (external) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="footer__contact">
            <a href={EMAIL.href}>{EMAIL.label}</a>
            {PHONES.map((phone) => (
              <a key={phone.href} href={phone.href}>
                {phone.label}
              </a>
            ))}
          </div>
        </div>
        <p className="footer__copy">
          &copy; {year} Ukraine Strategic Partners. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
