import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YearSelector from './YearSelector';

test('renders year selector with years', () => {
  const years = ['2022', '2023'];

  render(<YearSelector years={years} selectedYear="" onSelectYear={() => {}} />);

  expect(screen.getByText('Select Year')).toBeInTheDocument();
  expect(screen.getByText('2022')).toBeInTheDocument();
  expect(screen.getByText('2023')).toBeInTheDocument();
});

test('calls onSelectYear when a year is selected', () => {
  const years = ['2022', '2023'];

  const onSelectYear = jest.fn();

  render(<YearSelector years={years} selectedYear="" onSelectYear={onSelectYear} />);

  fireEvent.change(screen.getByRole('combobox'), { target: { value: '2023' } });

  expect(onSelectYear).toHaveBeenCalledWith('2023');
});
