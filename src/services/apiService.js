import { constants } from "../utils/constants";
import logger from '../logger';

export const fetchCustomerTransactionData = async () => {
  try {
    const response = await fetch("/customerTransactionsData.json");
    if (!response.ok) {
      logger.error(constants.ERROR_MESSAGE);
      throw new Error(constants.ERROR_MESSAGE);
    }
    const data = await response.json();
    logger.log('Fetch Customer Transaction Data', data);
    return data;
  } catch (err) {
    logger.error(constants.ERROR_MESSAGE, err);
    throw err;
  }
};