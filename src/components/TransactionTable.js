import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress'; // Import the CircularProgress component
import TableBody from '@mui/material/TableBody'; // Import TableBody for body rows

const TransactionTable = ({ transactions }) => {
  const [loading, setLoading] = useState(false); // State to handle loading indicator

  // Simulate a loading effect for data fetch or update
  useEffect(() => {
    setLoading(true);
    // Mimic data fetch or update delay (replace this with your actual data fetch logic)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [transactions]);

  const calculatePoints = (amount) => {
    if (amount > 100) {
      return 2 * (amount - 100) + 50; // 2 points for each dollar over $100, 1 point for each dollar between $50 and $100
    } else if (amount > 50) {
      return amount - 50; // 1 point for each dollar between $50 and $100
    } else {
      return 0; // No points if the amount is $50 or less
    }
  };

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
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Purchased Amount</TableCell>
              <TableCell>Rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress /> {/* Loading indicator inside the table */}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {Object.entries(pointsByYearMonth).map(([year, months]) => (
                  <React.Fragment key={year}>
                    {Object.entries(months).map(([month, { totalPoints, totalAmount }], index) => (
                      <TableRow key={`${year}-${month}`}>
                        {/* Show the year only for the first month row */}
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
                    <strong>Total</strong>
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
