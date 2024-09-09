import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerSelector from './CustomerSelector';

const mockCustomers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

describe('CustomerSelector', () => {
  it('renders without crashing', () => {
    render(<CustomerSelector customers={mockCustomers} onSelectCustomer={jest.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onSelectCustomer when customer is selected', () => {
    const mockOnSelectCustomer = jest.fn();
    render(<CustomerSelector customers={mockCustomers} onSelectCustomer={mockOnSelectCustomer} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(mockOnSelectCustomer).toHaveBeenCalledWith('1');
  });
});
