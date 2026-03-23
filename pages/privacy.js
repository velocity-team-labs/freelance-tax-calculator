import Layout from '../components/Layout';

export default function Privacy() {
  return (
    <Layout
      title="Privacy Policy"
      description="Privacy policy for Freelance Tax Calculator"
      siteName="Freelance Tax Calculator"
      canonicalUrl="https://freelancetaxcalculator.com/privacy/"
    >
      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="updated">Last updated: March 2024</p>

        <section>
          <h2>Information We Collect</h2>
          <p>
            Freelance Tax Calculator is designed with privacy in mind. All calculations are performed 
            locally in your browser. We do not collect, store, or transmit any financial information 
            you enter into our calculators.
          </p>
        </section>

        <section>
          <h2>Analytics</h2>
          <p>
            We use Google Analytics to understand how visitors use our site. This includes:
          </p>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on site</li>
            <li>Referral sources</li>
            <li>General location (country/region)</li>
          </ul>
          <p>
            This data is anonymous and aggregated. We do not track individual users.
          </p>
        </section>

        <section>
          <h2>Advertising</h2>
          <p>
            We display Google AdSense ads on our site. Google may use cookies to serve ads based on 
            your prior visits to our site or other websites. You can opt out of personalized 
            advertising by visiting 
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies for:
          </p>
          <ul>
            <li>Google Analytics (analytics)</li>
            <li>Google AdSense (advertising)</li>
          </ul>
          <p>
            You can disable cookies in your browser settings.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            Since all calculations happen in your browser, your financial data never leaves your 
            device. We have no access to the numbers you enter.
          </p>
        </section>

        <section>
          <h2>Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites (such as IRS.gov). We are not 
            responsible for the privacy practices of those sites.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect 
            information from children under 13.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Changes will be posted on this page 
            with an updated revision date.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this privacy policy, contact us at: 
            <a href="mailto:privacy@freelancetaxcalculator.com">privacy@freelancetaxcalculator.com</a>
          </p>
        </section>
      </div>

      <style jsx>{`
        .legal-page {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          max-width: 800px;
          margin: 0 auto;
        }

        .legal-page h1 {
          margin-bottom: 0.5rem;
        }

        .updated {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 2rem;
        }

        .legal-page section {
          margin-bottom: 2rem;
        }

        .legal-page h2 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .legal-page p {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }

        .legal-page ul {
          margin-left: 1.5rem;
          color: #4b5563;
          margin-bottom: 0.75rem;
        }

        .legal-page li {
          margin-bottom: 0.25rem;
        }

        .legal-page a {
          color: #059669;
        }
      `}</style>
    </Layout>
  );
}
