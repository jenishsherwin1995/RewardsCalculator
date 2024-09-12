import {useState,useEffect,Fragment} from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import './AllTransactionTable.css';
import CircularProgress from '@mui/material/CircularProgress'

const CustomerCentricTable = ({ data }) => (
  <>
    <h4 style={{color:"GrayText"}}>Customer Transaction Data</h4>
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="customer-centric table" className="transaction-table">
        <TableHead>
          <TableRow>
            <TableCell>Customer ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Transaction Amount</TableCell>
            <TableCell>Earned Points</TableCell>
            <TableCell>Total Transaction Amount</TableCell>
            <TableCell>Total Earned Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((customer) =>
            customer.transactions.map((transaction, index) => (
              <TableRow key={`${customer.customerId}-${index}`}>
                {transaction.showCustomerInfo && (
                  <>
                    <TableCell rowSpan={customer.transactions.length}>{customer.customerId}</TableCell>
                    <TableCell rowSpan={customer.transactions.length}>{customer.customerName}</TableCell>
                  </>
                )}
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>${transaction.transactionAmount}</TableCell>
                <TableCell>{transaction.earnedPoints} points</TableCell>
                {transaction.showCustomerInfo && (
                  <>
                    <TableCell className="total-transaction-amount" rowSpan={customer.transactions.length}>
                      ${transaction.totalTransactionAmount}
                    </TableCell>
                    <TableCell className="total-transaction-amount" rowSpan={customer.transactions.length}>
                      {transaction.totalPoints} points
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const MonthCentricTable = ({ data }) => (
  <>
     <h4 style={{color:"GrayText"}}>Monthly Data</h4>
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="month-centric table" className="transaction-table">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Transaction Amount</TableCell>
            <TableCell>Total Earned Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ year, month, transactions }) => {
            // Aggregate totals for the month
            const totalAmount = transactions.reduce((sum, { totalAmount }) => sum + totalAmount, 0);
            const totalEarnedPoints = transactions.reduce((sum, { totalEarnedPoints }) => sum + totalEarnedPoints, 0);

            return (
              <Fragment key={`${year}-${month}`}>
                {transactions.map(({ id, name, totalAmount, totalEarnedPoints }, index) => (
                  <TableRow key={`${year}-${month}-${id}`}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={transactions.length + 1}>{year}</TableCell>
                        <TableCell rowSpan={transactions.length + 1}>{month}</TableCell>
                      </>
                    )}
                    <TableCell>{name}</TableCell>
                    <TableCell>${totalAmount}</TableCell>
                    <TableCell>{totalEarnedPoints} points</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={1} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Total
                  </TableCell>
                  <TableCell style={{ textAlign: 'left', fontWeight: 'bold' }}>${totalAmount}</TableCell>
                  <TableCell style={{ textAlign: 'left', fontWeight: 'bold' }}>{totalEarnedPoints} points</TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const LastThreeMonthsTable = ({ data }) => (
  <>
     <h4 style={{color:"GrayText"}}>Customers Last Three Months Data</h4>
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="last three months table" className="transaction-table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Id</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Month</TableCell>
            <TableCell>Total Earned Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(
            data.reduce((acc, curr) => {
              const key = `${curr.id}-${curr.name}`;
              if (!acc[key]) acc[key] = [];
              acc[key].push(curr);
              return acc;
            }, {})
          ).map(([key, transactions]) => {
            const { id, name } = transactions[0];
            return transactions.map((data, index) => (
              <TableRow key={`${id}-${data.month}`}>
                {index === 0 && (
                  <>
                    <TableCell rowSpan={transactions.length}>{id}</TableCell>
                    <TableCell rowSpan={transactions.length}>{name}</TableCell>
                  </>
                )}
                <TableCell>{data.month}</TableCell>
                <TableCell>{data.totalEarnedPoints} points</TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

const AllTransactionTable = ({ customerCentricData, monthCentricData, lastThreeMonthsData }) => {
    const [loading, setLoading] = useState(true);
   
    useEffect(() => {      
      const fetchData = () => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
  
      fetchData();
    }, []);
  
    if (loading) {    
      return (
        <div className="loading-container">
          <CircularProgress />
          <p style={{color:"blue"}}>Loading data...</p>
        </div>
      );
    }
  return (
    <div>
      <CustomerCentricTable data={customerCentricData} />
      <MonthCentricTable data={monthCentricData} />
      <LastThreeMonthsTable data={lastThreeMonthsData} />
    </div>
  );
};

export default AllTransactionTable;
