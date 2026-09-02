import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Opportunities in Ukraine",
  description:
    "Explore key investment sectors in Ukraine's reconstruction — energy, defence, agriculture, IT, construction, critical minerals, and innovation.",
  alternates: { canonical: "/opportunities" },
  openGraph: {
    title: "Opportunities in Ukraine — Ukraine Strategic Partners",
    description:
      "Key investment sectors in Ukraine's recovery — energy, defence, agriculture, IT, construction, and critical minerals.",
    url: "/opportunities",
  },
  twitter: {
    title: "Opportunities in Ukraine — Ukraine Strategic Partners",
    description: "Key investment sectors in Ukraine's reconstruction.",
  },
};

const sectors = [
  {
    title: "Energy",
    image: "/images/sectors/energy.avif",
    alt: "Energy sector in Ukraine",
    desc: "Critical infrastructure rebuilding and renewable energy development for Ukraine's energy independence.",
  },
  {
    title: "Defence",
    image: "/images/sectors/defence.avif",
    alt: "Defence sector in Ukraine",
    desc: "Strengthening Ukraine's defence capabilities, including modernisation of equipment and strategic industries.",
  },
  {
    title: "Agriculture & Agro-Processing",
    image: "/images/sectors/agro.avif",
    alt: "Agriculture in Ukraine",
    desc: "Modern agricultural technology and food processing facilities to restore Ukraine's agricultural capacity.",
  },
  {
    title: "IT & Technology",
    image: "/images/sectors/it1.avif",
    alt: "IT and technology sector",
    desc: "Ukraine's advanced IT sector offers significant opportunities for international technology partnerships.",
  },
  {
    title: "Construction",
    image: "/images/sectors/building1.avif",
    alt: "Construction and infrastructure",
    desc: "Large-scale infrastructure projects including transport hubs and power generation through public-private partnerships.",
  },
  {
    title: "Critical Minerals",
    image: "/images/sectors/minerals2.avif",
    alt: "Critical minerals extraction",
    desc: "Extraction and processing of critical minerals essential for modern technology and renewable energy systems.",
  },
  {
    title: "Innovation, Education & Academia",
    image: "/images/sectors/Education.avif",
    alt: "Innovation, education and academia",
    desc: "International education partnerships, academic exchange, and innovation ecosystems to develop Ukraine's human capital and future skills.",
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
              Ukraine&apos;s recovery efforts are focused on addressing the urgent
              and widespread damage caused by ongoing hostilities, especially in
              liberated and frontline regions such as Kharkiv, Mykolaiv, Kherson,
              Zaporizhzhia, and Donetsk.
            </p>
          </Reveal>
          <Reveal className="feature-list feature-list--3">
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>Key challenges:</strong> creating new jobs, rebuilding
                  critical infrastructure, and restoring industrial capacity to
                  support long-term economic stability.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>&quot;Safer hubs&quot;</strong> in western regions like
                  Lviv, Volyn, and Zakarpattia are being developed to support the
                  relocation of industries requiring stable logistics and lower
                  security risks.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>Ukraine&apos;s reconstruction agenda</strong> calls for
                  a coordinated investment approach that mobilises both national
                  and international resources, with significant private sector
                  involvement.
                </p>
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
              The Government of Ukraine prioritises key sectors that are
              essential for reconstruction and have a strong multiplier effect on
              the economy, aligning closely with the Ukraine Recovery Plan.
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
        aria-labelledby="guarantees-heading"
      >
        <div className="container">
          <Reveal className="section__header">
            <h2 id="guarantees-heading">
              Government Guarantees and Investor Protections
            </h2>
            <span className="accent-line" />
            <p>
              Ukraine offers a range of financial incentives and protections
              designed to attract and safeguard foreign investors.
            </p>
          </Reveal>
          <Reveal className="feature-list feature-list--3">
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <h3>Enterprise Modernisation Grants</h3>
                <p>
                  Substantial grants for enterprise modernisation, especially in
                  de-occupied territories, subject to co-financing requirements
                  and job creation commitments.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <h3>War Risk Insurance</h3>
                <p>
                  Comprehensive war risk insurance mechanisms through the Export
                  Credit Agency, supported by legislation and coordinated efforts
                  with international insurers such as MIGA, DFC, and EBRD.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <h3>Large Investment Support</h3>
                <p>
                  Large-scale investments starting from €12 million may qualify
                  for state support covering up to 30% of project costs,
                  including infrastructure reimbursements and tax incentives.
                </p>
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
