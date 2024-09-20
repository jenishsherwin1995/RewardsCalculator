import { calculateMonthlyTotals } from '../utils/calculateMonthlyTotals';

describe('calculateMonthlyTotals', () => {
  it('should calculate monthly totals correctly', () => {
    const transactions = [
      {
        monthYear: 'January 2023',
        transactions: [
          { points: 10, amount: 100 },
          { points: 20, amount: 200 },
        ],
      },
      {
        monthYear: 'February 2023',
        transactions: [
          { points: 30, amount: 300 },
          { points: 40, amount: 400 },
        ],
      },
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

});