import test from "node:test";
import assert from "node:assert/strict";
import { calculateLoan } from "./calculations.js";

test("calculateLoan preserves the current EMI and amortization calculation", () => {
  const result = calculateLoan({
    principal: 500000,
    yearlyRate: 10,
    years: 5,
  });

  assert.equal(result.emi, 10623.52);
  assert.equal(result.totalPayment, 637411.34);
  assert.equal(result.totalInterest, 137411.34);
  assert.equal(result.schedule.length, 60);
  assert.equal(result.schedule[0].interest, 4166.67);
  assert.equal(result.schedule[0].principal, 6456.85);
  assert.equal(result.schedule[59].balance, 0);
});

test("calculateLoan handles a zero interest rate without producing infinity", () => {
  const result = calculateLoan({
    principal: 120000,
    yearlyRate: 0,
    years: 2,
  });

  assert.equal(result.emi, 5000);
  assert.equal(result.totalPayment, 120000);
  assert.equal(result.totalInterest, 0);
  assert.equal(result.schedule.length, 24);
  assert.equal(result.schedule[23].balance, 0);
});
