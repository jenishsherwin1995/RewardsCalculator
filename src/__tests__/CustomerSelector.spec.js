import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerSelector from './CustomerSelector';

test('renders dropdown with selected customer', () => {
  const customers = [
    { id: '1', name: 'Customer One' },
    { id: '2', name: 'Customer Two' },
  ];

  render(<CustomerSelector customers={customers} selectedCustomerId="1" onSelectCustomer={() => {}} />);

  expect(screen.getByRole('combobox')).toHaveValue('1');
  expect(screen.getByText('Customer One')).toBeInTheDocument();
  expect(screen.getByText('Customer Two')).toBeInTheDocument();
});

test('calls onSelectCustomer when a customer is selected', () => {
  const customers = [
    { id: '1', name: 'Customer One' },
    { id: '2', name: 'Customer Two' },
  ];

  const onSelectCustomer = jest.fn();

  render(<CustomerSelector customers={customers} selectedCustomerId="" onSelectCustomer={onSelectCustomer} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });

  expect(onSelectCustomer).toHaveBeenCalledWith('2');
});
