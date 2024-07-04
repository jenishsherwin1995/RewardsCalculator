import { useEffect, useState } from "react";
import calculateRewardPointsByTransactions from '../../utils/calculateRewardPointsByTransactions';
import { fetchCustomerTransactionData } from "../../services/apiService";
import CustomerRewardSingle from "./CustomerRewardSingle/CustomerRewardSingle";
import { constants } from "../../utils/constants";
import { Grid, Box } from "@mui/material";
import logger from '../../logger';
import './CustomerRewards.css';

const CustomerRewards = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [rewardPointsData, setRewardPointsData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchCustomerTransactionData();
                logger.log('Set Fetched Transaction Data', data);
                setTransactionData(data);
            } catch (error) {
                logger.error(error);
                setError(error);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        const points = calculateRewardPointsByTransactions(transactionData);
        logger.log('Set Earned Reward Points By Transactions', points);
        setRewardPointsData(points);
    }, [transactionData]);


    if (error) {
        return <p className="rewardHeading">{error.message}</p>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <h2 className="rewardHeading">{constants.CUSTOM_REWARD_POINTS}</h2>
            <Grid container spacing={2}>
                {Object.keys(rewardPointsData).map((customerId) => (
                    <Grid item xs={4} key={customerId}>
                        <CustomerRewardSingle rewardPointsData={rewardPointsData} customerId={customerId} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default CustomerRewards;
