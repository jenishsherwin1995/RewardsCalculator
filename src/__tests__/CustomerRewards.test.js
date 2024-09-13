import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerRewards from '../components/CustomerRewards';
import { fetchTransactions } from '../services/ApiService';

jest.mock('../services/ApiService', () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock('../utils/GroupByCustomerAndMonth', () => ({
  GroupByCustomerAndMonth: jest.fn(),
}));

describe('CustomerRewards', () => {
  const mockTransactions = [
    { transactionId: 1, customerId: 101, customer: 'Adam', amount: 120.75, date: '2024-07-01' },
    { transactionId: 2, customerId: 102, customer: 'Bose', amount: 75.5, date: '2024-07-15' },
  ];

  beforeEach(() => {
    fetchTransactions.mockResolvedValue(mockTransactions);    
  });

  test('fetches and displays data', async () => {
    render(<CustomerRewards />);

    await waitFor(() => {      
      expect(screen.getByText(/Overall Customer Reward Points/i)).toBeInTheDocument();
      expect(screen.getByText(/Transactions for/i)).toBeInTheDocument();
    });
  });
});
