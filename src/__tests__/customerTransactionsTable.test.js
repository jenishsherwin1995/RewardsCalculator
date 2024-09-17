import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerTransactionsTable from '../components/CustomerTransactionsTable';

const mockCustomers = {
  101: {
    customer: 'Adam',
    transactions: [
      { transactionId: 1, date: '2024-07-01', amount: 120.75, points: 100 }
    ],
    totalPoints: 100
  }
};

describe('CustomerTransactionsTable Component', () => {
  test('renders the table with customer transactions', () => {
    render(<CustomerTransactionsTable customers={mockCustomers} totalPoints={120} />);

    expect(screen.getByText(/all customer transactions/i)).toBeInTheDocument();
    expect(screen.getByText('Adam')).toBeInTheDocument();
    expect(screen.getByText('120.75')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('renders total points of all customers', () => {
    render(<CustomerTransactionsTable customers={mockCustomers} totalPoints={120} />);

    expect(screen.getByText('Total Earned Points of All Customers')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });
});
