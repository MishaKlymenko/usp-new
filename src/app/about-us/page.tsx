import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { TeamCard, type TeamMember } from "@/components/TeamCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Ukraine Strategic Partners — experienced consultants with 20+ years advising businesses and governments across Central and Eastern Europe.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us — Ukraine Strategic Partners",
    description:
      "Meet the team behind Ukraine Strategic Partners — experienced consultants with 20+ years of regional expertise.",
    url: "/about-us",
  },
  twitter: {
    title: "About Us — Ukraine Strategic Partners",
    description: "Meet the team behind Ukraine Strategic Partners.",
  },
};

const team: TeamMember[] = [
  {
    id: "andrew-young",
    name: "Andrew Young",
    role: "Founder & CEO",
    image: "/images/team/Andrew-Young.avif",
    alt: "Andrew Young",
    label:
      "Andrew Young — Founder and CEO. Tap or hover to read bio.",
    bio: "Andrew has over 20 years of experience supporting businesses and running government programmes in Central and Eastern Europe. He was Country Director for the US government's National Democratic Institute programmes in Moldova, Poland, and Belarus, and a senior consultant for NDI Ukraine. He founded PBL, a successful business consultancy advising international investors in Poland, including BAeSystems, Tesco and United Utilities.",
  },
  {
    id: "yana-kazakova",
    name: "Yana Kazakova",
    role: "Government Relations Consultant",
    image: "/images/team/Yana Kazakova.avif",
    alt: "Yana Kazakova",
    label:
      "Yana Kazakova — Government Relations Consultant. Tap or hover to read bio.",
    bio: "Yana has worked on US, UK and Canadian government programmes, building relationships with diverse stakeholders, including Ukrainian government officials and political leaders, international partners and the private sector. She brings in-depth knowledge of Ukraine's reform and reconstruction landscape, as well as strong policy skills.",
  },
  {
    id: "jan-van-limburg",
    name: "Jan van Limburg Stirum",
    role: "Director, Europe",
    image: "/images/team/JanvanLimburgStirum.avif",
    alt: "Jan van Limburg Stirum",
    label:
      "Jan van Limburg Stirum — Director, Europe. Tap or hover to read bio.",
    bio: "Jan is an experienced government and business adviser, with a focus on Europe, Middle East and Africa (EMEA). For the last four years he has led programmes on Climate and Agriculture for the Tony Blair Institute for Global Change. Before that he worked on financial services in the EMEA region for the City of London Corporation. He holds a Masters in Global Politics from the London School of Economics.",
  },
  {
    id: "tony-johnson",
    name: "Tony Johnson",
    role: "Director of Academic Partnerships and Innovation",
    image: "/images/team/TonyJohnson1.avif",
    alt: "Tony Johnson",
    label:
      "Tony Johnson — Director of Academic Partnerships and Innovation. Tap or hover to read bio.",
    bio: "Tony is a senior business executive and entrepreneur with over 30 years of experience founding and leading successful enterprises in international education, innovation driven business development, and cross-border partnerships. He is a recipient of a Lifetime Achievement Award from the International Internship Conference for leadership and team building, with a career that spans global academic exchange, UK public affairs, and Canadian manufacturing and retail.",
  },
  {
    id: "hanna-ostapenko",
    name: "Hanna Ostapenko",
    role: "Legal & IP Strategy Consultant",
    image: "/images/team/HannaOstapenko.avif",
    alt: "Hanna Ostapenko",
    label:
      "Hanna Ostapenko — Legal & IP Strategy Consultant. Tap or hover to read bio.",
    bio: "Hanna is a lawyer with a focus on intellectual property, contract, corporate, and civil law, combining her legal practice with an academic career. She received the British Academy of Science Award for her research on patenting new genomic techniques for agriculture. Hanna has taught IP law in both the UK and Ukraine and contributed to international research initiatives, including the British Academy's Researchers at Risk programme. She is also a co-founder of the NGO Progressive&Strong, supporting educational and social initiatives in Ukraine and advancing the development of human capital and future skills.",
  },
  {
    id: "iryna-kachurivska",
    name: "Iryna Kachurivska",
    role: "Stakeholder Relations Manager",
    image: "/images/team/IrynaKachurivska1.avif",
    alt: "Iryna Kachurivska",
    label:
      "Iryna Kachurivska — Stakeholder Relations Manager. Tap or hover to read bio.",
    bio: "Iryna is a governance and civic engagement professional with extensive experience managing reform and public participation initiatives across Ukraine. She has delivered USAID, Canadian, and FCDO-funded programmes supporting democratic governance, policy dialogue, and institutional strengthening. At USP, she leads stakeholder relations, fostering collaboration between government, business, and civil society to advance Ukraine's recovery and investment agenda.",
  },
  {
    id: "mariia-kovaliova",
    name: "Mariia Kovaliova",
    role: "Municipal Partnerships Manager",
    image: "/images/team/MariiaKovaliova1.avif",
    alt: "Mariia Kovaliova",
    label:
      "Mariia Kovaliova — Municipal Partnerships Manager. Tap or hover to read bio.",
    bio: "Mariia is a specialist in local governance, decentralisation, and community development with strong experience in programme coordination and stakeholder engagement. She has worked on USAID, SIDA, and FCDO-funded initiatives promoting local self-government reform and regional economic development. At USP, she manages municipal partnerships, connecting local authorities with international investors to drive sustainable growth and Ukraine's post-war recovery.",
  },
];

const board: TeamMember[] = [
  {
    id: "william-elliott",
    name: "William Elliott, OBE",
    role: "Chairman of USP Advisory Board",
    image: "/images/team/Welliott_V2.avif",
    alt: "William Elliott, OBE",
    label:
      "William Elliott, OBE — Chairman of USP Advisory Board. Tap or hover to read bio.",
    bio: "William has been a senior UK diplomat, with a focus on Central and Eastern Europe, as well as trade and investment. More recently, he has worked on global finance and sustainability for the City of London and as a management consultant. He is an experienced adviser to international businesses operating in emerging markets.",
  },
  {
    id: "mark-field",
    name: "Mark Field",
    role: "Senior Advisory Board Member – Corporate & Political Strategy",
    image: "/images/team/MarkField.avif",
    alt: "Mark Field",
    label:
      "Mark Field — Senior Advisory Board Member. Tap or hover to read bio.",
    bio: "Mark Field is a seasoned strategist with a career spanning law, national politics, and international diplomacy. A former solicitor at Freshfields, he represented the Cities of London and Westminster as MP from 2001 to 2019, serving as a primary link between the UK government and the global financial sector. Mark's ministerial tenure included serving as Minister of State for Asia and the Pacific (2017–2019), where he led the UK's economic diplomacy across the region. He currently manages a diverse portfolio of senior advisory and non-executive roles within the financial and restructuring sectors.",
  },
  {
    id: "oksana-yurynets",
    name: "Oksana Yurynets",
    role: "Senior Advisor USP Ukraine",
    image: "/images/team/Oksana-Yurynets.avif",
    alt: "Oksana Yurynets",
    label:
      "Oksana Yurynets — Senior Advisor USP Ukraine. Tap or hover to read bio.",
    bio: "Oksana is a former Member of the Ukrainian Parliament (2014–2019), where she worked on European integration, regional cooperation, and NATO engagement as head of Ukraine's delegation to the NATO Parliamentary Assembly. Before entering national politics, she served on the Lviv Oblast Council and built an academic career as a professor at Lviv Polytechnic National University. She remains active in public life, contributing expertise on economic development and international partnerships.",
  },
  {
    id: "andriy-dligach",
    name: "Andriy Dligach",
    role: "Advisory Board Member – Strategy & Economic Development",
    image: "/images/team/AndriyDligachNew.avif",
    alt: "Andriy Dligach",
    label: "Andriy Dligach — Advisory Board Member. Tap or hover to read bio.",
    bio: "Andriy is an economist, strategist and entrepreneur with more than two decades of experience driving business transformation and innovation across Ukraine and Eastern Europe. He is the Founder & CEO of Advanter Group and co-founder of the Centre for Economic Recovery, where he contributed to shaping Ukraine's National Economic Strategy 2030. As a professor at the Kyiv School of Economics and the Taras Shevchenko National University of Kyiv, Andriy bridges academic rigour with private-sector insight. At USP, he brings strategic vision and extensive cross-sector networks to help international investors and local stakeholders frame compelling opportunities for growth in Ukraine.",
  },
];

const testimonials = [
  {
    quote:
      "Championed international engagement with Ukraine, emphasising the importance of strategic partnerships between the UK and Ukraine for long-term regional stability and shared economic growth.",
    author: "Nia Griffith MP",
    role: "Speaker at USP Launch, Labour Party Conference 2005",
  },
  {
    quote:
      "Highlighted the significance of UK–Ukraine cooperation and the critical role that strategic consultancy plays in strengthening bilateral ties and advancing reform.",
    author: "Halyna Vasylchenko MP",
    role: "Member of the Verkhovna Rada of Ukraine",
  },
  {
    quote:
      "Endorsed the initiative as a vital bridge between British enterprise and Ukraine's emerging market opportunities, underscoring the value of informed, on-the-ground advisory.",
    author: "Mark Field",
    role: "Presenter at Conservative Party Conference 2005",
  },
];

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Ukraine Strategic Partners",
          url: "https://usp-ukraine.com/about-us",
          mainEntity: {
            "@type": "Organization",
            name: "Ukraine Strategic Partners",
            url: "https://usp-ukraine.com/",
          },
        }}
      />
      <PageHero title="About Us" current="About Us" />

      <section className="section section--alt" aria-labelledby="about-heading">
        <div className="container">
          <div className="split">
            <Reveal className="split__media">
              <img
                src="/images/about.avif"
                alt="Ukraine Strategic Partners team"
                loading="lazy"
                width={600}
                height={400}
              />
            </Reveal>
            <Reveal className="split__content">
              <h2 id="about-heading">About Ukraine Strategic Partners</h2>
              <span className="accent-line" />
              <blockquote className="lead-quote">
                We support international companies investing in Ukraine&apos;s
                future.
              </blockquote>
              <p className="split__intro">
                We draw on a team of highly experienced consultants with deep
                knowledge of Ukraine and the wider region. Each team member has a
                strong track record of advising international clients and
                navigating complex political, economic, and regulatory
                environments.
              </p>
              <p className="split__intro" style={{ marginTop: 0 }}>
                Together, we offer exceptional networks and insights to support
                effective decision-making and strategic engagement. We leverage
                unparalleled networks within the Ukrainian government and with
                partner governments, as well as{" "}
                <strong>20 years of experience</strong> supporting investors in
                Central and Eastern Europe.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="objectives-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="objectives-heading">Our Objectives</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="feature-list feature-list--3">
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>Support</strong> international companies doing business
                  in Ukraine with comprehensive guidance and expertise.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>Help businesses navigate</strong> sector and regional
                  priorities in Ukraine, as well as their partnerships with
                  Ukrainian stakeholders.
                </p>
              </div>
            </div>
            <div className="feature-bar">
              <div className="feature-bar__line" />
              <div className="feature-bar__content">
                <p>
                  <strong>Inform</strong> international business about programmes
                  to rebuild Ukraine&apos;s economy and infrastructure.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="team-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="team-heading">Our Team</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="card-grid" stagger>
            {team.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="advisory-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="advisory-heading">Advisory Board</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal className="card-grid" stagger>
            {board.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="partners-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="partners-heading">Our Partners</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal as="ul" className="partners-list" role="list">
            <li className="partners-list__item">
              <a
                href="https://www.auc.org.ua/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Association of Ukrainian Cities"
              >
                <div className="partners-list__logo">
                  <img
                    src="/images/auc-logo.png"
                    alt="Association of Ukrainian Cities"
                    loading="lazy"
                    width={124}
                    height={128}
                  />
                </div>
                <span className="partners-list__name">
                  Association of Ukrainian Cities
                </span>
              </a>
            </li>
            <li className="partners-list__item">
              <a
                href="https://www.facebook.com/ECAgency.UA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agency of European Cooperation"
              >
                <div className="partners-list__logo">
                  <img
                    src="/images/eca-logo.svg"
                    alt="Agency of European Cooperation"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                </div>
                <span className="partners-list__name">
                  Agency of European Cooperation
                </span>
              </a>
            </li>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="testimonials-heading">
        <div className="container">
          <Reveal className="section__header">
            <h2 id="testimonials-heading">Testimonials</h2>
            <span className="accent-line" />
          </Reveal>
          <Reveal>
            <TestimonialsCarousel testimonials={testimonials} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
