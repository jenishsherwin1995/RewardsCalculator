import React from 'react';
import { render, screen } from '@testing-library/react';
import OverallCustomerTable from '../components/OverallCustomerTable';

describe('OverallCustomerTable', () => {
  const mockCustomerData = {
    101: {
      customer: 'Adam',
      monthlyData: {
        'July 2024': [
          { transactionId: 1, year: 2024, month: 'July', amount: 120.75, points: 35.25 },
        ],
      },
    },
    102: {
      customer: 'Bose',
      monthlyData: {
        'August 2024': [
          { transactionId: 2, year: 2024, month: 'August', amount: 75.5, points: 25.5 },
        ],
      },
    },
  };

  const mockTotalPointsSum = 60.75;

  test('renders overall customer table correctly', () => {
    render(<OverallCustomerTable customerData={mockCustomerData} totalPointsSum={mockTotalPointsSum} />);    
    expect(screen.getByText(/Overall Customer Reward Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Adam/i)).toBeInTheDocument();
    expect(screen.getByText(/120.75/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Points for All Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/60.75/i)).toBeInTheDocument();
  });
});
