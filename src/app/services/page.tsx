import type { Metadata } from "next";
import { CtaSection } from "@/components/CtaSection";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  ServicesTimeline,
  type TimelineRow,
} from "@/components/ServicesTimeline";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Sector and project analysis, government and donor relations, political intelligence, investment advisory, and in-country support across Ukraine and Moldova.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services — Ukraine Strategic Partners",
    description:
      "Advisory and network services for investing in Ukraine and Moldova.",
    url: "/services",
  },
  twitter: {
    title: "Our Services — Ukraine Strategic Partners",
    description:
      "Sector analysis, government relations, political intelligence and in-country support in Ukraine and Moldova.",
  },
};

const services = [
  {
    title: "Sector and Project Analysis",
    text: "Identify high-potential sectors and investment opportunities in Ukraine and Moldova with market insights grounded in decades of experience across Eastern and Central Europe.",
  },
  {
    title: "Government and Donor Relations",
    text: "Connect with decision-makers, international financial institutions, and donor programmes supporting Ukraine's recovery and development in Ukraine and Moldova through USP's trusted network across the political ecosystem.",
  },
  {
    title: "Political Intelligence",
    text: "Navigate complexity with practical risk assessment, due diligence, and strategic advice informed by deep regional and international experience.",
  },
  {
    title: "Investment Advisory Support",
    text: "Structure investments effectively through a strong understanding of Ukrainian and Moldovan business environment, the UK financial sector, and targeted local partnerships.",
  },
  {
    title: "In-Country Support",
    text: "Deliver projects successfully with on-the-ground support across bidding, negotiation, and implementation in Ukraine, Moldova, and key regional corridors.",
  },
];

const networks = [
  {
    title: "Political Networks",
    text: "Close and long-standing contacts with all political actors in Ukraine and Moldova.",
  },
  {
    title: "Government Administration Contacts",
    text: "Trusted contacts in Ukrainian and Moldovan national and local government administrations at all levels.",
  },
  {
    title: "Regional Business Contacts",
    text: "Wide range of business contacts in Ukraine and its neighbours across various sectors and industries.",
  },
  {
    title: "International Government Networks",
    text: "Networks with UK and international government efforts in support of Ukraine's reconstruction and development.",
  },
  {
    title: "UK Business & Financial Services",
    text: "Established networks in UK business and City financial services to support investment and funding opportunities.",
  },
];

const timelineRows: TimelineRow[] = [
  { left: services[0], right: networks[0] },
  { left: services[1], right: networks[1] },
  { left: services[2], right: networks[2] },
  { left: services[3], right: networks[3] },
  { left: services[4], right: networks[4] },
];

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHero title="Our Services" current="Our Services" />

      <section className="section section--alt" aria-labelledby="services-overview">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="services-overview">Our Services & Networks</h2>
            <span className="accent-line" />
            <p>
              Ukraine Strategic Partners provides comprehensive support to
              international companies investing in Ukraine&apos;s future. We
              leverage our deep regional expertise, strategic partnerships, and
              government connections to help businesses navigate the Ukrainian
              market successfully.
            </p>
          </Reveal>

          <div className="services-mobile">
            <div className="services-mobile__group services-mobile__group--services">
              <h3 className="services-mobile__title">Services</h3>
              <Reveal className="services-mobile__list" stagger>
                {services.map((item) => (
                  <article className="services-mobile__card" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </Reveal>
            </div>

            <div className="services-mobile__group services-mobile__group--networks">
              <h3 className="services-mobile__title">Networks</h3>
              <Reveal className="services-mobile__list" stagger>
                {networks.map((item) => (
                  <article className="services-mobile__card" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
              </Reveal>
            </div>
          </div>

          <ServicesTimeline rows={timelineRows} />
        </div>
      </section>

      <CtaSection
        title="Ready to Get Started?"
        text="Contact us to discuss how our services and networks can support your business investment in Ukraine's reconstruction and growth."
        secondaryHref="/opportunities"
        secondaryLabel="View Opportunities"
      />
    </main>
  );
}
