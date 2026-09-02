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
    "Our services include sector analysis, government relations, political intelligence, risk mitigation, investment advice, and in-country support for investing in Ukraine.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services — Ukraine Strategic Partners",
    description:
      "Sector analysis, government relations, political intelligence, risk mitigation and in-country support for Ukraine investment.",
    url: "/services",
  },
  twitter: {
    title: "Our Services — Ukraine Strategic Partners",
    description:
      "Comprehensive advisory and network services for investing in Ukraine.",
  },
};

const services = [
  {
    title: "Sector & Project Analysis",
    text: "Comprehensive analysis of market sectors and specific project opportunities in Ukraine's reconstruction landscape.",
  },
  {
    title: "Government & Donor Programme Relations",
    text: "Facilitating connections with Ukrainian government officials and international donor programmes supporting reconstruction.",
  },
  {
    title: "Political Intelligence & Insight",
    text: "Critical political and economic intelligence to support informed decision-making in Ukraine's dynamic environment.",
  },
  {
    title: "Risk Mitigation & Due Diligence",
    text: "Comprehensive risk assessment and due diligence services to protect your investment and ensure compliance.",
  },
  {
    title: "Investment Advice & Protection",
    text: "Strategic investment guidance and protection strategies tailored to Ukraine's unique business environment.",
  },
  {
    title: "Bid & Contract Support",
    text: "End-to-end support for bidding processes, contract negotiations, and project management throughout implementation.",
  },
  {
    title: "Donor & Partner-Funded Opportunities",
    text: "Connecting businesses with international donor funding and partner-funded reconstruction opportunities.",
  },
  {
    title: "In-Country Support in Ukraine",
    text: "On-the-ground coordination including meetings, visits, and events to facilitate your business operations.",
  },
];

const networks = [
  {
    title: "Ukrainian Political Networks",
    text: "Close and long-standing contacts with all Ukrainian political parties and movements across the political spectrum.",
  },
  {
    title: "Government Administration Contacts",
    text: "Trusted contacts in Ukrainian national, regional and local government administrations at all levels.",
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
  { left: services[5] },
  { left: services[6] },
  { left: services[7] },
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
