# Loan EMI Calculator

A simple and responsive **Loan EMI Calculator** built using React.js. This application helps users calculate their monthly loan instalment (EMI), total interest payable, and total repayment amount based on the loan amount, annual interest rate, and loan tenure.

## Features

- **Calculate Monthly EMI** – Calculate the monthly instalment based on loan details.
- **Loan Summary** – View the monthly EMI, total interest, and total payment.
- **Payment Schedule** – View the month-by-month breakdown of EMI, interest, principal repaid, and remaining loan balance.
- **Easy Navigation** – Navigate between the loan calculator and the full payment schedule.
- **Input Validation** – Validate loan details before calculating results.
- **Responsive Design** – User-friendly interface for desktop, tablet, and mobile screens.

## Technologies Used

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

## EMI Calculation Formula

The calculator uses the standard reducing-balance EMI formula:

\[
EMI = \frac{P \times r \times (1+r)^n}{(1+r)^n-1}
\]

Where:

- **P** = Principal loan amount
- **r** = Monthly interest rate (annual rate ÷ 12 ÷ 100)
- **n** = Total number of monthly instalments (loan tenure in years × 12)

The monthly EMI includes both principal repayment and interest. As the outstanding loan balance decreases, the interest portion generally decreases over time.

## Getting Started

Follow these steps to run the project on your local computer.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Priyasri-123/Loan-EMI-Calculator.git
```

**2. Navigate to the project folder**

```bash
cd loan-emi-calculator
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## How to Use

1. Enter the loan amount.
2. Enter the annual interest rate as a percentage.
3. Enter the loan tenure in years.
4. Click **Calculate EMI**.
5. Review the monthly EMI, total interest, and total repayment amount.
6. Select **View Full Payment Schedule** to see the monthly repayment breakdown.
7. Use **Back to Calculator** to return to the calculator.

## Example

For a loan of ₹1,00,000 at an annual interest rate of 12% for 2 years:

| Detail | Value |
|---|---:|
| Loan Amount | ₹1,00,000 |
| Annual Interest Rate | 12% |
| Loan Tenure | 2 years |
| Approximate Monthly EMI | ₹4,707 |
| Number of Instalments | 24 |

*Values are approximate. Actual repayments may vary depending on rounding and the lender's terms.*

## Project Structure

```text
loan-emi-calculator/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

*The exact structure may vary depending on your project setup.*

## Future Enhancements

- Add interactive charts showing principal and interest distribution.
- Support tenure in months as well as years.
- Add loan comparison functionality.
- Allow users to download the payment schedule as a CSV or PDF.
- Add a simple-interest calculator.

## Learning Outcomes

Through this project, I practised:

- Building user interfaces with React components.
- Managing form inputs using React state.
- Performing financial calculations using JavaScript.
- Displaying dynamic data using the `map()` method.
- Creating tables and responsive layouts with CSS.
- Implementing navigation between different views.

## Disclaimer

This calculator provides estimates for educational purposes. It does not replace official loan quotations or financial advice.

## Author

**Priyasri Elangovan**

