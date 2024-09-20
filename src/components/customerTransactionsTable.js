import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const CustomerTransactionsTable = ({ customers, totalPoints }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom >All Customer Transactions</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Customer ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Customer Name</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Transaction ID</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Date</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Purchased Amount</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Earned Points</TableCell>
            <TableCell sx={{ backgroundColor: 'lightgrey' }}>Total Earned Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(customers).map(([customerId, { customer, transactions, totalPoints }]) => (
            transactions.map(({ transactionId, date, amount, points }, index) => (
              <TableRow key={transactionId}>
                {index === 0 && (
                  <>
                    <TableCell rowSpan={transactions.length}>{customerId}</TableCell>
                    <TableCell rowSpan={transactions.length}>{customer}</TableCell>
                  </>
                )}
                <TableCell>{transactionId}</TableCell>
                <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                <TableCell>${amount}</TableCell>
                <TableCell>{points}</TableCell>
                {index === 0 && (
                  <TableCell rowSpan={transactions.length}>{totalPoints}</TableCell>
                )}
              </TableRow>
            ))
          ))}
          <TableRow>
            <TableCell colSpan={6} sx={{ textAlign: 'right', fontWeight: "bold", fontSize: "14px" }}>Total Reward Points</TableCell>
            <TableCell style={{fontWeight: "bold", fontSize: "14px" }}>{totalPoints}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTransactionsTable;
