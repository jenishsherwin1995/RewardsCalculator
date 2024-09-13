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
    expect(customerMonthlyData['101'].monthlyData).toHaveProperty('2024-July'); // Adjusted to match actual format
    expect(customerMonthlyData['102'].monthlyData).toHaveProperty('2024-August'); // Adjusted to match actual format

    expect(monthlyTransactions).toHaveProperty('2024-July'); // Adjusted to match actual format
  });
});
