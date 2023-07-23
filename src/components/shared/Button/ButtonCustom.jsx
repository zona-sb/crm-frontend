import React from 'react';
import cn from 'classnames';
import './ButtonCustom.css';

const ButtonCustom = (props) => {
  const { className, color = 'confirm', type = 'button' } = props;
  const buttonStyle = cn(className, {
    custom__button: true,
    'custom__button-confirm': color === 'confirm',
    'custom__button-reject': color === 'reject',
  });

  return (
    <button {...props} type={type} className={buttonStyle}>
      {props.children}
    </button>
  );
};

export default ButtonCustom;
