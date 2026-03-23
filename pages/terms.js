import Layout from '../components/Layout';

export default function Terms() {
  return (
    <Layout
      title="Terms of Service"
      description="Terms of service for Freelance Tax Calculator"
      siteName="Freelance Tax Calculator"
      canonicalUrl="https://freelancetaxcalculator.com/terms/"
    >
      <div className="legal-page">
        <h1>Terms of Service</h1>
        <p className="updated">Last updated: March 2024</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Freelance Tax Calculator, you agree to be bound by these Terms 
            of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2>2. Disclaimer</h2>
          <p>
            <strong>The calculators and information provided on this site are for educational and 
            estimation purposes only. They do not constitute professional tax advice.</strong>
          </p>
          <p>
            Tax laws are complex and subject to change. The estimates provided by our calculators 
            may not reflect your actual tax liability. Always consult with a qualified tax 
            professional for advice specific to your situation.
          </p>
        </section>

        <section>
          <h2>3. No Warranty</h2>
          <p>
            This site is provided "as is" without any warranties, express or implied. We do not 
            guarantee the accuracy, completeness, or timeliness of the information or calculations 
            provided.
          </p>
        </section>

        <section>
          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall Freelance Tax Calculator, its owners, or its affiliates be liable 
            for any damages arising from the use of this site or reliance on its calculations, 
            including but not limited to:
          </p>
          <ul>
            <li>Errors in tax calculations</li>
            <li>Penalties resulting from underpayment of taxes</li>
            <li>Any financial loss</li>
            <li>Loss of data</li>
          </ul>
        </section>

        <section>
          <h2>5. Use of Service</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use this site only for lawful purposes</li>
            <li>Not attempt to interfere with the proper functioning of the site</li>
            <li>Not attempt to gain unauthorized access to any part of the site</li>
          </ul>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            The content, features, and functionality of this site are owned by Freelance Tax 
            Calculator and are protected by copyright, trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>7. Third-Party Advertisements</h2>
          <p>
            This site displays third-party advertisements. We are not responsible for the content 
            or accuracy of advertisements displayed on this site.
          </p>
        </section>

        <section>
          <h2>8. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the site 
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2>9. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of the United States and the state of 
            Colorado, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            For questions about these terms, contact us at:
            <a href="mailto:legal@freelancetaxcalculator.com">legal@freelancetaxcalculator.com</a>
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
