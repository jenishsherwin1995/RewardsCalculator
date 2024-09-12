import React, { useState, useEffect, useMemo } from 'react';
import AllTransactionTable from './transactionTable/allTransactionTable.js';
import { constants } from '../utils/constants';
import './customerRewards.css';
import { fetchCustomerTransactionData } from "../services/apiService";
import { calculatePoints } from '../utils/calculatePoints.js';

// This function is to get all Customer transaction data
const getCustomerCentricData = (allTransactionData) => {
  return allTransactionData?.map((customer) => {
    const totalPoints = customer.transactions.reduce((acc, transaction) => acc + calculatePoints(transaction.amount), 0);
    const totalTransactionAmount = customer.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      customerId: customer.id,
      customerName: customer.name,
      transactions: customer.transactions.map((transaction, index) => ({
        transactionDate: new Date(transaction.date).toLocaleDateString(),
        transactionAmount: transaction.amount,
        earnedPoints: calculatePoints(transaction.amount),
        showCustomerInfo: index === 0,
        totalTransactionAmount: index === 0 ? totalTransactionAmount : null,
        totalPoints: index === 0 ? totalPoints : null,
      })),
    };
  });
};

// This function is to get month wise data
const getMonthCentricData = (monthWiseData) => {
  const dataByMonth = {};

  monthWiseData?.forEach((monthData) => {
    const { year, month, transactions } = monthData;
    const yearMonth = `${year}-${month}`;

    if (!dataByMonth[yearMonth]) {
      dataByMonth[yearMonth] = { totalAmount: 0, totalPoints: 0, customerPoints: {} };
    }

    transactions.forEach((transaction) => {
      const { id, name, totalAmount, totalEarnedPoints } = transaction;

      const customerPoints = dataByMonth[yearMonth].customerPoints[id] || { totalPoints: 0, totalAmount: 0, name };

      customerPoints.totalPoints += totalEarnedPoints;
      customerPoints.totalAmount += totalAmount;

      dataByMonth[yearMonth].totalAmount += totalAmount;
      dataByMonth[yearMonth].totalPoints += totalEarnedPoints;
      dataByMonth[yearMonth].customerPoints[id] = customerPoints;
    });
  });

  return Object.entries(dataByMonth).map(([yearMonth, { totalPoints, totalAmount, customerPoints }]) => {
    const [year, month] = yearMonth.split('-');

    const transactions = Object.entries(customerPoints).map(([customerId, { totalPoints, totalAmount, name }]) => ({
      id: customerId,
      name,
      totalAmount,
      totalEarnedPoints: totalPoints,
    }));

    return { year, month, transactions };
  });
};

//This functionis to get the last three months' data
const getLastThreeMonthsData = (threeMonthsData) => {
  const now = new Date();
  const lastThreeMonths = [];

  for (let i = 0; i <= 3; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yearMonth = `${month.getFullYear()}-${month.getMonth() + 1}`;
    lastThreeMonths.push(yearMonth);
  }

  const dataByMonth = {};

  threeMonthsData?.forEach((customer) => {
    customer.transactions.forEach((transaction) => {
      const monthIndex = new Date(Date.parse(`${transaction.month} 1, ${now.getFullYear()}`)).getMonth() + 1;
      const yearMonth = `${now.getFullYear()}-${monthIndex}`;

      if (lastThreeMonths.includes(yearMonth)) {
        if (!dataByMonth[yearMonth]) {
          dataByMonth[yearMonth] = { totalPoints: 0, customerPoints: {} };
        }

        const customerPoints = dataByMonth[yearMonth].customerPoints[customer.id] || {
          totalPoints: 0,
          name: customer.name,
        };

        customerPoints.totalPoints += transaction.totalEarnedPoints;
        dataByMonth[yearMonth].totalPoints += transaction.totalEarnedPoints;
        dataByMonth[yearMonth].customerPoints[customer.id] = customerPoints;
      }
    });
  });

  return Object.entries(dataByMonth).flatMap(([yearMonth, { customerPoints }]) =>
    Object.entries(customerPoints).map(([customerId, { totalPoints, name }]) => ({
      id: customerId,
      name,
      month: new Date(`${yearMonth}-01`).toLocaleString('default', { month: 'long' }),
      totalEarnedPoints: totalPoints,
    }))
  );
};

const CustomerRewards = () => {
  const [customerYearState, setCustomerYear] = useState({
    AllTransactionData: [],
    MonthWiseData: [],
    ThreeMonthsData: [],
  });
  const [errorHandler,SetErrorHandler]=useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCustomerTransactionData();
        setCustomerYear({
          AllTransactionData: data.AllTransactionData,
          MonthWiseData: data.MonthWiseData,
          ThreeMonthsData: data.ThreeMonthsData,
        });
      } catch (error) {
        SetErrorHandler(error);
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const { AllTransactionData, MonthWiseData, ThreeMonthsData } = customerYearState;
 
  const { customerCentricData, monthCentricData, lastThreeMonthsData } = useMemo(() => {
    return {
      customerCentricData: getCustomerCentricData(AllTransactionData),
      monthCentricData: getMonthCentricData(MonthWiseData),
      lastThreeMonthsData: getLastThreeMonthsData(ThreeMonthsData),
    };
  }, [AllTransactionData, MonthWiseData, ThreeMonthsData]);

  return (
    errorHandler==="" ?
    <div>
      <h1>{constants.CustomerRewardpoints}</h1>
      <AllTransactionTable
        customerCentricData={customerCentricData}
        monthCentricData={monthCentricData}
        lastThreeMonthsData={lastThreeMonthsData}
      />
    </div> : 
    <div>
     <h5 style={{color:"red"}}> An Error occured while fetching the data</h5> 
    </div>
  );
};

export default CustomerRewards;
