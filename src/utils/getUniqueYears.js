export const getUniqueYears = (customers) => {
    const years = new Set();
    customers.forEach(customer => {
      customer.transactions.forEach(transaction => {
        const year = new Date(transaction.date).getFullYear();
        years.add(year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  };
  