// src/components/LastThreeMonthsTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LastThreeMonthsTable from './LastThreeMonthsTable';

const mockTransactions = [
  {
    monthYear: "July 2024",
    transactions: [
      { transactionId: 1, date: "2024-07-01", customer: "Adam", amount: 120.75, points: 70.75 }
    ],
    totalPoints: 70.75,
    totalAmount: 120.75
  }
];

describe('LastThreeMonthsTable', () => {
  it('should render the table with transactions for the last three months', () => {
    render(<LastThreeMonthsTable transactions={mockTransactions} totalPoints={70.75} totalAmount={120.75} />);
    
    expect(screen.getByText(/Month/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Purchased Amounts/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Earned Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Purchased Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Earned Points/i)).toBeInTheDocument();

    expect(screen.getByText(/July 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/120.75/i)).toBeInTheDocument();
    expect(screen.getByText(/70.75/i)).toBeInTheDocument();
  });
});
