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
import {monthMap} from '../utils/MonthMap'

const OverallCustomerTable = ({ customerData, totalPointsSum }) => {
  const rows = [];
  const customerTotals = {};
  const rowSpanCounts = {};

  Object.entries(customerData).forEach(([customerId, { customer, monthlyData }]) => {
    let customerTotalPoints = 0;
    const uniqueMonths = new Set();

    Object.entries(monthlyData).forEach(([key, transactions]) => {
      uniqueMonths.add(key);
      transactions.forEach((transaction, index) => {
        customerTotalPoints += transaction.points;
        rows.push({
          customerName: index === 0 ? customer : '',
          customerId: index === 0 ? customerId : '',
          transactionId: transaction.transactionId,
          year: transaction.year,
          month: transaction.month,
          amount: transaction.amount,
          points: transaction.points,
          totalPoints: transactions.reduce((sum, { points }) => sum + points, 0),
          totalPointsForCustomer: customerTotalPoints,
          rowspan: rowSpanCounts[customerId] || 1,
        });
      });
    });
    customerTotals[customerId] = customerTotalPoints;
    rowSpanCounts[customerId] = uniqueMonths.size;
  });

  const sortedRows = rows.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    return monthMap[a.month] - monthMap[b.month];
  });

  return (
    <TableContainer component={Paper} style={{ marginBottom: '30px' }}>
      <Typography variant="h6" gutterBottom align="center">
        Overall Customer Reward Points
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
            <TableCell style={{ fontWeight: 'bold' }}>Total Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell rowSpan={row.rowspan} style={{ fontWeight: row.rowspan > 1 ? 'bold' : 'normal' }}>
                {row.customerName}
              </TableCell>
              <TableCell rowSpan={row.rowspan} style={{ fontWeight: row.rowspan > 1 ? 'bold' : 'normal' }}>
                {row.customerId}
              </TableCell>
              <TableCell>{row.transactionId}</TableCell>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>${row.amount.toFixed(2)}</TableCell>
              <TableCell>{row.points.toFixed(2)}</TableCell>
              <TableCell>{row.totalPoints.toFixed(2)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={7} align="right" style={{ fontWeight: 'bold' }}>
              Total Points for All Customers
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>{totalPointsSum.toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OverallCustomerTable;
