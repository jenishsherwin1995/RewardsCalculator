<<<<<<< HEAD
# Customer Rewards Program (Frontend)

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

## Project Description

A customer receives : 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 


## Tech Stack

- **Frontend:** React JS
- **Testing:** Jest & React Testing Library

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

1. **Clone the repository:**    
https://github.com/sushmita30jan/reward-calculator/

2. **Install dependencies:**
   npm install

3. **Start the React application:**
   npm start

4. **Test Case Run**
    npm run test

### Usage

The frontend application will be available at `http://localhost:3000`.

### Mock Data

The application uses mock data to simulate the rewards calculation. The mock data is defined in `public/customerTransactionsData.json`.

## Features

- Calculate Reward points earned for each customer per month and total
- Show data based on latest consecutive N month period of time
  - Transaction data can be with in the same year or spans different years

* Data is grouped based on years if it spans different years
* Multiple transactions within the month are sumed up together
* Rounded up rewards

* Loading screen and Error handling is implemented
* Test cases for all of the above scenarios are added
* Transaction data is logged
* 

### Running Appilcation Screenshots
![image](https://github.com/user-attachments/assets/31a4db54-0d79-403a-9fac-01cfbb0b6a5e)

UI with Logger - 
![image](https://github.com/user-attachments/assets/68c37c27-3576-42d3-8ded-7c92105d7ffd)

Error - 
![Screenshot 2024-07-09 120153](https://github.com/sushmita30jan/reward-calculator/assets/126414273/de7998fe-cbc8-4689-b03a-d7869b3360de)

Loading - 
![image](https://github.com/user-attachments/assets/2923a02b-8c9e-465b-aa9b-08be286be41c)



### File Structure

reward-calculator/
├── public/
    ├── customerTransactionsData.json
├── src/
│   ├── __tests__/
│   │   ├── calculatePointsByAmount.js
│   │   └── calculateRewardPointsByTransactions.js
        └── customerRewards.js
│   ├── components/
│   │   ├── CustomerRewards
│   │   ├    ├── CustomerRewards.js
│   │   ├    ├── CustomerRewards.css
    │   │   ├── CustomerRewardSingle
    │   │   ├    ├── CustomerRewardSingle.js
    │   │   ├    ├── CustomerRewardSingle.css
│   │   └── ...
│   ├── enum/
│   │   ├── RewardThresholdAmountEnum.js
│   │   └── ...
│   ├── services/
│   │   ├── fetchCustomerTransactionData.js
│   │   └── ...
│   ├── utils/
│   │   ├── calculatePointsByAmount.js
│   │   └── calculateRewardPointsByTransactions
│   │   └── constant.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── ...
```
=======
# RewardsCalculator
>>>>>>> origin/main
