import { Box, TableContainer, TableBody, TableCell, TableRow, TableHead, Table, Paper } from "@mui/material";
import { constants } from "../../../utils/constants";
import './styles.css';

const CustomerRewardSingle = ({ rewardPointsData, customerId }) => {
    return (
        <Box className="customerRewards">
            <h3> {constants.CUSTOMER_HEADING} {customerId} </h3>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ height: 150 }}>
                    <Table stickyHeader sx={{ minWidth: 100 }} className="rewardTable" aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{constants.MONTH}</TableCell>
                                <TableCell>{constants.SPENT_AMOUNT}</TableCell>
                                <TableCell>{constants.EARNED_POINTS}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(rewardPointsData[customerId].monthlyRewardPoints).map((month) => (
                                <TableRow
                                    key={month}
                                >
                                    <TableCell component="th" scope="row">
                                        {month}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        ${rewardPointsData[customerId].monthlyRewardPoints[month].amount}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {rewardPointsData[customerId].monthlyRewardPoints[month].points} {rewardPointsData[customerId].monthlyRewardPoints[month].points > 1 ? 'points' : 'point'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box className="totalRewardPoints">
                {constants.TOTAL_REWARD_POINTS} : {rewardPointsData[customerId].totalRewardPoints} {rewardPointsData[customerId].totalRewardPoints > 1 ? 'points' : 'point'}
            </Box>
        </Box>
    );
}

export default CustomerRewardSingle;