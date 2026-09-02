import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ukraine Strategic Partners for expert guidance on business investment in Ukraine. Offices in London and Kyiv.",
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Contact — Ukraine Strategic Partners",
    description:
      "Get in touch with Ukraine Strategic Partners. Offices in London and Kyiv.",
    url: "/contacts",
  },
  twitter: {
    title: "Contact — Ukraine Strategic Partners",
    description: "Get in touch for investment advisory in Ukraine.",
  },
};

export default function ContactsPage() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Ukraine Strategic Partners",
          url: "https://usp-ukraine.com/contacts",
          mainEntity: {
            "@type": "Organization",
            name: "Ukraine Strategic Partners",
            telephone: "+44-7747-754121",
            email: "info@usp-ukraine.com",
            address: [
              {
                "@type": "PostalAddress",
                streetAddress: "76 Canterbury Road",
                addressLocality: "London",
                postalCode: "CR0 3HA",
                addressCountry: "GB",
              },
              {
                "@type": "PostalAddress",
                streetAddress: "7A Klovskyi Uzviz",
                addressLocality: "Kyiv",
                postalCode: "01021",
                addressCountry: "UA",
              },
            ],
          },
        }}
      />
      <PageHero title="Contact" current="Contact" />

      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="contact-heading">Get in Touch</h2>
            <span className="accent-line" />
            <p>
              We&apos;d love to hear from you. Reach out through any of the
              channels below.
            </p>
          </Reveal>

          <Reveal className="contact-cards" stagger>
            <div className="contact-card contact-card--featured">
              <div className="contact-card__icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-card__body">
                <h3>Phone</h3>
                <div className="contact-card__actions">
                  <a href="tel:+447747754121" className="contact-card__value">
                    +44 7747 754121
                  </a>
                  <a href="tel:+380507299123" className="contact-card__sub">
                    +380 50 7299123
                  </a>
                </div>
              </div>
            </div>

            <a
              href="mailto:info@usp-ukraine.com"
              className="contact-card contact-card--featured"
            >
              <div className="contact-card__icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-card__body">
                <h3>Email</h3>
                <p className="contact-card__value">info@usp-ukraine.com</p>
                <p className="contact-card__sub">
                  We typically respond within 24 hours
                </p>
              </div>
              <span className="contact-card__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>

            <div className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card__body">
                <h3>United Kingdom</h3>
                <address>
                  76 Canterbury Road
                  <br />
                  Croydon, London CR0 3HA
                </address>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-card__body">
                <h3>Ukraine</h3>
                <address>
                  7A Klovskyi Uzviz
                  <br />
                  Kyiv, 01021
                </address>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/company/ukraine-strategic-partners"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card contact-card--wide"
            >
              <div className="contact-card__icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="contact-card__body">
                <h3>Follow Us on LinkedIn</h3>
                <p className="contact-card__sub">
                  Stay updated with the latest news and opportunities
                </p>
              </div>
              <span className="contact-card__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
