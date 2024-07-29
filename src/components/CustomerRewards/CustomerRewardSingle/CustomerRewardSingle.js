import React from 'react';
import { Box, TableContainer, TableBody, TableCell, TableRow, TableHead, Table, Paper } from '@mui/material';
import { constants } from '../../../utils/constants';
import './CustomerRewardSingle.css';

const CustomerRewardSingle = ({ rewardPointsData, customerId }) => {
    return (
        <Box className="customerRewards">
            <h3>{`${customerId}. ${rewardPointsData[customerId].customerName}`}</h3>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 400 }}>
                    <Table className='rewardTable' stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{constants.YEAR}</TableCell>
                                <TableCell>{constants.MONTH}</TableCell>
                                <TableCell>{constants.SPENT_AMOUNT}</TableCell>
                                <TableCell>{constants.EARNED_POINTS}</TableCell>
                                <TableCell>{constants.TOTAL_EARNED_POINTS}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(rewardPointsData[customerId].yearlyRewardPoints).sort((a, b) => b - a).map((year) => (
                                Object.keys(rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints).sort((a, b) => b - a).map((month, index) => (
                                    <TableRow key={`${year}-${month}-${index}`}>
                                        {index === 0 && (
                                            <TableCell rowSpan={Object.keys(rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints).length}>{year}</TableCell>
                                        )}
                                        <TableCell>{rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].monthName}</TableCell>
                                        <TableCell>${rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].amount}</TableCell>
                                        <TableCell>
                                            {rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].points}{' '}
                                            {rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints[month].points > 1 ? 'points' : 'point'}
                                        </TableCell>
                                        {index === 0 && (
                                            <TableCell rowSpan={Object.keys(rewardPointsData[customerId].yearlyRewardPoints[year].monthlyRewardPoints).length}>
                                                {rewardPointsData[customerId].yearlyRewardPoints[year].totalYearlyRewardPoints}{' '}
                                                {rewardPointsData[customerId].yearlyRewardPoints[year].totalYearlyRewardPoints > 1 ? 'points' : 'point'}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box className="totalRewardPoints">
                {constants.TOTAL_REWARD_POINTS} : {rewardPointsData[customerId].totalRewardPoints}{' '}
                {rewardPointsData[customerId].totalRewardPoints > 1 ? 'points' : 'point'}
            </Box>
        </Box>
    );
};

export default CustomerRewardSingle;
