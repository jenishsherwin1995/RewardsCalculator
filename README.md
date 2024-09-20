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
![image](https://github.com/user-attachments/assets/7d2f9672-e6da-4f24-ae62-6719b9798ff8)


Monthly Transaction Data
![image](https://github.com/user-attachments/assets/546588fa-0703-4dcf-b0f3-604cc9750afa)

Last three months transactions data
![image](https://github.com/user-attachments/assets/2df0bde6-3a3d-4b63-8b90-3a0d22c33345)


Loading Indicator before table renders
![image](https://github.com/user-attachments/assets/9dffd3fd-a115-48ab-85e6-f42971b5d7c1)
Error Scenario
![image](https://github.com/user-attachments/assets/a434dcef-a085-46b6-8920-39279222fc68)







The component, test files and api files are under the src folders.
