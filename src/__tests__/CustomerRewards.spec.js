import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerRewards from './CustomerRewards';
import { fetchCustomerTransactionData } from '../services/apiService';

jest.mock('../services/apiService');

const mockData = [
  {
    id: '1',
    name: 'John Doe',
    transactions: [{ id: 't1', date: '2023-06-15', amount: 100 }],
  },
];

describe('CustomerRewards', () => {
  beforeEach(() => {
    fetchCustomerTransactionData.mockResolvedValue(mockData);
  });

  it('renders without crashing', async () => {
    render(<CustomerRewards />);
    await waitFor(() => expect(screen.getByText(/Reward Points/)).toBeInTheDocument());
  });

  it('fetches and displays customers', async () => {
    render(<CustomerRewards />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
