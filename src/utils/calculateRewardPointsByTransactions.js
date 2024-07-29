import calculatePointsByAmount from './calculatePointsByAmount';
import logger from '../logger';

const calculateRewardPointsByTransactions = (transactions) => {
    return transactions.reduce((pointsByCustomer, transaction) => {
        const { customerId, customerName, transactionDate, amount } = transaction;
        const date = new Date(transactionDate);
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' }); //create for display on UI
        const points = calculatePointsByAmount(amount);

        if (!pointsByCustomer[customerId]) {
            pointsByCustomer[customerId] = {
                customerName: '',
                yearlyRewardPoints: {},
                totalRewardPoints: 0,
                totalAmount: 0,
            };
        }

        if (!pointsByCustomer[customerId].yearlyRewardPoints[year]) {
            pointsByCustomer[customerId].yearlyRewardPoints[year] = {
                monthlyRewardPoints: {},
                totalYearlyRewardPoints: 0,
                totalYearlyAmount: 0,
            };
        }

        if (!pointsByCustomer[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month]) {
            pointsByCustomer[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month] = {
                monthName: '',
                points: 0,
                amount: 0,
            };
        }

        pointsByCustomer[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].monthName += monthName;
        pointsByCustomer[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].points += points;
        pointsByCustomer[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].amount += amount;

        pointsByCustomer[customerId].yearlyRewardPoints[year].totalYearlyRewardPoints += points;
        pointsByCustomer[customerId].yearlyRewardPoints[year].totalYearlyAmount += amount;

        pointsByCustomer[customerId].customerName = customerName;
        pointsByCustomer[customerId].totalRewardPoints += points;
        pointsByCustomer[customerId].totalAmount += amount;

        logger.log('Earn Reward points By Customer: ', pointsByCustomer);
        return pointsByCustomer;
    }, {});
    
};

export default calculateRewardPointsByTransactions;
