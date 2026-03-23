import { useState } from 'react';
import Layout from '../components/Layout';
import Calculator from '../components/Calculator';
import AdSlot from '../components/AdSense';
import Link from 'next/link';

export default function EffectiveTaxRateCalculator() {
  // 2024 Tax Brackets
  const taxBracketsSingle = [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ];

  const taxBracketsMarried = taxBracketsSingle.map(b => ({
    min: b.min * 2,
    max: b.max === Infinity ? Infinity : b.max * 2,
    rate: b.rate
  }));

  const fields = [
    {
      name: 'grossIncome',
      label: 'Gross Income',
      type: 'number',
      placeholder: '80000',
      hint: 'Your total income before any deductions',
      required: true
    },
    {
      name: 'businessExpenses',
      label: 'Business Expenses',
      type: 'number',
      placeholder: '10000',
      hint: 'Deductible business expenses (if self-employed)',
      required: false
    },
    {
      name: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married Filing Jointly' },
        { value: 'head', label: 'Head of Household' }
      ],
      required: true
    },
    {
      name: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'number',
      placeholder: '5',
      hint: 'Your state income tax rate',
      required: false
    }
  ];

  const calculateFederalTax = (income, brackets) => {
    let tax = 0;
    let remaining = income;

    for (const bracket of brackets) {
      if (remaining <= 0) break;
      const taxable = Math.min(remaining, bracket.max - bracket.min);
      tax += taxable * bracket.rate;
      remaining -= taxable;
    }

    return tax;
  };

  const calculate = (values) => {
    const grossIncome = parseFloat(values.grossIncome) || 0;
    const businessExpenses = parseFloat(values.businessExpenses) || 0;
    const stateTaxRate = (parseFloat(values.stateTaxRate) || 0) / 100;
    const filingStatus = values.filingStatus;

    // Net income
    const netIncome = grossIncome - businessExpenses;

    // Self-employment tax (if expenses > 0, assume self-employed)
    const isSelfEmployed = businessExpenses > 0;
    let selfEmploymentTax = 0;

    if (isSelfEmployed) {
      const seTaxable = netIncome * 0.9235;
      const ssTax = Math.min(seTaxable, 168600) * 0.124;
      const medicareTax = seTaxable * 0.029;
      selfEmploymentTax = ssTax + medicareTax;
    }

    // SE deduction (50% of SE tax)
    const seDeduction = selfEmploymentTax / 2;

    // Adjusted Gross Income
    const agi = netIncome - seDeduction;

    // Standard deduction
    let standardDeduction;
    switch (filingStatus) {
      case 'married':
        standardDeduction = 29200;
        break;
      case 'head':
        standardDeduction = 21900;
        break;
      default:
        standardDeduction = 14600;
    }

    const taxableIncome = Math.max(0, agi - standardDeduction);

    // Federal income tax
    const brackets = filingStatus === 'married' ? taxBracketsMarried : taxBracketsSingle;
    const federalIncomeTax = calculateFederalTax(taxableIncome, brackets);

    // State tax
    const stateTax = agi * stateTaxRate;

    // Total tax
    const totalTax = federalIncomeTax + selfEmploymentTax + stateTax;

    // Effective rates
    const effectiveFederalRate = grossIncome > 0 ? (federalIncomeTax / grossIncome) * 100 : 0;
    const effectiveSERate = grossIncome > 0 ? (selfEmploymentTax / grossIncome) * 100 : 0;
    const effectiveStateRate = grossIncome > 0 ? (stateTax / grossIncome) * 100 : 0;
    const effectiveTotalRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    return {
      grossIncome,
      netIncome,
      agi,
      standardDeduction,
      taxableIncome,
      federalIncomeTax,
      selfEmploymentTax,
      stateTax,
      totalTax,
      effectiveFederalRate,
      effectiveSERate,
      effectiveStateRate,
      effectiveTotalRate,
      takeHome: grossIncome - totalTax
    };
  };

  const formatResult = (result) => (
    <div className="result-grid">
      <div className="result-highlight">
        <span className="label">Your Effective Tax Rate</span>
        <span className="value">{result.effectiveTotalRate.toFixed(2)}%</span>
        <span className="hint">Total tax: ${result.totalTax.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
      </div>

      <div className="take-home">
        <span className="label">Take-Home Pay</span>
        <span className="value">${result.takeHome.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
      </div>

      <div className="result-breakdown">
        <h3>Effective Rate Breakdown</h3>
        
        <div className="rate-bar">
          <div className="bar-label">Federal Income Tax</div>
          <div className="bar-container">
            <div className="bar-fill federal" style={{ width: `${Math.min(result.effectiveFederalRate, 37)}%` }}></div>
            <span className="bar-value">{result.effectiveFederalRate.toFixed(2)}%</span>
          </div>
          <span className="bar-amount">${result.federalIncomeTax.toFixed(0)}</span>
        </div>

        {result.selfEmploymentTax > 0 && (
          <div className="rate-bar">
            <div className="bar-label">Self-Employment Tax</div>
            <div className="bar-container">
              <div className="bar-fill se" style={{ width: `${Math.min(result.effectiveSERate, 20)}%` }}></div>
              <span className="bar-value">{result.effectiveSERate.toFixed(2)}%</span>
            </div>
            <span className="bar-amount">${result.selfEmploymentTax.toFixed(0)}</span>
          </div>
        )}

        {result.stateTax > 0 && (
          <div className="rate-bar">
            <div className="bar-label">State Tax</div>
            <div className="bar-container">
              <div className="bar-fill state" style={{ width: `${Math.min(result.effectiveStateRate, 15)}%` }}></div>
              <span className="bar-value">{result.effectiveStateRate.toFixed(2)}%</span>
            </div>
            <span className="bar-amount">${result.stateTax.toFixed(0)}</span>
          </div>
        )}
      </div>

      <div className="calculation-steps">
        <h4>How This Is Calculated</h4>
        <ol>
          <li>Gross Income: <strong>${result.grossIncome.toLocaleString()}</strong></li>
          {result.netIncome !== result.grossIncome && (
            <li>Net Income (after expenses): <strong>${result.netIncome.toLocaleString()}</strong></li>
          )}
          <li>Adjusted Gross Income: <strong>${result.agi.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong></li>
          <li>Standard Deduction: <strong>-${result.standardDeduction.toLocaleString()}</strong></li>
          <li>Taxable Income: <strong>${result.taxableIncome.toLocaleString(undefined, {maximumFractionDigits: 0})}</strong></li>
        </ol>
      </div>
    </div>
  );

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Effective Tax Rate Calculator",
    "description": "Calculate your overall effective tax rate including federal, state, and self-employment taxes",
    "url": "https://freelancetaxcalculator.com/effective-tax-rate",
    "applicationCategory": "FinanceApplication"
  };

  return (
    <Layout
      title="Effective Tax Rate Calculator"
      description="Calculate your true effective tax rate including federal, state, and self-employment taxes. Free for freelancers and employees."
      siteName="Freelance Tax Calculator"
      canonicalUrl="https://freelancetaxcalculator.com/effective-tax-rate/"
    >
      <nav className="breadcrumb">
        <Link href="/">Home</Link> → Effective Tax Rate Calculator
      </nav>

      <Calculator
        title="Effective Tax Rate Calculator"
        description="Find out what you actually pay after deductions. Usually less than you think."
        fields={fields}
        calculate={calculate}
        formatResult={formatResult}
        schemaData={schemaData}
      />

      {/* Ad after calculator, before content */}
      <AdSlot position="in-content" />

      <section className="content-section">
        <h2>Effective vs. Marginal: What's the Difference?</h2>
        <p>
          Your <strong>effective tax rate</strong> is what you <em>actually</em> pay as a percentage of your income. 
          Your <strong>marginal rate</strong> is what you pay on your <em>last</em> dollar.
        </p>

        <h3>Why Your Effective Rate Is Always Lower</h3>
        <p>
          The US has a <strong>progressive tax system</strong>. If you're in the "22% bracket," 
          you don't pay 22% on everything—you pay:
        </p>
        <ul>
          <li>10% on your first $11,600</li>
          <li>12% on income from $11,600 to $47,150</li>
          <li>22% only on income <em>above</em> $47,150</li>
        </ul>
        <p>
          Then the standard deduction ($14,600 for singles in 2024) removes a chunk of income before any tax applies.
        </p>

        <h3>Quick Example</h3>
        <p>
          If you earn $80,000 and pay $15,000 in total taxes:
        </p>
        <p className="example-calc">
          $15,000 ÷ $80,000 = <strong>18.75% effective rate</strong>
        </p>
        <p>
          Even though this person might be in the 22% bracket, their effective rate is under 19%.
        </p>
      </section>

      {/* Ad at bottom */}
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
          font-size: 3rem;
          font-weight: 700;
        }

        .result-highlight .hint {
          display: block;
          font-size: 0.875rem;
          opacity: 0.8;
          margin-top: 0.5rem;
        }

        .take-home {
          background: #f0fdf4;
          border: 2px solid #86efac;
          padding: 1.25rem;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .take-home .label {
          font-size: 1rem;
          color: #166534;
        }

        .take-home .value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #059669;
        }

        .result-breakdown h3 {
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .rate-bar {
          display: grid;
          grid-template-columns: 140px 1fr 80px;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .bar-label {
          font-size: 0.875rem;
          color: #4b5563;
        }

        .bar-container {
          position: relative;
          height: 28px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s;
        }

        .bar-fill.federal { background: #3b82f6; }
        .bar-fill.se { background: #f59e0b; }
        .bar-fill.state { background: #8b5cf6; }

        .bar-value {
          position: absolute;
          left: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .bar-amount {
          font-size: 0.875rem;
          text-align: right;
          font-weight: 500;
        }

        .calculation-steps {
          background: #f9fafb;
          padding: 1.25rem;
          border-radius: 8px;
        }

        .calculation-steps h4 {
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }

        .calculation-steps ol {
          margin-left: 1.25rem;
          font-size: 0.875rem;
          color: #4b5563;
        }

        .calculation-steps li {
          margin-bottom: 0.25rem;
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

        .example-calc {
          background: #f3f4f6;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          font-family: monospace;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .rate-bar {
            grid-template-columns: 1fr;
            gap: 0.25rem;
          }

          .bar-amount {
            text-align: left;
          }
        }
      `}</style>
    </Layout>
  );
}
