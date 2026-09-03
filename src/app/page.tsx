import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  description:
    "Ukraine Strategic Partners helps international companies invest in Ukraine's recovery with expert guidance, government networks, and 20+ years of regional experience.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Ukraine Strategic Partners — Supporting International Business in Ukraine",
    description:
      "Consultancy helping international companies navigate Ukraine's recovery with insight, networks, and partnerships for confident investment.",
    url: "/",
  },
  twitter: {
    title:
      "Ukraine Strategic Partners — Supporting International Business in Ukraine",
    description:
      "Consultancy helping international companies navigate Ukraine's recovery with insight, networks, and partnerships.",
  },
};

const mosaic = [
  {
    src: "/images/Who-we-are/section3.avif",
    alt: "Ukrainian and British flags representing cooperation",
    width: 1000,
    height: 666,
  },
  {
    src: "/images/Who-we-are/section2.avif",
    alt: "Ukrainian reconstruction efforts",
    width: 1000,
    height: 560,
  },
  {
    src: "/images/Who-we-are/section1.avif",
    alt: "Protection and preservation of Ukraine",
    width: 1000,
    height: 666,
  },
  {
    src: "/images/Who-we-are/section4.avif",
    alt: "Reconstruction of Ukrainian cities",
    width: 1000,
    height: 563,
  },
  {
    src: "/images/Who-we-are/section5.avif",
    alt: "Agricultural combine in Ukrainian field",
    width: 1000,
    height: 667,
  },
  {
    src: "/images/Who-we-are/section6.avif",
    alt: "Ukraine on the path to the EU",
    width: 1000,
    height: 666,
  },
];

export default function HomePage() {
  return (
    <main id="main">
      <link
        rel="preload"
        as="image"
        href="/images/hero-sm.avif"
        type="image/avif"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero.avif"
        type="image/avif"
        media="(min-width: 768px)"
      />
      <section className="hero" aria-label="Introduction">
        <div className="hero__bg" />
        <div className="hero__content">
          <h1>Supporting International Business in Ukraine</h1>
          <p>
            At Ukraine Strategic Partners (USP) we help businesses investing in
            Ukraine&apos;s recovery. We create opportunities to drive growth and
            reconstruction, drawing on deep regional expertise, strategic
            partnerships, and government incentives.
          </p>
          <div className="hero__actions">
            <Link href="/contacts" className="btn btn--primary btn--lg">
              Contact Us
            </Link>
            <Link href="/opportunities" className="btn btn--outline btn--lg">
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="why-ukraine">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="why-ukraine">Why Ukraine?</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="folio">
            <div className="folio__text">
              <div className="folio__col">
                <p>
                  Ukraine is entering a period of recovery-led investment,
                  supported by international financing, reconstruction
                  programmes, and regulatory reforms. Despite the ongoing
                  conflict, key sectors of the economy remain resilient, critical
                  trade and export corridors continue to operate, and the country
                  continues to strengthen its role as a global agricultural and
                  industrial hub.
                </p>
              </div>
              <div className="folio__col">
                <p>
                  At the same time, Ukraine is deepening integration with Europe
                  through regulatory reform, improved tax and customs systems,
                  and a stronger financial sector.
                </p>
                <p>
                  This transformation is creating a more transparent and
                  predictable environment for international business, attracting
                  investors and companies including Octopus Energy, HSBC,
                  AstraZeneca, BAE Systems, Unilever, and Nestlé, all
                  recognizing both the immediate opportunities and the long-term
                  potential of this highly adaptable market.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="who-we-are">
        <div className="container">
          <Reveal className="split">
            <div className="split__media">
              <div className="photo-mosaic">
                {mosaic.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={img.width}
                    height={img.height}
                  />
                ))}
              </div>
            </div>
            <div className="split__content">
              <h2 id="who-we-are">Who We Are</h2>
              <span className="accent-line" />
              <p className="split__intro">
                USP is a consultancy that supports international businesses
                investing in Ukraine&apos;s future. Our team draws on over{" "}
                <strong>20 years of experience</strong> advising businesses and
                governments in Ukraine and Central/Eastern Europe. We bring
                trusted networks, political and economic insight, practical
                commercial know-how and on-the-ground support.
              </p>
              <div className="feature-stack">
                <div className="feature-bar">
                  <div className="feature-bar__line" />
                  <div className="feature-bar__content">
                    <p>
                      Highly experienced consultants with deep knowledge of
                      Ukraine and the wider region.
                    </p>
                  </div>
                </div>
                <div className="feature-bar">
                  <div className="feature-bar__line" />
                  <div className="feature-bar__content">
                    <p>
                      Unparalleled networks within the Ukrainian government and
                      with partner governments.
                    </p>
                  </div>
                </div>
                <div className="feature-bar">
                  <div className="feature-bar__line" />
                  <div className="feature-bar__content">
                    <p>
                      Political and economic insight to support effective
                      decision-making and strategic engagement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="recovery">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="recovery">Ukraine&apos;s Recovery</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="folio folio--on-dark">
            <div className="folio__text">
              <div className="folio__col">
                <p>
                  Ukraine&apos;s recovery efforts focus on addressing the expanding
                  reconstruction needs driven by ongoing hostilities, with
                  targeted impact on energy generation, rail, port, and
                  industrial infrastructure. While frontline and liberated
                  regions such as Kharkiv, Mykolaiv, Kherson, Zaporizhzhia, and
                  Donetsk require urgent support to restore power, rebuild
                  transit routes, and revive local capacity, structural
                  requirements have broadened across the country.
                </p>
              </div>
              <div className="folio__col">
                <p>
                  To support national resilience, strategic hubs in western
                  regions like Lviv, Volyn, and Zakarpattia continue to develop,
                  offering secure environments for corporate relocation,
                  industrial capacity, and resilient trade corridors. Backed by
                  international financial institutions and bilateral partners,
                  this dual focus pairs immediate infrastructure restoration
                  with compelling long term opportunities, accelerating
                  Ukraine&apos;s integration into European supply chains.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="moldova">
        <div className="container container--narrow">
          <Reveal className="section__header">
            <h2 id="moldova">Moldova: Strategic Regional Partner</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal as="p" className="section__body-text">
            As a vital logistics, energy, and supply chain corridor, Moldova
            serves as a strategic regional partner in Ukraine&apos;s economic
            resilience and long-term recovery. Leveraging competitive operating
            costs, an expanding skilled workforce, and accelerating EU market
            integration, Moldova provides a safe, highly functional staging
            ground for international businesses. Ukraine Strategic Partners
            supports companies expanding into Moldova, helping them establish
            trusted local connections and commercial roots today while
            positioning their operations to participate in Ukraine&apos;s
            broader reconstruction pipeline.
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="Let's Rebuild Together"
        text="Ready to explore opportunities in Ukraine's reconstruction? Contact us to learn how we can support your business investment in Ukraine's future."
        secondaryHref="/opportunities"
        secondaryLabel="View Opportunities"
      />
    </main>
  );
}
