import React, { useMemo } from "react";
import { constants } from '../utils/constants'


const CustomerSelector = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  const defaultCustomerId = useMemo(() => {
    return customers.length > 0 ? customers[0].id : '';
  }, [customers]);

  if (!selectedCustomerId && defaultCustomerId) {
    onSelectCustomer(defaultCustomerId);
  }

  return (
    <div>
      <select
        onChange={(e) => onSelectCustomer(e.target.value)}
        value={selectedCustomerId || defaultCustomerId}
        id="selectDropdown"
      >
        <option value="" disabled>
          {constants.CUSTOMER_HEADING}
        </option>
        {customers.map(customer => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerSelector;
