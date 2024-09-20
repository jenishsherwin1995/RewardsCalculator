import { constants } from "../utils/constants";

export const getTransactionsData = async () => {
  try {
    const response = await fetch("/customerTransactionsData.json");
    if (!response.ok) {      
      throw new Error(constants.ERROR_MESSAGE);
    }
    const data = await response.json();    
    return data;
  } catch (err) {
   // console.error(err);
    throw err;
  } finally {
    // console.log(fetch success);
  }
};
