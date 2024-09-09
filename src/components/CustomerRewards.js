import React, { useState, useEffect, useMemo } from 'react';
import CustomerSelector from './CustomerSelector';
import YearSelector from './YearSelector';
import TransactionTable from './TransactionTable';
import { getUniqueYears } from '../utils/getUniqueYears';
import { constants } from '../utils/constants';
import './CustomerRewards.css';
import { fetchCustomerTransactionData } from "../services/apiService";

const CustomerRewards = () => {
  const [customerYearState, setCustomerYear] = useState({
    customers: [],
    selectedCustomerId: '',
    selectedYear: '',
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCustomerTransactionData();
        setCustomerYear(prevState => ({
          ...prevState,
          customers: data,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);
  
  const { customers, selectedCustomerId, selectedYear } = customerYearState;

  const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);

  const years = useMemo(() => getUniqueYears(customers), [customers]);

  const filteredTransactions = useMemo(() => {
    const selectedCustomer = customers.find(customer => customer.id === selectedCustomerId);
    return selectedCustomer
      ? selectedCustomer.transactions.filter(transaction => {
        const transactionYear = new Date(transaction.date).getFullYear();
        return !selectedYear || transactionYear === parseInt(selectedYear);
      })
      : [];
  }, [selectedCustomerId, selectedYear, customers]);

  const handleCustomerChange = (customerId) => {
    setCustomerYear(prevState => ({
      ...prevState,
      selectedCustomerId: customerId,
    }));
  };

  const handleYearChange = (year) => {
    setCustomerYear(prevState => ({
      ...prevState,
      selectedYear: year,
    }));
  };

  return (
    <div>
      <h1>{constants.CustomerRewardpoints}</h1>

      <div className="selectors-container">
        <CustomerSelector
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={handleCustomerChange}
        />
        <YearSelector
          years={years}
          selectedYear={selectedYear}
          onSelectYear={handleYearChange}
        />
      </div>
      {selectedCustomer && (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export default CustomerRewards;