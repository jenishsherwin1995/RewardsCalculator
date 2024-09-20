import { calculateMonthlyTotals } from '../utils/calculateMonthlyTotals';

describe('calculateMonthlyTotals', () => {
  it('should calculate monthly totals correctly', () => {
    const transactions = [
      { date: '2023-01-01', points: 10, amount: 100 },
      { date: '2023-01-15', points: 20, amount: 200 },
      { date: '2023-02-01', points: 30, amount: 300 },
      { date: '2023-02-15', points: 40, amount: 400 },
    ];

    const result = calculateMonthlyTotals(transactions);

    expect(result).toEqual({
      'January 2023': { totalPoints: 30, totalAmount: 300 },
      'February 2023': { totalPoints: 70, totalAmount: 700 },
    });
  });

  it('should handle empty transactions array', () => {
    const transactions = [];

    const result = calculateMonthlyTotals(transactions);

    expect(result).toEqual({});
  });

  it('should handle transactions with the same date', () => {
    const transactions = [
      { date: '2023-01-01', points: 10, amount: 100 },
      { date: '2023-01-01', points: 20, amount: 200 },
    ];

    const result = calculateMonthlyTotals(transactions);

    expect(result).toEqual({
      'January 2023': { totalPoints: 30, totalAmount: 300 },
    });
  });
});