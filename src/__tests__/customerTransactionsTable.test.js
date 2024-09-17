// src/components/CustomerTransactionsTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerTransactionsTable from './CustomerTransactionsTable';

const mockCustomers = {
  101: {
    customer: "Adam",
    transactions: [
      { transactionId: 1, date: "2024-07-01", amount: 120.75, points: 70.75 }
    ],
    totalPoints: 70.75
  }
};

describe('CustomerTransactionsTable', () => {
  it('should render the table with customer transactions', () => {
    render(<CustomerTransactionsTable customers={mockCustomers} totalPoints={70.75} />);
    
    expect(screen.getByText(/Customer ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Purchased Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Earned Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Earned Points/i)).toBeInTheDocument();

    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
    expect(screen.getByText(/120.75/i)).toBeInTheDocument();
    expect(screen.getByText(/70.75/i)).toBeInTheDocument();
  });
});
