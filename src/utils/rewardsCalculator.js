// This function is to calculate rewards for each customer based on transactions
export const calculateRewards = (transactions) => {
  return transactions.reduce(
    (acc, { customerId, customer, amount, date, transactionId }) => {
      if (isNaN(amount) || amount <= 0) {
        return acc;
      }  

      let points = 0;
      if (amount > 100) {
        points += (amount - 100) * 2 + 50 * 1;
      } else if (amount > 50) {
        points += (amount - 50) * 1;
      }

      // To initialize customer data if not present
      if (!acc.customers[customerId]) {
        acc.customers[customerId] = { customer, transactions: [], totalPoints: 0 };
      }

      acc.customers[customerId] = {
        ...acc.customers[customerId],
        transactions: acc.customers[customerId].transactions.concat({
          transactionId,
          date,
          amount,
          points: parseFloat(points.toFixed(2)),
        }),
        totalPoints: parseFloat((acc.customers[customerId].totalPoints + points).toFixed(2)),
      };

      acc.totalPoints = parseFloat((acc.totalPoints + points).toFixed(2));

      return acc;
    },
    { customers: {}, totalPoints: 0 }
  );
};

// This function is to filter the last three months data of the current year
export const getLastThreeMonthsData = (transactions) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const pastThreeMonthsStart = new Date(currentYear, currentMonth - 2, 1);
  const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);

  return transactions.filter(({ date }) => {
    const transactionDate = new Date(date);
    return (
      transactionDate.getFullYear() === currentYear &&
      transactionDate >= pastThreeMonthsStart &&
      transactionDate <= currentMonthEnd
    );
  });
};

export const calculateLastThreeMonthsRewards = (transactions) => {
  // Get the last three months data
  const lastThreeMonthsData = getLastThreeMonthsData(transactions);

  // Calculate rewards for the last three months data
  const { customers } = calculateRewards(lastThreeMonthsData);
  console.log("customers",customers)
  // Flatten transactions for the last three months 
  const allTransactions = Object.values(customers).flatMap(customer => 
    customer.transactions.map(transaction => ({
      ...transaction,
      customer: customer.customer,
      monthYear: new Date(transaction.date).toLocaleString('default', { month: 'long', year: 'numeric' }),
      month: new Date(transaction.date).getMonth(),
      year: new Date(transaction.date).getFullYear()
    }))
  );
console.log("allTransactions",allTransactions)
 
    // Sort transactions by year and month in ascending order
  allTransactions.sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    }
    return a.year - b.year;
  });

  // This function is to calculate total points and total amount for the last three months
  const totalPoints = allTransactions.reduce((acc, { points }) => acc + points, 0);
  const totalAmount = allTransactions.reduce((acc, { amount }) => acc + amount, 0);

  // This function is to Group transactions by month and year
  const transactionsByMonth = allTransactions.reduce((acc, { monthYear, ...transaction }) => {
    if (!acc[monthYear]) {
      acc[monthYear] = {
        transactions: [],
        totalPoints: 0,
        totalAmount: 0
      };
    }
    acc[monthYear].transactions.push(transaction);
    acc[monthYear].totalPoints += transaction.points;
    acc[monthYear].totalAmount += transaction.amount;
    return acc;
  }, {});
  console.log("transactionsByMonth",transactionsByMonth)
  // Convert grouped data to an array format for rendering
  const sortedGroupedTransactions = Object.entries(transactionsByMonth).map(([monthYear, { transactions, totalPoints, totalAmount }]) => ({
    monthYear,
    transactions,
    totalPoints,
    totalAmount
  }));

  return { transactions: sortedGroupedTransactions, totalPoints, totalAmount };
};



