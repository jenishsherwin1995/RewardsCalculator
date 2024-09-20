export const calculateMonthlyTotals = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      const monthYear = new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' });
      const monthTotalPoints = (acc[monthYear]?.totalPoints || 0) + transaction.points;
      const monthTotalAmount = (acc[monthYear]?.totalAmount || 0) + transaction.amount;
  
      acc[monthYear] = {
        totalPoints: monthTotalPoints,
        totalAmount: monthTotalAmount,
      };
      return acc;
    }, {});
  };