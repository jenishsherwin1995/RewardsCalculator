import { constants } from "../utils/constants";

export const fetchCustomerTransactionData = async () => {
    try {
      const response = await fetch("/customerTransactionsData.json");
      if(!response.ok) {
        throw new Error(constants.ERROR_MESSAGE);  //we can also use Logger
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
};