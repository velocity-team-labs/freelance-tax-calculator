import { useState } from 'react';
import Layout from '../components/Layout';
import Calculator from '../components/Calculator';
import AdSlot from '../components/AdSense';
import Link from 'next/link';

export default function SelfEmploymentTaxCalculator() {
  const fields = [
    {
      name: 'netIncome',
      label: 'Net Self-Employment Income',
      type: 'number',
      placeholder: '60000',
      hint: 'Your income after business expenses',
      required: true
    }
  ];

  const calculate = (values) => {
    const netIncome = parseFloat(values.netIncome) || 0;

    // Self-employment tax applies to 92.35% of net income
    const taxableIncome = netIncome * 0.9235;

    // Social Security: 12.4% up to wage base ($168,600 for 2024)
    const ssWageBase = 168600;
    const ssTaxableIncome = Math.min(taxableIncome, ssWageBase);
    const socialSecurityTax = ssTaxableIncome * 0.124;

    // Medicare: 2.9% on all earnings
    const medicareTax = taxableIncome * 0.029;

    // Additional Medicare Tax: 0.9% over $200,000 (single) or $250,000 (married)
    // For simplicity, using single threshold
    const additionalMedicareThreshold = 200000;
    const additionalMedicareTax = taxableIncome > additionalMedicareThreshold
      ? (taxableIncome - additionalMedicareThreshold) * 0.009
      : 0;

    const totalSETax = socialSecurityTax + medicareTax + additionalMedicareTax;

    // Deductible portion (50%)
    const deduction = totalSETax / 2;

    return {
      netIncome,
      taxableIncome,
      socialSecurityTax,
      medicareTax,
      additionalMedicareTax,
      totalSETax,
      deduction,
      rate: netIncome > 0 ? (totalSETax / netIncome) * 100 : 0
    };
  };

  const formatResult = (result) => (
    <div className="result-grid">
      <div className="result-highlight">
        <span className="label">Total Self-Employment Tax</span>
        <span className="value">${result.totalSETax.toFixed(2)}</span>
        <span className="hint">Effective rate: {result.rate.toFixed(2)}%</span>
      </div>

      <div className="result-breakdown">
        <h3>Tax Breakdown</h3>
        
        <div className="result-item">
          <span className="label">Taxable Income (92.35% of net)</span>
          <span className="value">${result.taxableIncome.toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span className="label">
            Social Security Tax (12.4%)
            <span className="sub">Up to $168,600 wage base</span>
          </span>
          <span className="value">${result.socialSecurityTax.toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span className="label">
            Medicare Tax (2.9%)
            <span className="sub">No income limit</span>
          </span>
          <span className="value">${result.medicareTax.toFixed(2)}</span>
        </div>

        {result.additionalMedicareTax > 0 && (
          <div className="result-item">
            <span className="label">
              Additional Medicare Tax (0.9%)
              <span className="sub">Over $200,000</span>
            </span>
            <span className="value">${result.additionalMedicareTax.toFixed(2)}</span>
          </div>
        )}

        <div className="result-item deduction">
          <span className="label">
            Deductible Portion (50%)
            <span className="sub">Deduct from AGI</span>
          </span>
          <span className="value">${result.deduction.toFixed(2)}</span>
        </div>
      </div>

      <div className="result-info">
        <h4>📋 What Is Self-Employment Tax?</h4>
        <p>
          Remember how your W-2 paycheck had line items for Social Security and Medicare? 
          Your employer paid half, you paid half. Now you <em>are</em> the employer—so you pay both sides.
        </p>
        <p>
          The total rate is <strong>15.3%</strong>:
        </p>
        <ul>
          <li><strong>Social Security:</strong> 12.4% (capped at $168,600 in 2024)</li>
          <li><strong>Medicare:</strong> 2.9% (no cap)</li>
        </ul>
        <p>
          But here's the good part: you can deduct half of this tax from your income. 
          That deduction (${result.deduction.toFixed(0)} in your case) reduces your adjusted gross income.
        </p>
      </div>
    </div>
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Self-Employment Tax Calculator",
    "description": "Calculate your self-employment tax obligation (Social Security + Medicare)",
    "url": "https://freelancetaxcalculator.com/self-employment-tax",
    "applicationCategory": "FinanceApplication"
  };

  return (
    <Layout
      title="Self-Employment Tax Calculator"
      description="Calculate your self-employment tax (15.3%). Free tool for freelancers and 1099 contractors."
      siteName="Freelance Tax Calculator"
      canonicalUrl="https://freelancetaxcalculator.com/self-employment-tax/"
    >
      <nav className="breadcrumb">
        <Link href="/">Home</Link> → Self-Employment Tax Calculator
      </nav>

      <Calculator
        title="Self-Employment Tax Calculator"
        description="The 15.3% tax no one warned you about. See what you owe for Social Security and Medicare."
        fields={fields}
        calculate={calculate}
        formatResult={formatResult}
        schemaData={schemaData}
      />

      {/* Ad after calculator */}
      <AdSlot position="below-content" />

      <style jsx>{`
        .breadcrumb {
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .breadcrumb a {
          color: #059669;
          text-decoration: none;
        }

        .result-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .result-highlight {
          background: linear-gradient(135deg, #059669, #047857);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
        }

        .result-highlight .label {
          display: block;
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .result-highlight .value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .result-highlight .hint {
          display: block;
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .result-breakdown h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .result-item .label {
          display: flex;
          flex-direction: column;
        }

        .result-item .sub {
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: normal;
        }

        .result-item.deduction {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
        }

        .result-info {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          padding: 1.25rem;
          border-radius: 8px;
        }

        .result-info h4 {
          margin-bottom: 0.75rem;
        }

        .result-info p {
          color: #334155;
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .result-info ul {
          margin-left: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .result-info li {
          color: #334155;
          font-size: 0.9rem;
        }
      `}</style>
    </Layout>
  );
}
