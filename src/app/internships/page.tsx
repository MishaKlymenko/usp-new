import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { INTERNSHIPS_PDF } from "@/lib/site";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Human capital and internships in Ukraine and Moldova — placement options, partner benefits, and how USP works with the Global Career Center.",
  alternates: { canonical: "/internships" },
  openGraph: {
    title: "Internships — Ukraine Strategic Partners",
    description:
      "Connect international and local talent with host organisations across Ukraine and Moldova.",
    url: "/internships",
  },
  twitter: {
    title: "Internships — Ukraine Strategic Partners",
    description:
      "Explore internship placements and the Ukraine Internships Guide.",
  },
};

export default function InternshipsPage() {
  return (
    <main id="main">
      <PageHero title="Internships" current="Internships" />

      <section
        className="section section--alt"
        aria-labelledby="internships-heading"
      >
        <div className="container">
          <Reveal className="section__header">
            <h2 id="internships-heading">Human Capital &amp; Internships</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="internships__copy">
            <p>
              Ukraine has far more to offer than many realise, with innovation
              driving its economic resilience. As technology, policy, and
              infrastructure evolve, the country is fast positioning itself as a
              dynamic hub for ideas, impact, and talent across Europe and global
              markets.
            </p>
            <p>
              Early engagement matters. For businesses expanding across Ukraine
              and Moldova, it provides early access to high-potential talent and
              market opportunities while they are still emerging. For students
              and early-career professionals, it offers a hands-on seat in one of
              the most transformative real-world environments shaping global
              industry.
            </p>
            <p>
              In partnership with{" "}
              <a
                href="https://www.globalcareercenter.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>Global Career Center (GCC)</strong>
              </a>
              , Ukraine Strategic Partners connects international and local
              talent with host organisations across Ukraine and Moldova. Through
              these practical placements, we help businesses expand their
              on-the-ground capacity today while building the skilled workforce
              needed for long-term regional recovery.
            </p>
            <p>
              Explore our Ukraine Internships Guide to learn
              more about placement options, partner benefits, and application
              details.
            </p>
          </Reveal>
          <Reveal className="btn-group internships__actions">
            <a
              href={INTERNSHIPS_PDF}
              className="btn btn--primary btn--lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              View the Internships Guide
            </a>
            <a
              href={INTERNSHIPS_PDF}
              className="btn btn--outline-dark btn--lg"
              download="Ukraine_Internships.pdf"
            >
              Download the Internships Guide (PDF)
            </a>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="Ready to Get Involved?"
        text="Whether you are a host organisation or a candidate, contact us to discuss placements, partnerships, and how we can support your work in Ukraine and Moldova."
        secondaryHref="/opportunities"
        secondaryLabel="View Opportunities"
      />
    </main>
  );
}
