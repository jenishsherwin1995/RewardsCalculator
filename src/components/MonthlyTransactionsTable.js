import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { monthMap } from '../utils/MonthMap';

const MonthlyTransactionsTable = ({ monthlyData }) => {  
  const sortedMonthlyData = Object.entries(monthlyData)
    .sort(([aMonthKey], [bMonthKey]) => {
      const [aMonth, aYear] = aMonthKey.split(' ');
      const [bMonth, bYear] = bMonthKey.split(' ');
      if (aYear !== bYear) {
        return bYear - aYear;
      }
      return monthMap[bMonth] - monthMap[aMonth];
    });

  return (
    sortedMonthlyData.map(([monthKey, transactions]) => {
      const totalPoints = transactions.reduce((sum, transaction) => sum + (transaction.points || 0), 0);

      return (
        <TableContainer component={Paper} style={{ marginBottom: '30px' }} key={monthKey}>
          <Typography variant="h6" gutterBottom align="center">
            Transactions for {monthKey}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Month</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Customer ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Year</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Spent Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Points</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={transaction.transactionId}>
                  {index === 0 && (
                    <TableCell rowSpan={transactions.length} style={{ fontWeight: 'bold' }}>
                      {transaction.month}
                    </TableCell>
                  )}
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.customerId}</TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>{transaction.year}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>{transaction.points.toFixed(2)}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={6} align="right" style={{ fontWeight: 'bold' }}>
                  Total Earned Points:
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  {totalPoints.toFixed(2)}
                </TableCell>
              </TableRow>

              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">No transactions</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      );
    })
  );
};

export default MonthlyTransactionsTable;
