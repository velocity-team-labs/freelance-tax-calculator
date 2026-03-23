import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout
      title="Page Not Found"
      description="The page you're looking for doesn't exist."
      siteName="Freelance Tax Calculator"
    >
      <div className="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn">← Back to Home</Link>
      </div>

      <style jsx>{`
        .not-found {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
        }

        .not-found h1 {
          font-size: 6rem;
          color: #059669;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .not-found h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .not-found p {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: #059669;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
        }

        .btn:hover {
          background: #047857;
        }
      `}</style>
    </Layout>
  );
}
