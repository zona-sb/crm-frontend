import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './ColorFilter.css';

const ColorFilter = (props) => {
  const data = props.data.map(({ color }) => color);
  const [allPriority, setAllPriority] = useState(data);

  useEffect(() => {
    setAllPriority(data);
  }, [props.data]);
  const [activePriority, setActivePriority] = useState(allPriority[0]);
  return (
    <div className='btn-group'>
      <button
        type='button'
        className='btn btn-danger dropdown-toggle custom-button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        <div
          style={{
            width: '15px',
            height: '15px',
            backgroundColor: activePriority,
          }}
        />
      </button>
      <ul className='dropdown-menu custom-dropdown'>
        {allPriority.map((color, index) => (
          <li key={index}>
            <button
              onClick={() => {
                setActivePriority(color);
                props.column.setFilterValue(color);
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
