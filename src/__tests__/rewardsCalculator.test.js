// src/utils/rewardsCalculator.test.js
import { calculateRewards, calculateLastThreeMonthsRewards } from './rewardsCalculator';

const mockTransactions = [
  { transactionId: 1, customerId: 101, customer: "Adam", amount: 120.75, date: "2024-07-01" },
  { transactionId: 2, customerId: 102, customer: "Bose", amount: 75.5, date: "2024-08-15" }
];

describe('calculateRewards', () => {
  it('should calculate rewards correctly', () => {
    const result = calculateRewards(mockTransactions);
    expect(result.customers).toHaveProperty('101');
    expect(result.customers['101'].totalPoints).toBeCloseTo(70.75);
  });
});

describe('calculateLastThreeMonthsRewards', () => {
  it('should calculate rewards for the last three months correctly', () => {
    const result = calculateLastThreeMonthsRewards(mockTransactions);
    expect(result.transactions).toHaveLength(2);
    expect(result.totalPoints).toBeCloseTo(146.25);
  });
});
