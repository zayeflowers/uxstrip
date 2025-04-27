import SEO from '../components/SEO';

export default function AboutPage() {
  return (
    <div className="container py-12">
      <SEO
        title="About | UX Strip"
        description="Learn about UX Strip, a comic series about design, dysfunction, and digital delusions created in early 2025."
      />
      <h1 className="text-4xl font-bold text-center mb-8">
        About UXstrip
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <section className="mb-8">
          <p className="text-gray-700 mb-6 text-lg">
            UXstrip started with one simple idea: capture the funny, frustrating, and absurd moments of working in UX.
          </p>

          <p className="text-gray-700 mb-6 text-lg">
            In early 2025, UXstrip was created in just a few hours by a designer who wanted to turn real experiences into a comic series — simple, human, and relatable. No big studio. No polished committees. Just pure creative energy and a love for the quirks of UX life.
          </p>

          <p className="text-gray-700 mb-6 text-lg">
            Today, UXstrip continues to grow as a playful space for designers, developers, researchers, and product managers to laugh at the highs, lows, and everything in between.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Want to collaborate or share an idea?</h2>
          <p className="text-gray-700 text-lg">
            Reach out: <a href="mailto:contact@uxstrip.com" className="text-black hover:underline">contact@uxstrip.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
