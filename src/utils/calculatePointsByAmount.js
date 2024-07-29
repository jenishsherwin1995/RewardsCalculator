import { RewardThresholdAmount } from '../enum/RewardThresholdAmountEnum';
import logger from '../logger';

const calculatePointsByAmount = (amount) => {
    let points = 0;
    if (amount > RewardThresholdAmount.OVER_100) {  //handle case for over 100
        points += 2 * (amount - RewardThresholdAmount.OVER_100);
        amount = RewardThresholdAmount.OVER_100;
    }
    if (amount > RewardThresholdAmount.BETWEEN_50_AND_100) { //handle case for between 50 & 100
        points += 1 * (amount - RewardThresholdAmount.BETWEEN_50_AND_100);
    }
    logger.log('Earn Reward points By Amount: ', points);
    return Math.round(points);
};

export default calculatePointsByAmount;
