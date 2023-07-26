import React, { useEffect, useState } from 'react';
import './ColorFilter.scss';

const ColorFilter = (props) => {
  const data = props.data.map(({ color }) => color);
  const [allPriority, setAllPriority] = useState(data);
  const [activePriority, setActivePriority] = useState(null);

  useEffect(() => {
    setAllPriority(data);
  }, [props.data]);

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
        {allPriority.map((color, index) => (
          <li key={index}>
            <button
              type='button'
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
