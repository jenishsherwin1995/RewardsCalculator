import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerRewards from '../modules/CustomerRewards';
import { fetchTransactions } from '../services/ApiService';
import { GroupByCustomerAndMonth } from '../utils/GroupByCustomerAndMonth';

jest.mock('../services/ApiService', () => ({
  fetchTransactions: jest.fn(),
}));

jest.mock('../utils/GroupByCustomerAndMonth', () => ({
  GroupByCustomerAndMonth: jest.fn(),
}));

describe('CustomerRewards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display loading indicator initially', () => {
    fetchTransactions.mockResolvedValue([]);
    GroupByCustomerAndMonth.mockReturnValue({ customerMonthlyData: {}, monthlyTransactions: {} });

    render(<CustomerRewards />);

    expect(screen.getByText(/loading data.../i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('should display error message if there is an error', async () => {
    fetchTransactions.mockRejectedValue(new Error('Fetch error'));
    GroupByCustomerAndMonth.mockReturnValue({ customerMonthlyData: {}, monthlyTransactions: {} });

    render(<CustomerRewards />);

    await waitFor(() => {
      expect(screen.getByText(/an error occurred while fetching the data/i)).toBeInTheDocument();
    });
  });

  test('should display tables when data is fetched successfully', async () => {
    const mockTransactions = [
      { transactionId: 1, customerId: 101, customer: 'Adam', amount: 120.75, date: '2024-07-01' },
      { transactionId: 2, customerId: 102, customer: 'Bose', amount: 75.5, date: '2024-07-15' },
    ];
    
    const mockGroupedData = {
      customerMonthlyData: {
        101: { customer: 'Adam', monthlyData: {} },
        102: { customer: 'Bose', monthlyData: {} },
      },
      monthlyTransactions: {},
    };

    fetchTransactions.mockResolvedValue(mockTransactions);
    GroupByCustomerAndMonth.mockReturnValue(mockGroupedData);

    render(<CustomerRewards />);

    await waitFor(() => {
      expect(screen.queryByText(/loading data.../i)).not.toBeInTheDocument();
      expect(screen.queryByText(/an error occurred while fetching the data/i)).not.toBeInTheDocument();
      
      expect(screen.getByText(/Overall Customer Reward Points/i)).toBeInTheDocument();
      expect(screen.getByText(/Transactions for/i)).toBeInTheDocument();
    });
  });
});
