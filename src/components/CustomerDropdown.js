import React from 'react';
import './CustomerDropdown.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CustomerDropdown = ({ customers, onSelectCustomer }) => {
  const handleChange = (event) => {
    onSelectCustomer(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <FormControl fullWidth>
        <InputLabel id="customer-select-label">Select Customer</InputLabel>
        <Select
          labelId="customer-select-label"
          value=""
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Customer
          </MenuItem>
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomerDropdown;
