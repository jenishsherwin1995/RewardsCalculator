import React, { useState, useEffect } from 'react';
import { GroupByCustomerAndMonth } from '../utils/GroupByCustomerAndMonth';
import OverallCustomerTable from './OverallCustomerTable';
import MonthlyTransactionsTable from './MonthlyTransactionsTable';
import { fetchTransactions } from '../services/ApiService';
import CircularProgress from '@mui/material/CircularProgress'

const CustomerRewards = () => {
  const [customerData, setCustomerData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [totalPointsSum, setTotalPointsSum] = useState(0);
  const [errorHandler,SetErrorHandler]=useState("");
  const [loading, setLoading] = useState(true);


useEffect(() => {
    const GetTransactionsData = async () => {
      try {
        const transactions = await fetchTransactions();
        setLoading(false);      

        const { customerMonthlyData, monthlyTransactions } = GroupByCustomerAndMonth(transactions);
        let totalSum = 0;

        Object.values(customerMonthlyData).forEach((data) => {
          Object.values(data.monthlyData).forEach((transactions) => {
            transactions.forEach(({ points }) => {
              totalSum += points;
            });
          });
        });

        setCustomerData(customerMonthlyData);
        setMonthlyData(monthlyTransactions);
        setTotalPointsSum(parseFloat(totalSum.toFixed(2)));
      } catch (error) {
        console.error('Error fetching or processing transactions data:', error);
        SetErrorHandler(error)
      }
    };

    GetTransactionsData();
  }, []);
  if (loading) {    
    return (
      <div className="loading-container">
        <CircularProgress />
        <p style={{color:"blue"}}>Loading data...</p>
      </div>
    );
  }
  return (
    errorHandler==="" ?
    <div>
      <OverallCustomerTable customerData={customerData} totalPointsSum={totalPointsSum} />
      <MonthlyTransactionsTable monthlyData={monthlyData} />
    </div>:
    <div>
    <h5 style={{color:"red"}}> An Error occured while fetching the data</h5> 
   </div>
  );
};

export default CustomerRewards;
