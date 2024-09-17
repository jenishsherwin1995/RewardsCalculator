import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerTransactionsTable from '../components/customerTransactionsTable';

const mockCustomers = {
  101: {
    customer: "Adam",
    transactions: [
      { transactionId: 1, date: "2024-07-01", amount: 120.75, points: 70.75 }
    ],
    totalPoints: 70.75
  },
  102: {
    customer: "Bose",
    transactions: [
      { transactionId: 2, date: "2024-07-01", amount: 120.75, points: 70.75 }
    ],
    totalPoints: 70.75
  }
};

describe('CustomerTransactionsTable', () => {
  it('should render the table with customer transactions', () => {
    render(<CustomerTransactionsTable customers={mockCustomers} totalPoints={70.75} />);   

    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
    expect(screen.getByText(/Bose/i)).toBeInTheDocument();
    
  });
});
