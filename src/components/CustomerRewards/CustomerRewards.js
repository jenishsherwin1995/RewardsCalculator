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
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            try {
                const data = await fetchCustomerTransactionData();
                logger.log('Set Fetched Transaction Data', data);
                setTransactionData(data);
            } catch (error) {
                logger.error(error);
                setIsLoading(false);
                setError(error);
            }
        }
        getData();
    }, [])

    useEffect(() => {
        if (transactionData && transactionData.length > 0) {
            const points = calculateRewardPointsByTransactions(transactionData);
            setRewardPointsData(points);
            logger.log('Set Earned Reward Points By Transactions', points);
        }
    }, [transactionData]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, constants.LOAD_TIMEOUT);
    }, [rewardPointsData])


    if (error) {
        return <p className="rewardHeading">{error.message}</p>
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {!isLoading ?
                (
                    <Box>
                        <h2 className="rewardHeading">{constants.CUSTOM_REWARD_POINTS}</h2>
                        <Grid container spacing={2}>
                            {Object.keys(rewardPointsData).sort((a, b) => a - b).map((customerId) => (
                                <Grid item xs={6} key={customerId}>
                                    <CustomerRewardSingle rewardPointsData={rewardPointsData} customerId={customerId} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
                :
                (
                    <Box className="loading">Loading...</Box>
                )
            }
        </Box>
    );
};
export default CustomerRewards;
