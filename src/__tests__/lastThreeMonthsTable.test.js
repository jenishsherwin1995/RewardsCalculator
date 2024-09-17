import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LastThreeMonthsTable from '../components/lastThreeMonthsTable';

const mockTransactions = [
  {
    monthYear: "July 2024",
    transactions: [
      { transactionId: 1, date: "2024-07-01", customer: "Adam", amount: 120.75, points: 70.75 },
      { transactionId: 1, date: "2024-07-01", customer: "Bose", amount: 120.75, points: 70.75 },
      { transactionId: 1, date: "2024-07-01", customer: "Chris", amount: 120.75, points: 70.75 }
    ],
    totalPoints: 70.75,
    totalAmount: 120.75
  }
];

describe('LastThreeMonthsTable', () => {
  it('should render the table with transactions for the last three months', () => {
    render(<LastThreeMonthsTable transactions={mockTransactions} totalPoints={70.75} totalAmount={120.75} />);
    
    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
    expect(screen.getByText(/Bose/i)).toBeInTheDocument();   
    expect(screen.getByText(/Chris/i)).toBeInTheDocument();       
   
  });
});
