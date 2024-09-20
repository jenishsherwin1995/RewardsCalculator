export const calculateMonthlyTotals = (transactions) => {
  return transactions.reduce((acc, { monthYear, transactions }) => {
    const monthTotalPoints = transactions.reduce((sum, { points }) => sum + points, 0);
    const monthTotalAmount = transactions.reduce((sum, { amount }) => sum + amount, 0);
    acc[monthYear] = {
      totalPoints: monthTotalPoints,
      totalAmount: monthTotalAmount,
    };
    return acc;
  }, {});
};