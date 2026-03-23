import Head from 'next/head';
import AdSense from './AdSense';

export default function Layout({ 
  children, 
  title, 
  description, 
  siteName = 'Calculator',
  siteUrl = '',
  canonicalUrl = ''
}) {
  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteName}` : siteName}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title || siteName} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Canonical */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Favicon placeholder */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="site-wrapper">
        <header className="site-header">
          <div className="container">
            <a href="/" className="logo">{siteName}</a>
            <nav className="main-nav">
              {/* Navigation items passed via children or hardcoded per site */}
            </nav>
          </div>
        </header>

        <main className="site-main">
          <div className="container">
            {children}
          </div>
        </main>

        {/* Ad slot - below content */}
        <div className="ad-container ad-below-content">
          <AdSense slot="below-content" />
        </div>

        <footer className="site-footer">
          <div className="container">
            <div className="footer-content">
              <p>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
              <nav className="footer-nav">
                <a href="/about">About</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/contact">Contact</a>
              </nav>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --primary-color: #6366f1;
          --primary-hover: #4f46e5;
          --text-color: #1f2937;
          --text-light: #6b7280;
          --bg-color: #ffffff;
          --bg-alt: #f9fafb;
          --border-color: #e5e7eb;
          --success-color: #059669;
          --error-color: #dc2626;
          --container-width: 800px;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          color: var(--text-color);
          background-color: var(--bg-alt);
          line-height: 1.6;
        }

        .container {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: 0 1rem;
        }

        /* Header */
        .site-header {
          background: var(--bg-color);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .site-header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          text-decoration: none;
        }

        /* Main content */
        .site-main {
          padding: 2rem 0;
          min-height: calc(100vh - 200px);
        }

        /* Calculator styles */
        .calculator {
          background: var(--bg-color);
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .calculator-title {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .calculator-description {
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        .calculator-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .form-group label {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .form-group input,
        .form-group select {
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .hint {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: var(--primary-color);
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: var(--primary-hover);
        }

        .btn-secondary {
          background: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--bg-alt);
        }

        /* Results */
        .result {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-color);
        }

        .result h2 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: var(--success-color);
        }

        .result-grid {
          display: grid;
          gap: 1rem;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem;
          background: var(--bg-alt);
          border-radius: 6px;
        }

        .result-item .label {
          color: var(--text-light);
        }

        .result-item .value {
          font-weight: 600;
          font-size: 1.125rem;
        }

        .result-total {
          background: var(--primary-color);
          color: white;
          padding: 1rem;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }

        .result-total .value {
          font-size: 1.5rem;
        }

        /* Error */
        .error-message {
          background: #fef2f2;
          border: 1px solid #fee2e2;
          color: var(--error-color);
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
        }

        /* Ads */
        .ad-container {
          margin: 2rem auto;
          text-align: center;
          max-width: var(--container-width);
        }

        .ad-below-content {
          min-height: 90px;
        }

        /* Footer */
        .site-footer {
          background: var(--bg-color);
          border-top: 1px solid var(--border-color);
          padding: 2rem 0;
          margin-top: 2rem;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-nav {
          display: flex;
          gap: 1.5rem;
        }

        .footer-nav a {
          color: var(--text-light);
          text-decoration: none;
          font-size: 0.875rem;
        }

        .footer-nav a:hover {
          color: var(--primary-color);
        }

        /* Responsive */
        @media (max-width: 640px) {
          .calculator {
            padding: 1.5rem;
          }

          .calculator-title {
            font-size: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .footer-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-nav {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
