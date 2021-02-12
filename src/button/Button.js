import React from 'react';
import styles from './Button.module.css';
/**
 * Simple bootstrap-styled button component
 * @param {function} clickHandler - function called when button is clicked
 * @param {string} text - text to display on button
 */
const Button = ({
  onClick, text, className, disabled
}) => (
  <div className="container text-center">
    {/* eslint-disable-next-line react/button-has-type */}
    <button
      className={`btn ${className} ${styles.btn}`}
      onClick={onClick}
      disabled={disabled || false}
    >
      {text}
    </button>
  </div>
);
export default Button;
