import React, { useEffect, useState, useMemo } from 'react';
import { getTransactionsData } from '../services/transactionService';
import { calculateRewards, calculateLastThreeMonthsRewards } from '../utils/rewardsCalculator';
import CustomerTransactionsTable from '../components/customerTransactionsTable';
import LastThreeMonthsTable from '../components/lastThreeMonthsTable';
import { Box, Container } from '@mui/material';

const CustomerRewards = () => {
  const [transactions, setTransactions] = useState([]); //State that stores the array of transactions fetched from the API.
  const [loading, setLoading] = useState(true); //Boolean state that indicates whether data is currently being loaded.
  const [error, setError] = useState(null); // State to store any error messages if the API call fails.

  // This useEffect runs once when the component is mounted, making the API call to fetch transaction data.
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactionsData();        
        setTransactions(data);
      } catch (err) {
        setError('Error fetching transaction data');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  //This useMemo is to prevent recalculating customer rewards unless the transactions array changes.
  const { customers, totalPoints: totalCustomerPoints } = useMemo(() => calculateRewards(transactions), [transactions]);

  //This useMemo ensures the calculation of rewards for the last three months is only performed when transactions changes.
  const { transactions: lastThreeMonthsTransactions, totalPoints: totalLastThreeMonthsPoints} = useMemo(
    () => calculateLastThreeMonthsRewards(transactions),
    [transactions]
  );
  
//  If the loading state is true, it shows a loading message until the transactions data is fetched.
  if (loading) {
    return <div>Loading...</div>;
  }
// If an error occurred while fetching data, it displays the error message stored in the error state
  if (error) {
    return <div>{error}</div>;
  }

  return (        
    <Container>
    <Box display="flex" flexDirection="row">
       <Box flex={1} mr={2}>

         {/* Contains the CustomerTransactionsTable component that displays all customer transactions. */} 
      <CustomerTransactionsTable customers={customers} totalPoints={totalCustomerPoints} />
      </Box>
      <Box flex={1}>
      {/* Contains the CustomerTransactionsTable component that displays all customer transactions. */} 
      <LastThreeMonthsTable transactions={lastThreeMonthsTransactions} totalPoints={totalLastThreeMonthsPoints} />    
        
      </Box>
      </Box>
    </Container>
    
  );
};

export default CustomerRewards;
