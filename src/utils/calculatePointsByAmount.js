import {RewardThresholdAmount} from '../enum/RewardThresholdAmountEnum';

const calculatePointsByAmount = (amount) => {
    let points = 0;
    if(amount > RewardThresholdAmount.OVER_100) {
        points += 2 * (amount - RewardThresholdAmount.OVER_100);
        amount = RewardThresholdAmount.OVER_100;
    }
    if(amount > RewardThresholdAmount.BETWEEN_50_AND_100){
        points += 1 * (amount - RewardThresholdAmount.BETWEEN_50_AND_100);
    }
    return points;
};

export default calculatePointsByAmount;
