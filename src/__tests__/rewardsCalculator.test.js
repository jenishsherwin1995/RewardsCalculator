import {
  calculateRewards,
  getLastThreeMonthsData,
  calculateLastThreeMonthsRewards
} from '../utils/rewardsCalculator';

describe('Utility Functions', () => {
  const sampleTransactions = [
    { customerId: '1', customer: 'Adam', amount: 120, date: '2024-09-10', transactionId: 't1' },
    { customerId: '1', customer: 'Bose', amount: 80, date: '2024-08-15', transactionId: 't2' },
    { customerId: '2', customer: 'Chris', amount: 150, date: '2024-07-25', transactionId: 't3' },
    { customerId: '2', customer: 'David', amount: 40, date: '2024-07-05', transactionId: 't4' },
    { customerId: '1', customer: 'Adam', amount: 200, date: '2024-06-10', transactionId: 't5' }
  ];

  describe('calculateRewards', () => {
    it('should correctly calculate rewards for each customer', () => {
      const result = calculateRewards(sampleTransactions);
      
      expect(result.customers['1'].totalPoints).toBe(220); // Points for John Doe
      expect(result.customers['2'].totalPoints).toBe(150); // Points for Jane Doe
      expect(result.totalPoints).toBe(370); // Total points
    });

    it('should ignore transactions with zero or negative amounts', () => {
      const transactions = [
        { customerId: '1', customer: 'Adam', amount: -20, date: '2024-09-10', transactionId: 't1' },
        { customerId: '1', customer: 'David', amount: 120, date: '2024-09-10', transactionId: 't2' }
      ];
      const result = calculateRewards(transactions);

      expect(result.customers['1'].totalPoints).toBe(90); // Only valid transaction should count
    });
  });

  describe('getLastThreeMonthsData', () => {
    it('should return transactions from the last three months of the current year', () => {
      const result = getLastThreeMonthsData(sampleTransactions);
      const transactionIds = result.map(transaction => transaction.transactionId);
      
      expect(transactionIds).toContain('t1'); // September transaction
      expect(transactionIds).toContain('t2'); // August transaction
      expect(transactionIds).not.toContain('t5'); // June transaction should not be included
    });
  });

  describe('calculateLastThreeMonthsRewards', () => {
    it('should return transactions for the last three months with correct totals', () => {
      const { transactions, totalPoints, totalAmount } = calculateLastThreeMonthsRewards(sampleTransactions);
      
      // Validate grouped transactions
      expect(transactions.length).toBe(2); // Only August and September transactions
      expect(transactions[0].monthYear).toBe('August 2024');
      expect(transactions[1].monthYear).toBe('September 2024');
      
      // Validate total points and amount
      expect(totalPoints).toBe(160); // Total points for August and September
      expect(totalAmount).toBe(200); // Total amount for August and September
    });

    it('should return empty transactions if no data exists in the last three months', () => {
      const oldTransactions = [
        { customerId: '1', customer: 'Adam', amount: 120, date: '2023-03-10', transactionId: 't1' }
      ];
      const { transactions, totalPoints, totalAmount } = calculateLastThreeMonthsRewards(oldTransactions);

      expect(transactions).toEqual([]);
      expect(totalPoints).toBe(0);
      expect(totalAmount).toBe(0);
    });
  });
});
