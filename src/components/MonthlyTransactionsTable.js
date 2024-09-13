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

const MonthlyTransactionsTable = ({ monthlyData }) => {
  return (
    Object.entries(monthlyData).map(([monthKey, transactions]) => (
      <TableContainer component={Paper} style={{ marginBottom: '30px' }} key={monthKey}>
        <Typography variant="h6" gutterBottom align="center">
          Transactions for {monthKey}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Customer Name</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Customer ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Transaction ID</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Year</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Month</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Spent Amount</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.transactionId}>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.customerId}</TableCell>
                <TableCell>{transaction.transactionId}</TableCell>
                <TableCell>{transaction.year}</TableCell>
                <TableCell>{transaction.month}</TableCell>
                <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                <TableCell>{transaction.points.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">No transactions</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    ))
  );
};

export default MonthlyTransactionsTable;
