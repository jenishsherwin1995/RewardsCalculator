# Customer Rewards Program (Frontend)

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.  

## Project Description

A customer receives : 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. 
(e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points). 
  
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total. 


## Tech Stack

- **Frontend:** React JS
- **Testing:** React Testing Library

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

1. **Clone the repository:**
    currently in local machine, will update once avalable code into repo

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

### File Structure

reward-calculator/
├── public/
    ├── customerTransactionsData.json
├── src/
│   ├── __tests__/
│   │   ├── calculatePointsByAmount.js
│   │   └── calculateRewardPointsByTransactions.js
│   ├── components/
│   │   ├── CustomerRewards
│   │       ├── index.jsx
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
│   ├── App.jsx
│   ├── App.test.js
│   ├── index.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── ...
```