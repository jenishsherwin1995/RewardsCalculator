import React from 'react';
import './CustomerDropdown.css';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { constants } from '../utils/constants'

const CustomerDropdown = ({ customers, onSelectCustomer }) => {
  const handleChange = (event) => {
    onSelectCustomer(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <FormControl fullWidth>
        <InputLabel id="customer-select-label">{constants.CUSTOMER_HEADING}</InputLabel>
        <Select
          labelId="customer-select-label"
          value=""
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            {constants.CUSTOMER_HEADING}
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
