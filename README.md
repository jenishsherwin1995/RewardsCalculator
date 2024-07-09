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

### Running Appilcation Screenshots
![Screenshot 2024-07-09 115924](https://github.com/sushmita30jan/reward-calculator/assets/126414273/81bc6101-ed59-473c-9a58-302206c03c52)
Error - 
![Screenshot 2024-07-09 120153](https://github.com/sushmita30jan/reward-calculator/assets/126414273/de7998fe-cbc8-4689-b03a-d7869b3360de)


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
