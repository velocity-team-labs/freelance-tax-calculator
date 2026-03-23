import Layout from '../components/Layout';
import AdSlot from '../components/AdSense';
import Link from 'next/link';

export default function Home() {
  const calculators = [
    {
      title: 'Quarterly Tax Estimator',
      description: 'Know exactly what to pay each quarter. No surprises, no panic.',
      href: '/quarterly-tax',
      icon: '📅',
      tag: 'Most Popular'
    },
    {
      title: 'Self-Employment Tax Calculator',
      description: 'The 15.3% nobody warned you about. Calculate it here.',
      href: '/self-employment-tax',
      icon: '💼'
    },
    {
      title: 'Effective Tax Rate Calculator',
      description: 'What you actually pay after deductions. Usually less scary.',
      href: '/effective-tax-rate',
      icon: '📊'
    }
  ];

  const painPoints = [
    { emoji: '😰', text: '"Am I saving enough for taxes?"' },
    { emoji: '😱', text: '"When are quarterly taxes even due?"' },
    { emoji: '😭', text: '"Why do I owe so much?!"' },
    { emoji: '🤯', text: '"What even IS self-employment tax?"' }
  ];

  return (
    <Layout
      title="No Tax Tears — Free Tax Calculators for Freelancers"
      description="Stop crying over spreadsheets. Free tax calculators that give you answers in 30 seconds. For freelancers, 1099 contractors, and self-employed humans."
      siteName="No Tax Tears"
      siteUrl="https://notaxtears.com"
      canonicalUrl="https://notaxtears.com/"
    >
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-emoji">😢 ➡️ 😊</div>
          <h1>No More Tears Over Taxes</h1>
          <p className="tagline">Free calculators for freelancers who'd rather not cry over spreadsheets.</p>
          <p className="subtext">Get your number in 30 seconds. No signup. No judgment. Just answers.</p>
        </section>

        {/* Pain Points - relatable section */}
        <section className="pain-points">
          <h2>Sound Familiar?</h2>
          <div className="pain-grid">
            {painPoints.map((point, i) => (
              <div key={i} className="pain-item">
                <span className="pain-emoji">{point.emoji}</span>
                <p>{point.text}</p>
              </div>
            ))}
          </div>
          <p className="pain-resolution">Yeah, we've been there. Let's fix that ↓</p>
        </section>

        {/* AD SLOT 1: Below pain points */}
        <AdSlot position="below-hero" />

        {/* Calculator Grid */}
        <section className="calculators-section">
          <h2>Pick Your Calculator</h2>
          <div className="calculators-grid">
            {calculators.map((calc) => (
              <Link href={calc.href} key={calc.href} className="calculator-card">
                {calc.tag && <span className="card-tag">{calc.tag}</span>}
                <span className="card-icon">{calc.icon}</span>
                <h3>{calc.title}</h3>
                <p>{calc.description}</p>
                <span className="card-link">Calculate Now →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* AD SLOT 2: After calculators */}
        <AdSlot position="in-content" />

        {/* Promise Section */}
        <section className="promise-section">
          <h2>What You Get (And Don't)</h2>
          <div className="promises">
            <div className="promise-group yes">
              <h3>✅ Yes</h3>
              <ul>
                <li>Accurate calculations using 2024 tax brackets</li>
                <li>Privacy — all math happens in your browser</li>
                <li>Instant results, no waiting</li>
                <li>Actually free, no upsells</li>
              </ul>
            </div>
            <div className="promise-group no">
              <h3>❌ No</h3>
              <ul>
                <li>No account required</li>
                <li>No email capture</li>
                <li>No "upgrade to see your result"</li>
                <li>No judgment for procrastinating</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emotional CTA */}
        <section className="cta-section">
          <h2>Ready to Stop Stressing?</h2>
          <p>The IRS won't remind you about quarterly taxes. But we will (if you want).</p>
          <Link href="/quarterly-tax" className="cta-button">
            Calculate My Quarterly Taxes →
          </Link>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Questions You're Probably Asking</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is self-employment tax and why wasn't I told?</h3>
              <p>It's Social Security + Medicare (15.3%). Employers pay half for W-2 employees. As a freelancer, you pay both sides. The good news: you can deduct half of it. The bad news: yeah, it's annoying.</p>
            </div>
            <div className="faq-item">
              <h3>When are quarterly taxes due? (Asking for a friend)</h3>
              <p>April 15, June 15, September 15, January 15. Put them in your calendar. Set three reminders. The IRS doesn't send "hey you forgot" emails.</p>
            </div>
            <div className="faq-item">
              <h3>What if I just... don't pay quarterly?</h3>
              <p>You'll pay penalties even if you pay everything by April 15. The IRS charges interest on underpayments. It's not worth it. Just use the calculator and know your number.</p>
            </div>
            <div className="faq-item">
              <h3>Is this actually accurate?</h3>
              <p>Yes. We use the actual 2024 IRS tax brackets and formulas. We're not guessing. But we're not CPAs either — for complex situations, talk to a real accountant.</p>
            </div>
          </div>
        </section>

        {/* AD SLOT 3: Below content */}
        <AdSlot position="below-content" />
      </div>

      <style jsx>{`
        .home {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Hero */
        .hero {
          text-align: center;
          padding: 2rem 0 1rem;
        }

        .hero-emoji {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          color: #6366f1;
          line-height: 1.2;
        }

        .tagline {
          font-size: 1.35rem;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .subtext {
          color: #6b7280;
          font-size: 1rem;
        }

        /* Pain Points */
        .pain-points {
          text-align: center;
          padding: 1.5rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          margin: 1.5rem 0;
          background: #fefefe;
        }

        .pain-points h2 {
          font-size: 1.1rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .pain-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pain-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .pain-emoji {
          font-size: 1.75rem;
        }

        .pain-item p {
          font-size: 0.85rem;
          color: #6b7280;
          font-style: italic;
        }

        .pain-resolution {
          color: #6366f1;
          font-weight: 500;
          font-size: 0.9rem;
        }

        /* Calculators */
        .calculators-section {
          margin: 2rem 0;
        }

        .calculators-section h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }

        .calculator-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid #e5e7eb;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          position: relative;
        }

        .calculator-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
          border-color: #6366f1;
        }

        .card-tag {
          position: absolute;
          top: -8px;
          right: 12px;
          background: #6366f1;
          color: white;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 500;
        }

        .card-icon {
          font-size: 2.25rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .calculator-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .calculator-card p {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .card-link {
          color: #6366f1;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* Promises */
        .promise-section {
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
          border-radius: 16px;
          padding: 2rem;
          margin: 2rem 0;
        }

        .promise-section h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .promises {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .promise-group h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .promise-group.yes h3 {
          color: #059669;
        }

        .promise-group.no h3 {
          color: #dc2626;
        }

        .promise-group ul {
          list-style: none;
          padding: 0;
        }

        .promise-group li {
          padding: 0.5rem 0;
          color: #4b5563;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .promise-group li:last-child {
          border-bottom: none;
        }

        /* CTA */
        .cta-section {
          text-align: center;
          padding: 2.5rem;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 16px;
          margin: 2rem 0;
          color: white;
        }

        .cta-section h2 {
          color: white;
          margin-bottom: 0.5rem;
        }

        .cta-section p {
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .cta-button {
          display: inline-block;
          background: white;
          color: #6366f1;
          padding: 0.875rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        }

        /* FAQ */
        .faq-section {
          margin: 2rem 0;
        }

        .faq-section h2 {
          margin-bottom: 1.5rem;
          color: #374151;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          background: white;
          border-radius: 8px;
          padding: 1.25rem;
          border: 1px solid #e5e7eb;
        }

        .faq-item h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .faq-item p {
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 1.75rem;
          }

          .tagline {
            font-size: 1.1rem;
          }

          .cta-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </Layout>
  );
}
