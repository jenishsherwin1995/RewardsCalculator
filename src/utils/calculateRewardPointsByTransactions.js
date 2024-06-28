import calculatePointsByAmount from './calculatePointsByAmount';
import logger from '../logger';

const calculateRewardPointsByTransactions = (transactions) => {
    return transactions.reduce((pointsByCustomer, transaction) => {
        const { customerId, customerName, transactionDate, amount } = transaction;
        const date = new Date(transactionDate);
        const month = date.toLocaleString('default', { month: 'long' }); //get month name by given date
        const points = calculatePointsByAmount(amount);

        if (!pointsByCustomer[customerId]) {
            pointsByCustomer[customerId] = { customerName: '', monthlyRewardPoints: {}, totalRewardPoints: 0, totalAmount: 0 };
        }
        if (!pointsByCustomer[customerId].monthlyRewardPoints[month]) {
            pointsByCustomer[customerId].monthlyRewardPoints[month] = { points: 0, amount: 0 };
        }

        pointsByCustomer[customerId].monthlyRewardPoints[month].points += points;
        pointsByCustomer[customerId].monthlyRewardPoints[month].amount += amount;

        pointsByCustomer[customerId].customerName = customerName;
        pointsByCustomer[customerId].totalRewardPoints += points;
        pointsByCustomer[customerId].totalAmount += amount;
        logger.log('Earn Reward points By Customer: ', pointsByCustomer);
        return pointsByCustomer;
    }, {});
}
export default calculateRewardPointsByTransactions;
