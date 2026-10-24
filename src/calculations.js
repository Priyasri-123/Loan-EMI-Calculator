export function calculateLoan({ principal, yearlyRate, years }) {
  const months = years * 12;
  const monthlyRate = yearlyRate / 12 / 100;
  const emiValue =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPaymentValue = emiValue * months;
  const totalInterestValue = totalPaymentValue - principal;

  let balance = principal;
  const schedule = [];

  for (let month = 1; month <= months; month += 1) {
    const interest = balance * monthlyRate;
    const principalPaid = emiValue - interest;
    balance -= principalPaid;

    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      emi: emiValue,
      interest,
      principal: principalPaid,
      balance,
    });
  }

  return {
    emi: emiValue,
    totalInterest: totalInterestValue,
    totalPayment: totalPaymentValue,
    schedule,
  };
}
