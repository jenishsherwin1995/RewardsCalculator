import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerDropdown from './CustomerDropdown';

const mockCustomers = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

describe('CustomerDropdown', () => {
  it('renders without crashing', () => {
    render(<CustomerDropdown customers={mockCustomers} onSelectCustomer={jest.fn()} />);
    expect(screen.getByLabelText(/Customer/)).toBeInTheDocument();
  });

  it('displays customer options', () => {
    render(<CustomerDropdown customers={mockCustomers} onSelectCustomer={jest.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('calls onSelectCustomer when a customer is selected', () => {
    const mockOnSelectCustomer = jest.fn();
    render(<CustomerDropdown customers={mockCustomers} onSelectCustomer={mockOnSelectCustomer} />);

    fireEvent.change(screen.getByLabelText(/Customer/), { target: { value: '1' } });
    expect(mockOnSelectCustomer).toHaveBeenCalledWith('1');
  });
});
