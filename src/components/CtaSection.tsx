import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { LazyImage } from "@/components/LazyImage";

type CtaSectionProps = {
  title: string;
  text: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function CtaSection({
  title,
  text,
  secondaryHref,
  secondaryLabel,
}: CtaSectionProps) {
  return (
    <section className="cta" aria-label="Call to action">
      <div className="cta__bg">
        <LazyImage
          src="/images/parallax-footer.avif"
          alt=""
          width={1920}
          height={1280}
        />
      </div>
      <Reveal className="cta__content">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="btn-group">
          <Link href="/contacts" className="btn btn--primary btn--lg">
            Contact Us
          </Link>
          <Link href={secondaryHref} className="btn btn--outline btn--lg">
            {secondaryLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
