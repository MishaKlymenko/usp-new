import Link from "next/link";

type PageHeroProps = {
  title: string;
  current: string;
};

export function PageHero({ title, current }: PageHeroProps) {
  return (
    <section className="page-hero" aria-label="Page heading">
      <div className="container">
        <h1>{title}</h1>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb__sep" aria-hidden="true" />
          <span aria-current="page">{current}</span>
        </nav>
      </div>
    </section>
  );
}
