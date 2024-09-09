import React from 'react';
import {constants} from '../utils/constants'

const YearSelector = ({ years, selectedYear, onSelectYear }) => {
  return (
    <div>
      <select onChange={(e) => onSelectYear(e.target.value)} value={selectedYear}>
  <option value="">{constants.YEAR}</option>
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
