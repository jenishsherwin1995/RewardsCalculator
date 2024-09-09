import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import YearSelector from './YearSelector';

const mockYears = ['2023', '2024'];

describe('YearSelector', () => {
  it('renders without crashing', () => {
    render(<YearSelector years={mockYears} onSelectYear={jest.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays year options', () => {
    render(<YearSelector years={mockYears} onSelectYear={jest.fn()} />);
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('calls onSelectYear when a year is selected', () => {
    const mockOnSelectYear = jest.fn();
    render(<YearSelector years={mockYears} onSelectYear={mockOnSelectYear} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2023' } });
    expect(mockOnSelectYear).toHaveBeenCalledWith('2023');
  });
});
