import React, { useState } from 'react';
import './ColorFilter.css';

const ColorFilter = (props) => {
  const data = props.data.map(({ color }) => color);
  const [activePriority, setActivePriority] = useState(null);

  return (
    <div className='dropdown'>
      <button
        type='button'
        className='btn btn-danger dropdown-toggle custom__color-filter-button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <div
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: activePriority ?? data[0],
          }}
        />
      </button>
      <ul className='dropdown-menu custom-dropdown'>
        {data.map((color) => (
          <li key={`color-${color}`}>
            <button
              type='button'
              aria-label='color'
              onClick={() => {
                setActivePriority(color);
              }}
              className='btn custom-dropdown-button'
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: color,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
