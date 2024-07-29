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

    const expected = {
      '1': {
        customerName: "Customer One",
        yearlyRewardPoints: {
          2024: {
              monthlyRewardPoints: {
                  1: {
                      monthName : "February",
                      points : 25,
                      amount : 75
                  }
              },
              "totalYearlyRewardPoints": 25,
              "totalYearlyAmount": 75
          }
      },
      "totalRewardPoints": 25,
      "totalAmount": 75
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
        customerName: "Customer Two",
        transactionDate: '2024-02-05',
        amount: 100.5
      }
    ];

    const expected = {
      '1': {
        customerName: "Customer One",
        yearlyRewardPoints: {
            2024: {
                monthlyRewardPoints: {
                    1: {
                        monthName : "February",
                        points : 25,
                        amount : 75
                    }
                },
                "totalYearlyRewardPoints": 25,
                "totalYearlyAmount": 75
            }
        },
        "totalRewardPoints": 25,
        "totalAmount": 75
      },
      '2': {
        customerName: "Customer Two",
        yearlyRewardPoints: {
          2024: {
              monthlyRewardPoints: {
                  1: {
                      monthName : "February",
                      points : 51,
                      amount : 100.5
                  }
              },
              "totalYearlyRewardPoints": 51,
              "totalYearlyAmount": 100.5
          }
      },
      "totalRewardPoints": 51,
      "totalAmount": 100.5
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
        customerName: "Customer Two",
        transactionDate: '2024-02-05',
        amount: 40
      }
    ];

    const expected = {
      '1': {
        customerName: "Customer One",
        yearlyRewardPoints: {
          2024: {
              monthlyRewardPoints: {
                  1: {
                      monthName : "February",
                      points : 0,
                      amount : 30
                  }
              },
              "totalYearlyRewardPoints": 0,
              "totalYearlyAmount": 30
          }
      },
      "totalRewardPoints": 0,
      "totalAmount": 30
      },
      '2': {
        customerName: "Customer Two",
        yearlyRewardPoints: {
          2024: {
              monthlyRewardPoints: {
                  1: {
                      monthName : "February",
                      points : 0,
                      amount : 40
                  }
              },
              "totalYearlyRewardPoints": 0,
              "totalYearlyAmount": 40
          }
      },
      "totalRewardPoints": 0,
      "totalAmount": 40
      }
    };

    expect(calculateRewardPointsByTransactions(transactions)).toEqual(expected);
  });
});