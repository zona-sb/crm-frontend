import React from 'react';
import './ColorFilter.css';

const ColorFilter = (props) => {
  const colors = props.data.map(({ color }) => color);

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
            backgroundColor: props.activePriority,
          }}
        />
      </button>
      <ul className='dropdown-menu custom-dropdown'>
        {colors.map((color) => (
          <li key={`color-${color}`}>
            <button
              type='button'
              aria-label='color'
              onClick={() => {
                props.handlerColorValue({ value: color, key: 'color' });
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

        <li>
          <button
            type='button'
            aria-label='color'
            onClick={() => props.handlerColorValue({ value: '', key: 'color' })}
            className='btn custom-dropdown-reset-button'
          >
            Сброс
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ColorFilter;
