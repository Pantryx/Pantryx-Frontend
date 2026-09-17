import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <section className="section pt-28 md:pt-32">
      <div className="container-page mx-auto max-w-md text-center">
        <div className="eyebrow">Pantryx</div>
        <h1 className="mt-3 font-display text-display-3">This recipe isn&apos;t available</h1>
        <p className="mt-4 text-sm text-muted">The link may be incomplete, or the recipe was private to the person who shared it.</p>
        <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper">
          Explore Pantryx
        </Link>
      </div>
    </section>
  );
}
