import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Opportunities in Ukraine",
  description:
    "Ukraine's reconstruction needs and key investment priorities — infrastructure and power, regional hubs, Moldova staging, and private capital mobilisation.",
  alternates: { canonical: "/opportunities" },
  openGraph: {
    title: "Opportunities in Ukraine — Ukraine Strategic Partners",
    description:
      "Reconstruction needs and investment priorities across Ukraine and Moldova.",
    url: "/opportunities",
  },
  twitter: {
    title: "Opportunities in Ukraine — Ukraine Strategic Partners",
    description:
      "Infrastructure, regional hubs, Moldova staging, and private capital for Ukraine's recovery.",
  },
};

const sectors = [
  {
    title: "Energy & Grid Modernisation",
    image: "/images/sectors/energy.avif",
    alt: "Energy and grid modernisation in Ukraine",
    desc: "Focus on decentralised power generation, renewable infrastructure, energy storage, and smart grid systems to build long term energy security and export potential.",
  },
  {
    title: "Defence Technology & Strategic Industries",
    image: "/images/sectors/defence.avif",
    alt: "Defence technology and strategic industries in Ukraine",
    desc: "Expanding international joint ventures, localized manufacturing, maintenance partnerships, and dual use technological innovation to build modern industrial capacity.",
  },
  {
    title: "Agriculture & Value-Added Agro-Processing",
    image: "/images/sectors/agro.avif",
    alt: "Agriculture and value-added agro-processing in Ukraine",
    desc: "Advancing modern agritech, precision farming, deep processing facilities, and cold-chain logistics to convert agricultural yields into high value processed exports.",
  },
  {
    title: "IT & Digital Ecosystems",
    image: "/images/sectors/it1.avif",
    alt: "IT and digital ecosystems in Ukraine",
    desc: "Leveraging Ukraine's world class tech talent pool for global software engineering, cybersecurity, enterprise solutions, and digital infrastructure integration.",
  },
  {
    title: "Transport, Logistics & Construction",
    image: "/images/sectors/building1.avif",
    alt: "Transport, logistics and construction in Ukraine",
    desc: "Upgrading port facilities, railway connections, border logistics hubs, and commercial real estate through public private partnerships and concession frameworks.",
  },
  {
    title: "Critical Minerals & Processing",
    image: "/images/sectors/minerals2.avif",
    alt: "Critical minerals extraction and processing in Ukraine",
    desc: "Developing extraction, refining, and advanced processing capabilities for critical raw materials essential to global green energy and technology supply chains.",
  },
  {
    title: "Innovation, Education & Human Capital",
    image: "/images/sectors/Education.avif",
    alt: "Innovation, education and human capital in Ukraine",
    desc: "Fostering academic exchange, specialized vocational programs, and research ecosystems to build a highly skilled workforce for future industrial demands.",
  },
];

export default function OpportunitiesPage() {
  return (
    <main id="main">
      <PageHero title="Opportunities in Ukraine" current="Opportunities" />

      <section
        className="section section--alt"
        aria-labelledby="reconstruction-heading"
      >
        <div className="container">
          <Reveal className="section__header">
            <h2 id="reconstruction-heading">Ukraine&apos;s Reconstruction Needs</h2>
            <span className="accent-line" />
            <p>
              Ukraine&apos;s recovery efforts focus on meeting expanding capital
              requirements across key economic sectors, supported by international
              donor programs, bilateral funding, and private investment. While
              substantial investment is directed toward restoring and modernizing
              energy networks, transport routes, and industrial facilities in
              frontline and de-occupied regions such as Kharkiv, Mykolaiv,
              Kherson, Zaporizhzhia, and Donetsk, commercial opportunities are
              growing across the entire country.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="section__subhead">Key Priorities</h3>
            <div className="feature-list">
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Infrastructure &amp; Power Modernisation</h3>
                  <p>
                    Upgrading to decentralised energy generation, expanding green
                    energy capacity, and modernising transport networks to ensure
                    long term operational reliability.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Strategic Regional Hubs</h3>
                  <p>
                    Expanding industrial capacity and trade logistics in western
                    hubs such as Lviv, Volyn, and Zakarpattia, offering secure
                    environments for enterprise relocation, stable operations,
                    and direct access to European markets.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Cross-Border Staging &amp; Moldova Hubs</h3>
                  <p>
                    Leveraging Moldova&apos;s competitive costs, skilled
                    workforce, and EU market alignment to establish an immediate
                    regional foothold while preparing for Ukraine&apos;s future
                    reconstruction.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Private Capital Mobilisation</h3>
                  <p>
                    Partnering international development finance with private
                    sector enterprise to unlock high growth, sustainable
                    commercial opportunities.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="sectors-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="sectors-heading">Strategic and Sectoral Priorities</h2>
            <span className="accent-line" />
            <p>
              The Government of Ukraine prioritises key economic sectors that
              drive sustainable commercial growth, aligning investment
              opportunities with state recovery initiatives and European market
              integration.
            </p>
          </Reveal>
          <Reveal className="card-grid card-grid--3" stagger>
            {sectors.map((sector) => (
              <article className="sector-card" key={sector.title}>
                <div className="sector-card__img">
                  <img
                    src={sector.image}
                    alt={sector.alt}
                    loading="lazy"
                    width={600}
                    height={375}
                  />
                </div>
                <div className="sector-card__body">
                  <h3 className="sector-card__title">{sector.title}</h3>
                  <p className="sector-card__desc">{sector.desc}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        className="section section--alt"
        aria-labelledby="incentives-heading"
      >
        <div className="container">
          <Reveal className="section__header">
            <h2 id="incentives-heading">
              Investment Protection and Fiscal Incentives
            </h2>
            <span className="accent-line" />
            <p>
              Investment in Ukraine is backed by unprecedented international
              support. Comprehensive programs from the EU, IMF, World Bank, and
              EBRD provide guarantees, blended finance, and political risk
              mitigation tools that significantly reduce market entry risk.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="section__subhead">
              Recovery Mechanisms &amp; Incentives
            </h3>
            <div className="feature-list">
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Processing Industry Grants</h3>
                  <p>
                    Grants of up to <strong>UAH 16 million</strong> for industrial
                    recovery, expansion, and equipment modernization under the
                    national <em>Made in Ukraine</em> program.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Capital Investment Recovery</h3>
                  <p>
                    Tax relief and compensation mechanisms allowing businesses to
                    recover <strong>30% to 70%</strong> of capital investment,
                    scaled according to project size.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Industrial Park Regimes</h3>
                  <p>
                    Direct access to ready-zoned land, state infrastructure
                    support, and potential{" "}
                    <strong>10-year corporate income tax exemptions</strong>.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Fiscal Exemptions</h3>
                  <p>
                    Full exemptions from import duties and Value Added Tax (VAT)
                    on eligible production equipment and machinery.
                  </p>
                </div>
              </div>
              <div className="feature-bar">
                <div className="feature-bar__line" />
                <div className="feature-bar__content">
                  <h3>Institutional De-Risking</h3>
                  <p>
                    Multilateral guarantees and EU-backed financial instruments
                    designed to ensure secure capital deployment.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title="Ready to Explore Opportunities?"
        text="Contact us to learn more about specific investment opportunities and how we can support your business in Ukraine's reconstruction and growth."
        secondaryHref="/services"
        secondaryLabel="Our Services"
      />
    </main>
  );
}
