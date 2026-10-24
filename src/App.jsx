import { useMemo, useState } from "react";
import "./App.css";
import { calculateLoan } from "./calculations";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const formatPercent = (value) => `${Number(value).toFixed(2)}%`;

function LoanCalculator({
  loanAmount,
  interestRate,
  loanYears,
  errors,
  onInputChange,
  onCalculate,
  result,
  onViewSchedule,
}) {
  return (
    <section className="calculator-panel" aria-labelledby="calculator-title">
      <header className="calculator-header">
        <span className="calculator-kicker">Finance tool</span>
        <h1 id="calculator-title">Loan EMI Calculator</h1>
        <p className="calculator-subtitle">
          Plan your repayment with confidence.
        </p>
      </header>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="loan-amount">Loan Amount</label>
          <div className={`input-wrap ${errors.loanAmount ? "input-error" : ""}`}>
            <span aria-hidden="true">₹</span>
            <input
              id="loan-amount"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter loan amount"
              value={loanAmount}
              onChange={(event) => onInputChange("loanAmount", event.target.value)}
              aria-invalid={Boolean(errors.loanAmount)}
              aria-describedby={errors.loanAmount ? "loan-amount-error" : undefined}
            />
          </div>
          {errors.loanAmount && (
            <p id="loan-amount-error" className="field-error" role="alert">
              {errors.loanAmount}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="interest-rate">Interest Rate</label>
          <div className={`input-wrap ${errors.interestRate ? "input-error" : ""}`}>
            <span aria-hidden="true">%</span>
            <input
              id="interest-rate"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter annual rate"
              value={interestRate}
              onChange={(event) => onInputChange("interestRate", event.target.value)}
              aria-invalid={Boolean(errors.interestRate)}
              aria-describedby={errors.interestRate ? "interest-rate-error" : undefined}
            />
          </div>
          {errors.interestRate && (
            <p id="interest-rate-error" className="field-error" role="alert">
              {errors.interestRate}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="loan-years">Loan Tenure</label>
          <div className={`input-wrap ${errors.loanYears ? "input-error" : ""}`}>
            <span aria-hidden="true">Y</span>
            <input
              id="loan-years"
              type="number"
              min="0.01"
              step="0.01"
              inputMode="decimal"
              placeholder="Enter years"
              value={loanYears}
              onChange={(event) => onInputChange("loanYears", event.target.value)}
              aria-invalid={Boolean(errors.loanYears)}
              aria-describedby={errors.loanYears ? "loan-years-error" : undefined}
            />
          </div>
          {errors.loanYears && (
            <p id="loan-years-error" className="field-error" role="alert">
              {errors.loanYears}
            </p>
          )}
        </div>
      </div>

      <button className="primary-button" type="button" onClick={onCalculate}>
        Calculate EMI
      </button>

      {result && (
        <div className="result" aria-live="polite">
          <div className="result-header">
            <div>
              <p className="result-label">Monthly EMI</p>
              <strong className="result-main-value">{formatCurrency(result.emi)}</strong>
            </div>
            <span className="result-badge">Updated</span>
          </div>

          <div className="summary-grid">
            <div className="summary-item">
              <span>Total Interest</span>
              <strong>{formatCurrency(result.totalInterest)}</strong>
            </div>
            <div className="summary-item">
              <span>Total Payment</span>
              <strong>{formatCurrency(result.totalPayment)}</strong>
            </div>
          </div>

          <button className="secondary-button" type="button" onClick={onViewSchedule}>
            View Full Payment Schedule
          </button>
        </div>
      )}
    </section>
  );
}

function PaymentSchedule({ result, loanDetails, onBack }) {
  return (
    <section className="schedule-panel" aria-labelledby="schedule-title">
      <button className="back-button" type="button" onClick={onBack}>
        ← Back to Calculator
      </button>

      <header className="schedule-header">
        <div>
          <p className="eyebrow">Repayment overview</p>
          <h1 id="schedule-title">Loan Payment Schedule</h1>
        </div>
      </header>

      <div className="schedule-overview">
        <div className="overview-item">
          <span>Loan Amount</span>
          <strong>{formatCurrency(loanDetails.loanAmount)}</strong>
        </div>
        <div className="overview-item">
          <span>Interest Rate</span>
          <strong>{formatPercent(loanDetails.interestRate)}</strong>
        </div>
        <div className="overview-item">
          <span>Loan Tenure</span>
          <strong>{loanDetails.loanYears} years</strong>
        </div>
        <div className="overview-item">
          <span>Monthly EMI</span>
          <strong>{formatCurrency(result.emi)}</strong>
        </div>
        <div className="overview-item">
          <span>Total Interest</span>
          <strong>{formatCurrency(result.totalInterest)}</strong>
        </div>
        <div className="overview-item">
          <span>Total Payment</span>
          <strong>{formatCurrency(result.totalPayment)}</strong>
        </div>
      </div>

      <div className="table-panel">
        <div className="table-header">
          <h2>Complete payment schedule</h2>
          <span>{result.schedule.length} months</span>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{formatCurrency(row.emi)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.principal)}</td>
                  <td>{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button className="secondary-button schedule-back" type="button" onClick={onBack}>
        Back to Calculator
      </button>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="empty-state" aria-live="polite">
      <div className="empty-icon" aria-hidden="true">₹</div>
      <h2>Your payment schedule will appear here</h2>
      <p>Enter your loan details and calculate the EMI to view the complete amortization schedule.</p>
    </div>
  );
}

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const loanDetails = useMemo(
    () => ({
      loanAmount: Number(loanAmount) || 0,
      interestRate: Number(interestRate) || 0,
      loanYears: Number(loanYears) || 0,
    }),
    [loanAmount, interestRate, loanYears],
  );

  const validateLoanInputs = () => {
    const nextErrors = {};
    const principal = Number(loanAmount);
    const yearlyRate = Number(interestRate);
    const years = Number(loanYears);

    if (!Number.isFinite(principal) || principal <= 0) {
      nextErrors.loanAmount = "Loan amount must be greater than 0.";
    }

    if (!Number.isFinite(yearlyRate) || yearlyRate < 0) {
      nextErrors.interestRate = "Interest rate must be 0 or greater.";
    }

    if (!Number.isFinite(years) || years <= 0) {
      nextErrors.loanYears = "Loan tenure must be greater than 0.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const calculateEMI = () => {
    if (!validateLoanInputs()) {
      setShowSchedule(false);
      return;
    }

    const nextResult = calculateLoan({
      principal: Number(loanAmount),
      yearlyRate: Number(interestRate),
      years: Number(loanYears),
    });

    setResult(nextResult);
    setShowSchedule(false);
  };

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    }

    if (field === "loanAmount") setLoanAmount(value);
    if (field === "interestRate") setInterestRate(value);
    if (field === "loanYears") setLoanYears(value);
  };

  const handleViewSchedule = () => {
    if (result) {
      setShowSchedule(true);
    }
  };

  const handleBackToCalculator = () => {
    setShowSchedule(false);
  };

  return (
    <main className="app-shell">
      <div className="page-glow page-glow-one" aria-hidden="true" />
      <div className="page-glow page-glow-two" aria-hidden="true" />

      {showSchedule && result ? (
        <PaymentSchedule
          result={result}
          loanDetails={loanDetails}
          onBack={handleBackToCalculator}
        />
      ) : (
        <LoanCalculator
          loanAmount={loanAmount}
          interestRate={interestRate}
          loanYears={loanYears}
          errors={errors}
          onInputChange={handleInputChange}
          onCalculate={calculateEMI}
          result={result}
          onViewSchedule={handleViewSchedule}
        />
      )}

      {!result && !showSchedule && <EmptyState />}
    </main>
  );
}

export default App;