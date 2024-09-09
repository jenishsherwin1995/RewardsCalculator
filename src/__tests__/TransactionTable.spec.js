import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransactionTable from './TransactionTable';

test('renders transaction table with correct data', () => {
  const transactions = [
    { date: '2023-01-15', amount: 120 },
    { date: '2023-01-20', amount: 80 },
    { date: '2023-02-10', amount: 200 },
  ];

  render(<TransactionTable transactions={transactions} />);

  expect(screen.getByText('January')).toBeInTheDocument();
  expect(screen.getByText('$200.00')).toBeInTheDocument(); // Total amount for January
  expect(screen.getByText('130')).toBeInTheDocument(); // Total points for January
  expect(screen.getByText('February')).toBeInTheDocument();
  expect(screen.getByText('$200.00')).toBeInTheDocument(); // Total amount for February
  expect(screen.getByText('200')).toBeInTheDocument(); // Total points for February
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByText('$400.00')).toBeInTheDocument(); // Overall total amount
  expect(screen.getByText('330')).toBeInTheDocument(); // Overall total points
});
