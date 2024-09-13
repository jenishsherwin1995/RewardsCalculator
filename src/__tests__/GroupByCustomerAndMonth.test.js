import { GroupByCustomerAndMonth } from '../utils/GroupByCustomerAndMonth';

describe('groupByCustomerAndMonth', () => {
  const transactions = [
    { transactionId: 1, customerId: 101, customer: 'Adam', amount: 120.75, date: '2024-07-01' },
    { transactionId: 2, customerId: 101, customer: 'Adam', amount: 75.5, date: '2024-07-15' },
    { transactionId: 3, customerId: 102, customer: 'Bose', amount: 60.25, date: '2024-08-12' },
  ];

  test('groups transactions by customer and month correctly', () => {
    const { customerMonthlyData, monthlyTransactions } = GroupByCustomerAndMonth(transactions);
   
    expect(customerMonthlyData).toHaveProperty('101');
    expect(customerMonthlyData['101'].monthlyData).toHaveProperty('July 2024');
    expect(customerMonthlyData['102'].monthlyData).toHaveProperty('August 2024');

    expect(monthlyTransactions).toHaveProperty('July 2024');
    expect(monthlyTransactions['July 2024']).toHaveLength(2);
    expect(monthlyTransactions['August 2024']).toHaveLength(1);
  });
});
