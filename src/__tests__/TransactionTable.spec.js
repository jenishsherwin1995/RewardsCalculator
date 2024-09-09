import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from './TransactionTable';
import { calculatePoints } from '../utils/calculatePoints';

jest.mock('../utils/calculatePoints', () => ({
  calculatePoints: jest.fn((amount) => (amount > 50 ? amount : 0)),
}));

const mockTransactions = [
  { id: '1', date: '2023-06-15', amount: 100 },
  { id: '2', date: '2023-07-20', amount: 150 },
];

describe('TransactionTable', () => {
  it('renders without crashing', () => {
    render(<TransactionTable transactions={mockTransactions} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('displays transactions with calculated points', () => {
    render(<TransactionTable transactions={mockTransactions} />);
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(calculatePoints).toHaveBeenCalledWith(100);
    expect(calculatePoints).toHaveBeenCalledWith(150);
  });
});
