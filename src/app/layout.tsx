import type { Metadata, Viewport } from "next";
import "@/styles/main.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";

const description =
  "Ukraine Strategic Partners helps international companies invest in Ukraine's recovery with expert guidance, government networks, and 20+ years of regional experience.";

export const metadata: Metadata = {
  metadataBase: new URL("https://usp-ukraine.com"),
  title: {
    default:
      "Ukraine Strategic Partners — Supporting International Business in Ukraine",
    template: "%s — Ukraine Strategic Partners",
  },
  description,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/images/usp_favicon.avif", type: "image/avif" }],
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Ukraine Strategic Partners",
    images: [
      {
        url: "/images/USP-social.png",
        width: 1200,
        height: 630,
        alt: "Ukraine Strategic Partners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/USP-social.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1b2d",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ukraine Strategic Partners",
  url: "https://usp-ukraine.com/",
  logo: "https://usp-ukraine.com/images/logo_usp_v2.png",
  description:
    "Business consultancy supporting international investment in Ukraine's recovery and reconstruction.",
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
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7747-754121",
    contactType: "Business inquiries",
    email: "info@usp-ukraine.com",
  },
  sameAs: ["https://www.linkedin.com/company/ukraine-strategic-partners"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/lora-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <JsonLd data={organizationLd} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
