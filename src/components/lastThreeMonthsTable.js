import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableFooter } from '@mui/material';
import { calculateMonthlyTotals } from '../utils/rewardsCalculator';

const LastThreeMonthsTable = ({ transactions, totalPoints, totalAmount }) => {

  //util function to extract total points and total purchased amount per month wise
  const monthlyTotals = calculateMonthlyTotals(transactions);

  // This is to flatten transactions and include monthYear, monthTotalPoints, monthTotalAmount, and rowspan
  const rows = transactions.flatMap(({ monthYear, transactions }) => 
    transactions.map((transaction, index) => ({
      ...transaction,
      monthYear,
      monthTotalPoints: monthlyTotals[monthYear].totalPoints, // Total points for the month
      monthTotalAmount: monthlyTotals[monthYear].totalAmount, // Total purchased amount for the month
      isFirstInMonth: index === 0, // Mark the first row for the month
      rowspan: transactions.length // Set rowspan to the number of transactions for that month
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
                  <TableCell rowSpan={rowspan}>{monthTotalAmount.toFixed(2)}</TableCell>
                  <TableCell rowSpan={rowspan}>{monthTotalPoints.toFixed(2)}</TableCell>
                </>
              )}
              <TableCell>{customer || 'Unknown'}</TableCell>
              <TableCell>{amount.toFixed(2)}</TableCell>
              <TableCell>{points.toFixed(2)}</TableCell> {/* Earned Points for each transaction */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2} sx={{ textAlign: 'right', fontWeight:"bold",fontSize:"14px" }}> Total Rewards</TableCell>
            <TableCell style={{fontWeight:"bold", fontSize:"14px"}}>{totalPoints.toFixed(2)} Points</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LastThreeMonthsTable;
