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
https://github.com/jenishsherwin1995/RewardsCalculator

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
- Show data based on month period of time
  - Transaction data can be with in the same year or different.

* Data is grouped based on years if it spans different years
* Multiple transactions within the month are sumed up together
* Rounded up rewards

* Circular loader and Error handling is implemented
* Test cases for all of the above scenarios are added


### Running Appilcation Screenshots
Based on a Single customer with All years
![image](https://github.com/user-attachments/assets/328c9ff3-f88f-42d2-8d4c-7e0b7d71adc3)

Based on a Single Customer with Single year selection
![image](https://github.com/user-attachments/assets/8127e76a-4ccf-4962-8198-0b362b95000f)

Based on a Single Customer with Single year selection. Table shows O without any months.
![image](https://github.com/user-attachments/assets/35a487b2-19c4-4df6-9caf-f9e3bcb9cc57)

The component, test and api files are under the src folders.
