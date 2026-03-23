import Layout from '../components/Layout';
import AdSlot from '../components/AdSense';
import Link from 'next/link';

export default function Home() {
  const calculators = [
    {
      title: 'Quarterly Tax Estimator',
      description: 'Know exactly what to pay each quarter. Updated for 2024 tax brackets.',
      href: '/quarterly-tax',
      icon: '📅'
    },
    {
      title: 'Self-Employment Tax Calculator',
      description: 'See your Social Security + Medicare tax (the 15.3% you didn\'t sign up for).',
      href: '/self-employment-tax',
      icon: '💼'
    },
    {
      title: 'Effective Tax Rate Calculator',
      description: 'Find out what you actually pay after deductions. Usually less than you think.',
      href: '/effective-tax-rate',
      icon: '📊'
    }
  ];

  return (
    <Layout
      title="Free Tax Calculators for Freelancers & 1099 Contractors"
      description="Calculate your quarterly taxes, self-employment tax, and effective tax rate. Free tools for freelancers, independent contractors, and self-employed professionals."
      siteName="Freelance Tax Calculator"
      siteUrl="https://freelancetaxcalculator.com"
      canonicalUrl="https://freelancetaxcalculator.com/"
    >
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <h1>Stop Guessing Your Quarterly Taxes</h1>
          <p>Free calculators that give you the numbers in 30 seconds. No signup. No spreadsheet. Just your answer.</p>
        </section>

        {/* AD SLOT 1: Below hero, before calculators */}
        <AdSlot position="below-hero" />

        {/* Calculator Grid */}
        <section className="calculators-grid">
          {calculators.map((calc) => (
            <Link href={calc.href} key={calc.href} className="calculator-card">
              <span className="card-icon">{calc.icon}</span>
              <h2>{calc.title}</h2>
              <p>{calc.description}</p>
              <span className="card-link">Calculate →</span>
            </Link>
          ))}
        </section>

        {/* AD SLOT 2: After calculators, natural break */}
        <AdSlot position="in-content" />

        {/* Info Section */}
        <section className="info-section">
          <h2>Built for Freelancers, Not Accountants</h2>
          <div className="features">
            <div className="feature">
              <h3>🎯 Actually Accurate</h3>
              <p>Uses 2024 tax brackets and the real IRS formulas. Not a guess.</p>
            </div>
            <div className="feature">
              <h3>🔒 Your Data Stays Yours</h3>
              <p>All calculations run in your browser. We never see your numbers.</p>
            </div>
            <div className="feature">
              <h3>💯 No Catch</h3>
              <p>No account. No email capture. No "upgrade to see results." Just free.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Questions People Actually Ask</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>What is self-employment tax and why do I owe it?</h3>
              <p>It's Social Security + Medicare (15.3%). When you have an employer, they pay half. When you're self-employed, you pay both sides. The good news: you can deduct half of it.</p>
            </div>
            <div className="faq-item">
              <h3>When are quarterly taxes due?</h3>
              <p>Four times a year: April 15, June 15, September 15, and January 15. Put them in your calendar now—the IRS doesn't send reminders.</p>
            </div>
            <div className="faq-item">
              <h3>Do I really have to pay quarterly?</h3>
              <p>If you expect to owe $1,000+ at tax time, yes. Skip it and you'll pay penalties even if you pay everything by April 15.</p>
            </div>
          </div>
        </section>

        {/* AD SLOT 3: Below content, before footer */}
        <AdSlot position="below-content" />
      </div>

      <style jsx>{`
        .home {
          max-width: 900px;
          margin: 0 auto;
        }

        .hero {
          text-align: center;
          padding: 2rem 0;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #059669;
        }

        .hero p {
          font-size: 1.25rem;
          color: #6b7280;
        }

        .calculators-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .calculator-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .calculator-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }

        .card-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .calculator-card h2 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .calculator-card p {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .card-link {
          color: #059669;
          font-weight: 500;
        }

        .info-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin: 2rem 0;
        }

        .info-section h2 {
          margin-bottom: 1.5rem;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .feature h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .feature p {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .faq-section {
          margin: 2rem 0;
        }

        .faq-section h2 {
          margin-bottom: 1.5rem;
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
        }

        .faq-item h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .faq-item p {
          color: #6b7280;
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .hero h1 {
            font-size: 1.75rem;
          }

          .hero p {
            font-size: 1rem;
          }
        }
      `}</style>
    </Layout>
  );
}
