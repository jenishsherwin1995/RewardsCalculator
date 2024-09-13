import { CalculatePoints } from './CalculatePoints';

export const GroupByCustomerAndMonth = (transactions) => {
  const customerMonthlyData = {};
  const monthlyTransactions = {};

  transactions.forEach(({ transactionId, customerId, customer, amount, date }) => {
    const transactionDate = new Date(date);
    const year = transactionDate.getFullYear();
    const month = transactionDate.toLocaleString('default', { month: 'long' });
    const points = CalculatePoints(amount);

    if (!customerMonthlyData[customerId]) {
      customerMonthlyData[customerId] = {
        customer,
        monthlyData: {},
      };
    }

    if (!customerMonthlyData[customerId].monthlyData[`${year}-${month}`]) {
      customerMonthlyData[customerId].monthlyData[`${year}-${month}`] = [];
    }

    customerMonthlyData[customerId].monthlyData[`${year}-${month}`].push({
      year,
      month,
      amount,
      points,
      transactionId,
    });

    if (!monthlyTransactions[`${year}-${month}`]) {
      monthlyTransactions[`${year}-${month}`] = [];
    }

    monthlyTransactions[`${year}-${month}`].push({
      customerId,
      customer,
      year,
      month,
      amount,
      points,
      transactionId,
    });
  });

  return { customerMonthlyData, monthlyTransactions };
};
