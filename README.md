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
* Total Reward Amount calculated

* Circular loader and Error handling is implemented
* Test cases for all of the above scenarios are added


### Running Appilcation Screenshots
Customer Transaction Data
![image](https://github.com/user-attachments/assets/b1f6dcbf-cbc1-44b8-88a7-ad159305a2db)
Monthly Transaction Data
![image](https://github.com/user-attachments/assets/28186463-3b82-40b8-9f14-7fa191fe7aa6)
Customer's Last three months Data
![image](https://github.com/user-attachments/assets/aa566dd9-855e-422b-b3b9-efd0d1be1696)
Loading Indicator before table renders
![image](https://github.com/user-attachments/assets/9dffd3fd-a115-48ab-85e6-f42971b5d7c1)
Error Scenario
![image](https://github.com/user-attachments/assets/a434dcef-a085-46b6-8920-39279222fc68)









The component, test and api files are under the src folders.
