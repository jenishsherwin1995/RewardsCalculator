import React, { useState, useEffect } from 'react';
import { GroupByCustomerAndMonth } from '../utils/GroupByCustomerAndMonth';
import OverallCustomerTable from '../components/OverallCustomerTable';
import MonthlyTransactionsTable from '../components/MonthlyTransactionsTable';
import { fetchTransactions } from '../services/ApiService';
import CircularProgress from '@mui/material/CircularProgress';
import { monthMap } from '../utils/MonthMap';

const CustomerRewards = () => {
  const [dataState, setDataState] = useState({
    customerData: {},
    monthlyData: {},
    totalPointsSum: 0,
    loading: true,
    error: null,
  });

  const getTransactionsData = async () => {
    try {
      const transactions = await fetchTransactions();
      const { customerMonthlyData, monthlyTransactions } = GroupByCustomerAndMonth(transactions);      
      let totalSum = 0;
      Object.values(customerMonthlyData).forEach((data) => {
        Object.values(data.monthlyData).forEach((transactions) => {
          transactions.forEach(({ points }) => {
            totalSum += points;
          });
        });
      });

      const currentYear = new Date().getFullYear();
      const filteredMonthlyData = Object.entries(monthlyTransactions)
        .filter(([monthKey]) => monthKey.includes(`${currentYear}`))
        .sort(([aMonthKey], [bMonthKey]) => {
          const [aMonth, aYear] = aMonthKey.split(' ');
          const [bMonth, bYear] = bMonthKey.split(' ');
          if (aYear !== bYear) {
            return bYear - aYear;
          }
          return monthMap[bMonth] - monthMap[aMonth];
        })
        .slice(-3)
        .reduce((acc, [monthKey, transactions]) => {
          acc[monthKey] = transactions;
          return acc;
        }, {});

      setDataState((prevState) => ({
        ...prevState,
        customerData: customerMonthlyData,
        monthlyData: filteredMonthlyData,
        totalPointsSum: parseFloat(totalSum.toFixed(2)),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error fetching or processing transactions data:', error);
      setDataState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    getTransactionsData();
  }, []);

  if (dataState.loading) {
    return (
      <div>
        <CircularProgress />
        <p style={{ color: "blue" }}>Loading data...</p>
      </div>
    );
  }

  if (dataState.error) {
    return (
      <div>
        <h5 style={{ color: "red" }}>An Error occurred while fetching the data</h5>
      </div>
    );
  }

  return (
    <div>
      <OverallCustomerTable customerData={dataState.customerData} totalPointsSum={dataState.totalPointsSum} />
      <MonthlyTransactionsTable monthlyData={dataState.monthlyData} />
    </div>
  );
};

export default CustomerRewards;
