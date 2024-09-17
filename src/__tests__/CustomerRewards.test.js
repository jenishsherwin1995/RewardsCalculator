import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import CustomerRewards from '../components/CustomerRewards';
import { getTransactionsData } from '../services/transactionService';
import { calculateRewards, calculateLastThreeMonthsRewards } from '../utils/rewardsCalculator';

// Mock the imported services and utils
jest.mock('../services/transactionService');
jest.mock('../utils/rewardsCalculator');

const mockTransactions = [
  { transactionId: 1, customerId: 101, customer: 'Adam', amount: 120.75, date: '2024-07-01' },
  { transactionId: 2, customerId: 102, customer: 'Bose', amount: 75.5, date: '2024-08-15' }
];

describe('CustomerRewards Component', () => {
  beforeEach(() => {
    getTransactionsData.mockResolvedValue(mockTransactions);
    calculateRewards.mockReturnValue({
      customers: { 101: { customer: 'Adam', transactions: [{ transactionId: 1 }], totalPoints: 120 } },
      totalPoints: 120
    });
    calculateLastThreeMonthsRewards.mockReturnValue({
      transactions: [{ monthYear: 'August 2024', transactions: mockTransactions }],
      totalPoints: 50,
      totalAmount: 150
    });
  });

  test('displays loading state initially', () => {
    render(<CustomerRewards />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message if transaction fetching fails', async () => {
    getTransactionsData.mockRejectedValueOnce(new Error('Error fetching transaction data'));

    await act(async () => {
      render(<CustomerRewards />);
    });

    expect(screen.getByText(/error fetching transaction data/i)).toBeInTheDocument();
  });

  test('displays tables after successful data fetch', async () => {
    await act(async () => {
      render(<CustomerRewards />);
    });

    await waitFor(() => {
      expect(screen.getByText(/all customer transactions/i)).toBeInTheDocument();
      expect(screen.getByText(/last 3 months transactions/i)).toBeInTheDocument();
    });
  });

  test('calculates and passes rewards to components', async () => {
    await act(async () => {
      render(<CustomerRewards />);
    });

    await waitFor(() => {
      expect(calculateRewards).toHaveBeenCalledWith(mockTransactions);
      expect(calculateLastThreeMonthsRewards).toHaveBeenCalledWith(mockTransactions);
    });
  });
});
