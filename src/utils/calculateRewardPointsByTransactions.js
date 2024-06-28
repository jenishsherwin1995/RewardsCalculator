import calculatePointsByAmount from './calculatePointsByAmount';

const calculateRewardPointsByTransactions = (transactions) => {
    return transactions.reduce((pointsByCustomer, transaction) => {
        const { customerId, transactionDate, amount } = transaction;
        const date = new Date(transactionDate);
        const month = date.toLocaleString('default', { month: 'long' }); //get month name by given date
        const points = calculatePointsByAmount(amount);

        if (!pointsByCustomer[customerId]) {
            pointsByCustomer[customerId] = { monthlyRewardPoints: {}, totalRewardPoints: 0, totalAmount: 0 };
        }
        if (!pointsByCustomer[customerId].monthlyRewardPoints[month]) {
            pointsByCustomer[customerId].monthlyRewardPoints[month] = { points: 0, amount: 0 };
        }

        pointsByCustomer[customerId].monthlyRewardPoints[month].points += points;
        pointsByCustomer[customerId].monthlyRewardPoints[month].amount += amount;

        pointsByCustomer[customerId].totalRewardPoints += points;
        pointsByCustomer[customerId].totalAmount += amount;

        return pointsByCustomer;
    }, {});
}
export default calculateRewardPointsByTransactions;
