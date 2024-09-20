import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerRewards from '../modules/CustomerRewards';
import { getTransactionsData } from '../services/transactionService';
import { calculateRewards, calculateLastThreeMonthsRewards } from '../utils/rewardsCalculator';

jest.mock('../services/transactionService', () => ({
  getTransactionsData: jest.fn(),
}));

jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewards: jest.fn(),
  calculateLastThreeMonthsRewards: jest.fn(),
}));

const mockTransactions = [
  { transactionId: 1, customerId: 101, customer: "Adam", amount: 120.75, date: "2024-07-01" }
];

const mockRewards = {
  customers: {
    101: {
      customer: "Adam",
      transactions: [
        { transactionId: 1, date: "2024-07-01", amount: 120.75, points: 70.75 }
      ],
      totalPoints: 70.75
    }
  },
  totalPoints: 70.75
};

const mockLastThreeMonthsRewards = {
  transactions: [
    {
      monthYear: "July 2024",
      transactions: [
        { transactionId: 1, date: "2024-07-01", customer: "Adam", amount: 120.75, points: 70.75 }
      ],
      totalPoints: 70.75,
      totalAmount: 120.75
    }
  ],
  totalPoints: 70.75,
  totalAmount: 120.75
};

describe('CustomerRewards', () => {
  beforeEach(() => {
    getTransactionsData.mockResolvedValue(mockTransactions);
    calculateRewards.mockReturnValue(mockRewards);
    calculateLastThreeMonthsRewards.mockReturnValue(mockLastThreeMonthsRewards);
  });

  it('should render loading state initially', () => {
    render(<CustomerRewards />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });
  it('should render error message if there is an error', async () => {
    getTransactionsData.mockRejectedValueOnce(new Error('Error fetching transaction data'));
    render(<CustomerRewards />);
    await waitFor(() => {
      expect(screen.getByText(/Error fetching transaction data/i)).toBeInTheDocument();
    });
  });
  it('should render tables after data is fetched', async () => {
    render(<CustomerRewards />);
    await waitFor(() => {
      expect(screen.getByText(/All Customer Transactions/i)).toBeInTheDocument();
      expect(screen.getByText(/Last 3 Months Transactions/i)).toBeInTheDocument();
    });
  });
});
