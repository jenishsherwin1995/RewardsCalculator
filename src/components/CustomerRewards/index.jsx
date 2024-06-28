import { useEffect, useState } from "react";
import calculateRewardPointsByTransactions from '../../utils/calculateRewardPointsByTransactions';
import { fetchCustomerTransactionData } from "../../services/fetchCustomerTransactionData";
import { constants } from "../../utils/constants";

const CustomerRewards = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [rewardPointsData, setRewardPointsData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try{
                const data = await fetchCustomerTransactionData();
                setTransactionData(data);
            } catch(error) {
                setError(error);
            }
        }
        getData();
    },[])

    useEffect(() => {
        const points = calculateRewardPointsByTransactions(transactionData);
        setRewardPointsData(points);
    }, [transactionData]);

    
    if(error) {
        return <p>{error.message}</p>
    }

    return (
        <div>
            {Object.keys(rewardPointsData).map((customerId) => (                
                <div key={customerId}>
                    <h3> {constants.CUSTOMER_HEADING} {customerId} </h3>
                    <h4> {constants.MONTHLY_AMOUNT_REWARD_POINTS}</h4>                    
                    <ul className="amountList">
                    {Object.keys(rewardPointsData[customerId].monthlyRewardPoints).map((month) => (
                        <li key={month}>
                            {`For ${month} Month, Spent Amounts : ${rewardPointsData[customerId].monthlyRewardPoints[month].amount}, Earned Reward $${rewardPointsData[customerId].monthlyRewardPoints[month].points} points`}, 
                        </li>
                    ))} 
                    </ul>
                    <h4>{`Total Reward Points : $${rewardPointsData[customerId].totalRewardPoints}`}</h4>
                </div>
            ))}
        </div>
    );
};

export default CustomerRewards;