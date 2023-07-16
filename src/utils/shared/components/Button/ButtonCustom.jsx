import React from 'react';
import cn from 'classnames';
import './ButtonCustom.css';

const ButtonCustom = ({ children, type, className, color = 'confrim' }) => {
  const buttonStyle = cn(className, {
    custom__button: true,
    'custom__button-confrim': color === 'confrim',
    'custom__button-reject': color === 'reject',
  });

  return (
    <button type={type} className={buttonStyle}>
      {children}
    </button>
  );
};

export default ButtonCustom;
