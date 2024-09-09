import React from 'react';

const YearSelector = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div>
      <select onChange={(e) => onSelectYear(e.target.value)} value={selectedYear}>
        <option value="">Select All Year</option>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearSelector;
