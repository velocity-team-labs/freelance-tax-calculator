import React, { useState } from 'react';

/**
 * Reusable Calculator Component
 * 
 * @param {string} title - Calculator title
 * @param {string} description - Brief description
 * @param {Array} fields - Input fields configuration
 * @param {Function} calculate - Calculation function
 * @param {Function} formatResult - Format result for display
 */
export default function Calculator({ 
  title, 
  description, 
  fields, 
  calculate, 
  formatResult,
  schemaData 
}) {
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (fieldName, value) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const missingFields = fields.filter(f => f.required && !values[f.name]);
    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    try {
      const calcResult = calculate(values);
      setResult(calcResult);
      setError(null);
    } catch (err) {
      setError(err.message || 'Calculation error. Please check your inputs.');
    }
  };

  const handleReset = () => {
    setValues({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="calculator">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData || {
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            "name": title,
            "description": description
          })
        }}
      />
      
      <h1 className="calculator-title">{title}</h1>
      <p className="calculator-description">{description}</p>

      <form onSubmit={handleSubmit} className="calculator-form">
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                value={values[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              >
                <option value="">Select...</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'number'}
                id={field.name}
                value={values[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                min={field.min}
                max={field.max}
                step={field.step || 'any'}
              />
            )}
            {field.hint && <span className="hint">{field.hint}</span>}
          </div>
        ))}

        <div className="form-actions">
          <button type="submit" className="btn-primary">Calculate</button>
          <button type="button" onClick={handleReset} className="btn-secondary">Reset</button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result">
          <h2>Your Results</h2>
          {formatResult(result)}
        </div>
      )}
    </div>
  );
}
