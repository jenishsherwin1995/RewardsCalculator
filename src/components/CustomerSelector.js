import React, { useMemo } from "react";



const CustomerSelector = ({ customers, selectedCustomerId, onSelectCustomer }) => {
    // Use useMemo to calculate defaultCustomerId
    const defaultCustomerId = useMemo(() => {
      return customers.length > 0 ? customers[0].id : '';
    }, [customers]);
  
    // Trigger onSelectCustomer with the defaultCustomerId if selectedCustomerId is not set
    if (!selectedCustomerId && defaultCustomerId) {
      onSelectCustomer(defaultCustomerId);
    }
  

  return (
    <div>
      <select
        onChange={(e) => onSelectCustomer(e.target.value)}
        value={selectedCustomerId || defaultCustomerId} // Set the value to selectedCustomerId or defaultCustomerId
        id="selectDropdown"
      >
        <option value="" disabled>
          Select Customer
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
