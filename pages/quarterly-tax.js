import { useState } from 'react';
import Layout from '../components/Layout';
import Calculator from '../components/Calculator';
import AdSlot from '../components/AdSense';
import Link from 'next/link';

export default function QuarterlyTaxCalculator() {
  const [result, setResult] = useState(null);

  // 2024 Tax Brackets (Single)
  const taxBrackets = [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ];

  const fields = [
    {
      name: 'grossIncome',
      label: 'Expected Gross Income',
      type: 'number',
      placeholder: '75000',
      hint: 'Your total expected income for the year before expenses',
      required: true
    },
    {
      name: 'expenses',
      label: 'Business Expenses',
      type: 'number',
      placeholder: '15000',
      hint: 'Deductible business expenses',
      required: false
    },
    {
      name: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' }
      ],
      required: true
    },
    {
      name: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'number',
      placeholder: '5',
      hint: 'Your state income tax rate (optional)',
      required: false
    }
  ];

  const calculateFederalTax = (income, brackets) => {
    let tax = 0;
    let remainingIncome = income;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(
        remainingIncome,
        bracket.max - bracket.min
      );
      
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  const calculate = (values) => {
    const grossIncome = parseFloat(values.grossIncome) || 0;
    const expenses = parseFloat(values.expenses) || 0;
    const stateTaxRate = (parseFloat(values.stateTaxRate) || 0) / 100;
    const isMarried = values.filingStatus === 'married';

    // Calculate net self-employment income
    const netIncome = Math.max(0, grossIncome - expenses);

    // Self-employment tax (15.3% on 92.35% of net income)
    const seTaxableIncome = netIncome * 0.9235;
    let selfEmploymentTax = 0;

    // Social Security (12.4% up to wage base)
    const ssWageBase = 168600;
    const ssIncome = Math.min(seTaxableIncome, ssWageBase);
    selfEmploymentTax += ssIncome * 0.124;

    // Medicare (2.9% on all income)
    selfEmploymentTax += seTaxableIncome * 0.029;

    // Additional Medicare tax (0.9% over $200k single, $250k married)
    const medicareThreshold = isMarried ? 250000 : 200000;
    if (seTaxableIncome > medicareThreshold) {
      selfEmploymentTax += (seTaxableIncome - medicareThreshold) * 0.009;
    }

    // Deduct half of SE tax from income
    const seDeduction = selfEmploymentTax / 2;
    const adjustedGrossIncome = netIncome - seDeduction;

    // Standard deduction (2024)
    const standardDeduction = isMarried ? 29200 : 14600;
    const taxableIncome = Math.max(0, adjustedGrossIncome - standardDeduction);

    // Federal income tax
    let brackets = [...taxBrackets];
    if (isMarried) {
      brackets = brackets.map(b => ({
        ...b,
        min: b.min * 2,
        max: b.max === Infinity ? Infinity : b.max * 2
      }));
    }

    const federalIncomeTax = calculateFederalTax(taxableIncome, brackets);

    // State tax
    const stateTax = adjustedGrossIncome * stateTaxRate;

    // Total annual tax
    const totalTax = federalIncomeTax + selfEmploymentTax + stateTax;

    // Quarterly payment
    const quarterlyPayment = totalTax / 4;

    // Effective tax rate
    const effectiveRate = netIncome > 0 ? (totalTax / netIncome) * 100 : 0;

    return {
      netIncome,
      selfEmploymentTax,
      federalIncomeTax,
      stateTax,
      totalTax,
      quarterlyPayment,
      effectiveRate,
      seDeduction,
      standardDeduction,
      taxableIncome
    };
  };

  const formatResult = (result) => (
    <div className="result-grid">
      <div className="result-highlight">
        <span className="label">Quarterly Payment Due</span>
        <span className="value">${result.quarterlyPayment.toFixed(2)}</span>
        <span className="hint">Pay by Apr 15, Jun 15, Sep 15, Jan 15</span>
      </div>

      <div className="result-breakdown">
        <h3>Annual Tax Breakdown</h3>
        
        <div className="result-item">
          <span className="label">Net Self-Employment Income</span>
          <span className="value">${result.netIncome.toLocaleString()}</span>
        </div>

        <div className="result-item">
          <span className="label">Self-Employment Tax (15.3%)</span>
          <span className="value">${result.selfEmploymentTax.toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span className="label">Federal Income Tax</span>
          <span className="value">${result.federalIncomeTax.toFixed(2)}</span>
        </div>

        {result.stateTax > 0 && (
          <div className="result-item">
            <span className="label">State Income Tax</span>
            <span className="value">${result.stateTax.toFixed(2)}</span>
          </div>
        )}

        <div className="result-item total">
          <span className="label">Total Annual Tax</span>
          <span className="value">${result.totalTax.toFixed(2)}</span>
        </div>

        <div className="result-item">
          <span className="label">Effective Tax Rate</span>
          <span className="value">{result.effectiveRate.toFixed(1)}%</span>
        </div>
      </div>

      <div className="result-tips">
        <h4>💡 Before You Pay</h4>
        <ul>
          <li><strong>Use IRS Direct Pay:</strong> Free, instant, and you get a confirmation. <a href="https://www.irs.gov/payments" target="_blank" rel="noopener noreferrer">irs.gov/payments</a></li>
          <li><strong>Safe harbor rule:</strong> If you paid at least 100% of last year's tax (110% if you made over $150k), you won't owe penalties even if you underpay this year.</li>
          <li><strong>You get a deduction:</strong> Half of your self-employment tax (${result.seDeduction.toFixed(0)}) is deductible from your income.</li>
        </ul>
      </div>
    </div>
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Quarterly Tax Estimator",
    "description": "Estimate your quarterly self-employment tax payments",
    "url": "https://freelancetaxcalculator.com/quarterly-tax",
    "applicationCategory": "FinanceApplication"
  };

  return (
    <Layout
      title="Quarterly Tax Estimator"
      description="Estimate your quarterly self-employment tax payments. Free calculator for freelancers and 1099 contractors."
      siteName="Freelance Tax Calculator"
      canonicalUrl="https://freelancetaxcalculator.com/quarterly-tax/"
    >
      <nav className="breadcrumb">
        <Link href="/">Home</Link> → Quarterly Tax Estimator
      </nav>

      <Calculator
        title="Quarterly Tax Estimator"
        description="Stop guessing what you owe. Get your quarterly payment amount in 30 seconds."
        fields={fields}
        calculate={calculate}
        formatResult={formatResult}
        schemaData={schemaData}
      />

      {/* Ad after calculator, before content */}
      <AdSlot position="in-content" />

      <section className="content-section">
        <h2>Quarterly Taxes, Explained Simply</h2>
        <p>
          When you're self-employed, the IRS doesn't wait until April. They want payments four times a year. 
          Miss a deadline and you'll owe penalties—even if you pay everything you owe by Tax Day.
        </p>

        <h3>2024 Quarterly Tax Deadlines</h3>
        <table>
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Period Covered</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Q1</td><td>Jan 1 – Mar 31</td><td>April 15</td></tr>
            <tr><td>Q2</td><td>Apr 1 – May 31</td><td>June 15</td></tr>
            <tr><td>Q3</td><td>Jun 1 – Aug 31</td><td>September 15</td></tr>
            <tr><td>Q4</td><td>Sep 1 – Dec 31</td><td>January 15*</td></tr>
          </tbody>
        </table>
        <p className="note">* That's January 15 of the <em>following</em> year. So your Q4 2024 payment is due January 15, 2025.</p>

        <h3>How to Actually Pay</h3>
        <ul>
          <li><strong>IRS Direct Pay (recommended):</strong> Free bank transfer at irs.gov/payments. You get instant confirmation.</li>
          <li><strong>EFTPS:</strong> The government's payment system. Requires enrollment 5-7 days ahead.</li>
          <li><strong>Check by mail:</strong> Form 1040-ES. Slowest option. Don't cut it close.</li>
        </ul>
      </section>

      {/* Ad at bottom, before footer */}
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
          font-size: 0.75rem;
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
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .result-item.total {
          background: #059669;
          color: white;
          font-weight: 600;
        }

        .result-tips {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          padding: 1rem;
          border-radius: 8px;
        }

        .result-tips h4 {
          margin-bottom: 0.5rem;
        }

        .result-tips ul {
          margin-left: 1.25rem;
          font-size: 0.875rem;
        }

        .result-tips li {
          margin-bottom: 0.25rem;
        }

        .result-tips a {
          color: #059669;
        }

        .content-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-top: 2rem;
        }

        .content-section h2 {
          margin-bottom: 1rem;
        }

        .content-section h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 1.1rem;
        }

        .content-section p {
          color: #4b5563;
          line-height: 1.7;
        }

        .content-section ul {
          margin-left: 1.25rem;
          color: #4b5563;
        }

        .content-section li {
          margin-bottom: 0.5rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          background: #f9fafb;
          font-weight: 600;
        }

        .note {
          font-size: 0.875rem;
          color: #6b7280;
          font-style: italic;
        }
      `}</style>
    </Layout>
  );
}
