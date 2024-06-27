import calculateRewardPointsByTransactions from '../utils/calculateRewardPointsByTransactions';

describe('calculate Reward Points By Transactions', () => {
  test('should earned points correctly for a single transaction', () => {
    const transactions = [
      { 
        transactionId: 2,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: '2024-02-05', 
        amount: 75
      }
    ];

    const expected =  {                                             
      '1': {                                      
        monthlyRewardPoints: { 
          February: {
          amount: 75,
          points: 25,
        } },
        totalRewardPoints: 25,
        totalAmount: 75
      }
    };

    expect(calculateRewardPointsByTransactions(transactions)).toEqual(expected);
  });

  test('should calculate earned points correctly for multiple transactions with 2 customers', () => {
    
    const transactions = [
      { 
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: '2024-02-05', 
        amount: 75
      },
      { 
        transactionId: 2,
        customerId: 2,
        customerName: "Customer One",
        transactionDate: '2024-02-05', 
        amount: 100
      }
    ];

    const expected =  {                                             
      '1': {                                      
        monthlyRewardPoints: { 
          February: {
          amount: 75,
          points: 25,
        } },
        totalRewardPoints: 25,
        totalAmount: 75
      },
      '2': {                                      
        monthlyRewardPoints: { 
          February: {
          amount: 100,
          points: 50,
        } },
        totalRewardPoints: 50,
        totalAmount: 100
      }
    };

    expect(calculateRewardPointsByTransactions(transactions)).toEqual(expected);
  });

  test('should return an empty object for no transactions', () => {
    const transactions = [];

    const expected = {};

    expect(calculateRewardPointsByTransactions(transactions)).toEqual(expected);
  });

  test('should handle transactions below the 50', () => {
    const transactions = [
      { 
        transactionId: 1,
        customerId: 1,
        customerName: "Customer One",
        transactionDate: '2024-02-05', 
        amount: 30
      },
      { 
        transactionId: 2,
        customerId: 2,
        customerName: "Customer One",
        transactionDate: '2024-02-05', 
        amount: 40
      }
    ];

    const expected =  {                                             
      '1': {                                      
        monthlyRewardPoints: { 
          February: {
          amount: 30,
          points: 0,
        } },
        totalRewardPoints: 0,
        totalAmount: 30
      },
      '2': {                                      
        monthlyRewardPoints: { 
          February: {
          amount: 40,
          points: 0,
        } },
        totalRewardPoints: 0,
        totalAmount: 40
      }
    };

    expect(calculateRewardPointsByTransactions(transactions)).toEqual(expected);
  });
});