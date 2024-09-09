import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerRewards from './CustomerRewards';
import data from '../MockData/mockData.json'; // Mock data import for the test

jest.mock('../MockData/mockData.json', () => [
  {
    id: '1',
    name: 'Customer One',
    transactions: [
      { date: '2023-01-15', amount: 120 },
      { date: '2023-01-20', amount: 80 },
      { date: '2023-02-10', amount: 200 },
    ],
  },
]);

test('renders CustomerRewards component and filters data correctly', () => {
  render(<CustomerRewards />);

  // Check if CustomerSelector is rendered
  expect(screen.getByText('Select Customer')).toBeInTheDocument();

  // Select a customer
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

  // Check if YearSelector is rendered
  expect(screen.getByText('Select Year')).toBeInTheDocument();

  // Select a year
  fireEvent.change(screen.getByRole('combobox', { name: /Select Year/i }), { target: { value: '2023' } });

  // Check if the TransactionTable is rendered
  expect(screen.getByText('January')).toBeInTheDocument();
  expect(screen.getByText('February')).toBeInTheDocument();
});
