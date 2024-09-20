import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableFooter } from '@mui/material';
import { calculateMonthlyTotals } from '../utils/calculateMonthlyTotals';

const LastThreeMonthsTable = ({ transactions, totalPoints}) => {
  const [monthlyTotals, setMonthlyTotals] = useState({});

  useEffect(() => {
    const fetchMonthlyTotals = async () => {
      const totals = await calculateMonthlyTotals(transactions);
      setMonthlyTotals(totals);
    };

    fetchMonthlyTotals();
  }, [transactions]);

  const rows = transactions.flatMap(({ monthYear, transactions }) => 
    transactions.map((transaction, index) => ({
      ...transaction,
      monthYear,
      monthTotalPoints: monthlyTotals[monthYear]?.totalPoints || 0,
      monthTotalAmount: monthlyTotals[monthYear]?.totalAmount || 0,
      isFirstInMonth: index === 0,
      rowspan: transactions.length,
    }))
  );

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom>Last 3 Months Transactions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Month</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Monthly Purchased Amounts</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Monthly Earned Points</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Customer Name</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Purchased Amount</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Earned Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ monthYear, transactionId, customer, amount, points, monthTotalPoints, monthTotalAmount, isFirstInMonth, rowspan }) => (
            <TableRow key={transactionId}>
              {isFirstInMonth && (
                <>
                  <TableCell rowSpan={rowspan}>{monthYear.split(' ')[0]}</TableCell>
                  <TableCell rowSpan={rowspan}>${monthTotalAmount.toFixed(2)}</TableCell>
                  <TableCell rowSpan={rowspan}>{monthTotalPoints.toFixed(2)}</TableCell>
                </>
              )}
              <TableCell>{customer || 'Unknown'}</TableCell>
              <TableCell>$ {amount.toFixed(2)}</TableCell>
              <TableCell>{points.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} sx={{ textAlign: 'right', fontWeight: "bold", fontSize: "14px" }}> Total Rewards</TableCell>
            <TableCell style={{ fontWeight: "bold", fontSize: "14px" }}>{totalPoints.toFixed(2)} Points</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LastThreeMonthsTable;
