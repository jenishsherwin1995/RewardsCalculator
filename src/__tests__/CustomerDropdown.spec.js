import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerDropdown from './CustomerDropdown';

test('renders dropdown with customers', () => {
  const customers = [
    { id: '1', name: 'Customer One' },
    { id: '2', name: 'Customer Two' },
  ];

  render(<CustomerDropdown customers={customers} onSelectCustomer={() => {}} />);

  expect(screen.getByText('Select Customer')).toBeInTheDocument();
  expect(screen.getByText('Customer One')).toBeInTheDocument();
  expect(screen.getByText('Customer Two')).toBeInTheDocument();
});

test('calls onSelectCustomer when a customer is selected', () => {
  const customers = [
    { id: '1', name: 'Customer One' },
    { id: '2', name: 'Customer Two' },
  ];

  const onSelectCustomer = jest.fn();

  render(<CustomerDropdown customers={customers} onSelectCustomer={onSelectCustomer} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });

  expect(onSelectCustomer).toHaveBeenCalledWith('1');
});
