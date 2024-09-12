// AllTransactionTable.spec.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AllTransactionTable from '../transactionTable/AllTransactionTable';

describe('AllTransactionTable Component', () => {
  const customerCentricData = [
    {
      customerId: 1,
      customerName: 'Adam',
      transactions: [
        {
          transactionDate: '8/1/2024',
          transactionAmount: 120,
          earnedPoints: 50,
          showCustomerInfo: true,
          totalTransactionAmount: 195,
          totalPoints: 75,
        },
      ],
    },
  ];

  const monthCentricData = [
    {
      year: 2024,
      month: 8,
      transactions: [
        { id: 1, name: 'Adam', totalAmount: 195, totalEarnedPoints: 75 },
      ],
    },
  ];

  const lastThreeMonthsData = [
    { id: 1, name: 'Adam', month: 'August', totalEarnedPoints: 75 },
  ];

  test('renders loading state initially', () => {
    render(
      <AllTransactionTable
        customerCentricData={customerCentricData}
        monthCentricData={monthCentricData}
        lastThreeMonthsData={lastThreeMonthsData}
      />
    );

    expect(screen.getByText(/loading data/i)).toBeInTheDocument();
  });

  test('renders customer-centric, month-centric, and last three months tables after loading', async () => {
    render(
      <AllTransactionTable
        customerCentricData={customerCentricData}
        monthCentricData={monthCentricData}
        lastThreeMonthsData={lastThreeMonthsData}
      />
    );

    await waitFor(() => expect(screen.getByText('Customer Transaction Data')).toBeInTheDocument());
    expect(screen.getByText('Monthly Data')).toBeInTheDocument();
    expect(screen.getByText('Customers Last Three Months Data')).toBeInTheDocument();
  });

  test('displays correct data in the customer-centric table', async () => {
    render(
      <AllTransactionTable
        customerCentricData={customerCentricData}
        monthCentricData={monthCentricData}
        lastThreeMonthsData={lastThreeMonthsData}
      />
    );

    await waitFor(() => expect(screen.getByText('Adam')).toBeInTheDocument());
    expect(screen.getByText('$120')).toBeInTheDocument();
    expect(screen.getByText('50 points')).toBeInTheDocument();
  });
});
