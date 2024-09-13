import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthlyTransactionsTable from '../components/MonthlyTransactionsTable';

describe('MonthlyTransactionsTable', () => {
  const mockMonthlyData = {
    'July 2024': [
      { transactionId: 1, customer: 'Adam', customerId: 101, year: 2024, month: 'July', amount: 120.75, points: 35.25 },
    ],
    'August 2024': [
      { transactionId: 2, customer: 'Bose', customerId: 102, year: 2024, month: 'August', amount: 75.5, points: 25.5 },
    ],
  };

  test('renders monthly transactions table correctly', () => {
    render(<MonthlyTransactionsTable monthlyData={mockMonthlyData} />);
    
    expect(screen.getByText(/Transactions for July 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
    expect(screen.getByText(/$120.75/i)).toBeInTheDocument();
  });
});
