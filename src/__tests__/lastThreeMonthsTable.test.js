import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LastThreeMonthsTable from '../components/lastThreeMonthsTable';

const mockTransactions = [
  {
    monthYear: 'July 2024',
    transactions: [
      { transactionId: 1, customer: 'Adam', amount: 120.75, points: 100 }
    ],
    totalPoints: 100,
    totalAmount: 120.75
  }
];

describe('LastThreeMonthsTable Component', () => {
  test('renders the table with transactions for the last three months', () => {
    render(<LastThreeMonthsTable transactions={mockTransactions} totalPoints={150} totalAmount={120.75} />);

    expect(screen.getByText(/last 3 months transactions/i)).toBeInTheDocument();
    expect(screen.getByText('July')).toBeInTheDocument();
    expect(screen.getByText('120.75')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('displays the total rewards at the bottom', () => {
    render(<LastThreeMonthsTable transactions={mockTransactions} totalPoints={150} totalAmount={120.75} />);

    expect(screen.getByText(/total rewards/i)).toBeInTheDocument();
    expect(screen.getByText('150Points')).toBeInTheDocument();
  });
});
