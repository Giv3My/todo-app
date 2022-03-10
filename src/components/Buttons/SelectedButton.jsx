import React from 'react';
import classNames from 'classnames';

import styles from '../../styles/modules/button.module.scss';

function SelectedButton({ children, id, onSelectFilter, value }) {
  return (
    <select
      className={classNames(
        styles.button,
        styles.button__select)}
      id={id}
      onChange={onSelectFilter}
      value={value}
    >
      {children}
    </select>
  );
}

export default SelectedButton;