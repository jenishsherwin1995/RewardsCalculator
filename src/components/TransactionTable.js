import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TableBody from '@mui/material/TableBody';
import { constants } from '../utils/constants'
import { calculatePoints } from '../utils/calculatePoints'

const TransactionTable = ({ transactions }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [transactions]);

  const calculateYearlyMonthlyPoints = (transactions) => {
    const pointsByYearMonth = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      const points = calculatePoints(transaction.amount);

      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = { totalPoints: 0, totalAmount: 0 };
      }

      acc[year][month].totalPoints += points;
      acc[year][month].totalAmount += transaction.amount;
      return acc;
    }, {});

    return pointsByYearMonth;
  };

  const pointsByYearMonth = calculateYearlyMonthlyPoints(transactions);
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalPoints = transactions.reduce((sum, transaction) => sum + calculatePoints(transaction.amount), 0);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{constants.YEAR_DATA}</TableCell>
              <TableCell>{constants.MONTH}</TableCell>
              <TableCell>{constants.SPENT_AMOUNT}</TableCell>
              <TableCell>{constants.REWARDS}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
                <>
                  {Object.entries(pointsByYearMonth).map(([year, months]) => (
                    <React.Fragment key={year}>
                      {Object.entries(months).map(([month, { totalPoints, totalAmount }], index) => (
                        <TableRow key={`${year}-${month}`}>
                          {index === 0 ? <TableCell rowSpan={Object.keys(months).length}>{year}</TableCell> : null}
                          <TableCell>{month}</TableCell>
                          <TableCell>${totalAmount.toFixed(2)}</TableCell>
                          <TableCell>{totalPoints}</TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>{constants.TOTAL_EARNED_POINTS}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>${totalAmount.toFixed(2)}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{totalPoints}</strong>
                    </TableCell>
                  </TableRow>
                </>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
