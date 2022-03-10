import React from 'react';
import classNames from 'classnames';

import styles from '../../styles/modules/button.module.scss';

function Button({ children, variant, type, onClick }) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[`button--${variant}`])}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;